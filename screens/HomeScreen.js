import React, { useState, useEffect, useRef } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
    StyleSheet,
    View,
    FlatList,
    SafeAreaView,
    RefreshControl,
    Alert,
} from 'react-native'
import ListItem from '../components/ListItem'
import Constants from 'expo-constants'
import axios from 'axios'
//import { newsApiKey } from 'react-native-dotenv'
import { newsApiKey } from '@env'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Loading from '../components/Loading'

const URL = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${newsApiKey}`
const BITCOIN = `https://newsapi.org/v2/everything?q=tesla&from=2021-12-02&sortBy=publishedAt&apiKey=${newsApiKey}`

export default HomeScreen = ({ navigation }) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    // stateとrefの違いは、その値が変わっても画面の再レンダリングが発生しない。refは非同期で即時反映
    // 画面の更新とは関係ないものに使える
    const pageRef = useRef(1)
    const fetchedAllRef = useRef(false)

    useEffect(() => {
        setLoading(true)
        fetchArticles(1)
        setLoading(false)
    }, [])

    const fetchArticles = async (page) => {
        try {
            const response = await axios.get(`${URL}&page=${page}`)
            if (response.data.articles.length > 0) {
                // prevArticlesで前回を参照、それと今回のを合体させる。
                setArticles((prevArticles) => [
                    ...prevArticles,
                    ...response.data.articles,
                ])
            } else {
                fetchArticles.current = true
            }
        } catch {
            console.log(error)
        }
        setLoading(false)
    }

    const alertFunc = () => {
        navigation.navigate('Article', { article: item })
    }

    const onEndReached = () => {
        if (!fetchedAllRef.current) {
            pageRef.current = pageRef.current + 1
            fetchArticles(pageRef.current)
            console.log('vvv')
        } else {
        }
    }

    const onRefresh = async () => {
        setRefreshing(true)
        setArticles([])
        pageRef.current = 1
        fetchedAllRef.current = false
        await fetchArticles(1)
        setRefreshing(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={articles}
                renderItem={({ item }) => (
                    <ListItem
                        imageUrl={item.urlToImage}
                        title={item.title}
                        author={item.author}
                        onPress={() =>
                            navigation.navigate('Article', { article: item })
                        }
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={onEndReached}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            {loading && <Loading />}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    itemContainer: {
        height: 100,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        flexDirection: 'row',
    },
    leftContainer: {
        width: 100,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 16,
    },
    subText: {
        fontSize: 12,
        color: 'gray',
    },
})
