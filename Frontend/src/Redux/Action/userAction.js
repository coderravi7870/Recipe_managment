import axios from "axios";
import { server } from "../../server/server";
import {
  userGetFailed,
  userGetSuccess,
  userRequest,
} from "../ReducerSlice/userSlices";

export const userLoader = () => async (dispatch) => {
  try {
    
    dispatch(userRequest());

    // console.log("Ram ram");

    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });

    // console.log("data",data);

    if(data.success){
      dispatch(userGetSuccess(data.result));
    }else{
      dispatch(userGetFailed(data.message));
    }
    

  } catch (error) {
    dispatch(userGetFailed(error?.result?.data?.message));
  }
};
