import React from 'react';
import { connect } from 'react-redux';
import * as achievementActions from '../../actions/achievementActions';

import AchievementCard from '../AchievementCard/AchievementCard';

import styled from 'styled-components/macro';

const AchievementsContainer = styled.div`
  >div:first-child {
    border-bottom: 1px solid lightgray;
  }
`;

const PilesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
`;

const mapStateToProps = store => ({
  achievementData: store.achievements,
});

const mapDispatchToProps = dispatch => ({
  claimAchievement: (name, isSpecial = false) => dispatch(achievementActions.claimAchievement(name, isSpecial)),
});

const Achievements = ({
  achievementData,
  claimAchievement,
}) => {
  const AgeAchievements = Object.keys(achievementData.ageAchievements).map(age => (
    <AchievementCard key={`age-${age}-achievement`}
      name={age}
      cost={achievementData.costMap[age]}
      claimed={!achievementData.ageAchievements[age]}
      achieve={claimAchievement}
    />
  ));
  const SpecialAchievements = Object.keys(achievementData.specialAchievements).map(name => (
    <AchievementCard key={`${name}-achievement`}
      name={name}
      claimed={!achievementData.specialAchievements[name]}
      achieve={claimAchievement}
      special={true}
    />
  ));
  return (
    <AchievementsContainer>
      <div>
        <h3>Age Achievements</h3>
        <PilesContainer>
          {AgeAchievements}
        </PilesContainer>
      </div>
      <div>
        <h3>Special Achievements</h3>
        <PilesContainer>
          {SpecialAchievements}
        </PilesContainer>
      </div>
    </AchievementsContainer>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Achievements);
