const RandomNumRange = ({min = 1,max = 10}) => {
    let num = Math.floor(Math.random()*(max - min));
    num = num+min;
    //return <h2>Your random number is : {num}</h2>
    return React.createElement("h3", null, `Your random number is : ${num}`) 
    
    //these two lines do the same thing, this is what jsx does for use, and why we have babel
}