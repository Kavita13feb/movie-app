

import axios from 'axios';
import { GET_MOVIE_SUCCESS, MOVIE_FAILURE, MOVIE_GENRES, MOVIE_REQUEST } from './actionType';

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
    dispatch(movieDataRequestAction())
    
    try {
    // let res =  await api.get('/movie/popular', {
    //     params: { page:params.page },
    //   });

    const res = await api.get(`/discover/movie`,{params})
    // console.log(res)
      dispatch(movieDataSuccessAction(res.data.results))  
    } catch (error) {
        dispatch(movieDataErrorAction())
        console.log(error)
    }
}

export const getGenres = async (dispatch) => {
  try {
    const res = await api.get(`/genre/movie/list`);
    // console.log(res)
    dispatch(movieGenresSuccessAction(res.data.genres)) ;  
  } catch (error) {
    console.log(error)
  }

};
export const searchMovies =  (query, page = 1) =>async(dispatch) => {
    dispatch(movieDataRequestAction())
   try {
    const res = await api.get('/search/movie', {
        params: {
          query,
          page,
        },
      });
    //   console.log(res.data.results)
      dispatch(movieDataSuccessAction(res.data.results))  

    }
   catch (error) {
    dispatch(movieDataErrorAction())

    console.log(error)
   }
   
}