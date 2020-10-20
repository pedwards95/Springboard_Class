const BASE_URL = 'https://hack-or-snooze-v3.herokuapp.com';

/**
 * This class maintains the list of individual Story instances
 *  It also has some methods for fetching, adding, and removing stories
 */

class StoryList {
	constructor(stories) {
		this.stories = stories;
	}

	/**
	 * This method is designed to be called to generate a new StoryList.
	 *  It:
	 *  - calls the API
	 *  - builds an array of Story instances
	 *  - makes a single StoryList instance out of that
	 *  - returns the StoryList instance.*
	 */

	static async getStories() {
		// query the /stories endpoint (no auth required)
		const response = await axios.get(`${BASE_URL}/stories`);

		// turn the plain old story objects from the API into instances of the Story class
		const stories = response.data.stories.map((story) => new Story(story));

		// build an instance of our own class using the new array of stories
		const storyList = new StoryList(stories);
		return storyList;
	}

	static async getStoryById(id) {
		const response = await axios.get(`${BASE_URL}/stories/${id}`);

		// build a new User instance from the API response
		const newStory = new Story(response.data.story);

		return newStory;
	}

	/**
	 * Method to make a POST request to /stories and add the new story to the list
	 * - user - the current instance of User who will post the story
	 * - newStory - a new story object for the API with title, author, and url
	 *
	 * Returns the new story object
	 */

	static async addStory(user, newStory) {
		const myNewStory = {
			token: user.loginToken,
			story: newStory,
		};
		const storyReturn = await axios.post(`${BASE_URL}/stories`, myNewStory);
		return storyReturn;
	}

	static async removeStory(user, story) {
		if (typeof story == 'string') {
			const response = await axios({
				url: `${BASE_URL}/stories/${story}`,
				method: 'DELETE',
				data: {
					token: user.loginToken,
				},
			});
			return response;
		} else {
			const response = await axios({
				url: `${BASE_URL}/stories/${story.storyId}`,
				method: 'DELETE',
				data: {
					token: user.loginToken,
				},
			});
			return response;
		}
	}
}

/**
 * The User class to primarily represent the current user.
 *  There are helper methods to signup (create), login, and getLoggedInUser
 */

class User {
	constructor(userObj) {
		this.username = userObj.username;
		this.name = userObj.name;
		this.createdAt = userObj.createdAt;
		this.updatedAt = userObj.updatedAt;

		// these are all set to defaults, not passed in by the constructor
		this.loginToken = '';
		this.favorites = [];
		this.ownStories = [];
	}

	/**
	 * Create and return a new user.
	 * Makes POST request to API and returns newly-created user.
	 * - username: a new username
	 * - password: a new password
	 * - name: the user's full name
	 */

	static async create(username, password, name) {
		const response = await axios.post(`${BASE_URL}/signup`, {
			user: {
				username,
				password,
				name,
			},
		});

		// build a new User instance from the API response
		const newUser = new User(response.data.user);

		// attach the token to the newUser instance for convenience
		newUser.loginToken = response.data.token;

		return newUser;
	}

	/**
	 * Login in user and return user instance.
	 * - username: an existing user's username
	 * - password: an existing user's password
	 */

	static async login(username, password) {
		const response = await axios({
			url: `${BASE_URL}/login`,
			method: 'POST',
			data: {
				user: {
					username,
					password,
				},
			},
		});

		// build a new User instance from the API response
		const existingUser = new User(response.data.user);

		// instantiate Story instances for the user's favorites and ownStories
		existingUser.favorites = response.data.user.favorites.map(
			(s) => new Story(s)
		);
		existingUser.ownStories = response.data.user.stories.map(
			(s) => new Story(s)
		);

		// attach the token to the newUser instance for convenience
		existingUser.loginToken = response.data.token;

		return existingUser;
	}

	/** Get user instance for the logged-in-user.
	 *
	 * This function uses the token & username to make an API request to get details
	 *   about the user. Then it creates an instance of user with that info.
	 */

	static async getLoggedInUser(token, username) {
		// if we don't have user info, return null
		if (!token || !username) return null;

		// call the API
		const response = await axios.get(`${BASE_URL}/users/${username}`, {
			params: {
				token,
			},
		});

		// instantiate the user from the API information
		const existingUser = new User(response.data.user);

		// attach the token to the newUser instance for convenience
		existingUser.loginToken = token;

		// instantiate Story instances for the user's favorites and ownStories
		existingUser.favorites = response.data.user.favorites.map(
			(s) => new Story(s)
		);
		existingUser.ownStories = response.data.user.stories.map(
			(s) => new Story(s)
		);
		return existingUser;
	}

