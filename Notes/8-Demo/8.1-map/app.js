const numbers = [21,37,64,99,142];
const negatives = numbers.map(function(val,i,arr)
{
    return (val*-1);
});

console.log(negatives);

const doubles = numbers.map(function(num)
{
    console.log(num*2);
    return(num*2);
})

const todos= [
    {
        id: 1,
        text: 'walk the dog',
        priority: 'high'
    },
    {
        id: 2,
        text: 'walk the chickens',
        priority: 'medium'
    },
    {
        id: 3,
        text: 'feed the cats',
        priority: 'low'
    },
    {
        id: 4,
        text: 'put out the fire in my garage',
        priority: 'very high'
    }
];

const todoText = todos.map(function(val)
{
    return val.text;
});

const myLinks = Array.from(document.querySelectorAll('a'));
const urls = myLinks.map(function(val)
{
    return val.href;
});

console.log(urls);

function myMap(arr,func)
{
    let OutArray = [];
    for(let i = 0;i<arr.length;i++)
    {
        OutArray.push(func(arr[i],i,arr));
    }
    return OutArray;
}


const answer = myMap([1,2,3], function(val,i,arr)
{
    return val*3;
});

console.log(answer);