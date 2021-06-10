import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react'
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { request } from '../../network/tmdb'
import EpisodeCard from '../../components/TV/EpisodeCard'
import styles from './styles'
import MoreTextModal from '../../components/MoreTextModal'
import LoadingLayout from '../../components/LoadingLayout'
import axios from 'axios'

//Displays all episodes for given Season
export default function EpisodeList( { navigation, route } ) {

    const { tv_id, season_number } = route.params

    const source = axios.CancelToken.source()


    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            title: "Season " + season_number
        })
    })

    async function getDetails(){
        await request(`tv/${tv_id}/season/${season_number}`, {}, { cancelToken: source.token })
        .then((response) => {
            setSeason(response.data)
            setEpisodes(response.data.episodes)
            
        })

        setLoading(false)
    }

    useEffect(() => {
        getDetails()

        return () => {source.cancel()}

    }, [])

    const [episodes, setEpisodes] = useState([])
    const [season, setSeason] = useState(null)
    const [loading, setLoading] = useState(true)

    const [modalVisible, setModalVisible] = useState(false)
    const [hasMoreText, setHasMoreText] = useState(false)

    
    const onTextLayout = useCallback(e => {
        setHasMoreText(e.nativeEvent.lines.length >= 3)
    })

    const renderItem = ({ item }) => (<EpisodeCard episode={item} tv_id={tv_id} season_number={season_number} navigation={navigation}/>)

    const renderHeader = () => {

        if (!season.overview){
            return null
        }

        return (
            
            <View style={{marginHorizontal: 8, marginBottom: 24}}>
                    <Text style={styles.header}>Overview</Text>
                    
                    <TouchableOpacity>
                        <Text style={styles.text} numberOfLines={3}  onTextLayout={onTextLayout} onPress={() => {hasMoreText ? setModalVisible(true) : {}}}>{season.overview}</Text>
                    </TouchableOpacity>


            </View>
        )
    }

    if (loading){
        return <LoadingLayout/>
    }

    return (

        <View style={styles.container}>

            {loading ? <ActivityIndicator/> 
            : 
                <View>
                    <FlatList
                        style={{paddingVertical: 16}}
                        data={episodes}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        ListHeaderComponent={renderHeader}
                    />

                    <MoreTextModal title="Overview" text={season.overview} modalVisible={modalVisible} onModalDismiss={() => setModalVisible(false)}/>

                </View>
            }
     
        </View>
    )
}
