import { GET_FOLLOWERS, GET_FOLLOWERS_MINE, GET_FOLLOWING, GET_FOLLOWING_MINE, GET_PROFILE_INFO, MY_POSTS, NOTIFICATION_DATA, UPDATE_WATCHLIST, WATCHLIST_LOADING } from "./profile.types";

const INITIAL_STATE = {
    profileInfo: null,
    myPosts: null,
    followers: null,
    following: null,
    userFollowers: null,
    userFollowing: null,
    watchlistLoading: false,
    notificationData: null,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_WATCHLIST:
            return {
                ...state,
                profileInfo: action.payload,
            };

        case GET_PROFILE_INFO:
            console.log(JSON.stringify(action.payload))
            return {
                ...state,
                profileInfo: action.payload
            }

        case MY_POSTS:
            return {
                ...state,
                myPosts: action.payload
            }

        case GET_FOLLOWERS:
            return {
                ...state,
                followers: action.payload
            }

        case GET_FOLLOWING:
            return {
                ...state,
                following: action.payload
            }

        case GET_FOLLOWERS_MINE:
            return {
                ...state,
                userFollowers: action.payload
            }

        case GET_FOLLOWING_MINE:
            return {
                ...state,
                userFollowing: action.payload
            }

        case WATCHLIST_LOADING:
            return{
                ...state,
                watchlistLoading: action.payload
            }

        case NOTIFICATION_DATA:
            console.log("ACTION", action)
            return{
                ...state,
                notificationData: action.payload
            }

        default:
            return state;
    }
};

export default reducer;