import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import { SafeAreaView } from 'react-native-safe-area-context';
import Welcome from '../screens/Welcome';
import LoginScreen from '../screens/Login';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import messaging from '@react-native-firebase/messaging';
import CreateAccount from '../screens/CreateAccount';
import { Text, StyleSheet, View, TouchableOpacity, Platform, Alert } from 'react-native'
import Ranking from '../screens/Ranking'
import Groups from '../screens/Groups'
import Profile from '../screens/Profile'
import EmailOTP from '../screens/EmailOTP';
import StockScreen from '../screens/StockPage';
import PostCreate from '../screens/PostCreate';
import ForgotPassword from '../screens/ForgotPassword';
import Rooms from '../screens/Rooms';
import { useDispatch, useSelector } from 'react-redux';
import SearchScreen from '../screens/SearchScreen';
import Setting from '../screens/Setting';
import { CreateRoom } from '../screens/CreateRoom';
import UserProfile from '../screens/UserProfile';
import FillYourDetails from '../screens/FillYourDetails';
import PostScreen from '../screens/PostScreen';
import GroupPage from '../screens/GroupPage';
import { getProfileInfoThunk } from '../redux/profile/profile.actions';
import Messages from '../screens/Messages';
import MessageRoom from '../screens/MessageRoom';
import EditWatchList from '../screens/EditWatchList';
import Notifications from '../screens/NotificationsScreen';


const Stack = createStackNavigator();

const ProfileScreen = () => {
  return <Text>Profile</Text>;
};

const Back = () => {
  return <Icon name="arrow-back" />;
};

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      labeled={true}
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#4955BB',
      }}
      navigationOptions={{
        header: {
          visible: true,
        },
      }}
      activeColor="#4955BB"
      barStyle={{ backgroundColor: 'white' }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupsNavigator}
        options={{
          tabBarLabel: 'Groups',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Ranking"
        component={RankingNavigator}
        options={{
          tabBarLabel: 'Ranking',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="equalizer" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesNavigator}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const RankingStack = createStackNavigator();
const RankingNavigator = () => (
  <RankingStack.Navigator>
    <RankingStack.Screen
      name="Ranking"
      component={Ranking}
    />
  </RankingStack.Navigator>
);

const MessagesStack = createStackNavigator();
const MessagesNavigator = () => (
  <MessagesStack.Navigator>
    <MessagesStack.Screen
      name="Messages"
      component={Messages}
    />
  </MessagesStack.Navigator>
)

const ProfileStack = createStackNavigator();
const ProfileNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
    />
  </ProfileStack.Navigator>
);

const GroupsStack = createStackNavigator();
const GroupsNavigator = () => (
  <GroupsStack.Navigator>
    <GroupsStack.Screen
      name="Groups"
      component={Rooms}
    />
  </GroupsStack.Navigator>
);

export default AppNavigation = ({initialRouteName}) => {

  const profileInfo = useSelector(state => state.profile.profile);
  const isLoggedIn = useSelector(state => state.auth.isLoggedin);
  const isAuthorized = useSelector(state => state.auth.isAuthorized);
  const is_verified = useSelector(state => state.auth.is_verified);
  const dispatch = useDispatch();

  requestUserPermission();
  // registerAppWithFCM();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);


  // useEffect(() => {
  //   dispatch(getProfileInfoThunk(profileInfo?._id?.$oid))
  //   console.log("PROFILEINFO", profileInfo)
  // }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
        }}>
        {!isLoggedIn && !isAuthorized ? (
          <>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
            />
            <Stack.Screen
              name="OTP"
              component={EmailOTP}
            />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        ) : isAuthorized ? <Stack.Screen name="FillYourDetails" component={FillYourDetails}
          options={{
            headerShown: false,
          }}
        /> : (
          <>
            <Stack.Screen name="Home" component={MyTabs}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="searchScreen" component={SearchScreen} />
            <Stack.Screen name="stockScreen" component={StockScreen}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen name="createPost" component={PostCreate}
              options={{
                headerShown: true,
                headerTitle: 'Create Post'
              }}
            />
            <Stack.Screen name="settings" component={Setting}
              options={{
                headerShown: true,
                headerTitle: 'Settings'
              }}
            />
            <Stack.Screen name="CreateRoom" component={CreateRoom}
              options={{
                headerShown: true,
                headerTitle: 'Settings'
              }}
            />
            <Stack.Screen name="UserProfile" component={UserProfile}
              options={{
                headerShown: true,
                headerTitle: 'Settings'
              }}
            />
            <Stack.Screen name="postScreen" component={PostScreen}
              options={{
                headerShown: true,
                headerTitle: 'Post'
              }}
            />
            <Stack.Screen name="notificationsScreen" component={Notifications}
              options={{
                headerShown: true,
                headerTitle: 'Notifications'
              }}
            />
            <Stack.Screen name="editWatchlist" component={EditWatchList}
              options={{
                headerShown: true,
                headerTitle: 'Post',
                headerStyle: {
                  shadowRadius: 0,
                  shadowOffset: {
                    height: 0,
                  },
                },
              }}
            />
            <Stack.Screen name="groupPage" component={GroupPage}
              options={{
                headerShown: true,
                headerTitle: 'Group'
              }}
            />
            <Stack.Screen
              name='MessageRoom'
              component={MessageRoom}
              options={({ route }) => ({
                headerShown: true,
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    alignSelf: 'center',
    color: '#4955BB',
    fontFamily: 'SecularOne-Regular',
    fontSize: 20,
    fontWeight: '400',
  },
  arrow: {
    backgroundColor: "#fff",

  },
  arrowbutton: {
    color: "red",

  },
  setting: {
    display: "flex",
    flexDirection: "row"
  }

});
