import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Text, View, FlatList } from 'react-native'
import { request } from '../../network/tmdb';
import MediaRow from '../../components/Media/MediaRow';
import axios from 'axios';
import styles from './styles'
import { WATCH_PROVIDERS } from '../../constants/media'
import { useSelector } from 'react-redux'

const mediaCategories = [
  {
    title: "Trending Movies",
    type:  "movie",
    category: "discover",
  },

  {
    title: "Trending TV",
    type: "tv",
    category: "discover",
  },

  {
    title: "Now Showing",
    type: "movie",
    category: "now_playing",
  },

  {
    title: "Coming soon...",
    type: "movie",
    category: "upcoming",
  },

  {
    title: "Netflix Movies",
    type: "movie",
    category: "provider",
    identifier: WATCH_PROVIDERS.NETFLIX
  },

  {
    title: "Amazon Prime Movies",
    type: "movie",
    category: "provider",
    identifier: WATCH_PROVIDERS.AMAZON
  },

  {
    title: "Disney Plus Movies",
    type: "movie",
    category: "provider",
    identifier: WATCH_PROVIDERS.DISNEY_PLUS
  },

  {
    title: "Apple TV Plus",
    type: "tv",
    category: "provider",
    identifier: WATCH_PROVIDERS.APPLE_TV
  },

]

export default function Discover({ navigation }) {
    
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false
      })
    })

    
    const country = useSelector((state) => state.country)
    const includeAdult = useSelector((state) => state.adult)

    //Include adult may not work or be accurate due to the API.
    //Note: Oversight of API as TV does not have either a adult search param or attribute, therefore cannot filter
    const source = axios.CancelToken.source()

    async function getList(){
    
    const results = await axios.all([
        request('discover/movie', {}, { cancelToken: source.token }),
        request('discover/tv', {}, { cancelToken: source.token }),
        request('movie/now_playing', {}, { cancelToken: source.token }),
        request('movie/upcoming', {}, { cancelToken: source.token }),
        request('discover/movie', {with_watch_providers: WATCH_PROVIDERS.NETFLIX, watch_region: country}, { cancelToken: source.token }),
        request('discover/movie', {with_watch_providers: WATCH_PROVIDERS.AMAZON, watch_region: country}, { cancelToken: source.token }),
        request('discover/movie', {with_watch_providers: WATCH_PROVIDERS.DISNEY_PLUS, watch_region: country}, { cancelToken: source.token }),
        request('discover/tv', {with_watch_providers: WATCH_PROVIDERS.APPLE_TV, watch_region: country}, { cancelToken: source.token })

      ]).then(axios.spread((...responses) => {

        var res = []
        
        for (let i=0; i < responses.length; i++){

          let data = responses[i].data.results

          if (data.length === 0){
            continue
          }

          //Total Pages, decide if the row should show more
          let totalPages = responses[i].data.total_pages
          
          data = includeAdult ? data : data.filter((media) => !media.adult || media.adult === undefined);

          res.push({
            ...mediaCategories[i],
            data: data,
            totalPages: totalPages
           
          })
        }

        return res
      }))

     setResults(results)
     
    }
    
    useEffect(() => {
      getList()

      return () => {
        source.cancel("Cancelling requests for Discover")
      }
    }, [country, includeAdult]) 


    //List Sets
    const [results, setResults] = useState([])

    const renderItem = ({ item }) => (
      <MediaRow 
       header={item.title}
       movies={item.data} 
       navigation={navigation} 
       type={item.type} 
       totalPages={item.totalPages}
       category={item.category} 
       identifier={item.identifier}/>
    )

    const renderHeader = () => (
      <View style={styles.header_container}>
          <Text style={styles.title}>Discover</Text>
          <Text style={styles.country}>{country}</Text>
      </View>
        
    )

    return (
      <View style={styles.container}>

          <FlatList
            style={{marginLeft: 8}}
            data={results}
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
          />           
          
      </View>
    );
  }

