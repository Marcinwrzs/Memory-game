import { makeAutoObservable } from "mobx";

class MemoryGameStore {
  cards: { id: number; image: string; label: string; hidden: boolean }[] = [];
  flippedCards: number[] = [];
  matchedCards: number[] = [];
  moves = 0;

  constructor() {
    makeAutoObservable(this);
  }

  initGame = (difficulty: "easy" | "medium" | "hard") => {
    let pairsCount =
      difficulty === "easy" ? 6 : difficulty === "medium" ? 8 : 10;

    const newCards = [];
    for (let i = 1; i <= pairsCount; i++) {
      const label = `Label-${i}`;
      const image = `image-${i}.jpg`;
      newCards.push({ id: i * 2 - 1, image, label, hidden: true });
      newCards.push({ id: i * 2, image, label, hidden: true });
    }

    this.cards = this.shuffleArray(newCards);
    this.flippedCards = [];
    this.matchedCards = [];
    this.moves = 0;
  };

  flipCard = (id: number) => {
    const card = this.cards.find((c) => c.id === id);
    if (!card || !card.hidden || this.flippedCards.length === 2) return;

    card.hidden = false;
    this.flippedCards.push(id);

    if (this.flippedCards.length === 2) {
      this.moves += 1;

      if (this.isFinalMove()) {
        this.checkMatch();
      } else {
        setTimeout(() => this.checkMatch(), 1000);
      }
    }
  };

  checkMatch = () => {
    const [first, second] = this.flippedCards.map(
      (id) => this.cards.find((c) => c.id === id)!
    );

    if (first.label === second.label) {
      this.matchedCards.push(first.id, second.id);
    } else {
      first.hidden = true;
      second.hidden = true;
    }

    this.flippedCards = [];
  };

  isFinalMove = () => {
    const remainingPairs = this.cards.length / 2 - this.matchedCards.length / 2;
    return remainingPairs === 1;
  };

  resetMoves = () => {
    this.moves = 0;
  };

  shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  get isGameOver() {
    return this.matchedCards.length === this.cards.length;
  }
}

export const memoryGameStore = new MemoryGameStore();
