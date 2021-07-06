import React from 'react';
import './App.css';
import Clicker from "./Clicker";
import ButtonGroup from "./ButtonGroup";
import Counter from "./Counter";
import NumberGame from "./NumberGame";

function App() {
    return (
      <div className="App">
        <Counter />
        <Clicker />
        <Clicker />
        <Clicker />
        <ButtonGroup />
        <NumberGame />
      </div>
    );
  }

export default App;
