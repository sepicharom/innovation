import React from 'react';
import { render } from '@testing-library/react';
import Player from './Player';

test('renders player name', () => {
  const { getByText } = render(<Player name="playerName" />);
  const playerName = getByText(/playerName/i);
  expect(playerName).toBeInTheDocument();
});
