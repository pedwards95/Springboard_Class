//previously this was an async IIFE, and I didn't really understand why, so I put it all into a class
//in its current form this doesn't really change much, but if you wanted to break this down into modular services
//I think it works better as a class.
class UI {
	constructor() {
		//convenience selectors, this is not consistent throughout the code. I started using them just because the demo code was,
		//but stopped later. TODO: make everything one way or the other
		this.$allStoriesList = $('#all-articles-list');
		this.$submitForm = $('#submit-form');
		this.$filteredArticles = $('#filtered-articles');
		this.$loginForm = $('#login-form');
		this.$createAccountForm = $('#create-account-form');
		this.$editArticleForm = $('#edit-article-form');
		this.$ownStories = $('#my-articles');
		this.$favoriteArticles = $('#favorited-articles-list');
		this.$navLogin = $('#nav-login');
		this.$navLogOut = $('#nav-logout');
		this.$navUserProfile = $('#nav-user-profile');
		this.$navWelcome = $('#nav-welcome');
		this.$createStory = $('#nav-create-story');
		this.$createStoryForm = $('#create-story-form');
		this.$alertBox = $('#alert-box');
		this.$userProfile = $('#user-profile');

		this.storyList = null;
		this.currentUser = null;

		this.onInit();
	}

	//initialization method
	//attaches all the events that run the whole UI and checks local storage
	async onInit() {
		await this.checkIfLoggedIn();
		this.$loginForm.on('submit', this.logIn.bind(this));
		this.$navLogin.on('click', this.logInVisuals.bind(this));
		this.$createAccountForm.on('submit', this.register.bind(this));
		this.$editArticleForm.on('submit', this.editArticle.bind(this));
		this.$navLogOut.on('click', this.logOut.bind(this));
		this.$navUserProfile.on('click', this.showProfile.bind(this));
		this.$createStory.on('click', () => {
			this.showStoryForm();
			this.hideStories();
		});
		this.$createStoryForm.on(
			'click',
			'#story-submit',
			this.createStory.bind(this)
		);
		this.$createStoryForm.on('click', '#story-cancel', () => {
			this.showStoryForm('skip');
			this.showStories();
		});
		this.$allStoriesList.on(
			'click',
			'.favorite',
			await this.toggleFavorite.bind(this)
		);
		this.$allStoriesList.on(
			'click',
			'.delete-button',
			await this.deleteArticle.bind(this)
		);
		this.$favoriteArticles.on(
			'click',
			'.favorite',
			await this.toggleFavorite.bind(this)
		);
		this.$userProfile.on(
			'click',
			'button#update-profile',
			await this.updateProfile.bind(this)
		);
		$('#my-articles-list').on(
			'click',
			'#edit-my-article-btn',
			await this.editArticleForm.bind(this)
		);
		$('body').on('click', '#nav-all', this.homeNav.bind(this));
	}

	//event callback to log in to the api
	async logIn(evt) {
		evt.preventDefault(); // no page-refresh on submit

		// grab the username and password
		const username = $('#login-username').val();
		const password = $('#login-password').val();
		//remove any warnings
		$('.warning-text').remove();

		//check to make sure all boxes are filled, if no, put up warnings
		if (!(username && password)) {
			if (!username) {
				$('#login-username-input').append(
					'<div class="warning-text">Username is required!</div>'
				);
			}
			if (!password) {
				$('#login-password-input').append(
					'<div class="warning-text">Password is required!</div>'
				);
			}
			//if yes, login
		} else {
			try {
				// call the login static method to build a user instance
				const userInstance = await User.login(username, password);
				// set the global user to the user instance
				this.currentUser = userInstance;
				//make the stories
				await this.generateStories();
				//make the favorites
				await this.generateFavorites();
				//reveal the elements
				this.showStories();
				//make sure localstorage has the user
				this.syncCurrentUserToLocalStorage();
				//clean up login forms
				this.loginAndSubmitForm();
			} catch (err) {
				//this could be a 404, 401, or 400
				// TODO: clarify error
				this.alertText('Your login was not successful.');
			}
		}
	}

	//event callback for revealing and hiding the login forms
	logInVisuals() {
		// Hide the Login and Create Account Forms
		if (this.$loginForm.css('display') == 'flex') {
			this.showStories();
			this.$loginForm.hide();
			this.$createAccountForm.hide();
			// Show the Login and Create Account Forms
		} else {
			this.hideStories();
			this.$loginForm.slideToggle();
			this.$createAccountForm.slideToggle();
		}
	}

