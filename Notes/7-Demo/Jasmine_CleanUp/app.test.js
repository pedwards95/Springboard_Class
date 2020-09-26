describe('submit form tests', function()
{
    it('saves input val to names array', () =>
    {
        nameInput.value = 'chickenGal';
        submitForm();

        expect(names).toContain('chickenGal');
        expect(names.length).toBe(1);
    });
    it('saves input val to names array', () =>
    {
        nameInput.value = 'chickenGuy';
        submitForm();

        expect(names).toContain('chickenGuy');
        expect(names.length).toBe(1);
    });
});

afterEach(function()
{
    console.log("AFTER EACH TEST");
    nameInput.value = '';
    names = [];
})

beforeEach(function()
{
    console.log("BEFORE EACH TEST");
})

beforeAll(function()
{
    console.log("BEFORE ALL TESTS");
})

afterAll(function()
{
    console.log("AFTER ALL TESTS DONE");
})