import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
interface ItemProps {
  item: any;
  fetchData: () => void;
}
const WorkoutDetails = ({ item, fetchData }: ItemProps) => {
  
  const [editCancel, setCancelEdit] = useState<boolean>(true);
  const { dispatch, setEdit} = useWorkoutsContext();
const {stateAuth} = useAuthContext();
  let createdDate = new Date(item.createdAt).toUTCString();
  createdDate = createdDate.split(" ").slice(0, 4).join(" ");

  const deleteData = async () => {

    if(!stateAuth.user){
      return
    }
    const response = await fetch(
      "http://localhost:4000/api/workouts/" + item._id,
      {
        method: "DELETE",
        headers: { 'Authorization': `Beared ${stateAuth.user?.token}`
      }
    }
    );
   
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUTS", payload: json });
     
    }
  };

  const editData = async () => {
    const data = {
      item,
    };
    setEdit(data);
    setCancelEdit(false)

  
  };

  const cancelEdit = () => {
    setEdit(null);
    setCancelEdit(true);
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
      <span style={{borderRadius:'5px',color:'red'}} onClick={deleteData}> Delete</span>
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
      )  :   <button
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
    </button>}
    </div>
  );
};

export default WorkoutDetails;
