/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default image if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
	const BASE_URL = 'http://api.tvmaze.com/';
	const mySearchResults = await axios.get(BASE_URL + `search/shows?q=${query}`);
	const myReturn = mySearchResults.data.map((val, i, arr) => {
		const { id, name, summary } = val.show;
		let image;
		if (val.show.image) {
			image = val.show.image.medium;
		} else {
			image = 'https://tinyurl.com/tv-missing';
		}
		return {
			id,
			name,
			summary,
			image,
		};
	});

	return myReturn;
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
	const $showsList = $('#shows-list');
	$showsList.empty();

	for (let show of shows) {
		let $item = $(
			`<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
          <button class="show-episodes">Show Episodes</button>
           <img class="card-img-top" src="${show.image}">
         </div>
       </div>
      `
		);

		$showsList.append($item);
	}
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$('#search-form').on('submit', async function handleSearch(evt) {
	evt.preventDefault();

	let query = $('#search-query').val();
	if (!query) return;

	$('#episodes-area').hide();

	let shows = await searchShows(query);

	populateShows(shows);
});

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(showId) {
	// TODO: get episodes from tvmaze
	//       you can get this by making GET request to
	//       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
	// TODO: return array-of-episode-info, as described in docstring above

	const BASE_URL = 'http://api.tvmaze.com/';
	const myEpisodeResults = await axios.get(
		BASE_URL + `shows/${showId}/episodes`
	);
	console.log(myEpisodeResults);
	const myReturn = myEpisodeResults.data.map((val, i, arr) => {
		const { id, name, season, number } = val;
		return { id, name, season, number };
	});
	console.log(myReturn);
	return myReturn;
}

function populateEpisodes(episodes) {
	const $showsList = $('#shows-list');
	$showsList.empty();

	const $episodesList = $('#episodes-list');
	$episodesList.empty();

	for (let episode of episodes) {
		let $item = $(
			`<div class="col-md-6 col-lg-3 Show" data-show-id="${episode.id}">
         <div class="card" data-show-id="${episode.id}">
           <div class="card-body">
             <h5 class="card-title">${episode.name}</h5>
             <p class="card-text">${episode.season} - ${episode.number}</p>
           </div>
         </div>
       </div>
      `
		);

		$episodesList.append($item);
		$('#episodes-area').show();
	}
}

$('#shows-list').on('click', '.show-episodes', async function () {
	const myEpisodes = await getEpisodes($(this).parent().attr('data-show-id'));
	populateEpisodes(myEpisodes);
});
