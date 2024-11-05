function displayBoards(board1, ships, board2, ships2) {
  const player1 = document.querySelector('.player1.board');
  const player2 = document.querySelector('.player2.board');

  board1.grid.forEach((element, y) => {
    element.forEach((item, x) => {
      const cell = document.createElement('div');
      cell.dataset.cell = `${x}-${y}`;

      cell.classList.add('cell');
      if (displayShips(ships, x, y)) {
        cell.dataset.cell = `${x}-${y}`;
        cell.style.border = '1px solid white';
        // cell.style.backgroundColor = 'grey';
      }

      player1.append(cell);
    });
  });

  board2.grid.forEach((element, y) => {
    element.forEach((item, x) => {
      const cell = document.createElement('div');
      cell.dataset.x = x;
      cell.dataset.y = y;

      cell.classList.add('cell');
      // if (displayShips(ships2, x, y)) {
      //   cell.style.border = '1px solid red';
      // }
      player2.append(cell);
    });
  });
}

function displayShips(ships, x, y) {
  ships.forEach((item) => {});

  if (ships.some((element) => element[0] === x && element[1] === y)) {
    return true;
  }

  return false;
}

function attack(player) {
  const playerBoard = document.querySelector('.player2.board');

  playerBoard.addEventListener('click', (event) => {
    if (
      event.target.classList.contains('cell') &&
      event.target.childElementCount === 0
    ) {
      const missle = document.createElement('div');
      missle.classList.add('missle');

      const x = Number(event.target.dataset.x);
      const y = Number(event.target.dataset.y);

      if (
        player.board.shipsXY.some(
          (element) => element[0] == x && element[1] == y,
        )
      ) {
        missle.style.backgroundColor = 'red';
      }

      //attack the board class
      player.board.attack(x, y);

      const ship = player.board.grid[y][x];

      if (ship) {
        console.log('hit');
        if (ship.status === 'sunk') {
          console.log(`sunk you ${ship.name}`);
        }
      } else {
        console.log('miss');
      }

      if (player.board.ships === 0) {
        console.log(`all ${player.name}'s ships sunk`);
      }

      event.target.append(missle);
    }
  });
}

export { displayBoards, attack };
