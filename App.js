import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native'
import ListItem from './components/ListItem'
import dummyArticles from './dummies/articles.json'
import Constants from 'expo-constants'
import axios from 'axios'
//import { newsApiKey } from 'react-native-dotenv'
import { newsApiKey } from '@env'

const URL = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${newsApiKey}`
const BITCOIN = `https://newsapi.org/v2/everything?q=tesla&from=2021-12-02&sortBy=publishedAt&apiKey=${newsApiKey}`

export default function App() {
    const [articles, setArticles] = useState([])
    useEffect(() => {
        fetchArticles()
    }, [])

    const fetchArticles = async () => {
        try {
            const response = await axios.get(URL)
            setArticles(response.data.articles)
            console.log(response)
        } catch {
            console.log(error)
        }
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
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
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
