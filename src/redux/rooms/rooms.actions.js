import { roomsAPI } from "../../api/ajax";
import { GET_DISCOVER_ROOMS, GET_MY_ROOMS, GET_ROOM_POSTS } from "./rooms.types";

export const getMyRoomsThunk = (userid) => async dispatch => {
    const response = await roomsAPI.getMyRooms(userid);
    dispatch({
        type: GET_MY_ROOMS,
        payload: response.data
    })
}

export const getDiscoverRoomsThunk = (userid) => async dispatch => {
    const response = await roomsAPI.getDiscoverRooms(userid);
    dispatch({
        type: GET_DISCOVER_ROOMS,
        payload: response.data
    })
}

export const createRoomsThunk = (userid, title, description, image) => async dispatch => {
    try {
        const response = await roomsAPI.createRoom(userid, title, description, image);
        console.log("RESPONSE", response);
        dispatch(getMyRoomsThunk(userid));
        return response;
    } catch (e) {
        return e
    }
    // dispatch({
    //     type: GET_DISCOVER_ROOMS,
    //     payload: response.data
    // })
}

export const getRoomPostsThunk = (roomid) => async dispatch => {
    console.log("ROOMID", roomid)
    const response = await roomsAPI.getRoomPosts(roomid);
    console.log("POSTS", response.data)
    dispatch({
        type: GET_ROOM_POSTS,
        payload: response.data
    })
}

export const joinGroupThunk = (roomid, userid) => async dispatch => {
    console.log("ROOMID", roomid)
    const response = await roomsAPI.joinGroup(roomid, userid);
    await dispatch(getMyRoomsThunk(userid));
    await dispatch(getDiscoverRoomsThunk());
}