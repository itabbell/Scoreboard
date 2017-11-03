import React, { Component } from 'react';
import { cellClick as set, setWinner as winner } from './actions';

class Board extends Component {
    constructor(props) {
        super(props);
        this.renderBoardCells = this.renderBoardCells.bind(this);
        this.cellClick = this.cellClick.bind(this);
        this.checkWinner = this.checkWinner.bind(this);
    }

    cellClick(e) {
        const index = e.target.dataset.index;
        if (this.props.board[index] === '' && this.props.is_winner === false) {
            this.props.dispatch(set(this.props.symbol, index));
        }
    }

    componentDidUpdate() { // fixes issue with the lag between the store and component render
        if (!this.props.is_winner) {
            this.checkWinner();
        }
    }

    checkWinner() {
        let winIndex;
        let winPosition = [];
        let board = this.props.board;
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        let logic = (a, b, c) => {
            return !!(a + b + c).match(/^(XXX|OOO)$/gi); // !! converts to a boolean if a+b+c === xxx or ooo
        }

        // check gameboard for a match in wins array
        for (let i = 0; i < wins.length; i++) {
            if ((logic(board[wins[i][0]], board[wins[i][1]], board[wins[i][2]])) ) {
                // push the index values for the winning positions
                for (let j = 0; j < 3; j++) {
                    winPosition.push(wins[i][j]);
                }
                this.props.dispatch(winner(winPosition));
                return;
            }
        }

        console.log(this.props.is_winner);
    }

    renderBoardCells() {
        const board = this.props.board;
        let winPosition = this.props.winPosition;

        // sets css on win
        let test = document.querySelectorAll('.cells');
        if (this.props.is_winner) {
            test[winPosition[0]].setAttribute('class', 'cells win');
            test[winPosition[1]].setAttribute('class', 'cells win');
            test[winPosition[2]].setAttribute('class', 'cells win');
        }

        return board.map((value, index) => {
            return (
                <div className='cells' key={index} data-index={index} onClick={ this.cellClick }>
                    {value}
                </div>
            );
        });
    }

    render() {
        return (
            <div className='board-container'>
                {this.renderBoardCells()}
            </div>
        );
    }
}

export default Board;