export class Ship {
  constructor(length, hits, status) {
    this.length = length;
    this.hits = 0;
    this.status = 'no damage';
  }

  hit() {
    this.hits++;

    this.isSunk();
  }

  isSunk() {
    if (this.length === this.hits) {
      this.status = 'sunk';
    } else {
      const remainingHits = this.length - this.hits;
      this.status = `${remainingHits} hits remaining`;
    }
  }
}
