$(document).on("submit", "#guess-form", processGuess);
const messageBox = $(".messages");
let timer = localStorage.getItem("timer");
if (!timer || timer <= 0) {
	timer = 60;
}
$("#timer").text(timer);

async function processGuess(evt) {
	evt.preventDefault();
	messageBox.text("");
	const guess = $("#input-guess").val();
	$("#input-guess").val("");
	const result = await axios({
		url: `${URL}/board_guess`,
		method: "POST",
		data: {
			guess: guess,
		},
	});
	if (result.data["result"] == "ok") {
		$(".score").html(
			`<p>Score:<section id="my-points">${
				result.data["score"] + guess.length - 2
			}</section></p>`
		);
		messageBox.append(`<p class="success">${guess} is correct!</p>`);
	} else {
		messageBox.append(
			`<p class="error">${guess} is ${result.data["result"].replace(
				/-/g,
				" "
			)}!</p>`
		);
	}
}

function tick() {
	if (timer > 0) {
		timer -= 1;
		$("#timer").text(timer);
		localStorage.setItem("timer", timer);
	} else {
		window.location.href = `${URL}/finish`;
	}
	setTimeout(tick, 1000);
}

setTimeout(tick, 1000);
