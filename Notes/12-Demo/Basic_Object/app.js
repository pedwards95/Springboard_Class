const color = 'teal';

const obj = {};
obj.color = '#3723FF';
obj[color] = '#3723FF';
obj[1 + 4 - 2 * 8] = '#3723FF';

console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log(Object.entries(obj));

const rightTriangle = {
	a: 9,
	b: 12,
	printThis: function () {
		console.log(this);
	},
	getArea() {
		return (this.a * this.b) / 2;
	},
	getHypotenuse() {
		return Math.sqrt(this.a ** 2 + this.b ** 2);
	},
};

function Triangle(a, b) {
	this.a = a;
	this.b = b;
	this.getArea = function () {
		return (this.a * this.b) / 2;
	};
	this.getHypotenuse = function () {
		return Math.sqrt(this.a ** 2 + this.b ** 2);
	};
}

function TriangleBetter(a, b) {
	this.a = a;
	this.b = b;
}

TriangleBetter.prototype.getArea = function () {
	return (this.a * this.b) / 2;
};
TriangleBetter.prototype.getHypotenuse = function () {
	return Math.sqrt(this.a ** 2 + this.b ** 2);
};

console.log(new Triangle(3, 4));

Array.prototype.push = function (val) {
	console.log(`SO YOU WANT TO ADD ${val}??`);
	console.log('SORRY DONT FEEL LIKE IT');
};

const nums = new Array();
nums.push(2);

class TriangleClass {
	constructor(a, b, c) {
		for (let side of [a, b, c]) {
			if (!Number.isFinite(side) || side <= 0) {
				throw new Error('INVALID SIDES');
			}
		}
		console.log('YOU MADE A NEW TRIANGLE');
		console.log(a, b, c);
		this.a = a;
		this.b = b;
		this.c = c;
	}
	greet() {
		console.log('hello from triangle!');
	}
	display() {
		return `Triangle with sides of ${this.a} and ${this.b}`;
	}
	getArea() {
		const { a, b, c } = this;
		const s = (a + b + c) / 2;
		return Math.sqrt(s * (s - a) * (s - b) * (s - c));
	}
	isBig() {
		return this.getArea() > 50;
	}
}

const firstTri = new Triangle();
firstTri.a = 3;
firstTri.b = 4;
const secondTri = new Triangle();
secondTri.a = 9;
secondTri.b = 12;
console.log(firstTri);
console.log(secondTri.getArea());

const t2 = new TriangleClass(5, 9, 10);
console.log(t2.getArea());

const t3 = new TriangleClass(30, 40, 50);
console.log(t3.isBig());

class RightTriangle extends TriangleClass {
	constructor(a, b, c) {
		if (a * a + b * b !== c * c) {
			throw new Error('Invalid C side for right triangle!');
		}
		super(a, b, c);
	}
	display() {
		return 'Right ' + super.display();
		//console.log(`Right Triangle with sides of ${this.a} and ${this.b}`);
	}
}
