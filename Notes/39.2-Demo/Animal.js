const Animal = (props) => {
    return (
        <ul>
            <li>{props.emoji}</li>
            <li>Name: {props.name}</li>
            <li>Species: {props.species}</li>
            {props.age ?  <li>Age: {props.age}</li> : ""}
            {props.isFriendly ?  <li>Friendly</li> : ""}
        </ul>
    )
} 