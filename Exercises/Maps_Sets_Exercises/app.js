//Maps and Sets Exercise

//Quick Question #1
//What does the following code return?

new Set([1, 1, 2, 2, 3, 4]);
// The newly created set

//Quick Question #2
//What does the following code return?

[...new Set('referee')].join('');
//it returns the string 'referee'

//Quick Questions #3
//What does the Map m look like after running the following code?

let m = new Map();
m.set([1, 2, 3], true);
m.set([1, 2, 3], false);
//the map has two arrays in it. One has a value of true, and the other has a value of false.

/*
hasDuplicate
Write a function called hasDuplicate which accepts an array and returns true or false if that array contains a duplicate
*/
function hasDuplicate(arr) {
	let mySet = new Set(arr);
	if (mySet.size != arr.length) {
		return true;
	}
	return false;
}

hasDuplicate([1, 3, 2, 1]); // true
hasDuplicate([1, 5, -1, 4]); // false

/*
vowelCount
Write a function called vowelCount which accepts a string and returns a map where the keys are numbers and the values are the count of the vowels in the string.
*/

function vowelCount(str) {
	let myArray = Array.from(str.toLowerCase());
	let myReturnMap = new Map();
	myArray.forEach((val) => {
		if ('aeiou'.includes(val)) {
			if (myReturnMap.has(val)) {
				myReturnMap.set(val, myReturnMap.get(val) + 1);
			} else {
				myReturnMap.set(val, 1);
			}
		}
	});
	return myReturnMap;
}

vowelCount('awesome'); // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
vowelCount('Colt'); // Map { 'o' => 1 }
