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
      age: ''
    },
    handleSubmit: data => {
      alert(`Do something with ${JSON.stringify(data)}`);
    }
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
        <label htmlFor="name">Lastname</label>
        <input
          type="text"
          name="lastname"
          value={formBind.values.lastname}
          onChange={formBind.handleChange}
        />
        <label htmlFor="name">Age</label>
        <input
          type="text"
          name="age"
          value={formBind.values.age}
          onChange={formBind.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