	//convenience method for hiding just the stories and not everything
	hideStories() {
		$('#all-articles').hide();
	}

	//convenience method for showing just the stories and not everything
	showStories() {
		this.$allStoriesList.show();
		$('#all-articles').slideToggle(1000);
		//dont show favorites if there is nothing there
		if ($('#favorited-articles li').get().length > 0) {
			$('#favorited-articles').show();
		}
	}

	//callback method for submitting the register form
	async register(evt) {
		evt.preventDefault(); // no page refresh

		// grab the required fields
		const name = $('#create-account-name').val();
		const username = $('#create-account-username').val();
		const password = $('#create-account-password').val();
		//remove warnings
		$('.warning-text').remove();

		//make sure all fields are filled, if not put up warning text
		if (!(name && username && password)) {
			if (!name) {
				$('#create-name-input').append(
					'<div class="warning-text">Name is required!</div>'
				);
			}
			if (!username) {
				$('#create-username-input').append(
					'<div class="warning-text">Username is required!</div>'
				);
			}
			if (!password) {
				$('#create-password-input').append(
					'<div class="warning-text">Password is required!</div>'
				);
			}
			//if all filled, submit form
		} else {
			// call the create method, which calls the API and then builds a new user instance
			try {
				const newUser = await User.create(username, password, name);
				this.currentUser = newUser;
				this.syncCurrentUserToLocalStorage();
				this.loginAndSubmitForm();
				//make the stories
				// TODO: this is slightly redundant because the stories were already there just without the favorites button
				await this.generateStories();
				this.showStories();
			} catch (err) {
				// TODO: purify inputs.
				$('#create-account-username').val('');
				$('#create-username-input').append(
					'<div class="warning-text">That username is taken!</div>'
				);
			}
		}
	}

	//callback to log out
	logOut() {
		// empty out local storage
		localStorage.clear();
		// refresh the page, clearing memory
		location.reload();
	}

	//callback method for when you press the home or brand
	//resets to all article page - NOT the same as actual refresh
	async homeNav() {
		this.hideElements();
		await this.generateStories();
		await this.generateFavorites();
		this.showStories();
	}

	/**
	 * On page load, checks local storage to see if the user is already logged in.
	 * Renders page information accordingly.
	 */
	async checkIfLoggedIn() {
		const token = localStorage.getItem('token');
		const username = localStorage.getItem('username');

		// if there is a token in localStorage, call User.getLoggedInUser
		//  to get an instance of User with the right details
		//  this is designed to run once, on page load
		await this.updateUser(token, username);
		await this.generateStories();

		if (this.currentUser) {
			this.showNavForLoggedInUser();
			this.syncCurrentUserToLocalStorage();
			await this.generateFavorites();
		}
	}

	//helper method to keep local storage accurate, also resets and clears cache on errors
	async updateUser(token, username) {
		try {
			this.currentUser = await User.getLoggedInUser(token, username);
		} catch {
			this.logOut();
		}
	}

	/**
	 * A rendering function to run to reset the forms and hide the login info
	 */
	loginAndSubmitForm() {
		// hide the forms for logging in and signing up
		this.$loginForm.hide();
		this.$createAccountForm.hide();

		// reset those forms
		this.$loginForm.trigger('reset');
		this.$createAccountForm.trigger('reset');

		// show the stories
		this.$allStoriesList.show();

		// update the navigation bar
		this.showNavForLoggedInUser();
	}

	/**
	 * A rendering function to call the StoryList.getStories static method,
	 *  which will generate a storyListInstance. Then render it.
	 */
	async generateStories() {
		// get an instance of StoryList
		const storyListInstance = await StoryList.getStories();
		// update our global variable
		this.storyList = storyListInstance;
		// empty out that part of the page
		this.$allStoriesList.empty();

		// loop through all of our stories and generate HTML for them
		for (let story of this.storyList.stories) {
			const result = this.generateStoryHTML(story);
			this.$allStoriesList.append(result);
		}

		//if not logged in, cant favorite items
		if (!this.currentUser) {
			$(`button.favorite`).remove();
		} else {
			//if are logged in, marks your previous favorites
			await this.updateUser(
				this.currentUser.loginToken,
				this.currentUser.username
			);
			this.markMyStories();
			this.markFavoritedStories();
		}
	}

