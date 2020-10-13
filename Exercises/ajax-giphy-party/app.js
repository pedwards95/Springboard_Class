$('#search-form').on('submit', makeSearch);
$('#del-button').on('click', delAll);
const baseURL = 'http://api.giphy.com/v1/gifs/';
const KEY = '8sSUHORrcDIgLUm7qklEIEtoEVsPJQg4';

async function makeSearch(e) {
	e.preventDefault();
	const myInput = $(this).children('input')[0].value;
	const myGIFs = await axios.get(
		baseURL + `search?q=${myInput}&api_key=${KEY}`
	);
	appendGIF(myGIFs.data.data);
}

function appendGIF(gifs) {
	const myPickedGIF = gifs[Math.floor(Math.random() * gifs.length)];
	$('.gif-area').append($(`<img src='${myPickedGIF.images.original.url}'/>`));
}

function delAll() {
	$('.gif-area').html('');
}
