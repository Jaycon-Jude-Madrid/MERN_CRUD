
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";



export const useSignup = () => {

    const {dispatch} = useAuthContext()
    const [error,setError] = useState<null | string>(null)
    const [isLoading,setIsloading] = useState<any>(null)


const signup = async (email: string | undefined,password : string | undefined)  =>{
      setIsloading(true)
      setError(null)  

      const data = {
        email,
        password
      }

      const response = await fetch("http://localhost:4000/api/user/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
      });      

      const json = await response.json();
      if(!response.ok){
        setIsloading(false)
        setError(json.error)
      }
      if(response.ok){
        //Save the data to the local storage
       localStorage.setItem('user', JSON.stringify(json ))
       dispatch({type: 'LOGIN', payload: json})

       setIsloading(false)
      }
    }
 
    return {signup, isLoading, error}
}

