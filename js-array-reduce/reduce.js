/*
Write a function called extractValue which accepts an array of objects and a key and returns a new array with the value of each object at the key.
*/

function extractValue(arr, key)
{
    return arr.reduce(function(accum,next)
    {
        accum.push(next[key]);
        return accum;
    },[]);
};

/*
Write a function called vowelCount which accepts a string and returns an object with the keys as the vowel and the values as the number of times the vowel appears in the string.
This function should be case insensitive so a lowercase letter and uppercase letter should count
*/

function vowelCount(str)
{
    return Array.from(str.toLowerCase()).reduce(function(accum,next)
    {
        if('aeiou'.indexOf(next) != -1)
        {
            if(!accum[next])
            {
                accum[next] = 1;
            }
            else
            {
                accum[next] += 1;
            }
        }
        return accum;
    },{})
};

/*
Write a function called addKeyAndValue which accepts an array of objects and returns the array of objects passed to it with each object now including the key
and value passed to the function.
*/

function addKeyAndValue(arr, key, value)
{
    return arr.reduce(function(accum,next)
    {
        next[key] = value;
        accum.push(next);
        return accum;
    },[]);
};

/*
Write a function called partition which accepts an array and a callback and returns an array with two arrays inside of it.
The partition function should run the callback function on each value in the array and if the result of the callback function at that specific value is true,
the value should be placed in the first subarray.
If the result of the callback function at that specific value is false, the value should be placed in the second subarray.
*/

function partition(arr, callback)
{
    return arr.reduce(function(accum,next)
    {
        callback(next) ? accum[0].push(next) : accum[1].push(next);
        return accum;
    },[[],[]]);
}
