/**
 * @name shuffle
 * @param {array} cards
 * @description randomly rearranges items in @cards
 * @returns {array} mutated @cards
 * NOTE: 🚨 BEWARE: MUTATES ARRAY 🚨
 */
export const shuffle = cards => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
};

/**
 * @name draw
 * @param {number} ageToDraw 
 * @param {object} cardsByAge 
 * @description determines which card would be drawn
 *  from specified age. DOES NOT actually remove card
 *  from draw pile
 * @returns card that would be drawn from specified age
 */
export const draw = (ageToDraw, cardsByAge) => {
  const pile = cardsByAge[ageToDraw];
  const drawnCard = pile[pile.length - 1];
  return drawnCard;
}

/**
 * @name determinePlayerDrawPile
 * @param {number} curPlayerAge 
 * @param {object} cardsByAge 
 * @description reduces @cardsByAge to determine which draw
 *  pile should be active for current player based on current
 *  player age and available cards within that age (or above)
 * @returns {number} age which should be active draw pile
 */
export const determinePlayerDrawPile = (curPlayerAge, cardsByAge) => {
  return Object.keys(cardsByAge).reduce((activeAge, age) => {
    // need to convert key str to number
    const curCardAge = Number(age);
    // if we've already found active age,
    // or we haven't gotten to the min age of player
    // just return active age
    if (activeAge > -1 || curCardAge < curPlayerAge) return activeAge;
    // if card and player age are same, and pile has values update active age
    if (curCardAge === curPlayerAge && cardsByAge[curCardAge].length)
      return curCardAge;
    // if card is higher than player age and pile has values, update active age
    if (curCardAge > curPlayerAge && cardsByAge[curCardAge].length)
      return curCardAge;
    // otherwise return active age
    return activeAge;
  }, -1);
};
