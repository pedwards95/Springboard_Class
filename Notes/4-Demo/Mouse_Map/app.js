const myBody = document.querySelector('body');

window.addEventListener("mousemove",function(e){
    const myX = e.pageX;
    const myY = e.pageY;
    const myColor = setColor(myX, myY);
    myBody.style.backgroundColor = myColor;
})

function setColor(x,y)
{
    maxX = screen.width;
    maxY = screen.height;
    const r = Math.floor(255-(255*(x/maxX))/1.2);
    const g = Math.floor(255-(255*(y/maxY))*1.2);
    const b = Math.floor(255-(255*(y/maxX))/1.2);
    return `rgb(${r},${g},${b})`;
}