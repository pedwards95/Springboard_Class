const App = () => {
    return (
        <div>
            <FirstComponent />
            <NamedComponent name="Bob" />
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById("root"))