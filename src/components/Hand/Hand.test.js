import React from 'react';
import { render } from '@testing-library/react';
import Hand from './Hand';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Hand />, div);
  ReactDOM.unmountComponentAtNode(div);
});
