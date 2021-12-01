import React from 'react';
import { useForm } from './hooks/use-form';

interface formModel {
  name: string;
  lastname: string;
  age: string;
}

const App: React.FC = () => {
  const formBind = useForm<formModel>({
    initialValues: {
      name: '',
      lastname: '',
      age: '',
    },
    handleValidate: (data) => {
      let invalidValues = {} as any;
      if (!data.name) {
        invalidValues.name = 'You must provide a Name!';
      }
      if (!data.lastname) {
        invalidValues.lastname = 'You must provide a Lastname!';
      }
      if (Number(data.age) < 18) {
        invalidValues.age = 'Age must be 18 or higher!';
      }
      if (!data.age) {
        invalidValues.age = 'You must provide an Age!';
      }

      return invalidValues;
    },
    handleInvalidForm: (data, invalidValues) => {
      alert(`Has empty fields! ${JSON.stringify(invalidValues)}`);
    },
    handleSubmit: (data) => {
      alert(`Do something with ${JSON.stringify(data)}`);
    },
  });

  return (
    <div>
      <form onSubmit={formBind.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formBind.values.name}
          onChange={formBind.handleChange}
        />
        <span>{formBind.invalidValues.name}</span>
        <label htmlFor="name">Lastname</label>
        <input
          type="text"
          name="lastname"
          value={formBind.values.lastname}
          onChange={formBind.handleChange}
        />
        <span>{formBind.invalidValues.lastname}</span>
        <label htmlFor="name">Age</label>
        <input
          type="text"
          name="age"
          value={formBind.values.age}
          onChange={formBind.handleChange}
        />
        <span>{formBind.invalidValues.age}</span>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
