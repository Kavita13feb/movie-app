import React, { useState } from 'react';
import "../css/movielist.css"

export const MovieCard = ({ movie }) => {
  const initFev=JSON.parse(localStorage.getItem("fevMovies"))||[]
  
  const handleFev=(movie)=>{
    const fevMovies=[...initFev,movie]
   localStorage.setItem("fevMovies",JSON.stringify(fevMovies))
   alert("movie added to favriotes")
  }
  return (
    <div className='movie-card' onClick={()=>handleFev(movie)}>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{new Date(movie.release_date).getFullYear()}</p>
    </div>
  );
};


export const MovieList = ({ movies }) => {

  return (
    <div className='movie-list'>
      {movies.map((movie,i) => (
        <MovieCard movie={movie}   key={i}/>
        
      ))}

    </div>
  );
};

