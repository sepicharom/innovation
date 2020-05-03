import React from 'react';
import { connect } from 'react-redux';
import * as achievementActions from '../../actions/achievementActions';

import AchievementCard from '../AchievementCard/AchievementCard';
import Group from '../../libs/ui/Group/Group';

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
    <div>
      <div>
        <h3>Age Achievements</h3>
        <Group theme="horizontal" center>
          {AgeAchievements}
        </Group>
      </div>
      <div>
        <h3>Special Achievements</h3>
        <Group theme="horizontal" center>
          {SpecialAchievements}
        </Group>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Achievements);
