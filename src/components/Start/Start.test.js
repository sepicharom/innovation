import React from 'react';
import { render } from '@testing-library/react';
import Start from './Start';

test('renders room name', () => {
  const { getByText } = render(<Start />);
  const roomName = getByText(/Room: /i);
  expect(roomName).toBeInTheDocument();
});
