import axios from "axios";
import { loadUserRequest, loadUserSuccess, loadUserFail } from "./userSlice";
import { URL } from "../url";
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const response = await axios.get(`${URL}/api/auth/refetch`, {
      withCredentials: true,
    });
    console.log(response);
    dispatch(loadUserSuccess(response.data));
  } catch (error) {
    dispatch(loadUserFail(error.message));
  }
};
