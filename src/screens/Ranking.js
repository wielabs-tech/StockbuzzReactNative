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
import Icon from "react-native-vector-icons/Ionicons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Buzzing from "./Buzzing";
import MostActive from "./MostActive";
import Watchers from "./Watchers";
import RankingItem from "../components/RankingItem";
import { useDispatch } from "react-redux";

const renderTabBar = (props) => (
  <TabBar
    pressColor={"transparent"}
    {...props}
    style={{
      backgroundColor: "white",
    }}
    tabStyle={{
      marginHorizontal: 8,
    }}
    contentContainerStyle={{
      justifyContent: "center",
      alignItems: "center",
    }}
    labelStyle={{
      fontSize: 14,
      fontWeight: "500",
      textTransform: "capitalize",
      fontFamily: "inter",
    }}
    indicatorStyle={{
      borderRadius: 2,
      height: 4,
      backgroundColor: "#4955BB",
    }}
    activeColor={"#4955BB"}
    inactiveColor={"rgba(0, 0, 0, 0.5)"}
  />
);

function Ranking({ navigation }) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Buzzing" },
    { key: "third", title: "Watchers" },
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#fff",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerShown: true,
      headerTitle: () => <Text style={styles.title}>Rankings</Text>,
    });
  }, []);
  const renderScene = SceneMap({
    first: RankingItem,
    third: Watchers,
  });
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

export default Ranking;

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
    display: "flex",
    flexDirection: "row",
  },
});
