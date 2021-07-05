const App = () => {
    return (
        <div>
            <Alert msg="BAD FIRE BIG TROUBLE ALERT">
                <TodoList todos = {[
                    <li>Walk Chickens</li>,
                    <li>Feed Chickens</li>,
                    <li>Eat Chickens</li>
                ]}/>
            </Alert>
            <RandomNumRange min={20} max={30} />
            <RandomChoice choices={['red','green','yellow']} />
            <Animal 
                name="Stevie Chicks" 
                species="Silkie Chicken" 
                emoji="🐔" color="white" 
                age={3} 
                isFriendly={true}
                obj={{age:4}}/>
            <Animal name="Patrick" species="Red Fox" emoji="🦊"/>
            <MovieList />
            <RandomNumRange />
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById("root"))