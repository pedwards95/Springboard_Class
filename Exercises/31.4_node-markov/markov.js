/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() {
        this.chains = {};
        for(let i = 0; i < this.words.length; i++) {
            if(this.chains[`${this.words[i]}`]) {
                continue;
            }
            else {
                this.chains[`${this.words[i]}`] = [];
               for(let q = i; q<this.words.length; q++) {
                if(q+1==this.words.length){
                    break;
                }
                else if(this.words[q] == this.words[i]) {
                    if(this.chains[`${this.words[i]}`].includes(this.words[q+1])) {
                        continue;
                    }
                    else {
                        this.chains[`${this.words[i]}`].push(this.words[q+1])
                    }
                } 
            }

        }
      }
    }


  /** return random text from chains */

    makeText(numWords = 100) {
        let randomStart = Math.floor(Math.random() * this.words.length);
        let currentWord = this.words[randomStart];
        let myOutput = currentWord;
        myOutput = myOutput.charAt(0).toUpperCase() + myOutput.slice(1)
        while (numWords > 0) {
            if(this.chains[currentWord].length > 0) {
                let newWord = this.chains[currentWord][Math.floor(Math.random() * this.chains[currentWord].length)]
                myOutput = myOutput + " " + newWord;
                currentWord = newWord;
            }
            else {
                randomStart = Math.floor(Math.random() * this.words.length);
                currentWord = this.words[randomStart];
            }
            numWords--;
        }
        return myOutput;
    }
}


module.exports = {MarkovMachine}
