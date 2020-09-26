document.addEventListener("keypress", function(event){
    console.log(event.key);
})

document.querySelector('input').addEventListener('keydown',function(event){
    console.log('KEY DOWN: ', event.key);
})

// const removeButtons = document.querySelectorAll("li button");
// for(let btn of removeButtons)
// {
//     btn.addEventListener('click',function(event){
//         event.target.parentElement.remove();
//     })
// }

const form = document.querySelector("#add-friend");
const input = document.querySelector('#first-name');
const friendList = document.querySelector('#friend-list');
form.addEventListener('submit',function(event)
{
    event.preventDefault();
    console.log(input.value);
    const newFriend = document.createElement('li');
    const removeButton = document.createElement('button');
    removeButton.innerText = "UnFriend";
    newFriend.innerText = input.value + " ";
    newFriend.append(removeButton);
    input.value = '';
    friendList.append(newFriend);
    // removeButton.addEventListener('click',function(event){
    //     event.target.parentElement.remove();
    // })
})

friendList.addEventListener('click', function(event){
    if(event.target.tagName == 'BUTTON')
    {
        event.target.parentElement.remove();
    }
    else if (event.target.tagName === "LI")
    {
        event.target.classList.add('best-friend');
        const heart = document.createElement('span');
        heart.innerHTML = '&hearts;';
        event.target.prepend(heart);
    }
})
