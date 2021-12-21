import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { profileAPI } from '../api/ajax'
import { getMyPostsThunk, getUserPostsThunk } from '../redux/profile/profile.actions'
import PostRoute from './PostRoute'

export const UserPostsRoute = ({route}) => {

    const [response, setResponse] = useState("");
    const dispatch = useDispatch();
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(async () => {
        await loadPosts();
    }, []);

    async function loadPosts() {
        const r = await dispatch(getUserPostsThunk(route?.profile))
        setResponse(r.data)
    }

    async function refresh() {
        setIsRefreshing(true)
        const r = await dispatch(getUserPostsThunk(route?.profile))
        setResponse(r.data)
        setIsRefreshing(false)
    }

    return (
        <FlatList
            style={{ flex: 1 }}
            refreshing={isRefreshing}
            onRefresh={() => {
                refresh();
            }}
            nestedScrollEnabled
            data={response}
            renderItem={({ item }) => {
                return (
                    <PostRoute
                        item={item}
                    />
                );
            }}
            keyExtractor={item => item?._id?.$oid}
        />
    )
}