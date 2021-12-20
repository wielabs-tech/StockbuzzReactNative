import { SIGNUP, LOGIN, LOGOUT, SET_AUTHORIZED, SET_IS_VERIFIED } from './auth.types';

const INITIAL_STATE = {
   isLoggedin: false,
   profileInfo: null,
   isAuthorized: null,
   is_verified: null
};

const reducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case LOGIN:
         return {
            ...state,
            isLoggedin: true,
            profileInfo: action.payload
         };

      case SET_IS_VERIFIED:
         return {
            ...state,
            is_verified: action.payload,
         };

      case SET_AUTHORIZED:
         return {
            ...state,
            isAuthorized: action.payload,
         }

      case SIGNUP:
         return {
            ...state,
            isLoggedin: true,
            profileInfo: action.payload
         };
      case LOGOUT:
         return {
            ...state,
            isLoggedin: false,
            profileInfo: null
         };
      default:
         return state;
   }
};

export default reducer;