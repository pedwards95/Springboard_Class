$(document).on("click", "div.content button#menu-start", getBoard);
$(document).on("click", "div.content button#menu-back", getMenu);
$(document).on("click", "div.content button#menu-how-play", getHowPlay);
const URL = "http://localhost:5000";

function getBoard() {
	localStorage.clear();
	window.location.replace(`${URL + "/board"}`);
}

function getMenu() {
	localStorage.clear();
	window.location.replace(`${URL + "/"}`);
}

function getHowPlay() {
	localStorage.clear();
	window.location.replace(`${URL + "/instructions"}`);
}
