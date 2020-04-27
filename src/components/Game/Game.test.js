import React from 'react';
import { render } from '@testing-library/react';
import Game from './Game';

test('renders room name', () => {
  const { getByText } = render(<Game />);
  const roomName = getByText(/Room: /i);
  expect(roomName).toBeInTheDocument();
});
