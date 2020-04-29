const Cards = require('./cards/index');

const shuffle = cards => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
};

const sortCards = cards => {
  const baseSort = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
  };
  return cards.reduce((sorted, card) => {
    sorted[card.age].push(card);
    return sorted;
  }, baseSort);
};

// sort cards
const Deck = sortCards(Cards);
const Ages = Object.keys(Deck);

const draw = (age) => Deck[age].pop();

// shuffle each set of cards
Ages.forEach((age) => {
  shuffle(Deck[age]);
});

// select achievements
const Achievements = Ages.map(age => draw(age));
console.log('Achievements: ', Achievements.map(card => card.name));

class Player {
  constructor(name, position) {
    this.name = name;
    this.position = position;
    this.hand = [];
    this.resources = {
      crowns: 0,
      leaves: 0,
      castles: 0,
      factories: 0,
      lightbulbs: 0,
      timepieces: 0,
    };
    this.scorePile = [];
    this.score = 0;
    this.achievements = [];
    this.numAchievements = 0;
    this.board = {
      red: [],
      blue: [],
      green: [],
      purple: [],
      yellow: [],
    };
  }

  draw(deck, age) {
    return deck[age].pop();
  }

  scoreCard(card) {
    this.scorePile.push(card);
    this.score += card.age;
  }

  meld(newTopCard) {
    const cardStack = this.board[newTopCard.color];
    if (cardStack.length) {
      const currentTopCard = cardStack[cardStack.length - 1];
      this.removeResources(currentTopCard);
    }
    this.addResources(newTopCard);
  }

  addResources(card) {
    Object.keys(this.resources).forEach(resource => {
      if (card[`num_${resource}`]) this.resources[resource] += card[`num_${resource}`];
    });
  }

  removeResources(card) {
    Object.keys(this.resources).forEach(resource => {
      if (card[`num_${resource}`]) this.resources[resource] -= card[`num_${resource}`];
    });
  }

  drawAndScore(deck, age) {
    this.scoreCard(this.draw(deck, age));
  }

  drawAndMeld(deck, age) {
    this.meld(this.draw(deck, age));
  }
}