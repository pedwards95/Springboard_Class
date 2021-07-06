import React from "react";

const Clicker = () => {
    const fireLasers = (e) => {
        console.log(e);
        console.log("PEW PEW");
    }
    return <button onClick={fireLasers}>CLICK ME!</button>
}

export default Clicker;