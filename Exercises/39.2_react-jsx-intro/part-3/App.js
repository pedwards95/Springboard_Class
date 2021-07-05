function App() {
    return (
      <div>
        <Person
          name="BillyBobJoe"
          age={40}
          hobbies={["eating", "watching tv", "hockey"]}
        />
        <Person name="PapaSmithy" age={22} hobbies={["gaming", "shouting"]} />
        <Person
          name="Timmy"
          age={10}
          hobbies={["destruction", "world domination", "bombs"]}
        />
      </div>
    );
  }

ReactDOM.render(<App />, document.getElementById("root"));