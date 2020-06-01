// reusable validation functions for react-final-form

// use this to create a specific minChar validation
export const minChar = (len) => (value) =>
  value && value.length < len
    ? `Must be at least ${len} characters long.`
    : undefined;

export const required = (value) => (!value ? 'Required' : undefined);
