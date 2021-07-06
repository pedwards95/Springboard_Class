import React from 'react';

const Pokecard = ({pokemon : p}) => {
    return (
        <div key={p.name}>
          <h4>{p.name}</h4>
          <ul>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}></img>
              <li>Type: {p.type}</li>
              <li>Exp: {p.base_experience}</li>
          </ul>
        </div>
    )
}

export default Pokecard;