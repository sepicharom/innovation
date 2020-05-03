import React from 'react';
import { render } from '@testing-library/react';
import Resource from './Resource';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Resource />, div);
  ReactDOM.unmountComponentAtNode(div);
});

