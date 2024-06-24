import React, { useState } from 'react';
import "../css/movielist.css"

export const MovieCard = ({ movie,handleFev }) => {
  return (
    <div className='movie-card' onClick={()=>handleFev(movie)}>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{new Date(movie.release_date).getFullYear()}</p>
    </div>
  );
};


export const MovieList = ({ movies }) => {
const initFev=JSON.parse(localStorage.getItem("fevMovies"))||[]
  const [fevMovies,setFevMovies]=useState(initFev)
  
  const handleFev=(movie)=>{
   setFevMovies((pre)=>[...pre,movie])
   localStorage.setItem("fevMovies",JSON.stringify(fevMovies))
  }
  return (
    <div className='movie-list'>
      {movies.map((movie) => (
        <MovieCard movie={movie}  handleFev={handleFev} key={movie.id}/>
      ))}
    </div>
  );
};

