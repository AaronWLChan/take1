import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { request, getImage } from '../../network/tmdb';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import MediaRow from '../../components/Media/MediaRow';
import CastListRow from '../../components/People/CastListRow'
import SeasonListRow from '../../components/TV/SeasonListRow'
import styles from './styles'
import { convertMinutesToHoursAndMinutes } from '../../utility/media'
import MoreTextModal from '../../components/MoreTextModal'
import CachedImage from 'react-native-expo-cached-image'
import LoadingLayout from '../../components/LoadingLayout'
import { useSelector } from 'react-redux'

export default function MediaDetails({ route, navigation }) {

    const { id, type } = route.params
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            title: ""
        })
    })

    const source = axios.CancelToken.source()

    const includeAdult = useSelector((state) => state.adult)

    async function getDetails(){

        await axios.all([
            request(`${type}/${id}`, {}, { cancelToken: source.token }),
            request(`${type}/${id}/similar`, {}, { cancelToken: source.token }),
            request(`${type}/${id}/recommendations`, {}, { cancelToken: source.token }),
            request(`${type}/${id}/credits`, {}, { cancelToken: source.token }),
        ])
        .then(axios.spread( (...responses) => {

            setItem(responses[0].data)

            let similar = responses[1].data.results

            similar = includeAdult ? similar : similar.filter((media) => !media.adult || media.adult === undefined)

            let recommended = responses[2].data.results

            recommended = includeAdult ? recommended : recommended.filter((media) => !media.adult || media.adult === undefined)

            setSimilar(similar)
            setSimilarPageCount(responses[1].data.total_pages)
            setRecommendations(recommended)
            setRecommendationPageCount(responses[2].data.total_pages)

            setCast(responses[3].data.cast)

        }))

        setLoading(false)
    }


    useEffect(() => {
        getDetails()

        return () => {source.cancel()}
    }, [includeAdult])

    //Movie
    const [item, setItem] = useState(null)

    //Cast
    const [cast, setCast] = useState([])

    //Similar movies
    const [similar, setSimilar] = useState([])
    const [similarPageCount, setSimilarPageCount] = useState(0)

    //Recommendations
    const [recommendations, setRecommendations] = useState([])
    const [recommendationPageCount, setRecommendationPageCount] = useState(0) 

    //Watch Providers (link) may change to actual links

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
          
            
            <ScrollView
             horizontal= {false}
             bounces={false}
             showsVerticalScrollIndicator={false}
             >
                
                <View>

                    {item.backdrop_path && 
                         <CachedImage
                         isBackground
                         source = {{ uri: getImage(item.backdrop_path, "w780") }}
                         style = {styles.backdrop}
                            >
                            <LinearGradient
                            colors={['transparent', '#000']}
                            style={styles.gradient}/>
                     </CachedImage>
                    
                    }
                   
                     <View style={item.backdrop_path ? styles.header_container : styles.header_image_missing}>
                        <Text style={styles.title}>{type == 'movie' ? item.title : item.name}</Text>
                     </View>

                     <View style={styles.subheader_container}>
                        <View style={styles.rating_container}>
                                <Text style={item.vote_average >= 7.0 ? styles.goodRating : (item.vote_average >= 4.0 ? styles.moderateRating : styles.badRating) }>{item.vote_average.toFixed(1)}</Text>
                        </View>
                     </View>

                    <View style={styles.detail_container}>

                        <View style={styles.section}>
                            <Text style={styles.section_title}>Overview</Text>
                            <TouchableOpacity>
                            <Text style={styles.text} onTextLayout={onTextLayout} numberOfLines={4} onPress={() => {hasMoreText ? setModalVisible(true) : {}}}>{item.overview}</Text>
                            </TouchableOpacity>
                        </View>

                        <MoreTextModal title="Overview" text={item.overview} modalVisible={modalVisible} onModalDismiss={() => setModalVisible(false)}/>

                        <View style={styles.section}>
                            <Text style={styles.section_title}>Status</Text>
                            <Text style={styles.text}>{item.status}</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.section_title}>{type == 'movie' ? 'Release Date' : 'First Aired'}</Text>
                            <Text style={styles.text}>{type == 'movie' ? item.release_date : item.first_air_date}</Text>
                        </View>

                        {item.runtime != null &&
                            <View style={styles.section}>
                                <Text style={styles.section_title}>Runtime</Text>
                                <Text style={styles.text}>{convertMinutesToHoursAndMinutes(item.runtime)}</Text>
                            </View>
                        }
               
                        <View style={styles.section}>
                            <Text style={styles.section_title}>Languages</Text>

                            <View style={styles.horizontal_container}>
                                {item.spoken_languages.map((o) => {
                                    return <Text key={o.iso_639_1} style={styles.text}>{o.english_name}</Text>
                                })}
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.section_title}>Genres</Text>
                            {item.genres.map((o) => {
                                    return <Text key={o.id} style={styles.text}>{o.name}</Text>
                                })}
                        </View>

                        {/* Seasons */}
                        {item.seasons && 
                            <SeasonListRow tv_id={id} seasons={item.seasons} navigation={navigation}/>
                        }
                        
                        {cast.length > 0 && 
                            <CastListRow cast={cast} navigation={navigation}/>
                        }

                        {similar.length > 0 && 
                            <MediaRow 
                                header="Similar" 
                                movies={similar} 
                                navigation={navigation} 
                                type={type} 
                                category="similar"
                                identifier={id} 
                                totalPages={similarPageCount}/>
                        }

                        {recommendations.length > 0 && 
                            <MediaRow 
                                header="Recommendations" 
                                movies={recommendations} 
                                navigation={navigation} 
                                type={type} 
                                category="recommendations"
                                identifier={id}
                                totalPages={recommendationPageCount}/>

                        }


                    </View>

                   

                </View>
                
             
             

            </ScrollView>

            
            
        </View>
    )
}
