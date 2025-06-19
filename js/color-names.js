// Comprehensive color name database
const colorDatabase = [
    // Basic colors
    { name: "Black", rgb: { r: 0, g: 0, b: 0 }, category: "neutral" },
    { name: "White", rgb: { r: 255, g: 255, b: 255 }, category: "neutral" },
    { name: "Red", rgb: { r: 255, g: 0, b: 0 }, category: "primary" },
    { name: "Green", rgb: { r: 0, g: 255, b: 0 }, category: "primary" },
    { name: "Blue", rgb: { r: 0, g: 0, b: 255 }, category: "primary" },
    { name: "Yellow", rgb: { r: 255, g: 255, b: 0 }, category: "secondary" },
    { name: "Cyan", rgb: { r: 0, g: 255, b: 255 }, category: "secondary" },
    { name: "Magenta", rgb: { r: 255, g: 0, b: 255 }, category: "secondary" },
    
    // Grays
    { name: "Gray", rgb: { r: 128, g: 128, b: 128 }, category: "neutral" },
    { name: "Silver", rgb: { r: 192, g: 192, b: 192 }, category: "neutral" },
    { name: "Charcoal", rgb: { r: 54, g: 69, b: 79 }, category: "neutral" },
    { name: "Slate Gray", rgb: { r: 112, g: 128, b: 144 }, category: "neutral" },
    { name: "Ash Gray", rgb: { r: 178, g: 190, b: 181 }, category: "neutral" },
    
    // Reds
    { name: "Crimson", rgb: { r: 220, g: 20, b: 60 }, category: "red" },
    { name: "Scarlet", rgb: { r: 255, g: 36, b: 0 }, category: "red" },
    { name: "Burgundy", rgb: { r: 128, g: 0, b: 32 }, category: "red" },
    { name: "Cherry", rgb: { r: 222, g: 49, b: 99 }, category: "red" },
    { name: "Rose", rgb: { r: 255, g: 0, b: 127 }, category: "red" },
    { name: "Ruby", rgb: { r: 224, g: 17, b: 95 }, category: "red" },
    { name: "Vermillion", rgb: { r: 227, g: 66, b: 52 }, category: "red" },
    { name: "Coral", rgb: { r: 255, g: 127, b: 80 }, category: "red" },
    { name: "Salmon", rgb: { r: 250, g: 128, b: 114 }, category: "red" },
    { name: "Maroon", rgb: { r: 128, g: 0, b: 0 }, category: "red" },
    
    // Oranges
    { name: "Orange", rgb: { r: 255, g: 165, b: 0 }, category: "orange" },
    { name: "Tangerine", rgb: { r: 242, g: 133, b: 0 }, category: "orange" },
    { name: "Amber", rgb: { r: 255, g: 191, b: 0 }, category: "orange" },
    { name: "Apricot", rgb: { r: 251, g: 206, b: 177 }, category: "orange" },
    { name: "Peach", rgb: { r: 255, g: 229, b: 180 }, category: "orange" },
    { name: "Rust", rgb: { r: 183, g: 65, b: 14 }, category: "orange" },
    { name: "Burnt Orange", rgb: { r: 204, g: 85, b: 0 }, category: "orange" },
    
    // Yellows
    { name: "Gold", rgb: { r: 255, g: 215, b: 0 }, category: "yellow" },
    { name: "Lemon", rgb: { r: 255, g: 247, b: 0 }, category: "yellow" },
    { name: "Honey", rgb: { r: 255, g: 185, b: 0 }, category: "yellow" },
    { name: "Mustard", rgb: { r: 255, g: 219, b: 88 }, category: "yellow" },
    { name: "Cream", rgb: { r: 255, g: 253, b: 208 }, category: "yellow" },
    { name: "Beige", rgb: { r: 245, g: 245, b: 220 }, category: "yellow" },
    { name: "Khaki", rgb: { r: 240, g: 230, b: 140 }, category: "yellow" },
    
    // Greens
    { name: "Emerald", rgb: { r: 80, g: 200, b: 120 }, category: "green" },
    { name: "Forest Green", rgb: { r: 34, g: 139, b: 34 }, category: "green" },
    { name: "Olive", rgb: { r: 128, g: 128, b: 0 }, category: "green" },
    { name: "Sage", rgb: { r: 188, g: 184, b: 138 }, category: "green" },
    { name: "Mint", rgb: { r: 62, g: 180, b: 137 }, category: "green" },
    { name: "Lime", rgb: { r: 0, g: 255, b: 0 }, category: "green" },
    { name: "Jade", rgb: { r: 0, g: 168, b: 107 }, category: "green" },
    { name: "Pine", rgb: { r: 1, g: 121, b: 111 }, category: "green" },
    { name: "Moss", rgb: { r: 138, g: 154, b: 91 }, category: "green" },
    { name: "Sea Green", rgb: { r: 46, g: 139, b: 87 }, category: "green" },
    
    // Blues
    { name: "Navy", rgb: { r: 0, g: 0, b: 128 }, category: "blue" },
    { name: "Royal Blue", rgb: { r: 65, g: 105, b: 225 }, category: "blue" },
    { name: "Sky Blue", rgb: { r: 135, g: 206, b: 235 }, category: "blue" },
    { name: "Baby Blue", rgb: { r: 137, g: 207, b: 240 }, category: "blue" },
    { name: "Teal", rgb: { r: 0, g: 128, b: 128 }, category: "blue" },
    { name: "Turquoise", rgb: { r: 64, g: 224, b: 208 }, category: "blue" },
    { name: "Azure", rgb: { r: 0, g: 127, b: 255 }, category: "blue" },
    { name: "Cobalt", rgb: { r: 0, g: 71, b: 171 }, category: "blue" },
    { name: "Sapphire", rgb: { r: 15, g: 82, b: 186 }, category: "blue" },
    { name: "Cerulean", rgb: { r: 0, g: 123, b: 167 }, category: "blue" },
    { name: "Midnight Blue", rgb: { r: 25, g: 25, b: 112 }, category: "blue" },
    
    // Purples
    { name: "Purple", rgb: { r: 128, g: 0, b: 128 }, category: "purple" },
    { name: "Violet", rgb: { r: 238, g: 130, b: 238 }, category: "purple" },
    { name: "Indigo", rgb: { r: 75, g: 0, b: 130 }, category: "purple" },
    { name: "Lavender", rgb: { r: 230, g: 230, b: 250 }, category: "purple" },
    { name: "Amethyst", rgb: { r: 153, g: 102, b: 204 }, category: "purple" },
    { name: "Plum", rgb: { r: 221, g: 160, b: 221 }, category: "purple" },
    { name: "Mauve", rgb: { r: 224, g: 176, b: 255 }, category: "purple" },
    { name: "Lilac", rgb: { r: 200, g: 162, b: 200 }, category: "purple" },
    
    // Browns
    { name: "Brown", rgb: { r: 165, g: 42, b: 42 }, category: "brown" },
    { name: "Chocolate", rgb: { r: 210, g: 105, b: 30 }, category: "brown" },
    { name: "Coffee", rgb: { r: 111, g: 78, b: 55 }, category: "brown" },
    { name: "Tan", rgb: { r: 210, g: 180, b: 140 }, category: "brown" },
    { name: "Caramel", rgb: { r: 255, g: 213, b: 154 }, category: "brown" },
    { name: "Mahogany", rgb: { r: 192, g: 64, b: 0 }, category: "brown" },
    { name: "Sienna", rgb: { r: 160, g: 82, b: 45 }, category: "brown" },
    { name: "Umber", rgb: { r: 99, g: 81, b: 71 }, category: "brown" },
    
    // Pinks
    { name: "Pink", rgb: { r: 255, g: 192, b: 203 }, category: "pink" },
    { name: "Hot Pink", rgb: { r: 255, g: 105, b: 180 }, category: "pink" },
    { name: "Fuchsia", rgb: { r: 255, g: 0, b: 255 }, category: "pink" },
    { name: "Blush", rgb: { r: 222, g: 93, b: 131 }, category: "pink" },
    { name: "Rose Gold", rgb: { r: 183, g: 110, b: 121 }, category: "pink" },
    
    // Special/Metallic
    { name: "Copper", rgb: { r: 184, g: 115, b: 51 }, category: "metallic" },
    { name: "Bronze", rgb: { r: 205, g: 127, b: 50 }, category: "metallic" },
    { name: "Platinum", rgb: { r: 229, g: 228, b: 226 }, category: "metallic" },
    { name: "Pearl", rgb: { r: 234, g: 224, b: 200 }, category: "metallic" }
];

// Export for use
window.colorDatabase = colorDatabase;