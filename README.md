# Project Title

Live Football World Cup Scoreboard

## Description

Live Football World Cup Scoreboard library that shows all the ongoing matches and their scores.

## Getting Started

### Usage

```js
import { ScoreBoard } from "../scoreboard.js"

const scoreboard = new ScoreBoard()
```

### Test

```
npm test
```

### API Reference
```
startMatch(homeTeam: string, awayTeam: string) => ScoreBoard
```
Creates new match and adds it to the scoreboard with the initial scores set to 0.

```js
scoreboard.startMatch('Poland', 'Slovakia');
```

```
updateScore(homeTeamScore: number, awayTeamScore: number, matchId: string) => ScoreBoard
```
Updates the match score based on provided score values.

```js
scoreboard.updateScore(0, 2, 'Poland-Slovakia');
```


```
finishMatch(matchId: string) => ScoreBoard
```
  Finishes previously started match and removes it from the scoreboard matches.

```js
scoreboard.finishMatch('Poland-Slovakia');
```

```
getSummary(homeTeam: string, awayTeam: string) => Array<Match>
```
Getter for currently available matches. It returns the matches ordered by their total score at first, date started at second.

```js
scoreboard.getSummary();
```

## Authors

Maciej Adamski

## License

This project is licensed under the MIT License
