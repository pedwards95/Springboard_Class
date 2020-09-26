const todos = document.querySelectorAll('li');
// todos.classList.add('completed');
// todos.classList.remove('completed');
// todos.classList.toggle('completed');

function toggleAllTodos()
{
    for(let li of todos)
    {
        li.classList.toggle('completed');
    }
}

const h1 = document.querySelector('h1');

setInterval(function()
{
    if(h1.classList.contains('big'))
    {
        h1.innerText = "SAD";
    }
    if(h1.classList.contains('small'))
    {
        h1.innerText = "HAPPY";
    }
    h1.classList.toggle('big');
    h1.classList.toggle('small');
},1000);


const ul = document.querySelector('ul');
const newTodo = document.createElement('li');
newTodo.textContent = "Give Chickens treats";
newTodo.classList.add('todo');
//ul.append(newTodo);

const boldText = document.createElement('b');
boldText.textContent = " DONT FORGET TO LOCK THE COOP!!";
newTodo.append(boldText);

const secondTodo = document.createElement('li');
secondTodo.textContent = "Order more Le Croix";
secondTodo.classList.add('todo');

ul.append(newTodo, secondTodo);

const thirdTodo = document.createElement('li');
thirdTodo.textContent = "Feed cats";
thirdTodo.classList.add('todo');
ul.prepend(thirdTodo);

const newImg = document.createElement('img');
newImg.setAttribute('src',"https://icatcare.org/app/uploads/2018/06/Layer-1704-1920x840.jpg");
newImg.classList.add('thumbnail');
document.body.append(newImg);

const removeMe = document.querySelector('#remove-me');
// ul.removeChild(removeMe);
removeMe.remove();


