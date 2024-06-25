

import axios from 'axios';
import { GET_MOVIE_SUCCESS, MOVIE_FAILURE, MOVIE_GENRES, MOVIE_REQUEST } from './actionType';
import { type } from '@testing-library/user-event/dist/type';

const API_KEY = '3cd1233fb322a897d1f8483665cc9158';
const API_TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2QxMjMzZmIzMjJhODk3ZDFmODQ4MzY2NWNjOTE1OCIsInN1YiI6IjY2NzUwOTYyMmZiOGJiYTI5NjE2ZTA2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eUZHBsXKOnmKqS8pDRj-mz8Uvna4jcH-2hKKISnXk0k"
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});


export const movieDataRequestAction = () => {
    return { type: MOVIE_REQUEST };
  };
  export const movieDataErrorAction = () => {
    return { type: MOVIE_FAILURE };
  };
  export const movieDataSuccessAction = (payload) => {
    return { type: GET_MOVIE_SUCCESS, payload };
  };
  

  export const movieGenresSuccessAction = (payload) => {
    return { type: MOVIE_GENRES, payload };
  };
  
export const getMoviesFromTMDB =(params)=>async(dispatch)=>{
   console.log(params)
    
    try {
    params.api_key= API_KEY
    const res = await axios.get(`${BASE_URL}/discover/movie`,{params})
      dispatch(movieDataSuccessAction(res.data.results))  
    } catch (error) {
        dispatch(movieDataErrorAction())
        console.log(error)
        alert(error)
    }
}

export const getGenres = async (dispatch) => {
  try {
    const res = await api.get(`/genre/movie/list`);
    dispatch(movieGenresSuccessAction(res.data.genres)) ;  
  } catch (error) {
    console.log(error)
  }

};
export const searchMovies =  (query, page = 1) =>async(dispatch) => {
    dispatch(movieDataRequestAction())
    console.log(query, page)
   try {
    const res = await api.get('/search/movie', {
        params: {
          query,
          page,
        },
      });
      console.log(res.data)
      if(page!==1){
        dispatch({type:"infiniteScroll",payload:res.data.results})
        return
      }
      dispatch({type:"MOVIE_SEARCH",payload:res.data.results})  

    }
   catch (error) {
    dispatch(movieDataErrorAction())

    console.log(error)
   }
   
}

;

