const baseURL = 'https://dog.ceo/api/';

async function getRandomDog() {
	const res = await axios.get(baseURL + 'breeds/image/random');
	const myDiv = document.createElement('div');
	const myImage = document.createElement('img');
	myDiv.append(myImage);
	myImage.setAttribute('src', res.data.message);
	document.querySelector('body').append(myDiv);
	console.log(res.data);
}

document.querySelector('#getDog').addEventListener('click', getRandomDog);

async function getDogByBreed(breed) {
	breed = 'lab';
	try {
		const res = await axios.get(baseURL + `breed/${breed}/images/random`);
		const img = document.querySelector('#dog');
		img.src = res.data.message;
	} catch (err) {
		console.log(err);
		getRandomDog();
	}
}

document.querySelector('#dogRandom').addEventListener('click', getDogByBreed);
