import React from 'react'
import "../css/filter.css"
import  { useEffect, useState } from 'react';
import { getGenres } from '../Redux/action';
import { useDispatch, useSelector } from 'react-redux';
// const initFilter={
//   genre:"",
//   startYear:"",
//   endYear:"",
//   minRating:"" ,
//   maxRating:"" 
// }

export const FilterMovies = ({filters, setFilters }) => {
//  const[filters, setFilters ]=useState(initFilter)
const genres =useSelector((store)=>store.genres)
const dispatch =useDispatch()
  useEffect(() => {
    dispatch(getGenres)
  }, []);

  const handleFilterOptions=(e)=>{
    console.log(e.target.name,e.target.value)
    setFilters({...filters,[e.target.name]:e.target.value})
  }
  // useEffect(() => {
  
  //   setFilters(filterOptions);
  // }, [filterOptions.genre]);
// console.log(filters)
  return (
    <div className='FilterContainer'>
      <label>
        filter by genre:
      <select name='genre' value={filters.genre} onChange={handleFilterOptions}>
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>
      </label>
   
      <div>
        <label>
          Start Year:
          <input
          name="startYear"
            type="Date"
            value={filters.startYear}
            onChange={handleFilterOptions}
          />
        </label>
        <label>
          End Year:
          <input
            type="Date"
            name={"endYear"}
            value={filters.endYear}
            onChange={handleFilterOptions}
          />
        </label>
        <label>
          Minimum Rating:
          <input
            type="number"
            name='minRating'
            value={filters.minRating}
            onChange={handleFilterOptions}
            step="0.1"
            min="0"
            max="10"
          />
        </label>
        <label>
          Maximum Rating:
          <input
            type="number"
            name='maxRating'
            value={filters.maxRating}
            onChange={handleFilterOptions}
            step="0.1"
            min="0"
            max="10"
          />
        </label>
        </div>
    </div>
  );
};


