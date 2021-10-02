import {postsAPI} from '../../api/ajax';
import { GET_COMMENTS } from './posts.types';

  export const getCommentsThunk = id => async dispatch => {
    try {
      console.log("COMMENT POST ID", id);
      const response = await postsAPI.getComments(id);
      console.log("COMMENT RESPONSE", response)
      dispatch({type: GET_COMMENTS, comments: response.data});
    } catch (e) {
      console.log('getCommentsThunk', e);
    }
  };