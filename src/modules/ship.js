export class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = 0;
    this.status = 'no damage';
  }

  hit() {
    if (this.isSunk() == 'sunk') {
      return;
    }
    this.hits++;
    this.isSunk();
  }

  isSunk() {
    if (this.hits >= this.length) {
      this.status = 'sunk';
      return 'sunk';
    } else {
      const remainingHits = this.length - this.hits;
      this.status = `${remainingHits} hits remaining`;
    }
  }
}
