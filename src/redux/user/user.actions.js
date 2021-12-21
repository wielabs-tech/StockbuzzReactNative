import { profileAPI, stocksAPI } from "../../api/ajax";
import { GET_USER, GET_USER_WATCHLIST } from "./user.types";

export const getUserDetailsById = (id) => async dispatch => {
  const response = await profileAPI.getProfileInfo(id);
  console.log("RESPONSE", response.data)
  dispatch({
      type: GET_USER,
      payload: response.data
  })
}

export const getWatchlistDataThunk = (id) => async dispatch => {
  const response = await stocksAPI.getWatchlistData(id);
  dispatch({
      type: GET_USER_WATCHLIST,
      payload: response.data
  })
}