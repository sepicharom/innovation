import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';

test('renders card name', () => {
  const { getByText } = render(<Card name="testCard" />);
  const cardName = getByText(/testCard/i);
  expect(cardName).toBeInTheDocument();
});
