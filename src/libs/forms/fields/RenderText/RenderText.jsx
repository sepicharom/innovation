/**
 * ************************************
 *
 * @module  RenderText
 * @author  samanthasalley
 * @date    05/31/2020
 * @description react-final-form custom Field component to render
 *  input elements with relevant error/warning validation messages
 *
 * ************************************
 */
import React from 'react';
import PropTypes from 'prop-types';
import FieldError from '../../validation/FieldError/FieldError';

import styled from 'styled-components/macro';

const FieldContainer = styled.div`
  label {
    font-weight: var(--font-weight-bold);
    margin-right: 1rem;
  }

  input {
    padding: 5px 10px;
    border: 1px solid;
    border-radius: 10px;
    box-shadow: none;
  }
`;

const RenderText = ({ input, meta: { touched, error }, label }) => (
  <FieldContainer>
    {label && <label>{label}</label>}
    <input {...input} type="text" />
    <FieldError name={input.name} />
  </FieldContainer>
);

RenderText.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  label: PropTypes.string,
};

export default RenderText;
