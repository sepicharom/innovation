import Firebase from './firebase';

export const getCards = async () => {
  try {
    const snapshot = await Firebase.db.collection('cards').get();
    if (!snapshot || !snapshot.docs || !snapshot.docs.length) {
      throw snapshot;
    }
    const cards = snapshot.docs.map(Firebase.processDoc);
    console.log('cards: ', cards);
    return cards;
  } catch (err) {
    console.error('getCards err: ', err);
    throw err;
  }
};

export const createGame = async (players) => {
  try {
    const createdGame = await Firebase.db.collection('games').add({
      players: [...players],
    });
    if (!createdGame.id) throw createdGame;
    return createdGame;
  } catch (err) {
    console.error('createGame err: ', err);
    throw err;
  }
};
