import React from 'react';
import './Card.css';

const Card = ({
  name,
  age,
  color,
  dogma_resource,
  num_castles,
  num_crowns,
  num_leaves,
  num_lightbulbs,
  num_factories,
  num_timepieces,
}) => {
  return (
    <div>
      <h3>{name}</h3>
    </div>
  );
}

export default Card;
