import AsyncStorage from "@react-native-community/async-storage";
import { API_URL } from "../utils/config";
import API from "./api";
import APIStock from "./apicrypto";

export const loginAPI = {
  login(email, password, token) {
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("firebase_token", token);

    return API.post(`user/login`, formdata);
  },

  loginSocial(uid, token) {
    const formdata = new FormData();
    formdata.append("uid", uid);
    formdata.append("firebase_token", token);

    return API.post(`login/social`, formdata);
  },

  signup(
    email,
    password,
    username,
    fullName,
    mobile,
    image,
    login_type,
    token
  ) {
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("username", username);
    formdata.append("full_name", fullName);
    formdata.append("mobile", mobile);
    formdata.append("login_type", login_type);
    formdata.append("firebase_token", token);
    if (!!image) {
      formdata.append("photo", {
        uri: image.path || image.uri,
        name: "IMG.jpg",
        type: image.mime,
      });
    }

    return API.post(`user/signup`, formdata);
  },

  signupsocial(
    email,
    password,
    username,
    fullName,
    mobile,
    image,
    login_type,
    uid
  ) {
    const formdata = new FormData();
    formdata.append("email", null);
    formdata.append("password", password);
    formdata.append("username", username);
    formdata.append("full_name", fullName);
    formdata.append("mobile", mobile);
    formdata.append("uid", uid);
    formdata.append("login_type", login_type);
    if (!!image) {
      formdata.append("photo", {
        uri: image.path || image.uri,
        name: "IMG.jpg",
        type: image.mime,
      });
    }

    return API.post(`user/signup`, formdata);
  },

  sendVerifyMail(email) {
    const formdata = new formdata();
    formdata.append("email", email);

    return API.post(`user/sendverifymail`, formdata);
  },

  verifyCode(email, otp) {
    const formdata = new formdata();
    formdata.append("email", email);
    formdata.append("otp", otp);

    return API.post(`user/verifycode`, formdata);
  },
};

