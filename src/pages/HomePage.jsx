import { useCallback, useEffect, useState } from "react";
import { MovieList } from "../components/Movielist";
import { SearchBar } from "../components/SearchBar";
import { Navbar } from "../components/Nabar";
import { FilterMovies } from "../components/FilterMovies";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesFromTMDB, searchMovies } from "../Redux/action";
import { useSearchParams } from "react-router-dom";

const initFilter = {
  genre: "",
  startYear: "",
  endYear: "",
  minRating: "",
  maxRating: "",
};
export const HomePage = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(initFilter);
  const movieData = useSelector((store) => store.movieData);
  const isLoading = useSelector((store) => store.isLoading);
  const[searchParams]=useSearchParams()
const query =searchParams.get("query")
  const dispatch = useDispatch();

  useEffect(() => {
   
    if(!query||filters){

      const params = {
        include_adult: false,
        include_video: false,
        language: "en-US",
        with_genres: filters.genre,
        "primary_release_date.gte": filters.startYear,
        "primary_release_date.lte": filters.endYear,
        "vote_average.gte": filters.minRating,
        "vote_average.lte": filters.maxRating,
      };
  
      dispatch(getMoviesFromTMDB(params));
    }
      
  
    

  }, [ filters]);

  useEffect(()=>{
    const params = {
      include_adult: false,
      include_video: false,
      language: "en-US",
      query,
      page,
      with_genres: filters.genre,
      "primary_release_date.gte": filters.startYear,
      "primary_release_date.lte": filters.endYear,
      "vote_average.gte": filters.minRating,
      "vote_average.lte": filters.maxRating,
    };
    if(query){
    console.log(query,page)

      dispatch(searchMovies(query,page))
    }
  },[query,page])
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (window.innerHeight + scrollTop + 1 >= scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  console.log(movieData);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 

  return (
    <div className="home">
      {
        <>

          <FilterMovies filters={filters} setFilters={setFilters} />
          <button onClick={()=>window.scrollTo({top:0,behavior: "smooth"})} className="fixed-btn">ScrollToTop</button>

          <MovieList movies={movieData} />
        </>
      }
    </div>
  );
};
