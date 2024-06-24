import React from 'react'
import { GET_MOVIE_SUCCESS, MOVIE_FAILURE, MOVIE_GENRES, MOVIE_REQUEST } from './actionType'

const initState ={
    movieData:[],
    genres:[],
    isLoading:false,
    isError:false,
}



export const reducer = (state=initState,{payload,type}) => {
 switch(type){
    case MOVIE_REQUEST:
        return {...state,isLoading:true}
    case GET_MOVIE_SUCCESS:
        return {...state,movieData:[...state.movieData,...payload],isLoading:false}
        case MOVIE_GENRES:
            return {...state,genres:payload,isLoading:false}

        case MOVIE_FAILURE:
        return {...state,isLoading:false,isError:true}
    default :
    return state
 }
}