export const stocksAPI = {
  trendingStocks() {
    const res = API.get(`stocks/trending`);
    return res;
  },

  getCryptoSearch(search) {
    return res = APIStock.get('/search?query=' + search)
  },

  getStockPosts(symbol) {
    return API.get(`stocks/` + symbol + `/posts`);
  },

  getStockInfo(symbol) {
    const res = API.get(`stocks/` + symbol + `/equity`);
    return res;
  },

  getStockInfo2(symbol) {
    const res = fetch(
      "https://www.nseindia.com/api/quote-equity?symbol=" + symbol
    )
    .then((response) => response.json())
    .then((json) => {
      console.log("RESS", json)
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
    console.log("RESS");
  },

  getCryptoInfo(symbol) {
    const res = APIStock.get(
      `coins/markets?vs_currency=USD&ids=`+ symbol +`&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    return res;
  },

  getWatchlistData(userid) {
    return API.get(`user/` + userid + `/watchlist/ranking`);
  },

  getSuggestions(startText) {
    return API.get(`user/search/` + startText);
  },

  getCryptos() {
    // return APIStock.get(`v1/cryptocurrency/map`);
  },
};

export const profileAPI = {
  updateWatchlist(userid, symbol, is_add) {
    const formdata = new FormData();
    formdata.append("user_id", userid);
    formdata.append("ticker", symbol);
    if (is_add) {
      const res = API.put(`user/watchlist/add`, formdata);
      return res;
    } else {
      const res = API.put(`user/watchlist/remove`, formdata);
      return res;
    }
    return res;
  },

  likePost(postid, userid) {
    const formdata = new FormData();
    formdata.append("user_id", userid);
    formdata.append("post_id", postid);

    const res = API.put(`post/likes`, formdata);
    return res;
  },

  likePostRoom(postid, userid) {
    const formdata = new FormData();
    formdata.append("user_id", userid);
    formdata.append("post_id", postid);
    const res = API.put(`room/post/like`, formdata);
    return res;
  },

  getProfileInfo(id) {
    return API.get(`user/id/` + id);
  },

  getProfileInfoByUsername(username) {
    return API.get(`user/username/` + username);
  },

  clearWatchlist(id) {
    const formdata = new FormData();
    formdata.append("user_id", id);
    return API.put(`user/clear/watchlist`, formdata);
  },

  getMyPosts(id) {
    return API.get(`user/` + id + `/posts`);
  },

  getNotifications(id) {
    return API.get(`user/` + id + `/notifications`);
  },

  getMyFollowers(id) {
    return API.get(`user/` + id + `/followers`);
  },

  getMyFollowing(id) {
    return API.get(`user/` + id + `/following`);
  },

  followUser(id, otherid) {
    const formdata = new FormData();
    formdata.append("follower_id", id);
    formdata.append("followee_id", otherid);
    return API.put(`user/follower`, formdata);
  },

  updateUser(id, full_name, bio, image) {
    const formdata = new FormData();
    formdata.append("user_id", id);
    formdata.append("full_name", full_name);
    formdata.append("bio", bio);
    if (!!image) {
      formdata.append("photo", {
        uri: image.path || image.uri,
        name: "IMG.jpg",
        type: image.mime,
      });
    }

    return API.put(`user/update`, formdata);
  },

  connectToTwitter(id, name, bio, is_twitter_linked, token, secret) {
    const formdata = new FormData();
    formdata.append("user_id", id);
    formdata.append("full_name", name);
    formdata.append("bio", bio);
    formdata.append("is_twitter_linked", is_twitter_linked);
    formdata.append("auth_token_twitter", token);
    formdata.append("auth_secret_twitter", secret);

    return API.put(`user/update`, formdata);
  },
};

export const roomsAPI = {
  getMyRooms(userid) {
    return API.get(`rooms/subscribed/` + userid);
  },

  getDiscoverRooms(userid) {
    return API.get(`rooms/discover`);
  },

  getRoomPosts(roomid) {
    return API.get(`rooms/posts/` + roomid);
  },

  roomPost(userid, body, image, is_bullish, is_bearish, roomid) {
    const formdata = new FormData();
    formdata.append("room_id", roomid);
    formdata.append("user_id", userid);
    formdata.append("body", body);
    formdata.append("is_gif", false);
    formdata.append("is_bullish", is_bullish);
    formdata.append("is_bearish", is_bearish);
    formdata.append("is_image", !!image ? true : false);
    const urlImage = image.uri || image.path;
    if (!!image) {
      formdata.append("image", {
        uri: image.path,
        name: "IMG.jpg",
        type: image.mime,
      });
    }

    return API.post(`room/post`, formdata);
  },

  createRoom(userid, title, description, image) {
    const formdata = new FormData();
    formdata.append("user_id", userid);
    formdata.append("title", title);
    formdata.append("description", description);
    if (!!image) {
      formdata.append("photo", {
        uri: image.path || image.uri,
        name: "IMG.jpg",
        type: image.mime,
      });
    }

    return API.post(`room`, formdata);
  },

  joinGroup(roomid, userid) {
    const formdata = new FormData();
    formdata.append("user_id", userid);
    formdata.append("room_id", roomid);

    return API.put(`room/participants`, formdata);
  },
};

export const postsAPI = {
  writeComment(userid, body, post_id) {
    const formdata = new FormData();
    formdata.append("user_id", userid);
    formdata.append("body", body);
    formdata.append("post_id", post_id);
    formdata.append("is_gif", false);
    formdata.append("is_image", false);
    formdata.append("is_comment", true);

    return API.post(`post/comment`, formdata);
  },

  getComments(postid) {
    const formdata = new FormData();
    formdata.append("post_id", postid);

    return API.post(`comments`, formdata);
  },
};

export const createRoom = async (userid, title, description, image) => {
  const formdata = new FormData();
  formdata.append("user_id", userid);
  formdata.append("title", title);
  formdata.append("description", description);
  if (!!image) {
    formdata.append("photo", {
      uri: image.path || image.uri,
      name: "IMG.jpg",
      type: image.mime,
    });
  }

  let res = await fetch(API_URL + "/room", {
    method: "post",
    body: formdata,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  let responseJson = await res.json();
  if (responseJson.status == 1) {
    alert("Upload Successful");
  }
};

export const uploadPost = async (
  userid,
  body,
  image,
  is_bullish,
  is_bearish,
  isTwitter
) => {
  const formdata = new FormData();
  formdata.append("user_id", userid);
  formdata.append("body", body);
  formdata.append("is_gif", false);
  formdata.append("is_bullish", is_bullish);
  formdata.append("is_bearish", is_bearish);
  formdata.append("is_image", !!image ? true : false);
  if (isTwitter) {
    const token = await AsyncStorage.getItem("@authTokenTwitter");
    const secret = await AsyncStorage.getItem("@authTokenSecretTwitter");
    formdata.append("auth_token", token);
    formdata.append("auth_token_secret", secret);
  }
  const urlImage = image.uri || image.path;

  if (!!image) {
    formdata.append("image", {
      uri: image.path,
      name: "IMG.jpg",
      type: image.mime,
    });
  }

  let res = await fetch(API_URL + "/user/post", {
    method: "post",
    body: formdata,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  // let responseJ;
  // if (responseJson.status == 1) {
  //   alert('Upload Successful');
  // }
};
