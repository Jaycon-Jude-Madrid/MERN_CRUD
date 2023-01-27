import { createContext, useEffect, useReducer } from "react";

type initialStateProps = {
  user: null;
};
type actionType = {
  type: string;
  payload: any;
};

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

export const authReducer = (state: initialStateProps, action: actionType) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

const initialState = {
  user: null,
};

export const AuthContext = createContext<any>(null);

export const AuthContextProvider = ({
  children,
}: ThemeContextProviderProps) =>  {
  const [stateAuth, dispatch] = useReducer<any>(authReducer, initialState);

  console.log("AuthContext state", stateAuth);


  useEffect(() =>{
// @ts-ignore
const user = JSON.parse(localStorage.getItem("user"));
if(user){
  // @ts-ignore
  dispatch({type: "LOGIN", payload: user})
}
},[])
  return (
    <AuthContext.Provider value={{stateAuth, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
