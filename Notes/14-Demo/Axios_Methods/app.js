async function getJoke(firstName, lastName) {
	const res = await axios.get('http://api.icndb.com/jokes/random', {
		params: { firstName, lastName },
	});
	console.log(res.data.value.joke);
}

getJoke('Butters', 'Steele');

async function getUsers() {
	const res = await axios.get('https://reqres.in/api/users');
	console.log(res);
}
getUsers();

async function createUser() {
	const res = await axios.post('https://reqres.in/api/users', {
		username: 'Butters The Chicken',
		email: 'Butters@gmail.com',
		age: 1,
	});
	console.log(res);
}
createUser();

async function getUsers2() {
	const res = await axios.get('https://hack-or-snooze-v3.herokuapp.com/users', {
		params: token,
	});
	console.log(res);
}

async function signUp(username, password, name) {
	const res = await axios.post(
		'https://hack-or-snooze-v3.herokuapp.com/signup',
		{
			user: { name, username, password },
		}
	);
	console.log(res);
	return login(username, password);
}
async function login(username, password) {
	const res = await axios.post(
		'https://hack-or-snooze-v3.herokuapp.com/login',
		{
			user: { username, password },
		}
	);
	console.log(res);
	return res.data.token;
}

async function getUsersWithAuth() {
	const token = await login('butterschicken86', '3s4edr5ftgy');
	getUsers(token);
}
//signUp('butterschicken86', '3s4edr5ftgy', 'butters the chicken');
getUsersWithAuth();

async function createStory() {
	const token = await login('butterschicken86', '3s4edr5ftgy');
	const newStory = {
		token,
		story: {
			author: 'Butters',
			title: 'BOOOCK bockcockbock',
			url: 'http://chickens4lyfe.com',
		},
	};
	const res = await axios.post(
		'https://hack-or-snooze-v3.herokuapp.com/stories',
		newStory
	);
	console.log(res);
}

createStory();
