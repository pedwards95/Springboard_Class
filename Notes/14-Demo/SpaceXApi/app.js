const baseURL = 'https://api.spacexdata.com/v3/';

async function getLaunches() {
	const res = await axios.get(baseURL + 'launches/upcoming');
	const ui = document.querySelector('#launches');
	for (let launch of res.data) {
		const newLI = document.createElement('li');
		const mission = document.createElement('B');
		mission.innerText = launch.mission_name;
		newLI.append(mission);
		newLI.innerHTML += ` - ${launch.rocket.rocket_name}`;
		ui.append(newLI);
	}
}

document.querySelector('#getLaunches').addEventListener('click', getLaunches);
