import React from 'react';
import PropTypes from 'prop-types';

// styled components
import styled from 'styled-components/macro';

const SectionWrapper = styled.section(() => `
  padding: 1rem 2rem;
  background: white;
  border: var(--border-default);
  border-color: var(--gray-dark);
  border-radius: var(--radius-default);
  box-shadow: var(--box-shadow-default) var(--gray-medium);
`);

const Section = (props) => {
  return (
    <SectionWrapper {...props}>{props.children}</SectionWrapper>
  );
};

Section.propTypes = {
  children: PropTypes.any.isRequired,
  // styles
};

export default Section;
