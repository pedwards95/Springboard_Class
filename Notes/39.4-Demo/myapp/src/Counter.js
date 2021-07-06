import React, { useState } from "react";

const Counter = () => {
    const [count,setCount] = useState(99);
    return (
        <div>
            <h1>Count is: {count}</h1>
            <button onClick={()=> setCount(count+1)}>Add</button>
            <button onClick={()=> setCount(count-1)}>Subtract</button>
        </div>
    )
}


export default Counter;