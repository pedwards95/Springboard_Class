/*
You are given the HTML, CSS, and JavaScript for a loan calculator.
Your goal is to fill in the JavaScript to make the loan calculator functional.
The calculator takes an amount to loan (the principle), a term in years, and a yearly rate.
The output should be the monthly payment of the loan.

To calculate the monthly payment, use the following formula:
monthly payment=P×i1−(1+i)−n

Where:
P = Amount of principle
i = periodic interest rate (in our case yearly rate ÷ 12)
n = total number of payments (years × 12)
There is also a jasmine test file (calculator-test.js).
Your goal is to write tests for the calculateMontlyPayment function.
There are a few suggested tests, but if you can think of more, feel free to add to it
*/


window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("input", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues()
{
  const MyLoanAmount = document.querySelector('#loan-amount');
  const MyLoanLength = document.querySelector('#loan-years');
  const MyLoanRate = document.querySelector('#loan-rate');


  if(MyLoanAmount.value == '')
  {
    MyLoanAmount.value = 10000;
  }
  if(MyLoanLength.value == '')
  {
    MyLoanLength.value = 10;
  }
  if(MyLoanRate.value == '')
  {
    MyLoanRate.value = .05;
  }

  const MyLoan =
  {
    amount: MyLoanAmount.value,
    years: MyLoanLength.value,
    rate: MyLoanRate.value
  };

  updateMonthly(calculateMonthlyPayment(MyLoan));

}

// Get the current values from the UI
// Update the monthly payment
function update()
{
  const MyLoanAmount = document.querySelector('#loan-amount');
  const MyLoanLength = document.querySelector('#loan-years');
  const MyLoanRate = document.querySelector('#loan-rate');

  const MyLoan =
  {
    amount: MyLoanAmount.value,
    years: MyLoanLength.value,
    rate: MyLoanRate.value
  };
  updateMonthly(calculateMonthlyPayment(MyLoan));

}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values)
{
  let L = values.amount;
  let c = (values.rate)/12;
  let n = (values.years)*12;

  let result1 = (L*c*(Math.pow(1+c,n)));
  let result2 = (Math.pow(1+c,n))-1;
  let result3 = result1/result2;

  let result = Math.ceil(result3*100)/100;
  result = result.toFixed(2);
  return result;

  //P = L[c(1 + c)n]/[(1 + c)n - 1]
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly)
{
  const MyMonthlyRate = document.querySelector('#monthly-payment');
  MyMonthlyRate.innerText = monthly;
}
