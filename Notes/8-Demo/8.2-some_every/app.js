let numbers = [1,2,3];

numbers.some(function(val,i,arr)
{
    return val < 3;
});

numbers.some(function(val,i,arr)
{
    return val > 10;
});

const words =
[
    'fgvbnbyunrty',
    'mijuyhgtfrrjiunyhbgtvr',
    'ytrv',
    'wsedrftgyhujkiwsderftgyhujderfgthyj',
    'trvtvytbytbytb',
    'btrnnbryunbd'
];

console.log(words.some(function(val,i,arr)
{
    return val.length > 60;
}));

console.log(words.every(function(val,i,arr)
{
    return val.length > 1;
}));

function mySome(arr, func)
{
    for(let i = 0; i< arr.length; i++)
    {
        if(func(arr[i],i,arr))
        {
            return true;
        }
    }
    return false;
}

console.log(mySome([1,2,3],function(val,i,arr)
{
    return val == 4;
}));

function myEvery(arr, func)
{
    for(let i = 0; i< arr.length; i++)
    {
        if(!func(arr[i],i,arr))
        {
            return false;
        }
    }
    return true;
};

console.log(myEvery([1,2,3,'4'],function(val,i,arr)
{
    return typeof(val) == 'number';
}));