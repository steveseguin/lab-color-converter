// Main application logic
const converter = new LabConverter();

// DOM elements
const lInput = document.getElementById('l-value');
const aInput = document.getElementById('a-value');
const bInput = document.getElementById('b-value');
const convertBtn = document.getElementById('convert-btn');
const resultsSection = document.getElementById('results');
const primarySwatch = document.getElementById('primary-swatch');
const labDisplay = document.getElementById('lab-display');
const rgbDisplay = document.getElementById('rgb-display');
const hexDisplay = document.getElementById('hex-display');
const lightingGrid = document.getElementById('lighting-grid');
const colorNameEl = document.getElementById('color-name');
const colorDescriptionEl = document.getElementById('color-description');
const colorComponentsEl = document.getElementById('color-components');

// Color matching algorithm
function findClosestColors(targetRgb, count = 5) {
    const distances = colorDatabase.map(color => ({
        ...color,
        distance: converter.colorDistance(targetRgb, color.rgb)
    }));
    
    distances.sort((a, b) => a.distance - b.distance);
    return distances.slice(0, count);
}

// Blend detection algorithm
function detectColorBlend(targetRgb) {
    const closestColors = findClosestColors(targetRgb, 10);
    const primaryMatch = closestColors[0];
    
    // If very close match, return single color
    if (primaryMatch.distance < 10) {
        return {
            type: 'exact',
            primaryColor: primaryMatch,
            description: `This is ${primaryMatch.name.toLowerCase()}.`
        };
    }
    
    // Find potential blend components
    const categories = {};
    closestColors.forEach(color => {
        if (!categories[color.category]) {
            categories[color.category] = [];
        }
        categories[color.category].push(color);
    });
    
    // Analyze color components
    const components = [];
    const topCategories = Object.entries(categories)
        .sort((a, b) => b[1].length - a[1].length)
        .slice(0, 3);
    
    topCategories.forEach(([category, colors]) => {
        if (colors.length > 0) {
            components.push(colors[0]);
        }
    });
    
    // Generate description
    if (components.length === 1) {
        return {
            type: 'similar',
            primaryColor: components[0],
            description: `This color is similar to ${components[0].name.toLowerCase()}, with subtle variations.`
        };
    } else if (components.length === 2) {
        return {
            type: 'blend',
            components: components,
            description: `This appears to be a blend of ${components[0].name.toLowerCase()} and ${components[1].name.toLowerCase()}.`
        };
    } else {
        return {
            type: 'complex',
            components: components.slice(0, 3),
            description: `This is a complex color that combines elements of ${components[0].name.toLowerCase()}, ${components[1].name.toLowerCase()}, and ${components[2].name.toLowerCase()}.`
        };
    }
}

// Generate color description
function generateColorDescription(L, a, b, rgb) {
    const blend = detectColorBlend(rgb);
    let description = blend.description;
    
    // Add lightness description
    if (L > 80) {
        description += " It's a very light shade.";
    } else if (L > 60) {
        description += " It has a bright, medium lightness.";
    } else if (L > 40) {
        description += " It's a medium-toned color.";
    } else if (L > 20) {
        description += " It's quite dark.";
    } else {
        description += " It's a very deep, dark shade.";
    }
    
    // Add saturation description
    const saturation = Math.sqrt(a * a + b * b);
    if (saturation > 80) {
        description += " The color is highly saturated and vivid.";
    } else if (saturation > 40) {
        description += " It has moderate saturation.";
    } else if (saturation > 15) {
        description += " The color is somewhat muted.";
    } else {
        description += " It's nearly neutral with very low saturation.";
    }
    
    return { blend, description };
}

