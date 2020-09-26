function greet()
{
    console.log("HIII");
}

function diss()
{
    console.log("you are the worst :( ");
}

let funcs = [greet, diss];

const myFunc = function add(x,y)
{
    return x+y;
}

function giveBirth()
{
    console.log("GIVING BIRTH!");
    return function cry()
    {
        return "WAAAAAHHHHHH";
    }
}

function makeMultiplyFunc(num)
{
    return function mult(x)
    {
        return num*x;
    }
}

// greet();
// alert("I AM ALERT");
// diss();

// greet();
// setTimeout(diss, 3000);
// setTimeout(diss, 1000);
// greet();

// greet();
// setTimeout(function()
// {
//     diss();
//     diss();
//     diss();
// }
// , 1000);
// greet();

// const id = setInterval(diss, 2000);
//clearInterval(id);  <--- stops the constant interval tick

// setTimeout(function(){
//     console.log("MEOW")
//     console.log("WOOF")
//     console.log("OINK")
// }, 3000);

// function doTwice(func)
// {
//     func();
//     func();
// }

// doTwice(diss);

// doTwice(function(){
//     console.log("STOP BOTHERING ME");
//     console.log("GO AWAY");
// })

const printOne = function()
{
    console.log(1);
}

const funcs = [function() {}, function() {}]



function repeatThreeTimes(func)
{
    func();
    func();
    func();
}

function repeat(num, func)
{
    for(let i = 0; i<num; i++)
    {
        func();
    }
}