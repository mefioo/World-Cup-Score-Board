type Match = {
  id: string,
  homeTeam: string,
  awayTeam: string,
  homeTeamScore: number,
  awayTeamScore: number,
  timestamp: number
}

export class ScoreBoard {
  matches: Array<Match>

  constructor() {
    this.matches = []
  }

  startMatch(homeTeam: string, awayTeam: string) {
    const id = `${homeTeam}-${awayTeam}`

    if (homeTeam === awayTeam) {
      throw new Error('Home team and away team must not be the same.')
    }

    if (this.matches.some((match) => match.id === id || match.homeTeam === homeTeam || match.awayTeam === awayTeam)) {
      throw new Error('One or more teams are already in play.')
    }
  
    this.matches.push({ id, homeTeam, awayTeam, homeTeamScore: 0, awayTeamScore: 0, timestamp: Date.now() })

    return this
  }

  private findMatchIndex(matchId: string) {
    const matchIndex = this.matches.findIndex((match) => match.id === matchId)

    return matchIndex
  }

  updateScore(homeTeamScore: number, awayTeamScore: number, matchId: string) {
    if (homeTeamScore < 0 || awayTeamScore < 0) {
      throw new Error('Score values must be a non-negative integer')
    }
    
    const matchIndex = this.findMatchIndex(matchId)

    if (matchIndex === -1) {
      throw new Error('Match with procided id does not exists.')
    }

    this.matches[matchIndex].homeTeamScore = homeTeamScore
    this.matches[matchIndex].awayTeamScore = awayTeamScore

    return this
  }

  finishMatch(matchId: string) {
    const matchIndex = this.findMatchIndex(matchId)

    if (matchIndex === -1) {
      throw new Error('Match with procided id does not exists.')
    }

    this.matches.splice(matchIndex, 1)

    return this
  }

  getSummary() {
    return this.matches.sort((a: Match, b: Match) => {
      const totalScoreA = a.homeTeamScore + a.awayTeamScore
      const totalScoreB = b.homeTeamScore + b.awayTeamScore

      if (totalScoreA === totalScoreB) {
        return b.timestamp = a.timestamp
      }

      return totalScoreB - totalScoreA
    })
  }
}