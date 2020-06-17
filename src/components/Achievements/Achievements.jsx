import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as achievementActions from '../../actions/achievementActions';
import { saveGame } from '../../utils/firebaseFunctions';

import AchievementCard from '../AchievementCard/AchievementCard';

import styled from 'styled-components/macro';

const AchievementsContainer = styled.div`
  > div:first-child {
    border-bottom: 1px solid lightgray;
  }
`;

const PilesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
`;

const mapStateToProps = (store) => ({
  gameId: store.game.gameId,
  achievementData: store.achievements,
});

const mapDispatchToProps = (dispatch) => ({
  claimAchievement: (name, isSpecial = false) =>
    dispatch(achievementActions.claimAchievement(name, isSpecial)),
});

const Achievements = ({
  gameId,
  achievementData: { ageAchievements, costMap, specialAchievements },
  claimAchievement,
}) => {
  useEffect(() => {
    saveGame(gameId, { achievementsByAge: ageAchievements });
  }, [gameId, ageAchievements]);
  useEffect(() => {
    saveGame(gameId, { specialAchievements });
  }, [gameId, specialAchievements]);
  const AgeAchievements = Object.keys(ageAchievements).map((age) => (
    <AchievementCard
      key={`age-${age}-achievement`}
      name={age}
      cost={costMap[age]}
      claimed={!ageAchievements[age]}
      achieve={claimAchievement}
    />
  ));
  const SpecialAchievements = Object.keys(specialAchievements).map((name) => (
    <AchievementCard
      key={`${name}-achievement`}
      name={name}
      claimed={!specialAchievements[name]}
      achieve={claimAchievement}
      special={true}
    />
  ));
  return (
    <AchievementsContainer>
      <div>
        <h3>Age Achievements</h3>
        <PilesContainer>{AgeAchievements}</PilesContainer>
      </div>
      <div>
        <h3>Special Achievements</h3>
        <PilesContainer>{SpecialAchievements}</PilesContainer>
      </div>
    </AchievementsContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Achievements);
