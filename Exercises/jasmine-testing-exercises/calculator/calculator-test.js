it("should return a correct result with 2 decimal places", function()
{
  const values1 =
  {
    amount: 0,
    years: 10,
    rate: .05
  }
  const values2 =
  {
    amount: 10000,
    years: 20,
    rate: .01
  }
  const values3 =
  {
    amount: 69000,
    years: 5,
    rate: .07
  }
  expect(calculateMonthlyPayment(values1)).toEqual('0.00');
  expect(calculateMonthlyPayment(values2)).toEqual('45.99');
  expect(calculateMonthlyPayment(values3)).toEqual('1366.29');
});
