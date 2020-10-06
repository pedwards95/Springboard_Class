$('ul').get();
$('img:odd');

$('li').text();
$('li').text('NEW TEXT');

$('a').css('color');
$('a').css('font-size', '30px');

const bigTealStyles = { 'color': 'teal', 'font-size': '40px' };

$('a').css(bigTealStyles);

$('h1').addClass('highlight');
$('li').addClass('highlight');
$('li').removeClass('highlight');
$('li').toggleClass('highlight');

const $h1 = $('h1');
$h1.addClass('highlight');
$h1.css('background-color', 'teal');

$('a')
	.css('background-color', 'purple')
	.addClass('highlight')
	.text('CHAINING IS FUN');

const $specialLI = $('li').eq(3);
console.log($specialLI.next());
console.log($specialLI.prev());

console.log($('li').next());

console.log($specialLI.parent());
console.log($('li').parent());
console.log($('li a').parent());

console.log($('ul').children());
console.log($('ul').children('li'));
console.log($('ul').find('a'));

$('ul').append('<li class="highlight">I AM NEW!!!</li>');
$('li').append('<input type="checkbox"/>');
$('li').prepend('<input type="checkbox"/>');

const newH1 = $('<h1>');
$('<h1>HELLO!</h1>').css('color', 'orange').appendTo('p');

$('li').after('<bold>HI</bold>');

setTimeout(function () {
	$('h1').remove();
}, 2000);

$('img').click(function () {
	alert('HELLO!');
});

$('img').on('mouseenter', function () {
	$(this).css('border', '10px solid purple');
});

$('#add-input').on('click', function () {
	$('form').append('<input type = "text"/>');
});

$('form').on('focus', 'input', function () {
	$(this).val('BAMBOOZLED');
});

$('img').on('click', function () {
	$(this).fadeOut(3000, function () {
		$(this).fadeIn(function () {
			$(this).animate(
				{
					opacity: 0,
					width: '50px',
				},
				3000,
				function () {
					$(this).remove();
				}
			);
		});
	});
});
