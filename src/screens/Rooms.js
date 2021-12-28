import React, { useEffect } from "react";
import colors from "../styles/colors";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Switch,
  Image,
  Button,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Discover from "../components/Discover";
import Subscribed from "../components/Subscribed";
import { Dimensions } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Ionicons";

const renderTabBar = (props) => (
  <TabBar
    pressColor={"transparent"}
    {...props}
    style={{
      backgroundColor: "white",
    }}
    tabStyle={
      {
        // width: "50"
      }
    }
    contentContainerStyle={{
      justifyContent: "center",
      alignItems: "center",
    }}
    labelStyle={{
      fontSize: 14,
      fontWeight: "400",
      textTransform: "capitalize",
      fontFamily: "inter",
      margin: -6,
    }}
    indicatorStyle={{
      height: 4,
      backgroundColor: "#4955BB",
      borderRadius: 2,
      padding: 0,
      width: "16%",
      marginLeft: "13%",
    }}
    activeColor={"#4955BB"}
    inactiveColor={"rgba(0, 0, 0, 0.5)"}
  />
);
function Rooms({ navigation }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Subscribed" },
    { key: "second", title: "Discover" },
  ]);

  const renderScene = SceneMap({
    first: Subscribed,
    second: Discover,
  });

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerShown: true,
      headerTitle: () => <Text style={styles.title}>Rooms</Text>,
      headerRight: () => (
        <View style={styles.setting}>
          <TouchableOpacity></TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateRoom");
            }}
          >
            <AntDesign
              color="#4955BB"
              fontWeight={100}
              name="pluscircle"
              size={24}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          indicatorStyle={{ backgroundColor: "#fff" }}
        />
      </View>
    </SafeAreaView>
  );
}
export default Rooms;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
  },

  containerLeft: {
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#4955BB",
    fontFamily: "SecularOne-Regular",
    fontSize: 20,
    fontWeight: "400",
  },
  arrow: {
    backgroundColor: "#fff",
  },
  arrowbutton: {
    color: "red",
  },
  setting: {
    marginRight: 10,
    display: "flex",
    flexDirection: "row",
  },
});
