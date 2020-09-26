function myMin(...nums) {
	return;
}

function myMax() {
	return Array.from(arguments).reduce((accum, next) =>
		next > accum ? next : accum
	);
}

function mySum() {
	return Array.from(arguments).reduce((accum, next) => accum + next);
}

function myRestSum(...nums) {
	return nums.reduce((accum, next) => accum + next);
}

const sumAll = (...values) => {
	return values.reduce((accum, next) => accum + next);
};

function makeFamily(parent1, parent2, ...kids) {
	return {
		parents: [parent1, parent2],
		children: kids.length ? kids : 0,
	};
}

console.log(makeFamily('cindy', 'peter', 'cody', 'carly'));

const filterByType = (type, ...vals) => {
	return vals.filter((v) => typeof v === type);
};

console.log(filterByType('number', 1, 2, 3, 'a', true));

const tea = {
	type: 'oolong',
	name: 'winter sprout',
	origin: 'taiwan',
};

const tea2 = { ...tea };
console.log(tea2);

const teaTin = { ...tea, price: 22.99 };
console.log(teaTin);

const newTea = { ...tea, name: 'golden frost' };
console.log(newTea);