	static async addFavorite(user, story) {
		if (typeof story == 'string') {
			const response = await axios.post(
				`${BASE_URL}/users/${user.username}/favorites/${story}`,
				{ token: user.loginToken }
			);
			const newUser = new User(response.data.user);

			// attach the token to the newUser instance for convenience
			newUser.loginToken = response.data.token;

			// instantiate Story instances for the user's favorites and ownStories
			newUser.favorites = response.data.user.favorites.map((s) => new Story(s));
			newUser.ownStories = response.data.user.stories.map((s) => new Story(s));
			return newUser;
		} else {
			const response = await axios.post(
				`${BASE_URL}/users/${user.username}/favorites/${story.storyId}`,
				{ token: user.loginToken }
			);
			const newUser = new User(response.data.user);

			// attach the token to the newUser instance for convenience
			newUser.loginToken = response.data.token;

			// instantiate Story instances for the user's favorites and ownStories
			newUser.favorites = response.data.user.favorites.map((s) => new Story(s));
			newUser.ownStories = response.data.user.stories.map((s) => new Story(s));
			return newUser;
		}
	}

	static async removeFavorite(user, story) {
		if (typeof story == 'string') {
			const response = await axios({
				url: `${BASE_URL}/users/${user.username}/favorites/${story}`,
				method: 'DELETE',
				data: {
					token: user.loginToken,
				},
			});
			const newUser = new User(response.data.user);

			// attach the token to the newUser instance for convenience
			newUser.loginToken = response.data.token;

			// instantiate Story instances for the user's favorites and ownStories
			newUser.favorites = response.data.user.favorites.map((s) => new Story(s));
			newUser.ownStories = response.data.user.stories.map((s) => new Story(s));
			return newUser;
		} else {
			const response = await axios({
				url: `${BASE_URL}/users/${user.username}/favorites/${story.storyId}`,
				method: 'DELETE',
				data: {
					token: user.loginToken,
				},
			});
			const newUser = new User(response.data.user);

			// attach the token to the newUser instance for convenience
			newUser.loginToken = response.data.token;

			// instantiate Story instances for the user's favorites and ownStories
			newUser.favorites = response.data.user.favorites.map((s) => new Story(s));
			newUser.ownStories = response.data.user.stories.map((s) => new Story(s));
			return newUser;
		}
	}

	static async update(oldUser, newUser) {
		const response = await axios({
			url: `${BASE_URL}/users/${oldUser.username}`,
			method: 'PATCH',
			data: {
				token: oldUser.loginToken,
				user: newUser,
			},
		});
		const newUserData = new User(response.data.user);

		// attach the token to the newUser instance for convenience
		newUserData.loginToken = oldUser.loginToken;

		// instantiate Story instances for the user's favorites and ownStories
		newUserData.favorites = response.data.user.favorites.map(
			(s) => new Story(s)
		);
		newUserData.ownStories = response.data.user.stories.map(
			(s) => new Story(s)
		);
		return newUserData;
	}
}

/**
 * Class to represent a single story.
 */

class Story {
	/**
	 * The constructor is designed to take an object for better readability / flexibility
	 * - storyObj: an object that has story properties in it
	 */

	constructor(storyObj) {
		this.author = storyObj.author;
		this.title = storyObj.title;
		this.url = storyObj.url;
		this.username = storyObj.username;
		this.storyId = storyObj.storyId;
		this.createdAt = storyObj.createdAt;
		this.updatedAt = storyObj.updatedAt;
	}

	/**
	 * Create and return a new story.
	 * Makes POST request to API and returns newly-created user.
	 * - username: a new username
	 * - password: a new password
	 * - name: the user's full name
	 */
	static async create(user, title, author, url) {
		const response = await axios.post(`${BASE_URL}/stories`, {
			token: user.loginToken,
			story: {
				author,
				title,
				url,
			},
		});

		// build a new User instance from the API response
		const newStory = new Story(response.data.story);

		return newStory;
	}

	static async update(user, id, title, author, url) {
		const response = await axios({
			url: `${BASE_URL}/stories/${id}`,
			method: 'PATCH',
			data: {
				token: user.loginToken,
				story: {
					author,
					title,
					url,
				},
			},
		});

		// build a new User instance from the API response
		const newStory = new Story(response.data.story);

		return newStory;
	}
}
