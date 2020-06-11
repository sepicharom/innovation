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

export const draw = (ageToDraw, cardsByAge) => {
  const pile = cardsByAge[ageToDraw];
  const drawnCard = pile[pile.length - 1];
  return drawnCard;
}
