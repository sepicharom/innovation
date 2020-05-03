import React from 'react';
import PropTypes from 'prop-types';

import Link from '../Link/Link';

/**
 * ==================
 *     COMPONENT
 * ==================
 */
const Figure = ({ imgSrc, altText, caption, linkTo }) => {
  const ImageAsset = require('../../../assets/images/' + imgSrc);
  const ImageComponent = (
    <figure>
      <img src={ImageAsset} alt={altText}></img>
      {caption ? <caption>{caption}</caption> : null}
    </figure>
  );
  return linkTo
    ? (
      <Link linkTo={linkTo}>
        {ImageComponent}
      </Link>
    )
    : ImageComponent
};

/**
 * ==================
 *     PROP-TYPES
 * ==================
 */

Figure.defaultProps = {
  altText: '',
};

Figure.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  altText: PropTypes.string,
  caption: PropTypes.string,
  linkTo: PropTypes.string,
};

export default Figure;
