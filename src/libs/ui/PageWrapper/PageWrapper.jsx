import React from 'react';
import PropTypes from 'prop-types';

// styled components
import styled from 'styled-components/macro';

const PageWrapper = styled.section(() => `
  display: flex;
  flex-direction: column;
  padding: 5rem 10rem;
  margin: auto;
`);

const Page = (props) => {
  return (
    <PageWrapper {...props}>{props.children}</PageWrapper>
  );
};

Page.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Page;