	//helper method to add a delete button to stories that are yours.
	//will not add a button if it is already there
	markMyStories() {
		for (let story of this.currentUser.ownStories) {
			if (
				$(`#${story.storyId}`).get().length > 0 &&
				!($(`#${story.storyId} button.delete-button`).get().length > 0)
			) {
				$(`#${story.storyId} .favorite`).after(
					'<button class="delete-button">Delete Story</button>'
				);
			}
		}
	}

	//helper method to make your favorited story list
	async generateFavorites() {
		//ensures you are logged in and a valid user
		this.currentUser = await User.getLoggedInUser(
			this.currentUser.loginToken,
			this.currentUser.username
		);

		//gets all ids already generated
		const myIdsInHTML = new Set();
		const myFavs = $('ul#favorited-articles-list>li').get();
		for (let fav of myFavs) {
			myIdsInHTML.add(fav.id);
		}

		//gets all ids of favorites in api
		const myIdsInFavs = new Set();
		for (let fav of this.currentUser.favorites) {
			myIdsInFavs.add(fav.storyId);
		}

		//ensures any that are missing are placed into the html without repeating
		if (this.currentUser.favorites.length > 0) {
			for (let story of this.currentUser.favorites) {
				if (!myIdsInHTML.has(story.storyId)) {
					const result = this.generateStoryHTML(story).hide();
					this.$favoriteArticles.append(result.fadeIn(800));
					$(`#favorited-articles #${story.storyId} button`).toggleClass(
						'favorited'
					);
					$(
						`#favorited-articles #${story.storyId} button.delete-button`
					).remove();
				}
			}
			$('#favorited-articles').show(1000);
		} else {
			$('#favorited-articles').hide(1000);
		}

		//cleanup any that are no longer favorites
		for (let id of myIdsInHTML) {
			if (!myIdsInFavs.has(id)) {
				$(`#favorited-articles #${id}`).slideToggle(200, function () {
					$(this).remove();
				});
			}
		}

		//fix for a weird bug where one single element would not be favorited
		// (consistantly the same one even if it was not in same position in an array/set)
		const allMyFavsButtons = $('#favorited-articles .favorite');
		for (let btn of allMyFavsButtons) {
			if (!btn.className.includes('favorited')) {
				btn.classList.toggle('favorited');
			}
		}
	}

	/**
	 * A function to render HTML for an individual Story instance
	 */
	generateStoryHTML(story) {
		let hostName = this.getHostName(story.url);

		// render story markup
		const storyMarkup = $(`
      <li class='content-article' id="${story.storyId}" data-id="${story.storyId}">
        <a class="article-link" href="${story.url}" target="a_blank">
          <strong>${story.title}</strong>
        </a>
        <small class="article-author">by ${story.author}</small>
		<small class="article-hostname ${hostName}">(${hostName})</small>
		<button class="favorite"><i class="fas fa-star"></i></button>
        <small class="article-username">posted by ${story.username}</small>
      </li>
    `);

		return storyMarkup;
	}

	/* hide all elements in elementsArr */
	hideElements() {
		const elementsArrHide = [
			this.$submitForm,
			this.$allStoriesList,
			this.$filteredArticles,
			this.$ownStories,
			this.$loginForm,
			this.$createAccountForm,
			this.$createStoryForm,
			$('#all-articles'),
			$('#favorited-articles'),
			$('#user-profile'),
			$('#edit-article-form'),
		];
		elementsArrHide.forEach(($elem) => $elem.hide());
		//show the navbar though
		const elementsArrShow = [$('#nav-create-story'), $('#nav-user-profile')];
		elementsArrShow.forEach(($elem) => $elem.show());
	}

	//helper method for initial log in vs logged out user
	showNavForLoggedInUser() {
		this.$navLogin.hide();
		this.$navWelcome.show();
	}

	/* simple function to pull the hostname from a URL */
	getHostName(url) {
		let hostName;
		if (url.indexOf('://') > -1) {
			hostName = url.split('/')[2];
		} else {
			hostName = url.split('/')[0];
		}
		if (hostName.slice(0, 4) === 'www.') {
			hostName = hostName.slice(4);
		}
		return hostName;
	}

