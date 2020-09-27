function makePerson1(first, last, age) {
	return {
		first: first,
		last: last,
		age: age,
		isAlive: true,
	};
}

function makePerson2(first, last, age) {
	return {
		first,
		last,
		age,
		isAlive: true,
	};
}

const mathStuff1 = {
	x: 200,
	add: function (a, b) {
		return a + b;
	},
	square: function (a) {
		return a * a;
	},
};

const mathStuff2 = {
	x: 200,
	add(a, b) {
		return a + b;
	},
	square(a) {
		return a * a;
	},
};

const color = {
	'periwinkle': '9c88ff',
	'9c88ff': 'periwinkle',
};

function makeColor(name, hex) {
	return {
		[name]: hex,
		[hex]: name,
	};
}
