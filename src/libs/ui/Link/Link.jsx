import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * ===========================
 *     STYLED COMPONENTS
 * ===========================
 */
import styled from 'styled-components/macro';

const LinkWrapper = styled.span(() => `
  a {
    color: var(--teal-light);
    font-weight: var(--font-weight-semi-bold);
  }
`);

/**
 * ===========================
 *      HELPER FUNCTIONS
 * ===========================
 */
/**
 * @name isExternalLink
 * @param {string} to 
 * @description helper function to check if path is to app route or external url
 */
export const isExternalLink = to => to.slice(0, 4) === 'http';

/**
 * @name isMailtoLink
 * @param {string} to 
 * @description helper function to check if path is mailto link
 */
export const isMailtoLink = to => to.slice(0, 6) === 'mailto';

/**
 * ==================
 *     COMPONENT
 * ==================
 */
const RenderLink = ({ children, linkTo }) => {
  const LinkItem = isExternalLink(linkTo)
    // if linkTo goes to external url, render as <a></a> tag
    ? (<a href={linkTo} target="_blank" rel="noopener noreferrer">{children}</a>)
    // if linkTo goes to mailto url, render as <a></a> tag
    : isMailtoLink(linkTo)
      ? (<a href={linkTo} target="_top">{children}</a>)
      // otherwise, render as a React-Router Link
      : (<Link to={process.env.PUBLIC_URL ? process.env.PUBLIC_URL + linkTo : linkTo}>{children}</Link>);
  return (
    <LinkWrapper>{LinkItem}</LinkWrapper>
  );
};

/**
 * ==================
 *     PROP-TYPES
 * ==================
 */
RenderLink.propTypes = {
  linkTo: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export default RenderLink;