	/* sync current user information to localStorage */
	syncCurrentUserToLocalStorage() {
		if (this.currentUser) {
			localStorage.setItem('token', this.currentUser.loginToken);
			localStorage.setItem('username', this.currentUser.username);
			//also puts logged in user's username in navbar
			$('.nav-name').text(`(${this.currentUser.username})`);
			$('.nav-name').show();
		}
	}

	//shows the 'create a story' form
	//added an animation skip to tailor visuals to liking, but might not be necessary
	showStoryForm(keyword = '') {
		this.hideElements();
		$('#nav-create-story').toggle();
		if (keyword == 'skip') {
			this.$createStoryForm.toggle();
		} else {
			this.$createStoryForm.slideToggle();
		}
	}

	//callback method to create a new story
	async createStory(evt) {
		evt.preventDefault(); // no page refresh

		// grab the required fields
		const title = $('#story-title').val();
		const author = $('#story-author').val();
		const url = $('#story-url').val();

		//check to make sure all fields are filled
		if (title && author && url) {
			// if yes, call the create method, which calls the API and then builds a new story instance
			const newStory = await Story.create(this.currentUser, title, author, url);
			//puts your new story at the top of html
			this.$allStoriesList.prepend(this.generateStoryHTML(newStory));
			//remove warnings
			$('.warning-text').remove();
			$('#nav-create-story').show();
			//show all articles, hideform
			this.showStories();
			this.$createStoryForm.hide();
			//make sure user in api and user in class are consistent with new story
			await this.updateUser(
				this.currentUser.loginToken,
				this.currentUser.username
			);
			await this.markMyStories();
		} else {
			//if a field isn't filled, put in warning text
			$('.warning-text').remove();
			if (!title) {
				$('#story-title-input').append(
					'<div class="warning-text">Title is required!</div>'
				);
			}
			if (!author) {
				$('#story-author-input').append(
					'<div class="warning-text">Author is required!</div>'
				);
			}
			if (!url) {
				$('#story-url-input').append(
					'<div class="warning-text">URL is required!</div>'
				);
			}
		}
	}

	//helper method for favoriting a story
	markFavoritedStories(thisFavorite, bool = true) {
		if (thisFavorite && bool) {
			$(`#${thisFavorite} .favorite`).toggleClass('favorited');
		} else if (thisFavorite && bool == false) {
			$(`#${thisFavorite} .favorite`).toggleClass('favorited');
		} else {
			const myFavorites = this.currentUser.favorites.map((val, i, arr) => {
				return val.storyId;
			});
			for (let favorite of myFavorites) {
				if ($(`#${favorite}`).length > 0) {
					$(`#${favorite} .favorite`).toggleClass('favorited');
				}
			}
		}
	}

	//callback method for when you actually fire the event of clicking the favorite button
	async toggleFavorite(evt) {
		let myId;
		//works on both the button and the star
		if (evt.target.className.includes('fas')) {
			myId = evt.target.parentNode.parentNode.id;
		} else {
			myId = evt.target.parentNode.id;
		}
		await StoryList.getStoryById(myId);
		const myFavorites = this.currentUser.favorites.map(
			(val, i, arr) => val.storyId
		);
		//marks it and adds it to api
		//TODO: error handling, could return a 400 or 404
		if (!myFavorites.includes(myId)) {
			this.markFavoritedStories(myId);
			await User.addFavorite(this.currentUser, myId);
		} else {
			this.markFavoritedStories(myId, false);
			await User.removeFavorite(this.currentUser, myId);
		}
		//adds to favorites html
		await this.generateFavorites();
	}

	//callback method for deleting your stories
	async deleteArticle(evt) {
		const myId = evt.target.parentNode.id;
		try {
			await StoryList.removeStory(this.currentUser, myId);
			$(`li[data-id="${myId}"]`).fadeOut(300, function () {
				$(this).remove();
			});
		} catch (err) {
			//leftover from before the delete button was only on your stories.
			//probably best to keep here just in case anyway though
			this.alertText('This article cannot be deleted by you!');
		}
	}

	//helper method for displaying a message at the top of the screen
	alertText(txt) {
		this.$alertBox.text(txt);
		this.$alertBox.show(300);
		setTimeout(() => {
			this.$alertBox.hide(1000);
			this.$alertBox.text('');
		}, 3000);
	}

