const firstReq = new XMLHttpRequest();
firstReq.addEventListener('load', function () {
	const data = JSON.parse(this.responseText);
	console.log(data);
	for (let planet of data.results) {
		console.log(planet.name);
	}
	const nextUrl = data.next;
	const secondReq = new XMLHttpRequest();
	secondReq.addEventListener('load', function () {
		console.log('SUCCESS!');
		const data = JSON.parse(this.responseText);
		console.log(data);
		for (let planet of data.results) {
			console.log(planet.name);
		}
	});
	secondReq.addEventListener('error', () => {
		console.log('ERROR!!!!!');
	});
	secondReq.open('GET', nextUrl);
	secondReq.send();
	console.log('Just sent 2nd request!');
});
firstReq.addEventListener('error', () => {
	console.log('ERROR!!!!!');
});
firstReq.open('GET', 'https://swapi.dev/api/planets/');
firstReq.send();

console.log('SENDING REQUEST.....');
