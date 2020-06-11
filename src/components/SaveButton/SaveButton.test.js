import React from 'react';
import { render } from '@testing-library/react';
import SaveButton from './SaveButton';

test('renders room name', () => {
  const { getByText } = render(<SaveButton />);
  const roomName = getByText(/Room: /i);
  expect(roomName).toBeInTheDocument();
});
