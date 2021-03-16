/** processForm: get data from form and make AJAX call to our API. */

async function processForm(evt) {
    evt.preventDefault()
    $("#lucky-results").text("");
    let myName = $("#lucky-form #name")
    let myYear = $("#lucky-form #year")
    let myEmail = $("#lucky-form #email")
    let myColor = $("#lucky-form #color")

    let myJSON = {
        "name" : myName.val(),
        "year" : myYear.val(),
        "email" : myEmail.val(),
        "color" : myColor.val()
    }
    const res = await axios.post('http://127.0.0.1:5000/get-lucky-num', myJSON);
    handleResponse(res);
}

/** handleResponse: deal with response from our lucky-num API. */

function handleResponse(resp) {
    console.log(resp)
    if (!resp["data"]["message"]) {
        $("#lucky-results").append(`ERROR </br>`)
        for (const info in resp["data"]) {
            console.log(info, "top")
            $("#lucky-results").append(`<li> ${info.toUpperCase()}: ${resp["data"][info]} </li>`)
        }
    }
    else {
        for (const info in resp["data"]["facts"]) {
            console.log(info)
            const cleaned = resp["data"]["facts"][info]["fact"].slice(1,resp["data"]["facts"][info]["fact"].length)
            $("#lucky-results").append(`<li> Your ${info} (<b>${resp["data"]["facts"][info]["num"]})</b> fact is: <i>${cleaned}</i> </li>`)
        }
    }
    
}


$("#lucky-form").on("submit", processForm);
