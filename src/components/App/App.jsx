/**
 * @module  App
 * @author  samanthasalley
 * @description Top level component.
 *              Gets hooked into our html in index.js.
 *              Control point for top level routing.
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import * as deckActions from '../../actions/deckActions';
import { getCards } from '../../utils/firebaseFunctions';

import Game from '../Game/Game';
import Start from '../Start/Start';
import PageWrapper from '../../libs/ui/PageWrapper/PageWrapper';

const mapDispatchToProps = (dispatch) => ({
  setCards: (cards) => dispatch(deckActions.setCards(cards)),
});

const App = ({ setCards }) => {
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cards = await getCards();
        const cardIds = cards.map((card) => card.id);
        const cardsById = cards.reduce((byId, card) => {
          byId[card.id] = card;
          return byId;
        }, {});
        setCards({ cardIds, cardsById });
      } catch (err) {
        console.error('fetchCards err:', err);
      }
    };
    fetchCards();
  }, [setCards]);
  return (
    <PageWrapper>
      <Switch>
        <Route exact path="/" component={Start} />
        <Route exact path="/room/:gameId" component={Game} />
      </Switch>
    </PageWrapper>
  );
};

export default connect(null, mapDispatchToProps)(App);
