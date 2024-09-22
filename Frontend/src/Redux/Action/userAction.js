import { server } from "../../server/server";
import {
  userGetFailed,
  userGetSuccess,
  userRequest,
} from "../ReducerSlice/userSlices";

exports.userLoader = () => async (dispatch) => {
  try {
    dispatch(userRequest());
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });

    dispatch(userGetSuccess(data.result));
  } catch (error) {
    dispatch(userGetFailed(error.result.data.message));
  }
};
