const colors = ['teal','cyan','peach','purple'];

colors.forEach(function(value, index, array)
{
    console.log(value.toUpperCase());
    const caps = value.toUpperCase();
    console.log(`At index ${index}, ${caps}`);
});

const prices = [30.99,19.99,2.5,99.0];
let total = 0;
prices.forEach(function(val,i)
{
    total += val;
});
console.log(total);

total = 0;
for(let price of prices)
{
    total += price;
};
console.log(total);


function myForEach(arr,func)
{
    for(let i = 0;i<arr.length;i++)
    {
        func(arr[i]);
    }
    return;
}

console.log(myForEach([4,5,6],function(val,i,arr)
{
    console.log(val);
}));