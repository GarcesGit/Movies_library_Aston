import React, { useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { SignInputProps } from '../types/SignTypes/signTypes';

export const SignInput = <T, >(props: SignInputProps<T>) => {
  const { label,
    name,
    type,
    data,
    setData,
    isInvalid,
    errors,
    mRef,
  } = props;
  const currentName = name as string;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    const currentData = {
      ...data,
      [name]: value,
    }

    setData(currentData);
  }, [data, setData]);

  return (
    <Form.Group className="form-floating mb-3">
      <Form.Control
        onChange={handleChange}
        value={data[name as keyof T] as string}
        ref={mRef}
        id={currentName}
        name={currentName}
        type={type}
        placeholder={label}
        autoComplete={currentName}
        isInvalid={isInvalid}
        required
      />
      <label htmlFor={currentName}>
        {label}
      </label>
      <Form.Control.Feedback type="invalid" tooltip>
        {errors[currentName]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

SignInput.displayName = 'SignInput';