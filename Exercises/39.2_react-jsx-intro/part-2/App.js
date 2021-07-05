const App = () => {
    return (
        <div>
            <Tweet user="Bob" date="02-03-12" msg="I like apples"/>
            <Tweet user="Sally" date="02-04-12" msg="I like oranges"/>
            <Tweet user="Jimmy" date="02-10-12" msg="They are the same thing"/>
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById("root"))