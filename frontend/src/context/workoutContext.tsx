import React, { createContext, useReducer, useState } from "react";

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

type stateType = {
  workouts: any;
};

type actionType = {
  type: string;
  payload: any;
};

const initialState: stateType = {
  workouts: null,
};

const reducer = (currentState: stateType, action: actionType) => {

  switch (action.type) {
    case "SET_WORKOUTS":
      return { workouts: action.payload };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...currentState.workouts],
      };
    case "DELETE_WORKOUTS":
      return {
        workouts: currentState.workouts.filter(
          (w: any) => w._id !== action.payload._id
        ),
      };
      case "UPDATE_WORKOUT":
       
      const newArray = [...currentState.workouts];
      newArray[action.payload.index] = action.payload.value;

      return {  ...currentState.workouts, workouts: newArray}

      
    default:
      return currentState;
  }
};

export const WorkoutsContext = createContext<any>(null);

export const WorksoutContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
 
  const [edit, setEdit] = useState<any>(null);

  const [state, dispatch] = useReducer<any>(reducer, initialState);
  return (
    <WorkoutsContext.Provider value={{ state, dispatch, edit, setEdit }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
