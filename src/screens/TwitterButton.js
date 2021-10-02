import AsyncStorage from "@react-native-community/async-storage";
import React, { Component } from "react"
import {
    AppRegistry,
    Button,
    StyleSheet,
    Text,
    View,
    Alert,
    NativeModules,
    TouchableOpacity
} from "react-native"
import { useDispatch } from "react-redux";
import Twitter from '../assets/twitter.svg';
import { store } from "../redux/store";
import auth, { firebase } from '@react-native-firebase/auth';
import { loginWithSocial } from "../redux/auth/auth.actions";

const { RNTwitterSignIn } = NativeModules

const Constants = {
    //Dev Parse keys
    TWITTER_COMSUMER_KEY: "2sgsAFSVXtfN29GdkefChnD40",
    TWITTER_CONSUMER_SECRET: "XyJfBWCYkqU9gZmMalxWcCB4eU1uySf2buzMMgnBArO9rpPrjE"
}


async function onTwitterButtonPress() {

    // Perform the login request
    RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
        RNTwitterSignIn.logIn()
            .then(async loginData => {
                console.log(loginData)
                const { authToken, authTokenSecret, name, email } = loginData
                const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);

                // Sign-in the user with the credential
                const res = await auth().signInWithCredential(twitterCredential);
                const loginResponse = await store.dispatch(loginWithSocial(res?.user?.uid));
                console.log("RESPONSE", loginResponse?.response)
                if (loginResponse?.response?.status === 404) {
                    // this.setState({
                    //     isLoggedIn: true
                    // })
                    AsyncStorage.setItem('@authTokenTwitter', authToken);
                    AsyncStorage.setItem('@authTokenSecretTwitter', authTokenSecret);
                    AsyncStorage.setItem('@name', name);
                    AsyncStorage.setItem('@email', email);
                    AsyncStorage.setItem('@login_type', 'twitter');
                    AsyncStorage.setItem('@uid', res?.user?.uid)
                    store.dispatch({type: 'SET_AUTHORIZED', payload: true})
                }
            })
            .catch(error => {
                console.log("THIS ERROR", error)
                store.dispatch({type: 'SET_AUTHORIZED', payload: false})
            }
            )
  }

export default class TwitterButton extends Component {
    state = {
        isLoggedIn: false
    }

    _twitterSignIn = () => {
        RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
        RNTwitterSignIn.logIn()
            .then(loginData => {
                console.log(loginData)
                const { authToken, authTokenSecret, name, email } = loginData
                // if (authToken && authTokenSecret) {
                //     this.setState({
                //         isLoggedIn: true
                //     })
                //     AsyncStorage.setItem('@authTokenTwitter', authToken);
                //     AsyncStorage.setItem('@authTokenSecretTwitter', authTokenSecret);
                //     AsyncStorage.setItem('@name', name);
                //     AsyncStorage.setItem('@email', email);
                //     AsyncStorage.setItem('@login_type', 'twitter');
                //     store.dispatch({type: 'SET_AUTHORIZED', payload: true})
                // }
            })
            .catch(error => {
                console.log("THIS ERROR", error)
                store.dispatch({type: 'SET_AUTHORIZED', payload: false})
            }
            )
    }

    handleLogout = () => {
        console.log("logout")
        RNTwitterSignIn.logOut()
        this.setState({
            isLoggedIn: false
        })
        store.dispatch({type: 'SET_AUTHORIZED', payload: false})
    }

    render() {
        const { isLoggedIn } = this.state
        console.log(store);
        return (
            <View style={this.props.style}>
                {isLoggedIn
                    ? <TouchableOpacity onPress={this.handleLogout}>
                        <Text>Log out</Text>
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={onTwitterButtonPress}><Twitter style={{marginLeft: 24}} height={24} width={24} />
                    </TouchableOpacity>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1b95e0',
        color: 'white',
        width: 200,
        height: 50
    }
})