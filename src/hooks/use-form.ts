import { useState, useEffect, useCallback } from 'react';

interface useFormProps<T> {
  initialValues: T;
  handleSubmit: (data: T) => void;
}

export function useForm<T>(props: useFormProps<T>) {
  const [values, setValues] = useState<T>(() => ({ ...props.initialValues }));

  const handleChange = useCallback((event: any) => {
    const inputName = event.target.getAttribute('name');
    const inputValue = event.target.value;
    setValues(prev => ({
      ...prev,
      [inputName]: inputValue
    }));
  }, []);

  const handleSubmit = useCallback((event: any, data: T) => {
    props.handleSubmit(data);
    event.preventDefault();
  }, []);

  return {
    values,
    handleChange,
    handleSubmit: (event: any) => handleSubmit(event, values)
  };
}
