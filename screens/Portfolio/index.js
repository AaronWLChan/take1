import React, {useEffect, useState, useLayoutEffect, useCallback} from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { request } from '../../network/tmdb'
import moment from 'moment'
import MediaRow from '../../components/Media/MediaRow'
import axios from 'axios'
import uniqBy from 'lodash/uniqBy'
import styles from './styles'
import MoreTextModal from '../../components/MoreTextModal'
import LoadingLayout from '../../components/LoadingLayout'
import LargeAvatar from '../../components/People/LargeAvatar'
import { getAge } from '../../utility/person'

export default function Portfolio({ route, navigation }) {
    const { castID } = route.params

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            title: "",
        })

    })

    const source = axios.CancelToken.source()

    async function getDetails(){

        await axios.all([
            request(`person/${castID}`, {}, { cancelToken: source.token }),
            request(`person/${castID}/movie_credits`, {}, { cancelToken: source.token }),
            request(`person/${castID}/tv_credits`, {}, { cancelToken: source.token }),
            
        ])
        .then(axios.spread( (...responses) => {

            setDetails(responses[0].data)
            setMovieCredits(uniqBy(responses[1].data.cast, 'id'))
            setTVCredits(uniqBy(responses[2].data.cast, 'id'))

        }))

        setLoading(false)
    }

    useEffect(() => {
        getDetails()

        return () => {source.cancel()}
    }, [])


    const [details, setDetails] = useState(null)
    const [movieCredits, setMovieCredits] = useState([])
    const [tvCredits, setTVCredits] = useState([])
    const [loading, setLoading] = useState(true)

    //For Expandable text
    const [hasMoreText, setHasMoreText] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)


    const onTextLayout = useCallback(e => {
        setHasMoreText(e.nativeEvent.lines.length >= 4)
    })


    if (loading){
        return <LoadingLayout/>
    }

    return (

        <View style={styles.container}>
              
                <ScrollView bounces={false}>

                    <View style={styles.container}>
                        {details.profile_path ? 
                            <LargeAvatar name={details.name} profilePath={details.profile_path}/>
                    
                        : 
                            <View style={styles.missing_profile_pic}>
                                <Text style={styles.initial}>{details.name.substring(0, 1)}</Text>
                            </View>
                        
                        }
                    
                        <Text style={styles.name}>{details.name}</Text>

                        {details.biography != "" && 
                            <View style={styles.section}>
                                <Text style={styles.section_title}>Biography</Text>

                                <TouchableOpacity>
                                    <Text
                                        style={styles.text}
                                        numberOfLines={4}
                                        onTextLayout={onTextLayout}
                                        onPress={() => {hasMoreText ? setModalVisible(true) : {}}}
                                    >{details.biography}</Text>
                                </TouchableOpacity>

                                <MoreTextModal title="Biography" text={details.biography} modalVisible={modalVisible} onModalDismiss={() => setModalVisible(false)}/>


                            </View>
                        }

                        {details.birthday && 
                            <View>
                                <View style={styles.section}>
                                    <Text style={styles.section_title}>Age</Text>
                                    <Text style={styles.text}>{getAge(details.birthday)}</Text>           
                                </View>
    
                                <View style={styles.section}>
                                    <Text style={styles.section_title}>Date of Birth</Text>
                                    <Text style={styles.text}>{details.birthday}</Text>
                                </View>

                            </View>
                            
                        
                        }
                    
                        {movieCredits.length > 0 && 
                            <MediaRow header="Movie Credits" movies={movieCredits} navigation={navigation} type="movie"/>
                        }

                        {tvCredits.length > 0 && 
                            <MediaRow header="TV Credits" movies={tvCredits} navigation={navigation} type="tv"/>
                        }

                    </View>

                </ScrollView>
              
        </View>

      
    )
}


