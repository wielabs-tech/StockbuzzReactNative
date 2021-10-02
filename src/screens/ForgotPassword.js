import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import FillButton from '../components/fillButton'
import Icon from 'react-native-vector-icons/Ionicons'
import CustomInput from '../components/custominput';

export default EmailOTP = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const text = "Enter the 6 digit code that you received on \n your email so you can continue to reset \n your account password"

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: '#fff' }}>
      <View>
        <Icon
          name="arrow-back"
          size={24}
          style={{ marginTop: 20, marginLeft: 10 }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={{ width: '100%', alignSelf: 'center' }}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>{text}</Text>
          <View style={{ marginTop: 50, alignSelf: 'center' }}>
          </View>
          <CustomInput
            value={email}
            setValue={setEmail}
            labelName="Enter your email id"
            iconName="email"
            isPassword={false}
          />
          <FillButton 
          onPress={() => {
            navigation.navigate('OTP')
          }}
          text="Verify and proceed" linearGradient={true} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  title: {
    alignSelf: 'center',
    color: '#4955BB',
    fontFamily: 'SecularOne-Regular',
    fontSize: 36,
    fontWeight: '400',
  },

  subtitle: {
    fontSize: 13,
    fontFamily: 'Inter',
    color: '#616161',
    lineHeight: 20,
    fontWeight: '400',
    marginTop: 20,
    alignSelf: 'center',
    textAlign: 'center'
  }

})