/*
Your generator should consist of a form that accepts a link to an image, text for the top of the meme, and text for the bottom of the meme.
When the user submits the form, use JavaScript to append to the DOM a div which contains the meme, including the image and its text.

Requirements
User should be able to submit a form on the page to generate a new meme on the page, and should be able to add multiple memes to the page by submitting the form multiple times.
Users should be able to click on a button to remove a meme from the page.
When the meme form is submitted, values in the form inputs should be cleared.
Be sure to style your meme generator! It should be functional but also look nice.
*/

// 8:55 - 11:25  : 2hr 30min

OnInit();

function OnInit()
{
    const MemeContainer = document.querySelector('.document-container');
    MemeContainer.addEventListener("click",function(event)
    {
        if(event.target.className.includes("delete-button") && !event.target.className.includes("form"))
        {
            event.target.parentElement.remove();
        }
        else if(event.target.className.includes("delete-button-form"))
        {
            event.target.parentElement.remove();
            MakeNewFormButton();
        }
    })

    MakeNewFormButton();
}

function MakeNewFormButton()
{
    const MemeForm = document.querySelector(".meme-form");

    const MakeFormButton = document.createElement('button');
    MakeFormButton.classList.add("spawn-meme-form");
    MakeFormButton.innerText = "Make a new meme!"

    MemeForm.append(MakeFormButton);

    MakeFormButton.addEventListener("click",function(event)
    {
        CreateMemeForm(event.target.parentElement);
        event.target.remove();
    })
}

function CreateMeme(top,bot,img,color)
{
    if(top == '' || bot == '' || img == '')
    {
        console.log("Invalid input!");
        return;
    }
    // if(!checkImage(img))
    // {
    //     console.log("Invalid input!");
    //     return;
    // }
    const DocumentContainer = document.querySelector('.document-container');

    const MemeContainer = document.createElement('div');

    const MemeBox = document.createElement('div');
    MemeBox.classList.add("meme");

    MemeBox.style.backgroundImage = `url(${img})`;

    const TopText = document.createElement('p');
    TopText.classList.add("meme-text");
    TopText.classList.add("top");
    TopText.innerText = top;
    TopText.style.color = color;

    const BotText = document.createElement('p');
    BotText.classList.add("meme-text");
    BotText.classList.add("bot");
    BotText.innerText = bot;
    BotText.style.color = color;

    const DeleteButton = document.createElement('button');
    DeleteButton.classList.add("delete-button");
    DeleteButton.innerText = "Delete Meme";

    MemeBox.append(TopText,BotText);
    MemeContainer.append(MemeBox,DeleteButton);
    DocumentContainer.append(MemeContainer);

}

// function checkImage(url)
// {

//     var http = new XMLHttpRequest();

//     http.open("GET",url);
//     http.send();

//     if(http.status != 404)
//     {
//         return true;
//     }
//     else
//     {
//         return false;
//     }
// }

function CreateMemeForm(container)
{
    const MyForm = document.createElement('form');
    MyForm.classList.add("my-form");

    const TopTextInput = document.createElement('input');
    TopTextInput.classList.add("top-text-input");
    TopTextInput.placeholder = "Top Text";

    const BottomTextInput = document.createElement('input');
    BottomTextInput.classList.add("bottom-text-input");
    BottomTextInput.placeholder = "Bottom Text";

    const ImageUrlInput = document.createElement('input');
    ImageUrlInput.classList.add("image-url-input");
    ImageUrlInput.placeholder = "Image Url";

    const ColorLabel = document.createElement('label');
    ColorLabel.innerText = "Text Color: ";
    ColorLabel.classList.add("color-label");

    const ColorInput = document.createElement('input');
    ColorInput.type = 'color';
    ColorInput.classList.add("color-input");

    const SubmitButton = document.createElement('button');
    SubmitButton.classList.add("meme-submit-button");
    SubmitButton.innerText = "Create";
    SubmitButton.addEventListener("click",function(event)
    {
        event.preventDefault();
        CreateMeme(TopTextInput.value,BottomTextInput.value,'"' + ImageUrlInput.value + '"',ColorInput.value);
        TopTextInput.value = "";
        BottomTextInput.value = "";
        ImageUrlInput.value = "";
        ColorInput.value = 'black';
    })

    const DeleteButton = document.createElement('button');
    DeleteButton.classList.add("delete-button-form");
    DeleteButton.innerText = "Cancel";

    const LineBreak = document.createElement('br');

    MyForm.append(TopTextInput,BottomTextInput,ImageUrlInput,LineBreak,ColorLabel,ColorInput,SubmitButton,DeleteButton);
    container.append(MyForm);
}