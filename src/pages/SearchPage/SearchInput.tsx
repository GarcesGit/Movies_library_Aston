import React, { useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { SearchInputProps } from '../../types/SearchTypes/searchTypes';

export const SearchInput = <T,>(props: SearchInputProps<T>) => {
  const { label, name, type, data, setData, errors, filmRef } = props;
  const currentName = name as string;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const currentData = {
        ...data,
        [name]: value,
      };

      setData(currentData);
    },
    [data, setData],
  );

  return (
    <Form.Group className="form-floating mb-3">
      <Form.Control
        onChange={handleChange}
        value={data[name as keyof T] as string}
        ref={filmRef}
        id={currentName}
        name={currentName}
        type={type}
        placeholder={label}
        autoComplete={currentName}
      />
      <label htmlFor={currentName}>{label}</label>
      <Form.Control.Feedback type="invalid" tooltip>
        {errors[currentName]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

SearchInput.displayName = 'SearchInput';
