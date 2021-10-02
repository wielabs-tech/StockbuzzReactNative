import { CHANGE_BLOCKED_OTHER_FOLLOWERS, CHANGE_BLOCKED_OTHER_FOLLOWING, CLEAR_OTHER_USER_FOLLOWINGS_FOLLOWERS, GET_CURRENT_PAGE, GET_LAST_PAGE, GET_OTHER_USER_EVENTS, GET_OTHER_USER_FOLLOWERS, GET_OTHER_USER_FOLLOWINGS, GET_OTHER_USER_POSTS, GET_USER, GET_USER_FOLLOWERS, GET_USER_FOLLOWINGS, GET_USER_WATCHLIST, LOAD_MORE_FOLLOWERS, LOAD_MORE_FOLLOWINGS, LOAD_MORE_OTHER_EVENTS, LOAD_MORE_OTHER_POSTS, SET_LOADING_FOLLOW, SET_OTHER_USER_FOLLOWERS_SET_LAST_SET_CURRENT_PAGE, SET_OTHER_USER_FOLLOWINGS_SET_LAST_SET_CURRENT_PAGE } from "./user.types";

const initialState = {
    user: null,
    otherFollowings: [],
    otherFollowers: [],
    userPosts: {
      data: [],
    },
    userWatchlist: null,
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USER:
        return {
          ...state,
          user: action.payload,
        };
      case CLEAR_OTHER_USER_FOLLOWINGS_FOLLOWERS:
        return {
          ...state,
          otherFollowings: [],
          otherFollowers: [],
        };
      case GET_OTHER_USER_FOLLOWINGS:
        return {
          ...state,
          otherFollowings: action.otherFollowings,
        };
      case GET_OTHER_USER_FOLLOWERS:
        return {
          ...state,
          otherFollowers: action.otherFollowers,
        };
      case GET_OTHER_USER_POSTS:
        return {
          ...state,
          userPosts: {data: action.userPosts},
        };
      case GET_USER_FOLLOWINGS:
        return {
          ...state,
          otherFollowings: action.otherFollowings,
        };
      case GET_USER_FOLLOWERS:
        return {
          ...state,
          otherFollowers: action.otherFollowers,
        };

      case GET_USER_WATCHLIST:
        return{
          ...state,
          userWatchlist: action.payload
        }
      default:
        return state;
    }
  };