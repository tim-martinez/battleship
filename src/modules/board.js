export class Board {
  constructor(size) {
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array(size).fill(null));
  }

  //print game in console
  print() {
    this.grid.forEach((element) => {
      const updatedElement = element.map((item) => {
        if (item === null) {
          return '[]';
        }
        return item;
      });
      console.log(updatedElement.join(''));
    });
  }
}
