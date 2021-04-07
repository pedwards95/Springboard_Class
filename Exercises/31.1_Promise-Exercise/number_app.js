let num1 = Math.floor(Math.random() * 100);
let num2 = Math.floor(Math.random() * 100);
let num3 = Math.floor(Math.random() * 100);

let myFav = Math.floor(Math.random() * 100);

let res = axios.get(`http://numbersapi.com/${num1},${num2},${num3}?json`)
    .then((res) => {
        for (num in res.data)
        {
            $("#facts").append(`<li>${res.data[num]}</li>`)
        }
        
    })

function getFavoriteFact(){
    return axios.get(`http://numbersapi.com/${myFav}?json`)
}

getFavoriteFact()
    .then((res) => {
        $("#facts").append(`<li>${res.data.text}</li>`)
        return getFavoriteFact()
    })
    .then((res) => {
        $("#facts").append(`<li>${res.data.text}</li>`)
        return getFavoriteFact()
    })
    .then((res) => {
        $("#facts").append(`<li>${res.data.text}</li>`)
        return getFavoriteFact()
    })
    .then((res) => {
        $("#facts").append(`<li>${res.data.text}</li>`)
    })

