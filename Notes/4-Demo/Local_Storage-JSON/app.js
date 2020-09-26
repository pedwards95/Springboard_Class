const preferences = {
    fontSize: '18px',
    favColor: 'teal'
}


// localStorage.setItem('preferences', JSON.stringify(preferences));

// const prefs = JSON.parse(localStorage.preferences);
// const { favColor } = JSON.parse(localStorage.preferences);
// document.body.style.backgroundColor = favColor;

const toggleSwitch = document.querySelector('input[type=checkbox]');
if(localStorage.getItem('darkModeEnabled'))
{
    document.body.className = 'dark';
    toggleSwitch.checked = true;
}

toggleSwitch.addEventListener('click',function(event){
    const {checked} = toggleSwitch;
    if(checked)
    {
        localStorage.setItem('darkModeEnabled',checked)
    }
    else
    {
        localStorage.removeItem("darkModeEnabled")
    }
    document.body.className = checked ? 'dark':'';
})

