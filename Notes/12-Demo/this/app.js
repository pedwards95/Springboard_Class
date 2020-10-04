const cat = {
	name: 'Blue',
	breed: 'Scottish Fold',
	dance: function (dance) {
		console.log('THIS IS: ', this);
		console.log(`Meow, I am a ${this.breed} and I like to ${dance}`);
	},
	play: function (...toys) {
		for (let toy of toys) {
			console.log(`${this.name} plays with ${toy}`);
		}
	},
};

const blueDance = cat.dance;
console.log(blueDance('salsa'));

blueDance.call(cat, 'jitterbug');

const dog = {
	breed: 'Black Lab',
	name: 'Elton',
};

blueDance.call(dog, 'hip hop dance');

const bDance = cat.dance;
const boundDance = bDance.bind(cat);
console.log(boundDance('waltz'));

const rocket = {
	name: 'Rocket',
	breed: 'Himalayan',
};

const rocketDance = cat.dance.bind(rocket);
console.log(rocketDance('tango'));

const blueDisco = cat.dance.bind(cat, 'disco');
console.log(blueDisco());
console.log(blueDisco());

const playsWithSocks = cat.play.bind(cat, 'left sock', 'right sock');
playsWithSocks();
playsWithSocks('middle sock');

function applySalesTax(taxRate, price) {
	return price + price * taxRate;
}

const applyCASalesTax = applySalesTax.bind(null, 0.0725);
applyCASalesTax(50);
