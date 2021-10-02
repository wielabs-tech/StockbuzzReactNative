import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import authReducer from './auth/auth.reducer'
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import stocksReducer from './stocks/stocks.reducer';
import profileReducer from './profile/profile.reducer';
import roomsReducer from './rooms/rooms.reducer';
import { postsReducer } from './posts/posts.reducer';
import { userReducer } from './user/user.reducer';

const appReducer = combineReducers({
  /* your app’s top-level reducers */
  auth: authReducer,
  stocks: stocksReducer,
  profile: profileReducer,
  rooms: roomsReducer,
  posts: postsReducer,
  user: userReducer,
})

const rootReducer = (state, action) => {
  // console.log("actionnn", action)
  if (action?.type === 'LOGOUT') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export const persistedStore = persistStore(store);