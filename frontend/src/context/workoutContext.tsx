import React, { createContext, useReducer } from "react";

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
      return { ...currentState, workouts: action.payload };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...currentState.workouts],
      };
    default:
      return currentState;
  }
};

export const WorkoutsContext = createContext<any>(null);

export const WorksoutContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [state, dispatch] = useReducer<any>(reducer, initialState);
  return (
    <WorkoutsContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
