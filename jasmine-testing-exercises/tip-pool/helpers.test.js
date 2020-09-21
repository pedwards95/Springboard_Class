describe("sumPaymentTotal tests", function()
{
    it("should calculate total", function()
    {
        expect(sumPaymentTotal('billAmt')).toBe(50);
        expect(sumPaymentTotal('tipAmt')).toBe(12);
    });

    beforeEach(function()
    {
        MyBillAmount.value = 10;
        MyTipAmount.value = 2;
        submitPaymentInfo();
        MyBillAmount.value = 40;
        MyTipAmount.value = 10;
        submitPaymentInfo();
    });

    afterEach(function()
    {
        paymentId = 0;
        allPayments = {};
        paymentTbody.innerText = '';
        updateSummary();
    });
});

describe("calculateTipPercent tests", function()
{
    it("should calculate tip percentage", function()
    {
        expect(calculateTipPercent(30,6)).toBe(20);
    });
});

describe("appendTd tests", function()
{
    it("should append a newly created td element", function()
    {
        let MyTR = document.createElement('tr');
        appendTd(MyTR,5);
        expect(MyTR.children[0].innerText).toBe('5');
    });
});