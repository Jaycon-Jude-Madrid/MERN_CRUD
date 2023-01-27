import React, { useEffect, useReducer, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

interface FormProps {
  title: any;
  load: string;
  reps: string;
}

const initialValues = {
  title: "",
  load: "",
  reps: "",
};

const WorkoutForm = () => {
  const { edit, dispatch, setEdit,setToggleEdit ,toggleEdit} = useWorkoutsContext();
  const {stateAuth} = useAuthContext();

  const [values, setValues] = useState<FormProps>(initialValues);

  const [error, setError] = useState<any>(null);
  const [emptyFields, setEmptyFields] = useState<any>([]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
e.preventDefault();
if(!stateAuth.user){
  setError('You must be logged in')
  return
}
    const workouts = { ...values };
    const response = await fetch("http://localhost:4000/api/workouts/", {
      method: "POST",
      body: JSON.stringify(workouts),
      headers: {
        "Content-type": "application/json; charset=utf-8",'Authorization': `Beared ${stateAuth.user?.token}`
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setValues(initialValues);
      setError(null);
      setEmptyFields([]);

      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
   
  };
  const handleEdit = async (e: React.SyntheticEvent) => {
  e.preventDefault();

 

    const id = edit?.item?._id;
    const workouts = { ...values };
    const response = await fetch(`http://localhost:4000/api/workouts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(workouts),
      headers: {
        "Content-type": "application/json; charset=utf-8",'Authorization': `Beared ${stateAuth.user?.token}`
      },
    });
    const json = await response.json();
          
    if(!values.title || !values.reps || !values.load){
      alert('Please input')

    } else {
      if (response.ok) {
        setValues(initialValues);
     setEdit(null)
return json;
  

      
    }
     
    }
    setToggleEdit(true);
  };

  useEffect(() => {
    if (edit) {
      setValues({
        title: edit?.item?.title,
        load: edit?.item?.load,
        reps: edit?.item?.reps,
      });
    } else {
      setValues(initialValues);
    }

  }, [edit ]);

  return (
    <form className="create">
      <h3>Add a new workouts </h3>
      <label>Exercise Title:</label>
      <input
        name="title"
        type="text"
        onChange={handleInputChange}
        value={values.title}
        required
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Loads (in kg):</label>
      <input
        name="load"
        type="number"
        onChange={handleInputChange}
        value={values.load}
        required
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <label>Reps:</label>
      <input
        name="reps"
        type="number"
        onChange={handleInputChange}
        value={values.reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      {edit ? (
        <button type="button" onClick={handleEdit}>
          Update
        </button>
      ) : !edit ?  <button type="button" onClick={handleSubmit}>
      Submit
    </button>: null
       
      }
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
