import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";




const combinedReducer = combineReducers({
  auth: authReducer,

})

const rootReducer = (state:any, action:any) => {
    if (action.type === "RESET") {
      //We are calling this RESET, but call what you like!
      state = {};
    }
    return combinedReducer(state, action);
  };
  export default rootReducer;