// LAB to RGB Conversion Functions
class LabConverter {
    constructor() {
        // D50 illuminant (2° observer)
        this.Xn = 96.422;
        this.Yn = 100.000;
        this.Zn = 82.521;
    }

    labToXyz(L, a, b) {
        const fy = (L + 16) / 116;
        const fx = a / 500 + fy;
        const fz = fy - b / 200;

        const epsilon = 216 / 24389;
        const kappa = 24389 / 27;

        const xr = Math.pow(fx, 3) > epsilon ? Math.pow(fx, 3) : (116 * fx - 16) / kappa;
        const yr = L > kappa * epsilon ? Math.pow((L + 16) / 116, 3) : L / kappa;
        const zr = Math.pow(fz, 3) > epsilon ? Math.pow(fz, 3) : (116 * fz - 16) / kappa;

        const X = xr * this.Xn;
        const Y = yr * this.Yn;
        const Z = zr * this.Zn;

        return { X, Y, Z };
    }

    xyzToRgb(X, Y, Z) {
        // Convert XYZ to linear RGB (sRGB color space)
        // Using D50 to D65 adaptation matrix combined with XYZ to RGB matrix
        let r = X * 3.1338561 - Y * 1.6168667 - Z * 0.4906146;
        let g = -X * 0.9787684 + Y * 1.9161415 + Z * 0.0334540;
        let b = X * 0.0719453 - Y * 0.2289914 + Z * 1.4052427;

        // Scale to 0-1 range
        r = r / 100;
        g = g / 100;
        b = b / 100;

        // Apply gamma correction (sRGB companding)
        r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
        g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
        b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;

        // Clamp to 0-255 range
        r = Math.max(0, Math.min(255, Math.round(r * 255)));
        g = Math.max(0, Math.min(255, Math.round(g * 255)));
        b = Math.max(0, Math.min(255, Math.round(b * 255)));

        return { r, g, b };
    }

    labToRgb(L, a, b) {
        const xyz = this.labToXyz(L, a, b);
        return this.xyzToRgb(xyz.X, xyz.Y, xyz.Z);
    }

    rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    // Simulate different lighting conditions
    applyLightingCondition(rgb, condition) {
        // Color temperature adjustments
        const lightingAdjustments = {
            '3000K': { r: 1.15, g: 0.95, b: 0.75 },  // Warm white
            '5000K': { r: 1.05, g: 1.00, b: 0.95 },  // Daylight
            '6500K': { r: 0.95, g: 0.98, b: 1.10 },  // Cool daylight
            'sunlight': { r: 1.08, g: 1.02, b: 0.90 }, // Natural sunlight
            'incandescent': { r: 1.20, g: 0.90, b: 0.65 }, // Traditional bulb
            'fluorescent': { r: 0.95, g: 1.05, b: 1.00 }, // Office lighting
            'candlelight': { r: 1.25, g: 0.85, b: 0.55 }, // Very warm
            'moonlight': { r: 0.90, g: 0.95, b: 1.15 } // Cool blue
        };

        const adj = lightingAdjustments[condition] || { r: 1, g: 1, b: 1 };
        
        return {
            r: Math.max(0, Math.min(255, Math.round(rgb.r * adj.r))),
            g: Math.max(0, Math.min(255, Math.round(rgb.g * adj.g))),
            b: Math.max(0, Math.min(255, Math.round(rgb.b * adj.b)))
        };
    }

    // Calculate color distance for matching
    colorDistance(rgb1, rgb2) {
        // Using weighted Euclidean distance
        const rMean = (rgb1.r + rgb2.r) / 2;
        const deltaR = rgb1.r - rgb2.r;
        const deltaG = rgb1.g - rgb2.g;
        const deltaB = rgb1.b - rgb2.b;
        
        const weightR = 2 + rMean / 256;
        const weightG = 4;
        const weightB = 2 + (255 - rMean) / 256;
        
        return Math.sqrt(weightR * deltaR * deltaR + weightG * deltaG * deltaG + weightB * deltaB * deltaB);
    }

    // Check if color is out of gamut
    isInGamut(L, a, b) {
        const rgb = this.labToRgb(L, a, b);
        return rgb.r >= 0 && rgb.r <= 255 && 
               rgb.g >= 0 && rgb.g <= 255 && 
               rgb.b >= 0 && rgb.b <= 255;
    }
}

// Export for use in other scripts
window.LabConverter = LabConverter;