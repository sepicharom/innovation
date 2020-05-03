import React from 'react';
import { render } from '@testing-library/react';
import Achievements from './Achievements';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Achievements />, div);
  ReactDOM.unmountComponentAtNode(div);
});