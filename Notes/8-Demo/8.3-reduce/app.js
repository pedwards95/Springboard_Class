const nums = [20, 30, 50, 12, -2, 45, 99, 19, 22, 85];

let total = 0;
for(let num of nums)
{
    total += num;
};
console.log(total);

let min = nums[0];
for(let i = 0;i<nums.length;i++)
{
    if (nums[i] < min)
    {
        min = nums[i];
    }
}
console.log(min);

const str = "lollapalooza";
const charFreq = {};
for(let char of str)
{
    if(charFreq[char])
    {
        charFreq[char] +=1;
    }
    else
    {
        charFreq[char] = 1;
    }
};
console.log(charFreq);

let evens = [2,4,6,8,10];

const myAnswer = evens.reduce(function(accumulator, nextValue)
{
    return accumulator + nextValue;
});
console.log(myAnswer);

const words = ['hello',' I', ' love', ' you'];
const result = words.reduce(function(accum,nextElement)
{
    console.log(accum, nextElement);
    return accum+nextElement;
});
console.log(result);

const minTermScores = [70,88,93,94,64,62,56];
const minScore = minTermScores.reduce(function(accum,nextElement)
{
    if(nextElement<accum)
    {
        return nextElement;
    }
    return accum;
});
console.log(minScore);

const minScore2 = minTermScores.reduce(function(accum,nextElement)
{
    return nextElement < accum ? nextElement : accum;
});
console.log(minScore2);

const finalsScores = [92,93,76,77,78,59,61];
const minOverallScore = finalsScores.reduce(function(accum,nextElem)
{
    return nextElem < accum ? nextSElem : accum;
}, minScore2);
console.log(minOverallScore);
