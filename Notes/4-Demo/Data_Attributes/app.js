const ul = document.querySelector('#cars');
ul.addEventListener('click',function(event){
    console.log(event.target.getAttribute('data-id'));
    console.log(event.target.dataset);
    console.log(event.target.dataset.year);
    event.target.dataset.sold = 'true';
})

const colorsSection = document.querySelector('#colors');

colorsSection.addEventListener('click', function(event){
    document.body.style.backgroundColor = event.target.dataset.hex;
})