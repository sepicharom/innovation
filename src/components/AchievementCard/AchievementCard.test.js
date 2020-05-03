import React from 'react';
import { render } from '@testing-library/react';
import AchievementCard from './AchievementCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AchievementCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});