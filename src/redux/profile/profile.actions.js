import { profileAPI } from "../../api/ajax";
import { getMyWatchlistDataThunk } from "../stocks/stocks.actions";
import { getUserDetailsById } from "../user/user.actions";
import { GET_USER } from "../user/user.types";
import {
  GET_FOLLOWERS,
  GET_FOLLOWERS_MINE,
  GET_FOLLOWING,
  GET_FOLLOWING_MINE,
  GET_PROFILE_INFO,
  MY_POSTS,
  NOTIFICATION_DATA,
  WATCHLIST_LOADING,
} from "./profile.types";

export const updateWatchlistThunk =
  (id, symbol, is_add) => async (dispatch) => {
    dispatch({ type: WATCHLIST_LOADING, payload: true });
    const response = await profileAPI.updateWatchlist(id, symbol, is_add);
    console.log("ID", id, symbol);
    if (response?.status == 200) {
      dispatch(getProfileInfoThunk(id));
      // dispatch(getMyWatchlistDataThunk(id))
    }
    dispatch({ type: WATCHLIST_LOADING, payload: false });
  };

export const getProfileInfoThunk = (id) => async (dispatch) => {
  const response = await profileAPI.getProfileInfo(id);
  dispatch({
    type: GET_PROFILE_INFO,
    payload: response.data,
  });
};

export const clearWatchlistThunk = (id) => async (dispatch) => {
  const response = await profileAPI.clearWatchlist(id);
  dispatch(getProfileInfoThunk(id));
};

export const likePostThunk = (postid, userid) => async (dispatch) => {
  const response = await profileAPI.likePost(postid, userid);
  // dispatch({
  //     type: GET_PROFILE_INFO,
  //     payload: response.data
  // })
  return response;
};

export const likeRoomPostThunk = (postid, userid) => async (dispatch) => {
  const response = await profileAPI.likePostRoom(postid, userid);
  // dispatch({
  //     type: GET_PROFILE_INFO,
  //     payload: response.data
  // })
  return response;
};

export const getMyPostsThunk = (id) => async (dispatch) => {
  const response = await profileAPI.getMyPosts(id);
  dispatch({
    type: MY_POSTS,
    payload: response.data,
  });
};

export const getMyFollowersThunk = (id) => async (dispatch) => {
  const response = await profileAPI.getMyFollowers(id);
  dispatch({
    type: GET_FOLLOWERS,
    payload: response.data,
  });
};

export const getMyFollowingThunk = (id) => async (dispatch) => {
  const response = await profileAPI.getMyFollowing(id);
  dispatch({
    type: GET_FOLLOWING,
    payload: response.data,
  });
};

export const getProfileFollowersThunk = (id) => async (dispatch) => {
  const response = await profileAPI.getMyFollowers(id);
  dispatch({
    type: GET_FOLLOWERS_MINE,
    payload: response.data,
  });
};

export const getProfileFollowingThunk = (id) => async (dispatch) => {
  const response = await profileAPI.getMyFollowing(id);
  dispatch({
    type: GET_FOLLOWING_MINE,
    payload: response.data,
  });
};

export const getUserPostsThunk = (id) => async (dispatch) => {
  const response = await profileAPI.getMyPosts(id);
  console.log("POSTS", response.data);
  return response;
};

export const followUserThunk = (id, otherId) => async (dispatch) => {
  console.log("ID", id, otherId);
  const response = await profileAPI.followUser(id, otherId);
  await dispatch(getMyFollowingThunk(id));
  return response;
};

export const updateProfileInfoThunk =
  (id, full_name, bio, photo) => async (dispatch) => {
    const response = await profileAPI.updateUser(id, full_name, bio, photo);
    if (response?.status) {
      console.log("SUCCESS", response.data);
      dispatch(getMyPostsThunk(id));
    }
    return response;
  };

export const getNotificationsThunk = (id) => async (dispatch) => {
  const response = await profileAPI.getNotifications(id);
  if (response?.status) {
    dispatch({ type: NOTIFICATION_DATA, payload: response.data });
  }
};

export const connectToTwitterThunk =
  (id, is_twitter_linked, token, secret) => async (dispatch) => {
    const response = await profileAPI.connectToTwitter(
      id,
      is_twitter_linked,
      token,
      secret
    );
    if (response?.status) {
      console.log("SUCCESS", response.data);
      dispatch(getProfileInfoThunk(id));
      // dispatch(getMyPostsThunk(id));
    }
    return response;
  };
