import React from 'react';
import {add as sum, multiply} from './helpers.js';
import cats, {meow} from './cats.js';
import logo from './logo.svg';
import './App.css';
import CatsComp from "./CatComp"
import Greeting from "./Greeting"

function App() {
  console.log(multiply(4,9))
  console.log(sum(4,9))
  console.log(cats);
  console.log(meow());
  return (
    <div>
        <Greeting />
        <CatsComp cats={cats}/>
    </div>
  );
}

export default App;
