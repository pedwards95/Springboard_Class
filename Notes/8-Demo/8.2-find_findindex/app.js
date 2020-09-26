const scores = [0,0,0,0,0,55,59,69,73,79,80,81,81,83,85,87,90,91,94,94,98,99];

console.log(scores.find(function(val,i,arr)
{
    return val>75;
}));

console.log(scores.find(function(val,i,arr)
{
    return val>100;
}));

console.log(scores.find(function(val,i,arr)
{
    return val != 0 && val % 2 == 0;
}));

console.log(scores.findIndex(function(val,i,arr)
{
    return val>75;
}));

function partition(arr, pivot)
{
    const pivotIndex = arr.findIndex(function(val,i,arr)
    {
        return val> pivot;
    });
    const left = arr.slice(0,pivotIndex);
    const right = arr.slice(pivotIndex);

    return [left, right];
};


function myFind(arr,func)
{
    for(let i = 0;i<arr.length;i++)
    {
        if(func(arr[i],i,arr))
        {
            return(arr[i]);
        }
    }
};

myFind([1,2,3,4,5,6],function(val,i,arr)
{
    if(val>4)
    {
        return true;
    }
});

function myFindIndex(arr,func)
{
    for(let i = 0;i<arr.length;i++)
    {
        if(func(arr[i]))
        {
            return(i);
        }
    }
};

myFindIndex([1,2,3,4,5,6],function(val,i,arr)
{
    if(val>4)
    {
        return true;
    }
});




