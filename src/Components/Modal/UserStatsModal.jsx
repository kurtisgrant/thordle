import React from 'react';
import styled from 'styled-components';

import Modal from './Modal';

const StyledStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .stats-row {
    display: flex;
    width: 100%;
    max-width: 400px;
    justify-content: space-around;
  }
  .stats-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 50px;
    .stat {
      font-size: 2rem;
    }
    .stat-label {
      text-align: center;
    }
  }
  .guess-distributions {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .guess-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    .guess-number {
      text-align: center;
      width: 20px;
    }
    progress {
      border-radius: 0;
    }
    progress::-webkit-progress-bar {
      background-color: #00000000;
      border-radius: 2px;
    }
    progress::-webkit-progress-value {
      background-color: #538d4e;
      border-radius: 2px; 
}
    .guess-number-data {
      text-align: center;
      width: 20px;
    }
  }
`;

function UserStatsModal({ handleClose, userStats }) {

  const gamesPlayed = userStats.gamesLost + userStats.gamesWon;
  const winPercentage = gamesPlayed ? Math.round(userStats.gamesWon / gamesPlayed * 100) : 0;

  const highestDistribution = Math.max(...userStats.guessDistribution);
  const distributionPercentages = userStats.guessDistribution.map(d => Math.round(d / highestDistribution * 100));

  return (
    <Modal handleClose={handleClose}>
      <StyledStats>
        <h2>Statistics</h2>
        <div className="stats-row">
          <div className="stats-group">
            <span className="stat">{gamesPlayed}</span>
            <span className="stat-label">played</span>
          </div>
          <div className="stats-group">
            <span className="stat">{winPercentage}</span>
            <span className="stat-label">win %</span>
          </div>
          <div className="stats-group">
            <span className="stat">{userStats.currentStreak}</span>
            <span className="stat-label">current streak</span>
          </div>
          <div className="stats-group">
            <span className="stat">{userStats.maxStreak}</span>
            <span className="stat-label">max streak</span>
          </div>
        </div>
        <h2>Guess Distribution</h2>
        <div className="guess-distributions">
          <div className="guess-row">
            <span className="guess-number">1: </span>
            <progress max="100" value={distributionPercentages[0]}></progress>
            <span className="guess-number-data">{userStats.guessDistribution[0]}</span>
          </div>
          <div className="guess-row">
            <span className="guess-number">2: </span>
            <progress max="100" value={distributionPercentages[1]}></progress>
            <span className="guess-number-data">{userStats.guessDistribution[1]}</span>
          </div>
          <div className="guess-row">
            <span className="guess-number">3: </span>
            <progress max="100" value={distributionPercentages[2]}></progress>
            <span className="guess-number-data">{userStats.guessDistribution[2]}</span>
          </div>
          <div className="guess-row">
            <span className="guess-number">4: </span>
            <progress max="100" value={distributionPercentages[3]}></progress>
            <span className="guess-number-data">{userStats.guessDistribution[3]}</span>
          </div>
          <div className="guess-row">
            <span className="guess-number">5: </span>
            <progress max="100" value={distributionPercentages[4]}></progress>
            <span className="guess-number-data">{userStats.guessDistribution[4]}</span>
          </div>
        </div>
      </StyledStats>
    </Modal>
  );
}

export default UserStatsModal;