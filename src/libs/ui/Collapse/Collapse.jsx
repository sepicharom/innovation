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

import React, { useState, useRef, useEffect } from 'react';
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

const CaretIcon = styled.span(({ isOpen }) => `
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
`);

const Details = styled.div(({ descriptionHeight }) => `
  overflow: hidden;
  transition: .5s max-height ease;
  max-height: ${descriptionHeight}px;
`);

const Collapse = ({
  header,
  content,
  shouldDefaultOpen,
}) => {
  const [collapsedData, setCollapsedData] = useState({
    collapsed: true,
    descriptionHeight: 0,
  });

  const contentRefContainer = useRef(null);

  function calculateHeight() {
    // Find number of child elements inside the collapse
    const numberOfChildren = contentRefContainer.current.children.length;
    // Calculate total height of all child elements inside the collapse
    const collapseHeight = Array.from(contentRefContainer.current.children).reduce((accum, curr) => accum += curr.clientHeight, 0);

    return collapseHeight * numberOfChildren;
  }

  function toggleCollapse() {
    // Set the total height of all elements
    setCollapsedData({
      collapsed: !collapsedData.collapsed,
      descriptionHeight: !collapsedData.collapsed ? 0 : calculateHeight(),
    });
  }

  useEffect(() => {
    if (shouldDefaultOpen) toggleCollapse();
  }, []);

  return (
    <CollapseWrapper onClick={toggleCollapse}>
      <Row>
        <Caret>
          <CaretIcon isOpen={!collapsedData.collapsed} />
        </Caret>
        <h3>
          {header}
        </h3>
      </Row>
      <Details
        descriptionHeight={collapsedData.descriptionHeight}
        ref={contentRefContainer}
      >
        {content}
      </Details>
    </CollapseWrapper>
  )
};

Collapse.defaultProps = {
  shouldDefaultOpen: false,
};

Collapse.propTypes = {
  header: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  shouldDefaultOpen: PropTypes.bool.isRequired,
}

export default Collapse;