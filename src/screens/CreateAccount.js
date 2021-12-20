import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Switch,
  ToastAndroid,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import CustomInput from '../components/custominput';
import { useDispatch } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { signup, signUpThunk } from '../redux/auth/auth.actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FastImage from 'react-native-fast-image';

export default CreateAccount = ({ navigation }) => {

  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [isAccept, setAccept] = useState(true);
  const [image, setImage] = useState('');
  const toggleSwitch = () => setAccept(previousState => !previousState);

  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      maxFiles: 5,
    })
      .then(ima => {
        setImage(ima);
        console.log(image);
      })
      .catch(err => {
        console.log('openCamera catch' + err.toString());
      });
  };

  //hello


  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.container}>
          <Icon
            name="arrow-back"
            size={24}
            style={{ marginTop: 20 }}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.title}>Create Account!</Text>
          <Text style={styles.subTitle}>It's Free and easy to setup</Text>
          <View style={{ width: '100%', justifyContent: 'center' }}>
            <View style={{ alignSelf: 'center' }}>
              {
                image ? (
                  <FastImage
                    style={{ height: 100, width: 100, borderRadius: 50 }}
                    source={{
                      uri: image.path || image.uri
                    }}
                  />
                ) : (
                  <MaterialIcons name="account-circle" size={100} color="#e1e1e1" />
                )
              }
              <TouchableOpacity style={{ height: 24, width: 24, backgroundColor: '#000000ee', position: 'absolute', bottom: 5, right: 5, justifyContent: 'center', borderRadius: 50 }} onPress={() => { uploadImage() }}>
                <MaterialIcons name="edit" size={16} color={'white'} style={{ alignSelf: 'center' }} />
              </TouchableOpacity>
            </View>
          </View>
          <CustomInput
            value={fullName}
            setValue={setFullName}
            labelName="Full Name"
            iconName="person"
            isPassword={false}
          />
          <CustomInput
            value={userName}
            setValue={setUserName}
            labelName="Username"
            iconName="person"
            isPassword={false}
          />
          <CustomInput
            value={email}
            setValue={setEmail}
            labelName="Enter your email id"
            iconName="email"
            isEmail={true}
            isPassword={false}
          />
          <CustomInput
            value={mobile}
            setValue={setMobile}
            labelName="Mobile Number"
            iconName="phone"
            isMobile={true}
            isPassword={false}
          />
          <CustomInput
            value={password}
            setValue={setPassword}
            labelName="Password"
            iconName="lock"
            isPassword={true}
          />
          <CustomInput
            value={passwordConfirm}
            setValue={setPasswordConfirm}
            labelName="Confirm Password"
            iconName="lock"
            isPassword={true}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Switch
              value={isAccept}
              onChange={toggleSwitch}
            />
            <Text style={{ color: '#ACABAF' }}>
              {"  "}I accept the terms and conditions
            </Text>
          </View>
          <FillButton text="Verify and proceed" linearGradient={true} onPress={async () => {
            try {
              if(password === passwordConfirm){
                console.log("INPUTS", email + "\n" + password + "\n" + userName + "\n" + fullName + "\n" + mobile + "\n" + image)
                await messaging().registerDeviceForRemoteMessages();
                const token = await messaging().getToken();
                console.log("THIS IS TOKEN" + Platform.OS, token)
                const err = await dispatch(signUpThunk(email,
                  password,
                  userName,
                  fullName,
                  mobile,
                  image,
                  "-1",
                  token
                ))
                console.log("ERRR", err)
                if (!!err)
                  Toast.show(err?.response?.data?.msg, Toast.LONG);
              } else {
                Toast.show("Passwords don't match", Toast.LONG)
              }
              
            }
            catch (e) {
              console.log("SIGNUPERROR");
            }
          }} />
          <Text
            style={{
              color: '#ACABAF',
              textAlign: 'center',
              marginTop: 30,
              marginBottom: 30,
              marginHorizontal: 50,
            }}>
            By registering you are agree to term and conditions and privacy
            policy of the Stockbuzz
          </Text>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    alignSelf: 'center',
    color: '#5B72FF',
    fontFamily: 'SecularOne-Regular',
    fontSize: 36,
    fontWeight: '400',
  },

  subTitle: {
    marginBottom: 30,
    marginTop: 5,
    alignSelf: 'center',
    fontSize: 14,
    color: '#12121D3C',
  },
});
