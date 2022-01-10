import React from 'react'
import { StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native'
import { WebView } from 'react-native-webview'
import { useDispatch, useSelector } from 'react-redux'
import { addClip } from '../store/actions/user'
import { deleteClip } from '../store/actions/user'

import ClipButton from '../components/ClipButton'
import Loading from '../components/Loading'

export default function AriticleScreen({ route }) {
    const { article } = route.params

    const dispatch = useDispatch()

    const user = useSelector((state) => state.user)
    const { clips } = user
    // someで配列の中に特定要素があるかを探索する
    const isClipped = () => {
        return clips.some((clip) => clip.url === article.url)
    }
    const toggleClip = () => {
        if (isClipped()) {
            dispatch(deleteClip({ clip: article }))
        } else {
            dispatch(addClip({ clip: article }))
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ClipButton onPress={toggleClip} enabled={isClipped()} />
            <WebView
                source={{ uri: article.url }}
                startInLoadingState={true}
                renderLoading={() => <Loading />}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})
