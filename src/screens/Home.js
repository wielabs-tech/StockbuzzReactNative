import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import { Input } from "react-native-elements";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import { GroupItem } from "../components/GroupItem";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PostRoute from "./PostRoute";
import ItemHome from "../components/ItemHome";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions } from "react-native";
import WatchlistHome from "../components/WatchlistHome";
import { useNavigation } from "@react-navigation/native";
import {
  getDiscoverRoomsThunk,
  getMyRoomsThunk,
} from "../redux/rooms/rooms.actions";
import {
  getCryptoSearchThunk,
  getCryptoThunk,
} from "../redux/stocks/stocks.actions";
const { width, height } = Dimensions.get("window");

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

export default HomeScreen = ({ params }) => {
  console.log("THEPARAMS", params);
  const [selectedId, setSelectedId] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profileInfo);
  const myRooms = useSelector((state) => state.rooms.myRooms);
  const discoverRooms = useSelector((state) => state.rooms.discoverRooms);
  const cryptos = useSelector((state) => state.stocks.stockSearch);

  useEffect(() => {
    dispatch(getMyRoomsThunk(profile?._id?.$oid));
    dispatch(getDiscoverRoomsThunk(profile?._id?.$oid));
    // await dispatch(getCryptoSearchThunk());
    // await dispatch(getCryptoThunk());
  }, []);

  const renderItem = ({ item }) => {
    const isParticipant = myRooms?.find(
      (element) => element?._id?.$oid == item?._id?.$oid
    );
    if (!isParticipant) {
      return <GroupItem item={item} isParticipant={isParticipant} />;
    }
  };

  const renderItemMyRooms = ({ item }) => {
    return <GroupItem item={item} isParticipant={true} />;
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "post", title: "Buzzing " },
    { key: "watchlist", title: "Watchlist" },
  ]);

  const renderScene = SceneMap({
    post: ItemHome,
    watchlist: WatchlistHome,
  });

  const renderTabBar = (props) => (
    <TabBar
      tabStyle={{
        width: width / 4,
      }}
      pressColor={"transparent"}
      {...props}
      style={{
        elevation: 0,
        backgroundColor: "white",
        paddingTop: 4,
      }}
      labelStyle={{
        fontSize: 14,
        fontWeight: "500",
        textTransform: "capitalize",
        fontFamily: "inter",
      }}
      indicatorStyle={{
        height: 4,
        borderRadius: 4,
        backgroundColor: "#4955BB",
      }}
      activeColor={"#4955BB"}
      inactiveColor={"#00000080"}
    />
  );

  const layout = useWindowDimensions();

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
      <StatusBar
        animated={true}
        barStyle="dark-content"
        backgroundColor="#fff"
      />
      <View style={{ marginTop: 10, height: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            height: 52,
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={{ width: "90%" }}
            onPress={() => {
              console.log("SEARCH");
              navigation.push("searchScreen");
            }}
          >
            <Input
              style={{ zIndex: 1 }}
              placeholder="Search for symbol"
              rightIcon={{
                type: "iconicons",
                name: "search",
                size: 20,
                color: "#ACABAF",
              }}
              editable={true}
              inputStyle={{ fontSize: 14 }}
              onFocus={() => {
                // do something
                console.log("SEARCH");
                navigation.push("searchScreen");
              }}
              inputContainerStyle={styles.inputContainerStyleBlur}
            />
          </TouchableOpacity>
          <MaterialIcons
            onPress={() => {
              navigation.navigate("notificationsScreen");
            }}
            name="notifications"
            size={24}
            style={{ marginRight: 10 }}
          />
        </View>
        <View style={{ marginLeft: 10, marginTop: 10 }}>
          <Text
            style={{
              marginBottom: 5,
              fontSize: 16,
              color: "#4955BB",
              marginLeft: 5,
              fontWeight: "600",
            }}
          >
            Groups
          </Text>
          <FlatList
            style={{ backgroundColor: "#fff" }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={discoverRooms}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.$oid}
            extraData={selectedId}
          />
        </View>
        <View style={{ marginLeft: 10, marginTop: 10 }}>
          <Text
            style={{
              marginBottom: 5,
              fontSize: 16,
              color: "#4955BB",
              marginLeft: 5,
              fontWeight: "600",
            }}
          >
            My Groups
          </Text>
          <FlatList
            style={{ backgroundColor: "#fff" }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={myRooms}
            renderItem={renderItemMyRooms}
            keyExtractor={(item) => item._id.$oid}
            extraData={selectedId}
          />
        </View>
        <View style={{ flexDirection: "row", flex: 1, paddingBottom: 10 }}>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            indicatorStyle={{ backgroundColor: "#fff" }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 30,
              right: 10,
              fontSize: 10,
              color: "#aaa",
            }}
            onPress={() => {
              navigation.navigate("editWatchlist");
            }}
          >
            <Text style={{ color: "#aaa", fontSize: 10 }}>Edit watchlist</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 10,
          position: "absolute",
          bottom: 20,
          right: 20,
          height: 65,
          width: 65,
          backgroundColor: "#fff",
          borderRadius: 100,
          justifyContent: "center",
        }}
        onPress={() => {
          navigation.push("createPost", { groupPost: false, prefill: "" });
        }}
      >
        <LinearGradient
          colors={["#0063F5", "#4955BB"]}
          start={{ x: 1, y: 0 }}
          style={styles.fab}
          end={{ x: 0, y: 0 }}
          angle={267.35}
        >
          <View style={styles.fab}>
            <MaterialIcons
              style={{ alignSelf: "center" }}
              name="edit"
              size={24}
              color="#fff"
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  leftIconContainerStyle: { marginLeft: 4, marginRight: 4 },
  inputContainerStyle: {
    width: "70%",
    borderColor: "#C8E0F9",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    height: 48,
    backgroundColor: "#F1F1F9",
  },

  inputContainerStyleBlur: {
    marginTop: 24,
    borderColor: "#E2E2E2",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 52,
    backgroundColor: "#FFF",
  },
  item: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 100,
    borderRadius: 10,
    height: 200,
    padding: 10,
    marginVertical: 4,
    marginRight: 10,
  },
  title: {
    fontSize: 32,
  },

  box: {
    overflow: "hidden",
    shadowColor: "#5B72FF",
    shadowOffset: { width: 6, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },

  viewStyle: {
    height: "100%",
    justifyContent: "space-between",
  },

  fab: {
    justifyContent: "center",
    alignSelf: "center",
    height: 60,
    width: 60,
    borderRadius: 100,
  },
});
