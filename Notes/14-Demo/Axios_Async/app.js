async function getData() {
	const response = await axios.get('https://swapi.dev/api/planets/');
	const { next, results } = response.data;
	for (let planet of results) {
		console.log(planet.name);
	}
	const response2 = await axios.get(next);
	const { next: next2, results: results2 } = response2.data;
	for (let planet of results2) {
		console.log(planet.name);
	}
}

getData();
