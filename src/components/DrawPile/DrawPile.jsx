import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../libs/ui/Button/Button';

const DrawPile = ({
  age,
  draw,
  disabled,
  numCardsInPile,
}) => {
  if (!numCardsInPile || numCardsInPile < 1) {
    return (<div>No more {age} age.</div>);
  }
  return (
    <Button theme="transparent" disabled={disabled} onClick={() => draw(age)}>
      <h3>{age}</h3>
    </Button>
  );
}

DrawPile.propTypes = {
  age: PropTypes.number.isRequired,
  draw: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  numCardsInPile: PropTypes.number.isRequired,
};

export default DrawPile;
