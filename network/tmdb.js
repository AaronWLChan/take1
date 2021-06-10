import axios from 'axios'

const API_KEY = "436df013d2ea8e7c7394ef43a6911543"

const BASE_URL = "https://api.themoviedb.org/3"

const IMAGE_URL = "http://image.tmdb.org/t/p"

function queryString(obj){
    return Object.entries(obj)
        .map(([index, val]) => `${index}=${val}`)
        .join('&')
}

export function getImage(imageUrl, size = 'original'){
    return `${IMAGE_URL}/${size}/${imageUrl}`
}


export async function request(url, content = {}, config = {}){
    const obj = {
        api_key: API_KEY,
        language: 'en-US',
        ...content
    }

    let query = `${BASE_URL}/${url}?${queryString(obj)}`
    
    return await axios.get(query, config)
                .catch((error) => {

                    if (error.response){
                        console.log(error.response.data)
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }

                    else if (error.request){
                        //Request made but no response
                        console.log(error.request)
                    }

                    else {
                        //Non API-related error
                        console.log(error.message)
                    }

                })
}