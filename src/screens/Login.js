import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Google from '../assets/google.svg';
import Facebook from '../assets/facebook.svg';
import Twitter from '../assets/twitter.svg';
import Linkedin from '../assets/linkedin.svg';
import { Input } from 'react-native-elements';
import CustomInput from '../components/custominput';
import {
  login,
  loginWithSocial,
  postLoginThunk,
  signup,
} from "../redux/auth/auth.actions"
import { useDispatch, useSelector } from 'react-redux';
import TwitterButton from './TwitterButton';

import { LoginManager } from "react-native-fbsdk-next";
import { TouchableOpacity } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth, { firebase } from '@react-native-firebase/auth';
import '@react-native-firebase/app';
import { Profile } from "react-native-fbsdk-next";
import AsyncStorage from '@react-native-community/async-storage';
import { store } from '../redux/store';
import { loginAPI } from '../api/ajax';
import Toast from 'react-native-toast-message';

export default LoginScreen = ({ navigation }) => {

  const [isToggle, setIsToggle] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fbLogin, setFbLogin] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedin);
  const isAuthorized = useSelector(state => state.auth.isAuthorized);
  console.log(isAuthorized);
  const [toastVisible, setToastVisible] = useState(false);

  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "985903233562-jdh16qj2dnpv6kddht4quapuaos5fpe7.apps.googleusercontent.com",
    });
  }, [])

  const signIn = async () => {
    try {
      console.log("GOOGLE")
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo)
      console.log("USER INFO", userInfo);
      const tokens = await GoogleSignin.getTokens();

      const googleCredential = auth.GoogleAuthProvider.credential(tokens.idToken);

      const res = await auth().signInWithCredential(googleCredential)
      console.log('USER', res?.user?.uid)

      const loginResponse = await dispatch(loginWithSocial(res?.user?.uid));
      console.log("RESPONSE", loginResponse)
      if (loginResponse?.response?.status === 404) {
        console.log('TOKENS', tokens)
        AsyncStorage.setItem('@name', userInfo.user.name);
        AsyncStorage.setItem('@uid', res?.user?.uid);
        AsyncStorage.setItem('@email', userInfo.user.email);
        AsyncStorage.setItem('@login_type', 'google');
        store.dispatch({ type: 'SET_AUTHORIZED', payload: true })
      }

    } catch (error) {
      console.log("ERROR", error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function onClickFacebook() {
    try {
      LoginManager.logInWithPermissions(["public_profile", 'email']).then(
        async function (result) {
          if (result.isCancelled) {
            console.log("Login cancelled");
          } else {
            console.log(
              "Login success with permissions: " +
              JSON.stringify(result)
            );
            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
              throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

            // Sign-in the user with the credential
            console.log(auth().signInWithCredential(facebookCredential))
            const loginResponse = await dispatch(loginWithSocial(res?.user?.uid));
            // const currentProfile = await Profile.getCurrentProfile();
            // console.log(currentProfile);
            // if (currentProfile) {
            //   console.log("The current logged user is: " +
            //     JSON.stringify(currentProfile)
            //   );
            //   AsyncStorage.setItem('@name', currentProfile.name);
            //   AsyncStorage.setItem('@email', currentProfile.email);
            //   AsyncStorage.setItem('@login_type', 'facebook');
            //   store.dispatch({ type: 'SET_AUTHORIZED', payload: true })
            // }
          }
        },
        function (error) {
          console.log("Login fail with error: " + error);
        }
      );
    } catch (e) {
      console.log("ERROR", e);
    }

  }

  return (
    <SafeAreaView style={{ backgroundColor: '#F2F2F2', height: '100%', backgroundColor: "#fff" }}>
      <ScrollView>
        <View style={styles.container}>
          <Toast
            style={{ visible: toastVisible, zIndex: 2 }}
            ref={(ref) => Toast.setRef(ref)} />
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subTitle}>
            Sign up with Social of fill the form to continue.
          </Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity onPress={onClickFacebook}><Facebook height={24} width={24} /></TouchableOpacity>
            <TwitterButton />
            <TouchableOpacity><Google style={styles.iconStyle} height={24} width={24} onPress={signIn} /></TouchableOpacity>
          </View>
          <View style={{ marginTop: 100 }}>
            <CustomInput
              value={email}
              labelName="Enter your email id"
              iconName="email"
              isPassword={false}
              setValue={setEmail}
            />
            <CustomInput
              value={password}
              labelName="Enter your Password"
              iconName="lock"
              isPassword={true}
              onChange={(val) => {
                console.log(val)
              }}
              setValue={setPassword}
            />
          </View>
          <Text style={styles.forgotPassword} onPress={() => { navigation.navigate('ForgotPassword') }}>Forgot Password?</Text>
          <FillButton text="Sign in" linearGradient={true}
            onPress={async () => {
              if (validateEmail(email)) {
                const response = await dispatch(postLoginThunk(email, password))
                if (response?.status === 404) {
                  Toast.show({
                    visibilityTime: 2000,
                    type: 'error',
                    autoHide: true,
                    text1: 'Login Error',
                    text2: 'The user with this e-mail doesn\'t exist'
                  });
                } else if (response?.status === 403) {
                  Toast.show({
                    visibilityTime: 2000,
                    type: 'error',
                    autoHide: true,
                    text1: 'Login Error',
                    text2: 'The entered password is incorrect'
                  });
                }
              } else {
                console.log("Invalid email")
              }
            }} />
          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              marginTop: 15,
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <Text style={{ color: '#BBBCBE', fontSize: 13 }}>
              I am new user.{' '}
            </Text>
            <Text
              style={{ color: '#A1A6D9', fontSize: 18 }}
              onPress={() => {
                navigation.navigate('CreateAccount');
              }}>
              {' '}
              Sign up
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    marginLeft: 24,
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 15,
    fontSize: 13,
    color: '#F1A584',
  },

  container: {
    padding: 10,
  },

  socialIcons: {
    marginTop: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    marginTop: 40,
    color: '#5B72FF',
    fontFamily: 'SecularOne-Regular',
    fontSize: 24,
  },

  subTitle: {
    fontSize: 12,
    color: '#12121D3C',
  },
});
