import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Button,
  TouchableOpacity,
  TextInput,
  StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FillButton from '../components/fillButton';
import OutLineButton from '../components/outLineButton';

export default WelcomeScreen = ({navigation}) => {
  function onPressSignin() {
    navigation.navigate('LoginScreen');
  }

  function onPressSignup() {
    navigation.navigate('CreateAccount');
  }

  return (
    <SafeAreaView style={{height: '100%'}}>
      <StatusBar
        animated={true}
        barStyle='dark-content'
        backgroundColor='#fff'
        />
    <LinearGradient
      colors={['#5B72FF', '#3d56f0']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 0}}
      angle={267.35}
      style={styles.linearGradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.rect}></View>
        <View style={{alignSelf: 'center'}}>
          <Text style={styles.title}>StockBuzz</Text>
          <Text style={styles.subTitle}>Real Time</Text>
          <Text style={styles.subTitle}>Market Twits</Text>
        </View>

        <View style={{width: '100%', flexDirection: 'column'}}>
          <FillButton text="Sign in" onPress={onPressSignin} />
          <OutLineButton text="Sign up" onPress={onPressSignup}/>
        </View>
      </SafeAreaView>
    </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    height: '100%',
    zIndex: 1,
  },

  title: {
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'SecularOne-Regular',
    marginTop: 20,
    fontSize: 48,
  },

  subTitle: {
    fontFamily: 'Inter-Regular',
    color: '#fff',
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 24,
  },

  rect: {
    alignSelf: 'center',
    transform: [{rotate: '45deg'}],
    width: 100,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },

  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#000',
    backgroundColor: 'transparent',
  },
});
