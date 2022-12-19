import React from "react";
interface ItemProps {
  item: any;
}
const WorkoutDetails = ({ item }: ItemProps) => {
  let createdDate = new Date(item.createdAt).toUTCString();
  createdDate = createdDate.split(" ").slice(0, 4).join(" ");

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
    </div>
  );
};

export default WorkoutDetails;
