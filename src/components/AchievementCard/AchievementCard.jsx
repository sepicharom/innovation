import React from 'react';

const AchievementCard = ({
  cost,
  name,
  achieve,
  claimed,
  special,
}) => {
  if (claimed) {
    return (<div>{name}{!special ? ' age' : ''} achievement has been claimed.</div>);
  }
  return (
    <div onClick={() => achieve(name, special)}>
      <h3>{name}{!special ? ' Age' : ''}</h3>
      {!special && <p>Score Required: {cost}</p>}
    </div>
  );
}

export default AchievementCard;
