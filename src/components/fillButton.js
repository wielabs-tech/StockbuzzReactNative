import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { ActivityIndicator } from "react-native-paper";

export default FillButton = ({ text, onPress, linearGradient, isLoading }) => {
  let btn;

  if (linearGradient) {
    btn = (
      <View>
        <TouchableOpacity onPress={onPress}>
          <LinearGradient
            colors={["#5B72FF", "#3d56f0"]}
            start={{ x: 1, y: 0 }}
            style={styles.btnStyleFillGradient}
            end={{ x: 0, y: 0 }}
            angle={267.35}
          >
            <View style={styles.viewStyle}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.textStyle}>{text}</Text>
              )}
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  } else {
    btn = (
      <View>
        <TouchableOpacity style={styles.btnStyleFill} onPress={onPress}>
          <View style={styles.viewStyle}>
            <Text style={{ alignSelf: "center" }}>{text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return <View>{btn}</View>;
};

var styles = StyleSheet.create({
  viewStyle: {
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },

  btnStyleFill: {
    margin: 5,
    borderRadius: 10,
    height: 50,
    width: "80%",
    alignSelf: "center",
    color: "#fff",
    backgroundColor: "#fff",
  },
  btnStyleFillGradient: {
    margin: 5,
    borderRadius: 8,
    height: 52,
    width: "95%",
    alignSelf: "center",
    color: "#fff",
    backgroundColor: "#fff",
  },
  textStyle: {
    alignSelf: "center",
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
});
