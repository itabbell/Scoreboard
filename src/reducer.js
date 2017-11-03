export default (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SCORE': {
      let copyHomeScore = state.homeScore;
      let copyAwayScore = state.awayScore;
      action.activeTeam === 'home' ? copyHomeScore += action.scoreDelta : copyAwayScore += action.scoreDelta;
      return {
        ...state,
        activeTeam: action.activeTeam,
        scoreDelta: action.scoreDelta,
        homeScore: copyHomeScore,
        awayScore: copyAwayScore,
      }
    }
    case 'RESET': {
      return {
        homeScore: 0,
        awayScore: 0,
        activeTeam: 'home',
        scoreDelta: 0,
      }
    }
    default:
      return state;
  }
}