import React, { useEffect, useState } from "react";
import WorkoutDetails from "../Components/WorkoutDetails";
import WorkoutForm from "../Components/WorkoutForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
interface ItemProps {
  _id: string;
  title: string;
  reps: number;
  load: number;
  createdAt: string;
  updatedAt: string;
  __v?: string;
}
const Home = () => {
  const { state, dispatch ,edit} = useWorkoutsContext();


  const {stateAuth} = useAuthContext();

  

  const fetchData = async () => {
    const res = await fetch("http://localhost:4000/api/workouts/",{

    headers: {
      'Authorization': `Beared ${stateAuth.user?.token}`
    }
    });
    const val = await res.json();
    if (res.ok) { 
      dispatch({ type: "SET_WORKOUTS", payload: val });
    }
  };

  useEffect(() => {
    if(stateAuth.user){
      fetchData();
    }
  
 
  }, [dispatch,edit,stateAuth.user]);

  return (
    <div>
      <div className="workouts">
        <div className="Workout-details">
          {state.workouts?.map((item: ItemProps, index: any) => (
            <WorkoutDetails key={index} item={item} fetchData={fetchData} />
          ))}
        </div>{" "}
        <div className="Workouts-form">
          {" "}
          <WorkoutForm />{" "}
        </div>
      </div>
    </div>
  );
};

export default Home;
