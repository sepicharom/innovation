/**
 * ************************************
 *
 * @module  FieldError
 * @author  samanthasalley
 * @date    05/31/2020
 * @description custom component for displaying
 *           react-final-form validation errors
 *
 * ************************************
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import styled from 'styled-components/macro';

const StyledError = styled.div`
  color: red;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-sm);
`;

const FieldError = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <StyledError>{error}</StyledError> : null
    }
  />
);

FieldError.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FieldError;
