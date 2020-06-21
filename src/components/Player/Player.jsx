import React from 'react';
import PropTypes from 'prop-types';

import Collapse from '../../libs/ui/Collapse/Collapse';

import styled from 'styled-components/macro';

const StyledHand = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
`;

const Player = ({ name, hand, isCurrentPlayer }) => {
  return (
    <div>
      <h2>{name}</h2>
      <Collapse
        header="Hand"
        content={<StyledHand>{hand}</StyledHand>}
        shouldDefaultOpen={isCurrentPlayer}
      />
    </div>
  );
};

Player.propTypes = {
  name: PropTypes.string.isRequired,
  hand: PropTypes.arrayOf(PropTypes.object).isRequired,
  isCurrentPlayer: PropTypes.bool.isRequired,
};

export default Player;
