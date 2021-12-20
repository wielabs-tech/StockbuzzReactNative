import React, { Component, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationsThunk } from '../redux/profile/profile.actions';
import { API_URL } from '../utils/config';


export default Notifications = ({ navigation }) => {

  navigation.setOptions({
    headerLeft: () => <MaterialIcons name='arrow-back' style={{ marginLeft: 10 }} size={24} onPress={() => {
      navigation.goBack();
    }} />,
  })

  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile.profileInfo);
  const notificationsData = useSelector(state => state.profile.notificationData);

  useEffect(async () => {
    await dispatch(getNotificationsThunk(profile?._id?.$oid))
  }, []);

  const x = new Date();
  var UTCseconds = x.getTime() + 330 * 60 * 1000;

  function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    var days = Math.floor(duration / (1000 * 60 * 60) / 24);

    if (days > 0) {
      if (days === 1) return '1 day ago';
      else return days + ' days ago';
    } else if (hours > 0) {
      if (hours === 1) return '1 hour ago';
      else return hours + ' hours ago';
    } else if (minutes > 0) {
      if (minutes === 1) return '1 minute ago';
      else return minutes + ' minutes ago';
    } else {
      if (seconds === 1) return '1 second ago';
      else return seconds + ' seconds ago';
    }
  }

  return (
    <FlatList
      style={styles.root}
      data={notificationsData}
      ItemSeparatorComponent={() => {
        return (
          <View style={styles.separator}/>
        )
      }}
      keyExtractor={(item)=>{
        return item?.id;
      }}
      renderItem={(item) => {
        const Notification = item?.item;
        let attachment = <View/>;
        console.log("ITEM", API_URL + Notification.user.photo)

        let mainContentStyle;
        if(Notification.attachment) {
          mainContentStyle = styles.mainContent;
          attachment = <FastImage style={styles.attachment} source={{uri:Notification.attachment}}/>
        }
        return(
          <View style={styles.container}>
            {
              !!Notification?.user?.photo ? (
                <FastImage source={{uri: API_URL + "/" + Notification.user.photo}} style={styles.avatar}/>
              ) : (
                <MaterialIcons name={"account-circle"} size={54} color={'#aaa'} style={styles.avatar}/>
              )
            }
            <View style={styles.content}>
              <View style={mainContentStyle}>
                <View style={styles.text}>
                  <Text style={styles.name}>{Notification.title}</Text>
                  <Text>{Notification.body}</Text>
                </View>
                <Text style={styles.timeAgo}>
                  2 hours ago
                </Text>
              </View>
              {attachment}
            </View>
          </View>
        );
      }}/>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF"
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'column',
    fontSize: 12,
    flexWrap: 'wrap'
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  img: {
    height: 50,
    width: 50,
    margin: 0
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  timeAgo: {
    fontSize: 10,
    color: "#696969"
  },
  name: {
    fontSize: 14,
    color: "#1E90FF"
  }
});
