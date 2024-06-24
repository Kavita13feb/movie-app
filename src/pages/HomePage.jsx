import { useCallback, useEffect, useState } from "react";
import { MovieList } from "../components/Movielist";
import { SearchBar } from "../components/SearchBar";
import { Navbar } from "../components/Nabar";
import { FilterMovies } from "../components/FilterMovies";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesFromTMDB } from "../Redux/action";

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

  const dispatch = useDispatch();

  useEffect(() => {
    const params = {
      include_adult: false,
      include_video: false,
      language: "en-US",
      page,
      with_genres: filters.genre,
      "primary_release_date.gte": filters.startYear,
      "primary_release_date.lte": filters.endYear,
      "vote_average.gte": filters.minRating,
      "vote_average.lte": filters.maxRating,
    };
    dispatch(getMoviesFromTMDB(params));
  }, [page, filters]);
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
