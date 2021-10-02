import { GET_COMMENTS } from "./posts.types";

const initialState = {
    comments: null,
  };
  
  export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COMMENTS:
        return {
          ...state,
          comments: action.comments,
        };
      default:
        return state;
    }
  };