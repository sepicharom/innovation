export const draw = (ageToDraw, cardsByAge) => {
  const pile = cardsByAge[ageToDraw];
  const drawnCard = pile[pile.length - 1];
  return drawnCard;
}