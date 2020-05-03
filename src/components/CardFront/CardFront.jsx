import React from 'react';

import Resource from '../Resource/Resource';

import styled from 'styled-components/macro';

const COLOR_MAP = {
  red: 'rgba(255, 0, 0, 0.7)',
  blue: 'lightblue',
  green: 'lightgreen',
  yellow: 'lightyellow',
  purple: 'rgba(153, 0, 255, 0.5)',
};

const CardWrapper = styled.div((props) => `
  min-width: 200px;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR_MAP[props.color] ? COLOR_MAP[props.color] : 'lightbrown'};
  border: 1px solid brown;
  border-radius: 10px;
`);

const Row = styled.div((props) => `
  display: flex;
  flex-direction: row;
  ${props.justify && 'justify-content: ' + props.justify + ';'}
`);

const TopGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-column-gap: 10px;
`;

const ResourceRow = styled.div`
  width: 100%;
  // display: grid;
  // grid-template-columns: repeat(3, 1fr);
  // grid-column-gap: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;


const CardFront = ({
  name,
  age,
  color,
  dogma_resource,
  resource_space_1,
  resource_space_2,
  resource_space_3,
  resource_space_4,
  num_castles,
  num_crowns,
  num_leaves,
  num_lightbulbs,
  num_factories,
  num_timepieces,
}) => {
  return (
    <CardWrapper color={color}>
      <TopGrid>
        <Resource resource={resource_space_1} />
        <div>
          <Row justify="space-between">
            <h3>{name}</h3>
            <p>Age: {age}</p>
          </Row>
          <div>Laborum ullam odio ipsa officiis quia ut nostrum ex. Fugiat labore ut et minima fugit provident eos. Ea magnam voluptatem adipisci sit qui quam et eaque eaque. Voluptatem quisquam est quisquam.</div>
        </div>
      </TopGrid>
      <ResourceRow>
        <Resource resource={resource_space_2} />
        <Resource resource={resource_space_3} />
        <Resource resource={resource_space_4} />
      </ResourceRow>
    </CardWrapper>
  );
}

export default CardFront;
