/**
 * @module  App
 * @author  samanthasalley
 * @description Top level component.
 *              Gets hooked into our html in index.js.
 *              Control point for top level routing.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Game from '../Game/Game';
import Start from '../Start/Start';
import PageWrapper from '../../libs/ui/PageWrapper/PageWrapper';

const App = () => {
  return (
    <PageWrapper>
      <Switch>
        <Route exact path="/" component={Start} />
        <Route exact path="/room/:gameId" component={Game} />
      </Switch>
    </PageWrapper>
  );
};

export default App;
