import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { UserFollowItem } from "../components/UserFollowItem";

const FollowersRoute = ({ route }) => {
  const user = useSelector((state) => state.user.user);
  return (
    <FlatList
      data={user?.followers_list}
      keyExtractor={(item) => item?.$oid}
      renderItem={({ item }) => <UserFollowItem item={item} />}
    />
  );
};

export default FollowersRoute;
