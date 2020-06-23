/**
 * ************************************
 *
 * @module  Collapse
 * @author  samanthasalley
 * @date   05/03/2020
 * @description Reusable collapsable heading with content
 *
 * ************************************
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/macro';

const CollapseWrapper = styled.div`
  margin-bottom: 2rem;

  h3 {
    margin: 0;

    &:hover {
      cursor: pointer;
    }
  }

  dl {
    color: var(--charcoal-medium);
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Caret = styled.div`
  height: 100%;
  width: 2rem;
  margin-right: 2rem;

  &:hover {
    cursor: pointer;
  }
`;

const CaretIcon = styled.span(
  ({ isOpen }) => `
  color: var(--charcoal-light);
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  border-left: 1rem dashed;
  margin-right: 5px;
  margin-top: -4px;
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 5px;
  vertical-align: middle;
  ${isOpen ? 'transform: rotate(90deg);' : ''}
  transition-timing-function: ease-in-out;
  transition-duration: 0.15s;
  transition-property: transform;
  transition-delay: 0.1s;
`
);

const detailsOpenStyles = `
  max-height: 100%;
  opacity: 1;
`;

const detailsClosedStyles = `
  max-height: 0;
  overflow: hidden;
  opacity: 0;
`;

const Details = styled.div(
  ({ isOpen }) => `
  ${isOpen ? detailsOpenStyles : detailsClosedStyles}
  transition-timing-function: linear, ease;
  transition-duration: 0.15s;
  transition-property: opacity, max-height;
  transition-delay: 0.1s;
`
);

const Collapse = ({ header, content, shouldDefaultOpen }) => {
  const [open, setOpen] = useState(shouldDefaultOpen);

  return (
    <CollapseWrapper>
      <Row onClick={() => setOpen(!open)}>
        <Caret>
          <CaretIcon isOpen={open} />
        </Caret>
        <h3>{header}</h3>
      </Row>
      <Details isOpen={open}>{content}</Details>
    </CollapseWrapper>
  );
};

Collapse.defaultProps = {
  shouldDefaultOpen: false,
};

Collapse.propTypes = {
  header: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  shouldDefaultOpen: PropTypes.bool.isRequired,
};

export default Collapse;
