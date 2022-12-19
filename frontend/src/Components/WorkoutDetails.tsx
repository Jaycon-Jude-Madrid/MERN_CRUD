import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
interface ItemProps {
  item: any;
  fetchData: () => void;
}
const WorkoutDetails = ({ item, fetchData }: ItemProps) => {
  const { dispatch } = useWorkoutsContext();

  let createdDate = new Date(item.createdAt).toUTCString();
  createdDate = createdDate.split(" ").slice(0, 4).join(" ");

  const deleteData = async () => {
    const response = await fetch(
      "http://localhost:4000/api/workouts/" + item._id,
      {
        method: "DELETE",
      }
    );
    const jason = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUTS", payload: jason });
    }
  };

  return (
    <div className="workout-details">
      <h4>{item.title}</h4>
      <p>
        <strong>Load: </strong>
        {item.load}
      </p>
      <p>
        {" "}
        <strong>Reps: </strong> {item.reps}
      </p>
      <p>{`${String(createdDate)}`}</p>
      <span onClick={deleteData}> Delete</span>
    </div>
  );
};

export default WorkoutDetails;
