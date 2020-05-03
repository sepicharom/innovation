import React from 'react';
import { render } from '@testing-library/react';
import CardFront from './CardFront';

test('renders card name', () => {
  const { getByText } = render(<CardFront name="testCard" />);
  const cardName = getByText(/testCard/i);
  expect(cardName).toBeInTheDocument();
});
