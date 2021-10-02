import React from 'react'
import colors from '../styles/colors'
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
  useWindowDimensions
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Preferences from "../components/Preferences"
import Connections from "../components/Connections"
import Blocked from "../components/Blocked"
import { Muted } from '../components/Muted';
import { useSelector } from 'react-redux';

const renderTabBar = props => (
  <TabBar
    pressColor={'transparent'}
    {...props}
    style={{
      backgroundColor: 'white',
    }}
    tabStyle={{
      // width: "50"
    }}
    contentContainerStyle={{
      justifyContent: 'center',
      alignItems: "center"
    }}
    labelStyle={{
      fontSize: 14,
      fontWeight: '400',
      textTransform: 'capitalize',
      fontFamily: "inter",
      margin: -6
    }}
    indicatorStyle={{
      height: 4,
      backgroundColor: '#4955BB',
      borderRadius: 2,
      padding: 0,

    }}
    activeColor={'#4955BB'}
    inactiveColor={'rgba(0, 0, 0, 0.5)'}
  />
);
function Setting({ navigation }) {
  const layout = useWindowDimensions();
  const profile = useSelector(state => state.profile.profileInfo);
  console.log("PROFILESETTINGS", profile)
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Preferences' },
    { key: 'second', title: 'Connections' },
    { key: 'third', title: 'Blocked' },
    { key: 'forth', title: 'Muted' }

  ]);

  const renderScene = SceneMap({
    first: Preferences,
    second: Connections,
    third: Blocked,
    forth: Muted,

  });
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TabView
          scrollEnabled={true}
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
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: "#fff"
  },
});

export default Setting;
