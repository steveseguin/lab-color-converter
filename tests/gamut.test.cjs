// Run with: node --test tests/gamut.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
function load() {
    const elements = {};
    const element = () => ({ value: '0', style: {}, textContent: '', innerHTML: '',
        children: [], appendChild(child) { this.children.push(child); }, addEventListener() {} });
    const context = vm.createContext({ window: {},
        document: { getElementById(id) { return elements[id] ||= element(); }, createElement: element },
        alert() {} });
    for (const file of ['color-names.js', 'lab-converter.js', 'app.js']) {
        vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', file), 'utf8'), context);
    }
    return { converter: new context.window.LabConverter(), elements, context };
}
for (const [lab, rgb] of [
    [[0, 0, 0], {r: 0, g: 0, b: 0}],
    [[50, 0, 0], {r: 119, g: 119, b: 119}],
    [[100, 0, 0], {r: 255, g: 255, b: 255}],
    [[50, 10, 10], {r: 140, g: 113, b: 102}]
]) test(`in-gamut control ${lab}`, () => {
    const { converter } = load();
    assert.equal(converter.isInGamut(...lab), true);
    assert.deepEqual(JSON.parse(JSON.stringify(converter.labToRgb(...lab))), rgb);
});
for (const [lab, hex] of [
    [[50, 100, 100], '#ff0000'],
    [[50, -100, -100], '#009dff'],
    [[75, 100, 100], '#ff2c00']
]) test(`warns without changing clipped swatch ${lab}`, () => {
    const { converter, elements, context } = load();
    assert.equal(converter.isInGamut(...lab), false);
    ['l-value', 'a-value', 'b-value'].forEach((id, i) => elements[id].value = String(lab[i]));
    vm.runInContext('convertColor()', context);
    assert.equal(elements['primary-swatch'].style.backgroundColor, hex);
    assert.equal(elements['hex-display'].textContent, `HEX: ${hex} (Out of sRGB gamut - approximated)`);
    elements['l-value'].value = '50'; elements['a-value'].value = '0'; elements['b-value'].value = '0';
    vm.runInContext('convertColor()', context);
    assert.equal(elements['hex-display'].textContent, 'HEX: #777777');
});
for (const lab of [[NaN, 0, 0], [Infinity, 0, 0], [50, Infinity, 0]]) {
    test(`non-finite input rejected ${lab}`, () => assert.equal(load().converter.isInGamut(...lab), false));
}
test('all neutral shades remain in gamut including endpoints', () => {
    const { converter } = load();
    for (let L = 0; L <= 100; L += 0.25) assert.equal(converter.isInGamut(L, 0, 0), true, `L=${L}`);
});
test('matrix rounding tolerance retains white but rejects actual overshoot', () => {
    const { converter } = load();
    const white = converter.labToXyz(100, 0, 0);
    converter.labToXyz = () => white;
    assert.equal(converter.isInGamut(100, 0, 0), true);
    converter.labToXyz = () => Object.fromEntries(Object.entries(white).map(([key, value]) => [key, value * 1.00001]));
    assert.equal(converter.isInGamut(100, 0, 0), false);
});
