let MyBillAmount = document.querySelector('#billAmt');
let MyTipAmount = document.querySelector('#tipAmt');

describe("submitPaymentInfo tests", function()
{
    it("should increase payment id by 1", function()
    {
        submitPaymentInfo();
        expect(paymentId).toBe(1);
    });

    it("should increase allpayments array by 1", function()
    {
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toBe(1);
    });

    it("should increase payment id by 1", function()
    {
        submitPaymentInfo();
        expect(paymentId).toBe(1);
    });

    beforeEach(function()
    {
        MyBillAmount.value = 10;
        MyTipAmount.value = 2;
    });

    afterEach(function()
    {
        paymentId = 0;
        allPayments = {};
        paymentTbody.innerText = '';
        updateSummary();
    });
});

describe("createCurPayment tests", function()
{
    it("should not allow empty bill info", function()
    {
        MyBillAmount.value = '';
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toBe(0);
    });

    it("should not allow empty tip info", function()
    {
        MyTipAmount.value = '';
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toBe(0);
    });

    it("should not allow negative bill info", function()
    {
        MyBillAmount.value = -1;
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toBe(0);

    });

    it("should not allow negative tip info", function()
    {
        MyTipAmount.value = -1;
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toBe(0);
    });

    beforeEach(function()
    {
        MyBillAmount.value = 10;
        MyTipAmount.value = 2;
    });

    afterEach(function()
    {
        paymentId = 0;
        allPayments = {};
        paymentTbody.innerText = '';
        updateSummary();
    });
});

describe("appendPaymentTable tests", function()
{
    it('should update payment table',function()
    {
        let MyPayment =
        {
            billAmt: 10,
            tipAmt: 2,
            tipPercent: calculateTipPercent(10, 2)
        }
        appendPaymentTable(MyPayment);

        let MyServerTable = document.querySelectorAll('#paymentTable tbody tr td');

        expect(MyServerTable.length).toEqual(4);
        expect(MyServerTable[0].innerText).toEqual('$10');
        expect(MyServerTable[1].innerText).toEqual('$2');
        expect(MyServerTable[2].innerText).toEqual('20%');
    });


    beforeEach(function()
    {
        MyBillAmount.value = 10;
        MyTipAmount.value = 2;
    });

    afterEach(function()
    {
        paymentId = 0;
        allPayments = {};
        paymentTbody.innerText = '';
        billAmtInput.value = '';
        tipAmtInput.value = '';
        updateSummary();
    });
});

describe("updateSummary tests", function()
{
    it("should calculate and update average tip", function()
    {
        submitPaymentInfo();
        MyBillAmount.value = 20;
        MyTipAmount.value = 2;
        submitPaymentInfo();
        let paymentTotal = sumPaymentTotal('tipPercent');
        let tipPercentAvg = paymentTotal / Object.keys(allPayments).length;
        expect(tipPercentAvg).toBe(15);

        expect(summaryTds[0].innerText).toEqual('$30');
        expect(summaryTds[1].innerText).toEqual('$4');
        expect(summaryTds[2].innerText).toEqual('15%');
    });

    beforeEach(function()
    {
        MyBillAmount.value = 10;
        MyTipAmount.value = 2;
    });

    afterEach(function()
    {
        paymentId = 0;
        allPayments = {};
        paymentTbody.innerText = '';
        updateSummary();
    });
});