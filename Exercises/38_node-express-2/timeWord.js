function timeWord(numbers){
    const input = numbers.split(":");
    let ampm = findAmPm(input[0], input[1]);
    let hourWord = findHour(input[0], input[1]);
    let minuteWord = findMinute(input[0],input[1]);
    return `${hourWord} ${minuteWord} ${ampm}`.trim()
}

function findAmPm(hourString, minuteString){
    hourString = parseInt(hourString);
    minuteString = parseInt(minuteString);
    if((hourString == 0 || hourString == 12) && minuteString == 0) {
        return "";
    }
    else if(hourString < 12){
        return "am";
    }
    else {
        return "pm";
    }
}

function findHour(hourString, minuteString) {
    hourString = parseInt(hourString);
    minuteString = parseInt(minuteString);
    if(hourString == 0) {
        return (minuteString == 0 ? "midnight" : "twelve");
    }
    if(hourString == 1 || hourString == 13) {
        return "one";
    }
    if(hourString == 2 || hourString == 14) {
        return "two";
    }
    if(hourString == 3 || hourString == 15) {
        return "three";
    }
    if(hourString == 4 || hourString == 16) {
        return "four";
    }
    if(hourString == 5 || hourString == 17) {
        return "five";
    }
    if(hourString == 6 || hourString == 18) {
        return "six";
    }
    if(hourString == 7 || hourString == 19) {
        return "seven";
    }
    if(hourString == 8 || hourString == 20) {
        return "eight";
    }
    if(hourString == 9 || hourString == 21) {
        return "nine";
    }
    if(hourString == 10 || hourString == 22) {
        return "ten";
    }
    if(hourString == 11 || hourString == 23) {
        return "eleven";
    }
    if(hourString == 12) {
        return (minuteString == 0 ? "noon" : "twelve");
    }
}

function findMinute(hourString,minuteString) {
    hourString = parseInt(hourString);
    minuteString = parseInt(minuteString);
    if(minuteString == 0 && (hourString == 0 || hourString == 12)) {
        return "";
    }
    if(minuteString == 0) {
        return "o'clock";
    }
    if(minuteString == 1) {
        return "oh one";
    }
    if(minuteString == 2) {
        return "oh two";
    }
    if(minuteString == 3) {
        return "oh three";
    }
    if(minuteString == 4) {
        return "oh four";
    }
    if(minuteString == 5) {
        return "oh five";
    }
    if(minuteString == 6) {
        return "oh six";
    }
    if(minuteString == 7) {
        return "oh seven";
    }
    if(minuteString == 8) {
        return "oh eight";
    }
    if(minuteString == 9) {
        return "oh nine";
    }
    if(minuteString == 10) {
        return "ten";
    }
    if(minuteString == 11) {
        return "eleven";
    }
    if(minuteString == 12) {
        return "twelve";
    }
    if(minuteString == 13) {
        return "thirteen";
    }
    if(minuteString == 14) {
        return "fourteen";
    }
    if(minuteString == 15) {
        return "fifteen";
    }
    if(minuteString == 16) {
        return "sixteen";
    }
    if(minuteString == 17) {
        return "seventeen";
    }
    if(minuteString == 18) {
        return "eighteen";
    }
    if(minuteString == 19) {
        return "nineteen";
    }
    if(minuteString == 20) {
        return "twenty";
    }
    if(minuteString > 20 && minuteString < 30) {
        return "twenty " + findMinute(hourString,minuteString-20).substring(3);
    }
    if(minuteString == 30) {
        return "thirty";
    }
    if(minuteString > 30 && minuteString < 40) {
        return "thirty " + findMinute(hourString,minuteString-30).substring(3);
    }
    if(minuteString == 40) {
        return "fourty";
    }
    if(minuteString > 40 && minuteString < 50) {
        return "fourty " + findMinute(hourString,minuteString-40).substring(3);
    }
    if(minuteString == 50) {
        return "sixty";
    }
    if(minuteString > 50 && minuteString < 60) {
        return "sixty " + findMinute(hourString,minuteString-50).substring(3);
    }
}


module.exports = {
    timeWord
  };
