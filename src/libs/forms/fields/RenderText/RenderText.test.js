import React from 'react';
import ReactDOM from 'react-dom';
import RenderText from './RenderText';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RenderText />, div);
  ReactDOM.unmountComponentAtNode(div);
});
