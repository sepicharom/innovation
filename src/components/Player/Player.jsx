import React from 'react';

import styled from 'styled-components/macro';

const StyledHand = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
`;

const Player = ({ name, hand, firstPlayer }) => {
  return (
    <div>
      <h2>{name}</h2>
      <StyledHand>{hand}</StyledHand>
    </div>
  );
};

export default Player;
