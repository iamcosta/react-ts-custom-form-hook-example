import { useState, useCallback } from 'react';

interface useFormProps<T> {
  initialValues: T;
  handleSubmit: (data: T) => void;
  handleValidate?: (data: T) => any;
  handleInvalidForm?: (data: T, invalidValues: any) => void;
}

export function useForm<T>(props: useFormProps<T>) {
  const [values, setValues] = useState<T>(() => ({ ...props.initialValues }));
  const [invalidValues, setInvalidValues] = useState<any>({});

  const handleChange = useCallback((event: any) => {
    const inputName = event.target.getAttribute('name');
    const inputValue = event.target.value;
    setValues(prev => ({
      ...prev,
      [inputName]: inputValue
    }));
  }, []);

  const handleSubmit = useCallback((event: any, data: T) => {
    if (props.handleValidate) {
      const invalidValuesObject = props.handleValidate(data);
      if (
        invalidValuesObject.constructor === Object &&
        Object.keys(invalidValuesObject).length !== 0
      ) {
        setInvalidValues(invalidValuesObject);
        if (props.handleInvalidForm) {
          props.handleInvalidForm(data, invalidValuesObject);
        }
      } else {
        props.handleSubmit(data);
      }
    } else {
      props.handleSubmit(data);
    }
    event.preventDefault();
  }, []);

  return {
    values,
    handleChange,
    handleSubmit: (event: any) => handleSubmit(event, values),
    invalidValues
  };
}
