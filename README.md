# LAB Color Converter

A sophisticated web application that converts CIE LAB color values to RGB with advanced features including lighting condition simulations, intelligent color naming, and blend detection.

Use it now: https://steveseguin.github.io/lab-color-converter/

## Features

### Core Functionality
- **Accurate LAB to RGB Conversion**: Uses D50 illuminant reference for precise color conversion
- **Real-time Conversion**: Instant results as you adjust LAB values
- **Out-of-Gamut Detection**: Alerts when LAB values exceed sRGB color space capabilities

### Lighting Simulations
Experience how colors appear under 8 different lighting conditions:
- **3000K** - Warm White (typical indoor lighting)
- **5000K** - Daylight (neutral reference)
- **6500K** - Cool White (monitor calibration standard)
- **Sunlight** - Natural outdoor lighting
- **Incandescent** - Traditional bulb lighting
- **Fluorescent** - Office lighting
- **Candlelight** - Very warm, romantic lighting
- **Moonlight** - Cool, blue-tinted lighting

### Intelligent Color Analysis
- **90+ Named Colors**: Comprehensive database of color names
- **Smart Matching**: Finds the closest named color to your LAB input
- **Blend Detection**: Identifies when a color is a mixture of 2-3 base colors
- **Detailed Descriptions**: Provides context about lightness and saturation

## Usage

1. Open `index.html` in a modern web browser
2. Enter your LAB color values:
   - **L\*** (Lightness): 0 to 100
   - **a\*** (Green-Red axis): -128 to 127
   - **b\*** (Blue-Yellow axis): -128 to 127
3. Click "Convert Color" or press Enter
4. View the results:
   - Primary color swatch with RGB/HEX values
   - Color variations under different lighting
   - Color name and detailed description

## Technical Details

### LAB Color Space
The CIE LAB color space is designed to be perceptually uniform, meaning that a given numerical change corresponds to similar perceived difference in color. This makes it ideal for color matching and comparison tasks.

### Conversion Algorithm
The application implements the standard LAB to XYZ to RGB conversion pipeline:
1. LAB → XYZ using D50 illuminant
2. XYZ → linear RGB with chromatic adaptation
3. Linear RGB → sRGB with gamma correction

### Project Structure
```
lab-color-converter/
├── index.html          # Main HTML structure
├── css/
│   └── styles.css      # Modern, responsive styling
├── js/
│   ├── lab-converter.js # Core conversion algorithms
│   ├── color-names.js   # Color name database
│   └── app.js          # Application logic
└── README.md           # This file
```

## Browser Compatibility

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Opera 74+

The application uses modern CSS features including:
- CSS Grid and Flexbox
- CSS Custom Properties
- Gradient backgrounds
- Smooth transitions and animations

## Features Highlight

### Responsive Design
- Fully responsive layout that works on desktop, tablet, and mobile
- Automatic dark mode support based on system preferences
- Smooth animations and transitions

### Accessibility
- Semantic HTML structure
- Proper label associations
- Keyboard navigation support
- High contrast color combinations

## Future Enhancements

Potential areas for expansion:
- Export color palettes in various formats
- Color harmony suggestions
- LAB color picker interface
- Save favorite colors
- Share colors via URL
- Additional color spaces (HSL, CMYK)

## License

This project is open source and available under the MIT License.

## Credits

Created with attention to color science accuracy and modern web design principles.
