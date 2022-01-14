import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { UserFollowItem } from "../components/UserFollowItem";

const FollowingRoute = ({ route }) => {
  const user = useSelector((state) => state.user.user);

  return (
    <FlatList
      data={user?.following_list}
      keyExtractor={(item) => item?._id?.$oid}
      renderItem={({ item }) => <UserFollowItem item={item} />}
    />
  );
};

export default FollowingRoute;
