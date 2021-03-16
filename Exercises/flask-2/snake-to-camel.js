function snakeToCamel(word) {
    let wordArray = word.split(/ *_/);
    for(word in wordArray){
        if(!wordArray[word]) {
            wordArray[word] = "_";
        }
    }
    let newWord = "";
    let count = 0;
    while(wordArray[count] == "_") {
        newWord = newWord.concat(wordArray[count]);
        count++;
    }
    newWord = newWord.concat(wordArray[count]);
    for(let i = count+1; i<wordArray.length; i++) {
        newWord = newWord.concat(wordArray[i].charAt(0).toUpperCase() + wordArray[i].slice(1));
    }
    return(newWord);
}

