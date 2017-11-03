import React, { Component } from 'react';
import { connect } from 'react-redux'
import { scoreboardChange, reset } from './actions';
import './App.css';
// import Board from './Board.js';

class App extends Component {
  constructor() {
    super();
    this.submitScore = this.submitScore.bind(this);
    this.resetScoreboard = this.resetScoreboard.bind(this);
  }

  resetScoreboard(e) {
    this.props.dispatch(reset())
  }

  submitScore(e) {
    e.preventDefault();
    let value = parseInt(this.score.value);
    this.score.value = ''; // set input back to empty
    let activeTeam = document.querySelector('input[type=radio]:checked').value;
    if (value) {
      this.props.dispatch(scoreboardChange(activeTeam, value));
    }
  }

  render() {
    return (
      <div className="App">
        <div className="scoreboard-cont">
          <div className="scores">
            <div className="home-score">
              <h2>Home</h2>
              <p className="score hscore">{this.props.homeScore}</p>
            </div>
            <div className="away-score">
              <h2>Away</h2>
              <p className="score ascore">{this.props.awayScore}</p>
            </div>
          </div>
          <div className="team-select">
            <div className="team-radio-form">
              <div className="home-radio">
                <input type="radio" name="team" defaultChecked={true} value="home" className="home-select" />
                <label className="radio-team" htmlFor="home">Home</label>
              </div>
              <div className="away-radio">
                <input type="radio" name="team" value="away" className="away-select" />
                <label className="radio-team" htmlFor="away">Away</label>
              </div>
            </div>
          </div>
          <form className="score-submit" onSubmit={this.submitScore}>
            <input className="input" type="text" placeholder="Enter score" ref={ (input) => this.score = input} />
            <input className="submit" type="submit" />
          </form>
          <button className="reset" onClick={this.resetScoreboard} >Reset Board</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  homeScore: state.homeScore,
  awayScore: state.awayScore,
  activeTeam: state.activeTeam,
  scoreDelta: state.scoreDelta,
  input: state.input,
});

export default connect(
  mapStateToProps,
)(App);
