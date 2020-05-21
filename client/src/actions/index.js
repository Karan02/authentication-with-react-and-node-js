
import axios from "axios";
import { AUTH_USER,AUTH_ERROR } from "./types"
export const signup = (formProps,callback) => async dispatch => {
   try{  const resp = await  axios.post("http://localhost:3090/signup",formProps)
     dispatch({
            type:AUTH_USER,
            payload:resp.data.token
     })
     localStorage.setItem("token",resp.data.token)
     callback()
}
     catch(e){
            dispatch({
                   type:AUTH_ERROR,
                   payload:"Email in use"
            })
     } 
}; 

export const signin = (formProps,callback) => async dispatch => {
       try{  const resp = await  axios.post("http://localhost:3090/signin",formProps)
         dispatch({
                type:AUTH_USER,
                payload:resp.data.token
         })
         localStorage.setItem("token",resp.data.token)
         callback()
    }
         catch(e){
                dispatch({
                       type:AUTH_ERROR,
                       payload:"Invalid credentials"
                })
         } 
    }; 
    

export const signingout = () => {
       localStorage.removeItem("token")
       return {
              type:AUTH_USER,
              payload:""
       }
}
