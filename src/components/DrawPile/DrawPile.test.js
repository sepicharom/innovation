import React from 'react';
import { render } from '@testing-library/react';
import DrawPile from './DrawPile';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DrawPile />, div);
  ReactDOM.unmountComponentAtNode(div);
});