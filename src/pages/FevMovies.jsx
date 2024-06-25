import React from 'react'
import { MovieList } from '../components/Movielist'

export const FevMovies = () => {
 
    const fevMovies =JSON.parse(localStorage.getItem("fevMovies"))||[]
    return (
    <div>
        <MovieList movies={fevMovies}/>
    </div>
  )
}
