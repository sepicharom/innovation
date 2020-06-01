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
    console.error('err: ', err);
    throw err;
  }
};
