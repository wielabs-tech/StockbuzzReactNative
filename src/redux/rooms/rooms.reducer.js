import { CREATE_ROOM, GET_DISCOVER_ROOMS, GET_MY_ROOMS, GET_ROOM_POSTS } from "./rooms.types";

const INITIAL_STATE = {
    myRooms: null,
    discoverRooms: null,
    roomsPosts: null,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_ROOM:
            return {
                ...state,
                room: action.payload,
            };

        case GET_ROOM_POSTS:
            console.log("ROOM POSTS", action.payload)
            return {
                ...state,
                roomsPosts: action.payload,
            };

        case GET_MY_ROOMS:
            return {
                ...state,
                myRooms: action.payload,
            };

        case GET_DISCOVER_ROOMS:
            return {
                ...state,
                discoverRooms: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;