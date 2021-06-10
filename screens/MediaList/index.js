import React, { useLayoutEffect, useEffect, useState } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import styles from './styles'
import { request } from '../../network/tmdb'
import MediaCard from '../../components/Media/MediaCard'
import LoadingLayout from '../../components/LoadingLayout'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function MediaList({ navigation, route }) {

    const {category, type, header, identifier} = route.params

    useLayoutEffect(() => {
        navigation.setOptions({
            title: header
        })
    })

    const source = axios.CancelToken.source()

    const country = useSelector((state) => state.country)
    const includeAdult = useSelector((state) => state.adult)

    async function getData(){

        if (totalPages !==0 && page + 1 > totalPages){
            return
        }

        let query = ""
        let content = {
            page: page
        } 
        
        //Discover List
        if (category === "discover"){
            query = `${category}/${type}`
        }

        //Genre-based
        else if (category === "genre") {
            query = `discover/${type}`
            content = {
                ...content,
                with_genres: identifier,
            }
        }

        else if (category === "similar" || category === "recommendations"){
            query = `${type}/${identifier}/${category}`
        }

        //Watch Provider
        else if (category === "provider"){
            query = `discover/${type}`
            content = {
                ...content,
                with_watch_providers: identifier,
                watch_region: country
            }
        }

        //Trending / Popular / Upcoming etc..
        else {
            query = `${type}/${category}`
        }

        await request(query, content, { cancelToken: source.token })
            .then((response) => {

                var temp = data

                var newData = response.data.results

                //Retrieve total pages, check if zero
                if (totalPages === 0){
                   setTotalPages(response.data.total_pages)
                }

                //Filter for adult
                newData = includeAdult ? newData : newData.filter((media) => !media.adult || media.adult === undefined)

                newData.forEach((result) => temp.push(result))

                setData(temp)
                
                //Update page number
                var tempPage = page
                tempPage++;

                setPage(tempPage)

            })

        setLoading(false)


    }

    useEffect(() => {
        getData()

        return () => {
            source.cancel()
          }
    }, [country, includeAdult])

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const renderItem = ({ item }) => (<MediaCard item={item} navigation={navigation} type={type}/>)

    if (loading){
        return <LoadingLayout/>
    }

    return (
        <View style={styles.container}>

            {loading ? <ActivityIndicator/> : 
            
                <FlatList
                    style={styles.list}
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    numColumns={2}
                    onEndReachedThreshold={0.5}
                    onEndReached={getData}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{justifyContent: 'space-around'}}
                />
            
            } 

           
        </View>
    )
}


