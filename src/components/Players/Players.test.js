import React from 'react';
import { render } from '@testing-library/react';
import Players from './Players';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Players />, div);
  ReactDOM.unmountComponentAtNode(div);
});
