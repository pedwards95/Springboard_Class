import fruits from "./foods";
import {choice,remove} from "./helpers";

function assignment() {
    const myFruit = choice(fruits);
    console.log(`I would like one ${myFruit}, please!`)
    console.log(`Here you go: ${myFruit}`)
    console.log(`Delicious, may I have another?`)
    remove(fruits,myFruit);
    console.log(`I’m sorry, we’re all out. We have ${fruits.length} other fruit left though.`)
}

assignment();
assignment();
assignment();
assignment();
assignment();