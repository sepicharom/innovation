import React, {  } from 'react';
import './Game.css';

const roomNames = [
  'a',
  'b',
  'c',
];
const getRandomInteger = (min, max) => {
  const randomInt = Math.floor(Math.random() * (max - min + 1) + min);
  return randomInt;
};
const ROOM_NAME = roomNames[getRandomInteger(0, roomNames.length - 1)];


const Game = () => {
  return (
    <div>
      <h1>Room Name: {ROOM_NAME}</h1>
    </div>
  );
}

export default Game;
