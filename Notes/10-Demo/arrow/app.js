const add = (x, y) => {
	return x + y;
};
const numbers = [2, 3, 6, 78, 99, 104, 23];

numbers.reduce((accum, next) => {
	return Math.max(accum, next);
});
