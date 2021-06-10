import React, { useState, useLayoutEffect, useRef, useEffect }from 'react'
import { Text, View, FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { request, getImage } from '../../network/tmdb';
import axios from 'axios'
import MediaCard from '../../components/Media/MediaCard'
import { Ionicons } from '@expo/vector-icons';
import debounce from 'lodash/debounce'
import { ROUTES } from '../../constants/routes'
import styles from './styles'
import CachedImage from 'react-native-expo-cached-image';


export default function Search( { navigation } ) {
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    })

    const source = axios.CancelToken.source()

    async function getSearch(text){

        //If query is not empty
        if (text) {

            await axios.all([
                request('search/movie', {query: text}, { cancelToken: source.token }),
                request('search/tv', {query: text}, { cancelToken: source.token }),
                request('search/person', {query: text}, { cancelToken: source.token })
            ]).then(axios.spread((...responses) => {
    
                setMovies(responses[0].data.results)
                setTV(responses[1].data.results)
                setPeople(responses[2].data.results)
    
            }))
        }

        else {

            setMovies([])
            setTV([])
            setPeople([])
        }

    }

    //Debounce will alleviate it restricting calls and hence rendering per character but see if there is alternate method
    const reference = useRef(null)

    //This is the callback for the clear icon,
    const clearText = () => {

        reference.current.clear()
        setMovies([])
        setTV([])
        setPeople([])
    }
    

    useEffect(() => {
        return () => {source.cancel()}
    }, [])

    const search = debounce((text => {
        getSearch(text)
    }), 1000)


    const [movies, setMovies] = useState([])
    const [tv, setTV] = useState([])
    const [people, setPeople] = useState([])


    const renderItem = (item, media_type) => {
        return media_type == "person" ? personAvatar(item) : <MediaCard item={item} navigation={navigation} type={media_type} />
    }

    const personAvatar = (person) => {
        return (
            <TouchableOpacity style={styles.avatar_container} onPress={() => {navigation.push(ROUTES.PORTFOLIO, {castID: person.id})}}>
            
            {person.profile_path ? 
            
                <CachedImage
                source={{uri: getImage(person.profile_path)}}
                style={styles.avatar}
                />
            
                :
            
                <View style={styles.missing_avatar}>
                    <Text style={styles.initial}>{person.name.substring(0, 1)}</Text>
                </View>
            }
            

            <Text style={styles.name} numberOfLines={1}>{person.name}</Text>
            
        </TouchableOpacity>
        )
    }

    const renderList = (header, data, media_type) => {
        return (

            <View>
                <Text style={styles.header}>{header}</Text>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => item + index }
                    horizontal={true}
                    renderItem={({ item }) => renderItem(item, media_type)}
                />
            </View>
        
        )
    }


    return (
        <View style={styles.container}>
            <ScrollView>
                
                <View style={{marginBottom: 30}}>
                    <Text style={styles.title}>Search</Text>
                    <View style={styles.search_container}>
                        <Ionicons name="search" size={20} color="#828287"/>
                        <TextInput
                            ref={reference}
                            style={styles.searchBar}
                            onChangeText={search}
                            placeholderTextColor="#828287"
                            placeholder="Search Movies, TV &#38; People"/>
                        <Ionicons name="close-circle" size={20} color="#828287" onPress={clearText}/>

                    </View>

                    {movies.length > 0 && 
                        renderList("Movies", movies, "movie")
                    }

                    {tv.length > 0 &&
                        renderList("TV", tv, "tv")
                    }

                    {people.length > 0 && 
                        renderList("People", people, "person")
                    }
                    

                </View>
        
                

            </ScrollView>
        </View>
        
    )
}

