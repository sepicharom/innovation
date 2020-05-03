import React from 'react';

import styled from 'styled-components/macro';

const RESOURCES_MAP = {
  castles: {
    bgColor: 'darkgray',
    icon: (<span role="img" aria-label="Castle" >🏰</span>),
  },
  crowns: {
    bgColor: 'yellow',
    icon: (<span role="img" aria-label="Crown" >👑</span>),
  },
  leaves: {
    bgColor: 'black',
    icon: (<span role="img" aria-label="Leaf" >🍀</span>),
  },
  lightbulbs: {
    bgColor: 'purple',
    icon: (<span role="img" aria-label="Lightbulb" >💡</span>),
  },
  factories: {
    bgColor: 'red',
    icon: (<span role="img" aria-label="Factory" >🏗️</span>),
  },
  timepieces: {
    bgColor: 'lightblue',
    icon: (<span role="img" aria-label="Timepiece" >🕐</span>),
  },
  DEFAULT: {
    bgColor: 'black',
    icon: (<span role="img" aria-label="Icon" >⚪</span>),
  },
};

const ResourceContainer = styled.div`
  width: 60px;
  height: 60px;
  border: 2px solid black;
`;

const Resource = styled.div((props) => `
  width: 100%;
  height: 100%;
  border: 1px solid white;
  background-color: ${RESOURCES_MAP[props.resource]
    ? RESOURCES_MAP[props.resource].bgColor
    : RESOURCES_MAP.DEFAULT.bgColor
  };
  display: flex;
  align-items: center;
  justify-content: center;
`);


const StyledResource = ({
  resource
}) => {
  return (
    <ResourceContainer>
      <Resource resource={resource}>
        {RESOURCES_MAP[resource] ? RESOURCES_MAP[resource].icon : RESOURCES_MAP.DEFAULT.icon}
      </Resource>
    </ResourceContainer>
  );
}

export default StyledResource;
