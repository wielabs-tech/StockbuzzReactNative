import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import FillButton from '../components/fillButton'
import Icon from 'react-native-vector-icons/Ionicons'

export default EmailOTP = ({navigation}) => {

  const text = "Enter the 6 digit code that you received on \n your email so you can continue to reset \n your account password"

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: '#fff'}}>
      <View>
      <Icon
            name="arrow-back"
            size={24}
            style={{marginTop: 20, marginLeft: 10}}
            onPress={() => {
              navigation.goBack();
            }}
          />
      <View style={{ width: '100%', alignSelf: 'center'}}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>{text}</Text>
        <View style={{height: 100, alignSelf: 'center', marginTop: 20 }}>
          <OtpInputs
            inputStyles={{ height: 52, width: 52, textAlign: 'center', borderRadius: 4, borderColor: "#C8E0F9", borderWidth: 1, margin: 4, color: '#000' }}
            handleChange={(code) => console.log(code)}
            numberOfInputs={6}
          />
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 50, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#ACABAF', fontFamily: 'Inter', fontSize: 13}}>
            If you didn't recieve code!
          </Text>
          <TouchableOpacity>
          <Text style={{color: '#4955BB', marginLeft: 5, fontFamily: 'Inter', fontWeight: '500'}}>
            Resend
          </Text>
          </TouchableOpacity>
        </View>
        <FillButton text="Verify and proceed" linearGradient={true} />
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
    fontSize : 13,
    fontFamily: 'Inter',
    color: '#616161',
    lineHeight: 20,
    fontWeight: '400',
    marginTop: 20,
    alignSelf: 'center',
    textAlign: 'center'
  }

})