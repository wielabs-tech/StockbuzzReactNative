import React, { useState, Keyboard } from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default CustomInput = ({ labelName, iconName, isPassword, value, setValue, errorMessage, isMobile, isEmail }) => {
  console.log("ISMOBILE", isMobile)
  const [isToggle, setIsToggle] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  if (isPassword) {
    comp = (
      <View>
        <Input
          blurOnSubmit={false}
          secureTextEntry={!isVisible}
          textContentType={'oneTimeCode'}
          blurOnSubmit={true}
          autoCapitalize="none"
          value={value}
          onFocus={() => {
            setIsFocused(true);
          }}
          onChangeText={(text) => {
            if (!!setValue)
              setValue(text)
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          inputContainerStyle={
            isFocused
              ? styles.inputContainerStyle
              : styles.inputContainerStyleBlur
          }
          labelStyle={styles.labelStyle}
          leftIconContainerStyle={styles.leftIconContainerStyle}
          label={labelName}
          leftIcon={{
            type: 'iconicons',
            name: iconName,
            size: 20,
            color: '#ACABAF',
          }}
          style={{ fontSize: 16 }}
        />
        {isVisible ? (
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
            }}
            style={{
              paddingRight: 5,
              height: 52,
              width: 36,
              justifyContent: 'center',
              alignItems: 'flex-end',
              position: 'absolute',
              right: 15,
              top: 20,
              color: '#ACABAF',
            }}>
            <Icon name="visibility-off" size={20} color="#ACABAF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setIsVisible(true);
            }}
            style={{
              paddingRight: 5,
              height: 52,
              width: 36,
              justifyContent: 'center',
              alignItems: 'flex-end',
              position: 'absolute',
              right: 15,
              top: 20,
              color: '#ACABAF',
            }}>
            <Icon name="visibility" size={20} color="#ACABAF" />
          </TouchableOpacity>
        )}
      </View>
    );
  } else {
    comp = (
      <Input
        errorStyle={{ color: 'red', fontSize: 10, marginBottom: 10 }}
        errorMessage={errorMessage}
        blurOnSubmit={true}
        autoCapitalize="none"
        value={value}
        onChangeText={(text) => {
          if (!!setValue)
            setValue(text)
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        inputContainerStyle={
          isFocused
            ? styles.inputContainerStyle
            : styles.inputContainerStyleBlur
        }
        inputContainerStyleError={
          styles.inputContainerStyleError
        }
        labelStyle={styles.labelStyle}
        leftIconContainerStyle={styles.leftIconContainerStyle}
        label={labelName}
        leftIcon={{
          type: 'iconicons',
          name: iconName,
          size: 20,
          color: '#ACABAF',
        }}
        style={{ fontSize: 16 }}
        keyboardType={isMobile ? "numeric" : (isEmail ? "email-address" : "default")}
      />
    );
  }

  return <View>{comp}</View>;
};

const styles = StyleSheet.create({
  leftIconContainerStyle: { marginLeft: 4, marginRight: 4 },
  inputContainerStyle: {
    borderColor: '#C8E0F9',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    height: 52,
    backgroundColor: '#F1F1F9',
  },

  inputContainerStyleBlur: {
    borderColor: '#E2E2E2',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    height: 52,
    backgroundColor: '#FFF',
  },

  inputContainerStyleError: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    height: 52,
    backgroundColor: '#FFF',
  },

  labelStyle: {
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    fontSize: 13,
    marginBottom: 5,
    marginLeft: 8,
  },
});
