import Firebase from './firebase';

export const getCards = async () => {
  try {
    const snapshot = await Firebase.db.collection('cards').get();
    if (!snapshot || !snapshot.docs || !snapshot.docs.length) {
      throw snapshot;
    }
    const cards = snapshot.docs.map(Firebase.processDoc);
    return cards;
  } catch (err) {
    console.error('getCards err: ', err);
    throw err;
  }
};

export const getGame = async (gameId) => {
  try {
    const gameDoc = await Firebase.db.collection('games').doc(gameId).get();
    if (!gameDoc || !gameDoc.exists) throw gameDoc;
    const gameData = Firebase.processDoc(gameDoc);
    return gameData;
  } catch (err) {
    console.error('getGame err: ', err);
    throw err;
  }
};

export const createGame = async (playersByUsername) => {
  try {
    const createdGame = await Firebase.db.collection('games').add({
      playersByUsername,
    });
    if (!createdGame.id) throw createdGame;
    return createdGame;
  } catch (err) {
    console.error('createGame err: ', err);
    throw err;
  }
};

/**
 * @name saveGame
 * @param {string} gameId
 * @param {object} gameData
 * @param {boolean} merge
 *   @see https://firebase.google.com/docs/firestore/manage-data/add-data#set_a_document
 * @description updates an exisitng game in the db
 *  (or creates if gameId doesn't currently exist)
 * @returns {Promise}
 */
export const saveGame = async (gameId, gameData, merge = true) => {
  return Firebase.db
    .collection('games')
    .doc(gameId)
    .set({ ...gameData }, { merge });
};
