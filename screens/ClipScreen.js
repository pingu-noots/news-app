import React from 'react'
import { useSelector } from 'react-redux'
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native'

import ListItem from '../components/ListItem'

export default function ClipScreen({ navigation }) {
    const user = useSelector((state) => state.user)
    const { clips } = user

    return (
        <SafeAreaView>
            <FlatList
                data={clips}
                renderItem={({ item }) => (
                    <ListItem
                        imageUrl={item.urlToImage}
                        title={item.title}
                        author={item.author}
                        onPress={() =>
                            navigation.navigate('Article', { article: item })
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            />
        </SafeAreaView>
    )
}
