import React from 'react';
import './Player.css';

const Player = ({
  name,
}) => {
  return (
    <div>
      <h3>{name}</h3>
    </div>
  );
}

export default Player;
