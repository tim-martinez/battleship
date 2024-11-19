function displayBoard(player) {
  const player1 = document.querySelector('.player1.board');

  // Clear out existing children
  while (player1.firstChild) {
    player1.removeChild(player1.firstChild);
  }

  player.board.grid.forEach((element, y) => {
    element.forEach((item, x) => {
      const cell = document.createElement('div');
      cell.dataset.x = x;
      cell.dataset.y = y;

      cell.classList.add('cell');
      displayShips(player.board, cell, x, y);

      player1.append(cell);
    });
  });
}

function displayShips(board, cell, x, y) {
  if (board.grid[y][x] !== null) {
    cell.classList.add('ship');
  }
}

function attack(player1, player2) {
  const player2Board = document.querySelector('.player2.board');
  const player1Board = document.querySelector('.player1.board');
  humanAttack(player2, player2Board, player1);
}

function humanAttack(player, playerBoard, otherPlayer) {
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

    computerAttack(otherPlayer, otherPlayer.board);
  });
}

function computerAttack(player, board) {
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);
  player.board.attack(x, y);

  const cells = document.querySelectorAll('.player1.board .cell');
  cells.forEach((cell) => {
    if (cell.childElementCount === 0) {
      const missle = document.createElement('div');
      missle.classList.add('missle');

      const x = Number(cell.dataset.x);
      const y = Number(cell.dataset.y);

      if (
        player.board.hitXY.some((element) => element[0] == x && element[1] == y)
      ) {
        missle.style.backgroundColor = 'red';
        cell.append(missle);
      } else if (
        player.board.missedXY.some(
          (element) => element[0] == x && element[1] == y,
        )
      ) {
        cell.append(missle);
      }
    }
  });
}

function shipBtn() {
  document.addEventListener('DOMContentLoaded', () => {
    // Select all buttons with the class 'ship-btn'
    const buttons = document.querySelectorAll('.ship-btn');

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        buttons.forEach((button) => {
          button.classList.remove('selected');
        });
        button.classList.toggle('selected');
      });
    });
  });
}

function shipBtnRemoveSelected() {
  const buttons = document.querySelectorAll('.ship-btn');

  buttons.forEach((button) => {
    button.classList.remove('selected');
  });
}

function placeShipGUI(player) {
  const btns = document.querySelectorAll('.ship-btn');

  btns.forEach((btn) => {
    let currentLength = 0; // Track the current ship's length

    btn.addEventListener('click', () => {
      const selectedShip = btn.value;
      const cells = document.querySelectorAll('.cell');

      // Check if the selected ship is on the board.grid
      let shipOnBoard = false;
      for (let row = 0; row < player.board.grid.length; row++) {
        for (let col = 0; col < player.board.grid[row].length; col++) {
          if (
            player.board.grid[row][col] &&
            player.board.grid[row][col].name === selectedShip
          ) {
            shipOnBoard = true;
            break;
          }
        }
        if (shipOnBoard) break;
      }

      // If the ship is on the board, remove it
      if (shipOnBoard) {
        player.board.removeShip(player.ships[selectedShip]);
        console.log(player.board.grid);
        displayBoard(player); // Re-render the board to update the display
      }

      // Re-select cells after re-rendering the board
      const updatedCells = document.querySelectorAll('.cell');
      highlightCells(updatedCells, selectedShip, currentLength, player);
    });
  });
}

function highlightCells(cells, selectedShip, currentLength, player) {
  currentLength = player.ships[selectedShip].length; // Update current length
  cells.forEach((cell) => {
    let nextY = null;

    cell.addEventListener('mouseenter', (event) => {
      const x = event.target.dataset.x;
      const y = event.target.dataset.y;

      // Reset all cells to ensure no leftover highlights
      // cells.forEach((cell) => cell.classList.remove('ship'));

      cell.classList.add('ship-select-temp');
      nextY = Number(y);

      for (let i = 0; i < currentLength - 1; i++) {
        nextY++;
        const nextCell = document.querySelector(
          `[data-x='${x}'][data-y='${nextY}']`,
        );
        if (nextCell) {
          nextCell.classList.add('ship-select-temp');
        }
      }
    });

    cell.addEventListener('mouseleave', (event) => {
      const x = event.target.dataset.x;
      const y = event.target.dataset.y;

      // Reset all cells to black when leaving the current cell
      cells.forEach((cell) => cell.classList.remove('ship-select-temp'));

      // Reset `nextY` to ensure no leftover state
      nextY = null;
    });

    //add ship to board class
    cell.addEventListener('click', (event) => {
      const x = Number(event.target.dataset.x);
      const y = Number(event.target.dataset.y);

      player.board.placeShip(player.ships[selectedShip], x, y);
      displayBoard(player);
      shipBtnRemoveSelected();
    });
  });
}

shipBtn();

export { displayBoard, attack, computerAttack, placeShipGUI };
