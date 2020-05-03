import React from 'react';
import { render } from '@testing-library/react';
import Deck from './Deck';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Deck />, div);
  ReactDOM.unmountComponentAtNode(div);
});