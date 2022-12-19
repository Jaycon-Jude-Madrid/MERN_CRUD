import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

interface FormProps {
  title: string;
  load: string;
  reps: string;
}

const initialValues = {
  title: "",
  load: "",
  reps: "",
};

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const [values, setValues] = useState<FormProps>(initialValues);
  const [error, setError] = useState<any>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const workouts = { ...values };
    const response = await fetch("http://localhost:4000/api/workouts/", {
      method: "POST",
      body: JSON.stringify(workouts),
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setValues(initialValues);
      setError(null);
      console.log("Data added");
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workouts </h3>
      <label>Exercise Title:</label>
      <input
        name="title"
        type="text"
        onChange={handleInputChange}
        value={values.title}
        required
      />
      <label>Loads (in kg):</label>
      <input
        name="load"
        type="text"
        onChange={handleInputChange}
        value={values.load}
        required
      />
      <label>Reps:</label>
      <input
        name="reps"
        type="text"
        onChange={handleInputChange}
        value={values.reps}
      />
      <button type="submit">Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
