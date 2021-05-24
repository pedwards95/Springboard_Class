describe('testmatchers', function() {
    test('compare toBe and toEqual', function() {
        const nums = [3,4,5];
        const copy = [...nums];

        expect(copy).toEqual(nums);
        expect(copy).not.toBe(nums);
    })
    test('playing with toContain', function() {
        const colors = ['red','orange']

        expect(colors).toContain('red');
        expect(colors).not.toContain('blue');
    })
})

describe('random', function() {
    test('any string', function() {
        expect("erftgyhju").toEqual(expect.any(String));
        expect(Math.random()).toEqual(expect.any(Number));
    })
})


//for more, check Jest docs