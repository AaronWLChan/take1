import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { request } from '../../network/tmdb'
import CastListRow from '../../components/People/CastListRow'
import ImageListRow from '../../components/ImageListRow'
import styles from './styles'
import MoreTextModal from '../../components/MoreTextModal'
import LoadingLayout from '../../components/LoadingLayout'
import axios from 'axios'

export default function EpisodeDetails({ navigation, route }) {

    const { tv_id, season_number, episode_number } = route.params

    const source = axios.CancelToken.source()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            title: ""
        })
    })

    async function getDetails(){
        await request(`tv/${tv_id}/season/${season_number}/episode/${episode_number}`, {append_to_response: "images"}, { cancelToken: source.token })
            .then((response) => {
                setEpisode(response.data)
            })

        setLoading(false)

    }

    useEffect(() => {
        getDetails()

        return () => {source.cancel()}
    }, [])

    const [episode, setEpisode] = useState(null)
    const [loading, setLoading] = useState(true)

    const [hasMoreText, setHasMoreText] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const onTextLayout = useCallback(e => {
        setHasMoreText(e.nativeEvent.lines.length >=4)
    })
    
    if (loading){
        return (
            <LoadingLayout/>
        )
    }

    return (
        
        <View style={styles.container}>

            <ScrollView>

                <View style={{paddingBottom: 40}}>
                    <Text style={styles.title}>{episode.season_number == 0 ? episode.name : `S${season_number}E${episode_number}: ${episode.name}`}</Text>


                    <View style={styles.section}>
                        <Text style={styles.section_title}>Overview</Text>
                        <TouchableOpacity>
                            <Text onTextLayout={onTextLayout} numberOfLines={4} onPress={() => {hasMoreText ? setModalVisible(true) : {}}} style={styles.text}>{episode.overview}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.section_title}>First Aired</Text>
                        <Text numberOfLines={4} style={styles.text}>{episode.air_date}</Text>
                    </View>

                    {episode.images.stills.length > 0 && 
                        <ImageListRow images={episode.images.stills}/>
                    }

                    <CastListRow cast={episode.crew} navigation={navigation} header="Crew"/>

                    <CastListRow cast={episode.guest_stars} navigation={navigation} header="Guest Stars"/>

                    <MoreTextModal title="Overview" text={episode.overview} modalVisible={modalVisible} onModalDismiss={() => {setModalVisible(false)}}/>

                </View>

               

            </ScrollView>


        </View>
    )
}
