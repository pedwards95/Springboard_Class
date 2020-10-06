$('form').on('submit', function (event) {
	event.preventDefault();
	if (
		$('#movie-title').val().length < 2 ||
		$('#movie-title').val() == 'Invalid Title Length'
	) {
		$('#movie-title').val('Invalid Title Length');
		return;
	}
	$('.movies').append(
		`<div data-title="${$('#movie-title').val()}" data-rating="${$(
			'#movie-rating'
		).val()}"> Title: ${$('#movie-title').val()} Rating: ${$(
			'#movie-rating'
		).val()}</div>`
	);
	$('#movie-title').val('');
	$('#movie-rating').val(5);
});

$('.sort').on('click', 'button', function () {
	const myMovies = $('.movies').children().get();
	switch ($(this).attr('id')) {
		case 'sort-name':
			myMovies.sort(function (a, b) {
				return a.getAttribute('data-title') > b.getAttribute('data-title')
					? 1
					: -1;
			});
			$('.movies').append(myMovies);
			break;
		case 'sort-low':
			myMovies.sort(function (a, b) {
				return Number.parseInt(a.getAttribute('data-rating')) >
					Number.parseInt(b.getAttribute('data-rating'))
					? 1
					: -1;
			});
			$('.movies').append(myMovies);
			break;
		case 'sort-high':
			myMovies.sort(function (a, b) {
				return Number.parseInt(a.getAttribute('data-rating')) <
					Number.parseInt(b.getAttribute('data-rating'))
					? 1
					: -1;
			});
			$('.movies').append(myMovies);
			break;
	}
});
