import React from 'react';
import ReactDOM from 'react-dom';
import FieldError from './FieldError';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FieldError>Error Message</FieldError>, div);
  ReactDOM.unmountComponentAtNode(div);
});
