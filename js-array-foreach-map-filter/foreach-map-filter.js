/*
Write a function called doubleValues which accepts an array and returns a new array with all the values in the array passed to the function doubled
*/
function doubleValues(arr)
{
    let ReturnArray = [];
    arr.forEach(function(val,i,arr)
    {
        ReturnArray.push(val*2);
    });
    return ReturnArray;
};

/*
Write a function called onlyEvenValues which accepts an array and returns a new array with only the even values in the array passed to the function
*/
function onlyEvenValues(arr)
{
    return arr.filter(function(val,i,arr)
    {
        return val%2 == 0;
    });
};

/*
Write a function called showFirstAndLast which accepts an array of strings and returns a new array with only the first and last character of each string.

Examples:
    showFirstAndLast(['colt','matt', 'tim', 'test']) // ["ct", "mt", "tm", "tt"]
    showFirstAndLast(['hi', 'goodbye', 'smile']) // ['hi', 'ge', 'se']

*/
function showFirstAndLast(arr)
{
    return arr.map(function(val,i,arr)
    {
        return val[0] + val[val.length-1];
    });
};

/*
Write a function called addKeyAndValue which accepts an array of objects, a key,
and a value and returns the array passed to the function with the new key and value added for each object
*/
function addKeyAndValue(arr,key,value)
{
    arr.forEach(function(val,i,arr)
    {
        val[key] = value;
    });
    return arr;
}

/*
Write a function called vowelCount which accepts a string and returns an object with the keys as the vowel and the values as the number of times
the vowel appears in the string. This function should be case insensitive so a lowercase letter and uppercase letter should count
*/
function vowelCount(str)
{
    let myArray = Array.from(str);
    let ReturnObject = {};
    myArray.forEach(function(val,i,arr)
    {
        if('aeiouAEIOU'.indexOf(val) != -1)
        {
            if(ReturnObject[val.toLowerCase()])
            {
                ReturnObject[val.toLowerCase()] = ReturnObject[val.toLowerCase()]+1;
            }
            else
            {
                ReturnObject[val.toLowerCase()] = 1;
            }
        }
    });
    return ReturnObject;
};

/*
Write a function called doubleValuesWithMap which accepts an array and returns a new array with all the values in the array passed to the function doubled
*/

function doubleValuesWithMap(arr)
{
    return arr.map(function(val,i,arr)
    {
        return val*2;
    });
};

/*
Write a function called valTimesIndex which accepts an array and returns a new array with each value multiplied by the index it is currently at in the array.
*/

function valTimesIndex(arr)
{
    return arr.map(function(val,i,arr)
    {
        return val*i;
    });
};

/*
Write a function called extractKey which accepts an array of objects and some key and returns a new array with the value of that key in each object.
*/

function extractKey(arr, key)
{
    let ReturnArray = [];
    arr.forEach(function(val,i,arr)
    {
        if(val[key])
        {
            ReturnArray.push(val[key]);
        };
    });
    return ReturnArray;
};

/*
Write a function called extractFullName which accepts an array of objects and returns a new array with the value of the key with a name of "first"
and the value of a key with the name of  "last" in each object, concatenated together with a space.
*/

function extractFullName(arr)
{
    return arr.map(function(val,i,arr)
    {
        return val['first'] + ' ' + val['last'];
    });
};

/*
Write a function called filterByValue which accepts an array of objects and a key and returns a new array with all the objects that contain that key.
*/

function filterByValue(arr, key)
{
    return arr.filter(function(val,i,arr)
    {
        return val[key];
    });
};


/*
Write a function called find which accepts an array and a value and returns the first element in the array that has the same value as the second parameter
or undefined if the value is not found in the array.
*/

function find(arr, searchValue)
{
    for(let i = 0; i<arr.length;i++)
    {
        if(arr[i] == searchValue)
        {
            return arr[i];
        }
    };
    return;
};

/*
Write a function called findInObj which accepts an array of objects, a key, and some value to search for and returns the first found value in the array.
*/

function findInObj(arr, key, searchValue)
{
    for(let i = 0; i<arr.length;i++)
    {
        if(arr[i][key] && arr[i][key]==searchValue)
        {
            return arr[i];
        }
    }
    return;
};

/*
Write a function called removeVowels which accepts a string and returns a new string with all of the vowels (both uppercased and lowercased) removed.
Every character in the new string should be lowercased.
*/

function removeVowels(str)
{
    let myWord = str.toLowerCase();
    let MyOutput = Array.from(myWord);
    return (MyOutput.filter(function(val,i,arr)
    {
        return 'aeiou'.indexOf(val) == -1;
    })).join('');
};

/*
Write a function called doubleOddNumbers which accepts an array and returns a new array with all of the odd numbers doubled
*/

function doubleOddNumbers(arr)
{
    let myOdds = arr.filter(function(val,i,arr)
    {
        return val %2 !=0;
    });
    return myOdds.map(function(val,i,arr)
    {
        return val*2;
    })
};

console.log(doubleOddNumbers([1,2,3,4,5]));
