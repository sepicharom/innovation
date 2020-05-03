import React from 'react';

const DrawPile = ({
  age,
  draw,
  numCardsInPile,
}) => {
  if (!numCardsInPile || numCardsInPile < 1) {
    return (<div>No more {age} age.</div>);
  }
  return (
    <div onClick={() => draw(age)}>
      <h3>{age}</h3>
    </div>
  );
}

export default DrawPile;
