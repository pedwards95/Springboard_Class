let letters = ['a','b','c','b','c','apple', 'baby','cat','blhhhhh'];

letters.filter(function(val,i,arr)
{
    return val === 'b';
});


const noBLetters = letters.filter(function(val)
{
    return val[0]==='a' || val[0] ==='c';
});

console.log(noBLetters);

const isVowel = function(char)
{
    return 'aeiou'.indexOf(char) != -1;
};

const containsVowel = function(word)
{
    for(let char of word)
    {
        if(isVowel(char))
        {
            return true;
        }
    }
    return false;
};

const hasVowels = letters.filter(containsVowel);
const noVowels = letters.filter(function(val)
    {
        return !containsVowel(val);
    });
console.log(hasVowels);
console.log(noVowels);


function myFilter(arr,func)
{
    let returnArray = [];
    for(let i = 0;i<arr.length;i++)
    {
        if(func(arr[i],i,arr))
        {
            returnArray.push(arr[i]);
        }
    }
    return returnArray;
}

const inputArr = [77,32,65443,1,433,875,98,234,5677,7,234,32,27];
const inputCallback = function(val,i,arr)
{
    return val<100;
};


console.log(myFilter(inputArr, inputCallback));
