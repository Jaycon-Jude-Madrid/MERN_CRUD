import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
interface ItemProps {
  item: any;
  fetchData: () => void;
}
const WorkoutDetails = ({ item, fetchData }: ItemProps) => {
  const [editCancel, setCancelEdit] = useState<boolean>(true);
  const { dispatch, setEdit, edit } = useWorkoutsContext();

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
      setEdit({ title: "", load: "", reps: "" });
    }
  };

  const editData = async () => {
    const data = {
      item,
    };
    setEdit(data);
    setCancelEdit(false);
  };

  const cancelEdit = () => {
    setEdit(null);
    setCancelEdit(!editCancel);
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
      {editCancel ? (
        <button
          onClick={editData}
          style={{
            color: "green",
            padding: "10px",
            width: "100px",
            border: "none",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          {" "}
          Edit
        </button>
      ) : (
        <button
          onClick={cancelEdit}
          style={{
            color: "red",

            padding: "10px",
            width: "100px",
            border: "none",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          {" "}
          Cancel
        </button>
      )}
    </div>
  );
};

export default WorkoutDetails;
