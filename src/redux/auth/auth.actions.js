import { loginAPI } from '../../api/ajax';
import { setAsyncStorageToken } from '../../api/api';
import { getProfileInfoThunk } from '../profile/profile.actions';
import { store } from '../store';
import { SIGNUP, LOGIN, LOGOUT, SET_IS_VERIFIED, SET_AUTHORIZED } from './auth.types';
import messaging from '@react-native-firebase/messaging';

export const login = (data) => {
    return {
        type: LOGIN,
        payload: data
    };
};

export const signup = () => {
    return {
        type: SIGNUP,
    };
};


export const logout = () => {
    return {
        type: LOGOUT,
    };
};

export const postLoginThunk = (
    email,
    password
) => async dispatch => {
    try {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        const response = await loginAPI.login(
            email,
            password,
            token
        );
        setAsyncStorageToken(response?.data?.access_token, response?.data?.refresh_token)
        if (response?.status == 200) {
            await dispatch(getProfileInfoThunk(response?.data?._id.$oid));
            dispatch(login(response?.data))
        }
        return response;
    } catch (e) {
        console.log(e.response)
        return e.response
    }

}

export const signUpThunk = (
    email,
    password,
    username,
    fullName,
    mobile,
    image,
    login_type,
    token
) => async dispatch => {
    try {
        const response = await loginAPI.signup(
            email.toLowerCase(),
            password,
            username,
            fullName,
            mobile,
            image,
            login_type,
            token
        );
        if (response?.data?.access_token) {
            setAsyncStorageToken(response?.data?.access_token, response?.data?.refresh_token)
            if (response?.status == 200 || response?.status == 201) {
                await dispatch(getProfileInfoThunk(response?.data?._id.$oid));
                store.dispatch({ type: SET_IS_VERIFIED, payload: false })
                dispatch(login(response?.data))
                // return response;
            }
        }
    } catch (e) {
        console.log("SIGNUP ERROR", e.response)
        return e;
    }
}

export const signUpThunkSocial = (
    email,
    password,
    username,
    fullName,
    mobile,
    image,
    login_type,
    uid
) => async dispatch => {
    try {
        const response = await loginAPI.signupsocial(
            email?.toLowerCase(),
            password,
            username,
            fullName,
            mobile,
            image,
            login_type,
            uid
        );
        if (response?.data?.access_token) {
            setAsyncStorageToken(response?.data?.access_token, response?.data?.refresh_token)
            if (response?.status == 200 || response?.status == 201) {
                await dispatch(getProfileInfoThunk(response?.data?._id.$oid));
                // store.dispatch({ type: SET_IS_VERIFIED, payload: false })
                store.dispatch({type: SET_AUTHORIZED, payload: false})
                dispatch(login(response?.data))
            }
        }
    } catch (e) {
        console.log("SIGNUP ERROR", e)
        return e;
    }
}

export const sendVerifyMailThunk = (email) => async dispatch => {
    try {
        const response = await loginAPI.sendVerifyMail(email)
        return response;
    } catch (e) {
        console.log("ERROR WHILE SENDING VERIFY EMAIL", e);
    }
}

export const loginWithSocial = (uid) => async dispatch => {
    try {
        console.log("UID", uid);
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        const response = await loginAPI.loginSocial(uid, token)
        setAsyncStorageToken(response?.data?.access_token, response?.data?.refresh_token)
        if (response?.status == 200) {
            await dispatch(getProfileInfoThunk(response?.data?._id.$oid));
            dispatch(login(response?.data))
        }
    } catch (e) {
        console.log("ERROR WHILE SENDING VERIFY EMAIL", e);
        return e;
    }
}

export const verifyCodeThunk = (email, otp) => async dispatch => {
    try {
        const response = await loginAPI.verifyCode(email, otp);
        return response;
    } catch (e) {
        console.log("ERROR WHILE VERIFYING CODE", e);
    }
}