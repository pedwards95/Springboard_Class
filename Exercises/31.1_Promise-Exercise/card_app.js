let myDeck;
let myCards;

axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((res) => {
        myDeck = res.data;
        getCard()
            .then((res) => {
                myCards = res.data.cards;
                cardToLog(myCards);
            });
        Promise.all([getCard(),getCard()])
            .then((res) => {
                for (card of res) {
                    cardToLog(card.data.cards);
                }
            })
    });



function getCard() {
    return axios.get(`https://deckofcardsapi.com/api/deck/${myDeck.deck_id}/draw/?count=1`)
}

function cardToLog(cards) {
    for (card of cards) {
        console.log(`${titleCase(card.value)} of ${titleCase(card.suit)}`);
    }
}

function cardToHTML(cards) {
    for (card of cards) {
        $("#cards").append(`<li>${titleCase(card.value)} of ${titleCase(card.suit)}</li>`);
    }
}

function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
  }


let myDeck2;
$(document).ready(() => {
    axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then((res) => {
            console.log(res);
            myDeck = res.data;
        })
    $("#draw").bind("click", (evt) => {
        evt.preventDefault();
        getCard()
            .then((res) => {
                myCards = res.data.cards;
                cardToHTML(myCards);
        });
    })
})