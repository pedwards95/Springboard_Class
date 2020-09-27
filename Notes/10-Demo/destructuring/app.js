const teaOrder = {
	variety: 'oolong',
	teaName: 'winter sprout',
	origin: 'taiwan',
	price: 12.99,
	hasCaffeine: true,
	quantity: 3,
};

const { price, teaName, ...others } = teaOrder;
console.log(price);
const { origin } = teaOrder;
console.log(origin);
console.log(others);

const { brewTemp = 175, quantity = 1 } = teaOrder;
console.log(brewTemp, quantity);

const { teaName: tea } = teaOrder;
console.log(tea);

function checkout(tea) {
	const { quantity = 1, price } = tea;
	return quantity * price;
}
console.log(checkout(teaOrder));

const order1 = {
	variety: 'green',
	teaName: 'silver needle',
	origin: 'taiwan',
	price: 12.99,
	hasCaffeine: true,
};
console.log(checkout(order1));

const myFavoriteThings = ['teaching', 'music', 'hiking', 'dank memes'];
const [first, second, ...otherFavs] = myFavoriteThings;
const [one, two, , four] = myFavoriteThings;

console.log(first, one);
console.log(second, two);
console.log('three was skipped!');
console.log(otherFavs);

let delicious = 'Mayonnaise';
let disgusting = 'Whipped Cream';

// let both = [delicious, disgusting];
// [disgusting, delicious] = both;

console.log(disgusting, delicious);

[disgusting, delicious] = [delicious, disgusting];
