import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  board: string[][] = [];
  currentPlayer: string = 'X';
  winner: string = '';

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.currentPlayer = 'X';
    this.winner = '';
  }

  makeMove(row: number, col: number) {
    if (!this.board[row][col] && !this.winner) {
      this.board[row][col] = this.currentPlayer;

      if (this.checkWinner(row, col)) {
        this.winner = this.currentPlayer;
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  checkWinner(row: number, col: number): boolean {
    // Check current row
    if (this.board[row].every(cell => cell === this.currentPlayer)) {
      return true;
    }

    // Check current column
    if (this.board.every(r => r[col] === this.currentPlayer)) {
      return true;
    }

    // Check primary diagonal (top-left to bottom-right)
    if (row === col && this.board[0][0] === this.currentPlayer && this.board[1][1] === this.currentPlayer && this.board[2][2] === this.currentPlayer) {
      return true;
    }

    // Check anti-diagonal (top-right to bottom-left)
    if (row + col === 2 && this.board[0][2] === this.currentPlayer && this.board[1][1] === this.currentPlayer && this.board[2][0] === this.currentPlayer) {
      return true;
    }

    return false;
  }
}