// Create lighting condition swatches
function createLightingSwatches(baseRgb) {
    const conditions = [
        { name: '3000K', label: 'Warm White' },
        { name: '5000K', label: 'Daylight' },
        { name: '6500K', label: 'Cool White' },
        { name: 'sunlight', label: 'Sunlight' },
        { name: 'incandescent', label: 'Incandescent' },
        { name: 'fluorescent', label: 'Fluorescent' },
        { name: 'candlelight', label: 'Candlelight' },
        { name: 'moonlight', label: 'Moonlight' }
    ];
    
    lightingGrid.innerHTML = '';
    
    conditions.forEach(condition => {
        const adjustedRgb = converter.applyLightingCondition(baseRgb, condition.name);
        const hex = converter.rgbToHex(adjustedRgb.r, adjustedRgb.g, adjustedRgb.b);
        
        const swatchContainer = document.createElement('div');
        swatchContainer.className = 'lighting-swatch';
        
        const swatch = document.createElement('div');
        swatch.className = 'swatch';
        swatch.style.backgroundColor = hex;
        
        const label = document.createElement('p');
        label.className = 'lighting-label';
        label.textContent = condition.label;
        
        const tempLabel = document.createElement('p');
        tempLabel.className = 'temp-label';
        tempLabel.textContent = condition.name;
        
        swatchContainer.appendChild(swatch);
        swatchContainer.appendChild(label);
        swatchContainer.appendChild(tempLabel);
        
        lightingGrid.appendChild(swatchContainer);
    });
}

// Convert and display color
function convertColor() {
    const L = parseFloat(lInput.value);
    const a = parseFloat(aInput.value);
    const b = parseFloat(bInput.value);
    
    // Validate input
    if (isNaN(L) || isNaN(a) || isNaN(b)) {
        alert('Please enter valid numeric values for L, a, and b.');
        return;
    }
    
    // Convert to RGB
    const rgb = converter.labToRgb(L, a, b);
    const hex = converter.rgbToHex(rgb.r, rgb.g, rgb.b);
    
    // Update primary swatch
    primarySwatch.style.backgroundColor = hex;
    
    // Update color values
    labDisplay.textContent = `LAB: ${L.toFixed(1)}, ${a.toFixed(1)}, ${b.toFixed(1)}`;
    rgbDisplay.textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
    hexDisplay.textContent = `HEX: ${hex}`;
    
    // Check if out of gamut
    if (!converter.isInGamut(L, a, b)) {
        hexDisplay.textContent += ' (Out of sRGB gamut - approximated)';
    }
    
    // Create lighting swatches
    createLightingSwatches(rgb);
    
    // Generate color description
    const colorInfo = generateColorDescription(L, a, b, rgb);
    
    // Update color name and description
    if (colorInfo.blend.type === 'exact') {
        colorNameEl.textContent = colorInfo.blend.primaryColor.name;
        colorNameEl.style.color = hex;
    } else {
        const closest = findClosestColors(rgb, 1)[0];
        colorNameEl.textContent = `Near ${closest.name}`;
        colorNameEl.style.color = hex;
    }
    
    colorDescriptionEl.textContent = colorInfo.description;
    
    // Show color components
    colorComponentsEl.innerHTML = '';
    if (colorInfo.blend.components) {
        const componentsTitle = document.createElement('h3');
        componentsTitle.textContent = 'Color Components:';
        colorComponentsEl.appendChild(componentsTitle);
        
        colorInfo.blend.components.forEach(component => {
            const componentDiv = document.createElement('div');
            componentDiv.className = 'color-component';
            
            const componentSwatch = document.createElement('span');
            componentSwatch.className = 'component-swatch';
            componentSwatch.style.backgroundColor = converter.rgbToHex(
                component.rgb.r, 
                component.rgb.g, 
                component.rgb.b
            );
            
            const componentName = document.createElement('span');
            componentName.textContent = component.name;
            
            componentDiv.appendChild(componentSwatch);
            componentDiv.appendChild(componentName);
            colorComponentsEl.appendChild(componentDiv);
        });
    }
    
    // Show results
    resultsSection.style.display = 'block';
}

// Event listeners
convertBtn.addEventListener('click', convertColor);

// Allow Enter key to convert
[lInput, aInput, bInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            convertColor();
        }
    });
});

// Convert on page load with default values
convertColor();