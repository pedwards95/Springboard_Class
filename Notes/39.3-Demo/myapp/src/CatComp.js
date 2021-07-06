import React from 'react';

const CatsComp = ({cats}) => {
    return (
    <div>
      <h1>Cats</h1>
      <div>
        {cats.map( c => (
          <div key={c.name}>
            <h4>{c.name}</h4>
            <ul>
              <li>Age: {c.age}</li>
              <li>Favorite Food: {c.ffood}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
    )
}

export default CatsComp;