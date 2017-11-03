export function scoreboardChange(activeTeam, scoreDelta) {
  return {
    type: 'UPDATE_SCORE',
    activeTeam,
    scoreDelta,
  }
}

export function reset() {
  return {
    type: 'RESET',
  }
}