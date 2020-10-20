$('document').ready(function () {
	console.log('Let’s get ready to party with jQuery!');
});

$('article img').addClass('image-center');

$('p')
	.eq($('p').length - 1)
	.remove();

$('#title').css('font-size', Math.floor(Math.random() * 100) + 'px');

$('ol').append('<li>My new list item</li>');

$('aside').html(
	'<p>I am sorry that there was previously a list here. Lists are silly. I have removed it for you.</p>'
);

$('body').on('change', 'input', function () {
	$('body').css(
		'background-color',
		`rgb(${$('input').eq(0).val()},${$('input').eq(1).val()},${$('input')
			.eq(2)
			.val()})`
	);
});

$('body').on('click', 'img', function () {
	$(this).remove();
});
