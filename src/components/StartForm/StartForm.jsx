import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { ARRAY_ERROR } from 'final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';

const StartForm = ({ onSubmit }) => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={values => {
        const errors = {}
        if (!values.players || values.players.length < 2) {
          errors.players = [];
          errors.players[ARRAY_ERROR] = 'Must have at least 2 players.';
        }
        else if (values.players.length > 4) {
          errors.players = [];
          errors.players[ARRAY_ERROR] = 'Cannot have more than 4 players.';
        }
        return errors;
      }}
      mutators={{
        // enable FieldArray components
        ...arrayMutators
      }}
      render={({
        handleSubmit,
        values,
        form: {
          mutators: { push, pop }
        }, // injected from final-form-arrays above
        form,
        pristine,
        submitting,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <h2>Setup your game</h2>
            <div>
              <button
                type="button"
                onClick={() => {
                  if (!values.players || values.players.length < 4) {
                    push('players', undefined);
                  }
                }}
              >
                Add Player
              </button>
            </div>
            <FieldArray name="players">
              {({ fields, meta: { error } }) =>
                <div>
                  {fields.map((name, index) => (
                    <div key={name}>
                      <label>Player {index + 1}</label>
                      <Field
                        name={`${name}.username`}
                        component="input"
                        placeholder="username"
                      />
                      <span
                        onClick={() => fields.remove(index)}
                        style={{ cursor: 'pointer' }}
                        aria-label="Close"
                        role="img"
                      >
                        ❌
                    </span>
                    </div>
                  ))}
                  {error && !pristine && <div><span>{error}</span></div>}
                </div>
              }
            </FieldArray>

            <button
              type="submit"
              disabled={submitting || pristine}
            >
              Let's Play!
            </button>
          </form>
        )
      }}
    />
  )
}

StartForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default StartForm;
