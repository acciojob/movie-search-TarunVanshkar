import React,{useState} from 'react';
import axios from 'axios';
import "regenerator-runtime/runtime.js";

const SearchBar = () => {
    const [value, setValue] = useState("");
    const [movies, setMovies] = useState([]);

    const fetchMovies = async (e) =>{
        e.preventDefault();
        const response = await axios.get(`https://www.omdbapi.com/?s=${value}&apikey=acaf60ad`)
        console.log(response.data);
        setMovies(response.data.Search);
    }
    return(
        <>
            Search Movie
            <form onSubmit={fetchMovies}>
                <input type='text' onChange={(e) => setValue(e.target.value)} value={value}/>
                <button type='submit'>Search</button>
            </form>
            <ul>
                {
                    !movies ? <div className='error'>Invalid movie name. Please try again.</div>
                    :
                    movies.map((movie) => (
                        <li key={movie.imdbID}>
                            <h2>{movie.Title} ({movie.Year})</h2>
                            <img src={movie.Poster} alt={movie.Title} />
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default SearchBar;