	//callback method that shows, and also generates the html when you want to see your profile
	// TODO: break this into 2 methods
	showProfile() {
		this.hideElements();
		$('#nav-user-profile').hide();
		$('#profile-name').html(
			`Name: <input id="profile-name-change-input" value="${this.currentUser.name}">`
		);
		$('#profile-username').html(
			`Username: <input id="profile-username-change-input" value="${this.currentUser.username}">`
		);
		$('#profile-password').html(
			`Password: <input id="profile-password-input" type="password" value=""> <small>Even if not changing your password, something must go in here</small>`
		);
		$('#profile-account-date').html(
			`Account Created At: ${this.currentUser.createdAt}`
		);
		if ($('#update-profile').get().length < 1) {
			this.$userProfile.append(`<button id='update-profile'>Update</button>`);
		}
		this.$userProfile.slideToggle();

		this.populateMyArticles();
		$('#my-articles').slideToggle();
	}

	//helper method to show your own articles on your profile
	async populateMyArticles() {
		$('#my-articles-list').html('');
		for (let story of this.currentUser.ownStories) {
			$('#my-articles-list').append(this.generateStoryHTML(story));
		}
		$(`#my-articles-list button.favorite`).remove();
		$('#my-articles-list li').append(
			'<button id="edit-my-article-btn">Edit</button>'
		);
	}

	//shows and fills the inputs when you want to edit your own articles
	async editArticleForm(evt) {
		this.hideElements();
		const myId = evt.target.parentNode.id;
		const myStory = await StoryList.getStoryById(myId);

		$('#edit-title').val(myStory.title);
		$('#edit-author').val(myStory.author);
		$('#edit-url').val(myStory.url);
		$('#editing-this-article-id').val(myStory.storyId);

		$('#edit-article-form').show();
	}

	//callback methods for submitting changes to your own articles
	async editArticle(evt) {
		evt.preventDefault();

		// grab the required fields
		const title = $('#edit-title').val();
		const author = $('#edit-author').val();
		const url = $('#edit-url').val();
		const id = $('#editing-this-article-id').val();
		//remove warnings
		$('.warning-text').remove();

		if (title && author && url) {
			//if all fields are filled, send the information to the api using the static method in the Story class
			// TODO: error handling
			await Story.update(this.currentUser, id, title, author, url);
		} else {
			//if not all filled, puts up a warning
			if (!title) {
				$('#edit-title-input').append(
					'<div class="warning-text">Title is required!</div>'
				);
			}
			if (!author) {
				$('#edit-author-input').append(
					'<div class="warning-text">Author is required!</div>'
				);
			}
			if (!url) {
				$('#edit-url-input').append(
					'<div class="warning-text">URL is required!</div>'
				);
			}
		}
		//ensure localstorage is consistant
		await this.updateUser(
			this.currentUser.loginToken,
			this.currentUser.username
		);
		//regenerate html to ensure updates are reflected in all parts
		this.$favoriteArticles.html('');
		await this.generateStories();
		await this.generateFavorites();
		this.hideElements();
		this.showStories();
	}

	//callback method for submitting changes to your profile
	async updateProfile() {
		const myOldUser = this.currentUser;
		//get all fields
		const name = $('#profile-name-change-input').val();
		const username = $('#profile-username-change-input').val();
		const password = $('#profile-password-input').val();
		//create the object to be sent
		const newUser = {
			name,
			password,
			username,
		};
		//remove warnings
		$('.warning-text').remove();

		if (name && username && password) {
			try {
				//update user with static method in User class
				await User.update(this.currentUser, newUser);
				//login as new updated user
				const userInstance = await User.login(username, password);
				this.currentUser = userInstance;
				this.syncCurrentUserToLocalStorage();
				this.alertText('Profile Updated.');

				//back to all articles after short delay
				setTimeout(() => {
					this.hideElements();
					this.showStories();
				}, 1000);
			} catch (err) {
				// TODO more clear error handling
				this.alertText(
					'Something went wrong. Possibly the name is already taken.'
				);
				//clean up any mess that was made to ensure ACID transactions
				this.currentUser = myOldUser;
				this.syncCurrentUserToLocalStorage();
			}
		} else {
			//if fields are not filled, put in a warning
			if (!name) {
				$('#profile-name').append(
					'<div class="warning-text">Name is required!</div>'
				);
			}
			if (!username) {
				$('#profile-username').append(
					'<div class="warning-text">Username is required!</div>'
				);
			}
			if (!password) {
				$('#profile-password').append(
					'<div class="warning-text">Password is required!</div>'
				);
			}
		}
	}
}

// UI instance
const myUI = new UI();
