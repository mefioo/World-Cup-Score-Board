describe('Scoreboard', () => {
  let scoreboard = null

  beforeEach(() => {
    scoreboard = new ScoreBoard()
  })

  test('creates an instance without any matches', () => {
    expect(scoreboard.getSummary()).toEqual([])
  })

  test('starts a new match', () => {
    scoreboard.startMatch('Brasil', 'Poland')

    const summary = scoreboard.getSummary()

    expect(summary).toHaveLength(1)
    expect(summary[0].homeTeam).toBe('Brasil')
    expect(summary[0].awayTeam).toBe('Poland')
    expect(summary[0].homeTeamScore).toBe(0)
    expect(summary[0].awayTeamScore).toBe(0)
  })

  test('throws an error when trying to start already started match', () => {
    scoreboard.startMatch('Brasil', 'Poland')

    expect(scoreboard.startMatch('Brasil', 'Poland')).toThrow(Error)
  })

  test('throws an error when trying to start the match for the already busy team', () => {
    scoreboard.startMatch('Brasil', 'Poland')
  
    expect(scoreboard.startMatch('Germany', 'Poland')).toThrow(Error)
  })

  test('throws an error when trying to start the match between the same teams', () => {
    expect(scoreboard.startMatch('Poland', 'Poland')).toThrow(Error)
  })
  
  test('updates the score properly', () => {
    scoreboard.startMatch('Brasil', 'Poland')
    scoreboard.updateScore(0, 1, 'Brasil-Poland')

    const summary = scoreboard.getSummary()

    expect(summary[0].homeTeamScore).toBe(0)
    expect(summary[0].awayTeamScore).toBe(1)
  })
  
  test('throws an error when trying to update the score with negative value', () => {
    scoreboard.startMatch('Brasil', 'Poland')

    expect(scoreboard.updateScore(0, -1, 'Brasil-Poland')).toThrow(Error)
  })
  
  test('finishes the match properly', () => {
    scoreboard.startMatch('Brasil', 'Poland')
    scoreboard.finishMatch('Brasil-Poland')

    const summary = scoreboard.getSummary()

    expect(summary).toHaveLength(0)
  })
  
  test('finishes only the selected match', () => {
    scoreboard.startMatch('Brasil', 'Poland')
    scoreboard.startMatch('Germany', 'England')
    scoreboard.startMatch('Mexico', 'Cuba')
    scoreboard.finishMatch('Brasil-Poland')

    const summary = scoreboard.getSummary()

    expect(summary).toHaveLength(2)
    expect(summary[0].id).toBe('Germany-England')
    expect(summary[1].id).toBe('Mexico-Cuba')
  })
  
  test('throws an error when trying to finish the unstarted match', () => {
    scoreboard.startMatch('Brasil', 'Poland')

    expect(scoreboard.finishMatch('Spain-Poland')).toThrow(Error)
  })

  test('returns properly ordered summary when all scores are the same', () => {
    scoreboard.startMatch('Brasil', 'Poland')
    scoreboard.startMatch('Germany', 'England')
    scoreboard.startMatch('Mexico', 'Cuba')

    const summary = scoreboard.getSummary()

    expect(summary).toHaveLength(3)
    expect(summary[0].id).toBe('Brasil-Poland')
    expect(summary[1].id).toBe('Germany-England')
    expect(summary[2].id).toBe('Mexico-Cuba')
  })

  test('returns properly ordered summary when all scores are the same', () => {
    jest.useFakeTimers();
  
    jest.setSystemTime(new Date("2025-03-15T12:00:00Z"));
    scoreboard.startMatch('Brasil', 'Poland')

    jest.setSystemTime(new Date("2025-03-15T12:15:00Z"));
    scoreboard.startMatch('Germany', 'England')
    
    jest.setSystemTime(new Date("2025-03-15T12:30:00Z"));
    scoreboard.startMatch('Mexico', 'Cuba')

    const summary = scoreboard.getSummary()

    expect(summary).toHaveLength(3)
    expect(summary[0].id).toBe('Brasil-Poland')
    expect(summary[1].id).toBe('Germany-England')
    expect(summary[2].id).toBe('Mexico-Cuba')
  })

  test('returns properly ordered summary when the later match has greater total score and two earlier matches have the same total score', () => {
    jest.useFakeTimers();
  
    jest.setSystemTime(new Date("2025-03-15T12:00:00Z"));
    scoreboard.startMatch('Brasil', 'Poland')

    jest.setSystemTime(new Date("2025-03-15T12:15:00Z"));
    scoreboard.startMatch('Mexico', 'Cuba')

    jest.setSystemTime(new Date("2025-03-15T12:30:00Z"));
    scoreboard.startMatch('Germany', 'England')

    scoreboard.updateScore(2, 1, 'Germany-England')

    const summary = scoreboard.getSummary()

    expect(summary).toHaveLength(3)
    expect(summary[0].id).toBe('Germany-England')
    expect(summary[1].id).toBe('Brasil-Poland')
    expect(summary[2].id).toBe('Mexico-Cuba')
  })

  test('returns properly ordered summary when the later match has greater total score', () => {
    jest.useFakeTimers();
  
    jest.setSystemTime(new Date("2025-03-15T12:00:00Z"));
    scoreboard.startMatch('Brasil', 'Poland')

    jest.setSystemTime(new Date("2025-03-15T12:15:00Z"));
    scoreboard.startMatch('Germany', 'England')
    scoreboard.updateScore(1, 1, 'Brasil-Poland')
    scoreboard.updateScore(2, 1, 'Germany-England')

    const summary = scoreboard.getSummary()

    expect(summary).toHaveLength(3)
    expect(summary[0].id).toBe('Germany-England')
    expect(summary[1].id).toBe('Brasil-Poland')
  })
})