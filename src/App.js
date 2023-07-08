import { useState, useEffect, useCallback } from "react";

import { Fragment } from "react";

import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";



function App() {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMoviesHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://react-http-5ae50-default-rtdb.europe-west1.firebasedatabase.app/movies.json');
            if (!response.ok) {
                throw new Error('Something went wrong !');
            }
            const data = await response.json();

            const loadedMovies = [];

            for (const key in data) {
                loadedMovies.push({
                    id: key,
                    title: data[key].title,
                    openingText: data[key].openingText,
                    releaseDate: data[key].releaseDate,
                });
            }
            // const transformedMovies = data.results.map((movieData) => {
            //     return {
            //         id: movieData.episode_id,
            //         title: movieData.title,
            //         openingText: movieData.opening_crawl,
            //         releaseDate: movieData.release_date,
            //     };
            // });
            setMovies(loadedMovies);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchMoviesHandler();
    }, [fetchMoviesHandler]);

    async function addMovieHandler(movie) {
        const response = await fetch('https://react-http-5ae50-default-rtdb.europe-west1.firebasedatabase.app/movies.json',
            {
                method: 'POST',
                body: JSON.stringify(movie),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const data = await response.json()
    }

    return (
        <Fragment>
            <section>
                <AddMovie onAddMovie={addMovieHandler} />
            </section>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                {!isLoading && movies.length > 0 && <MovieList movies={movies} />}
                {!isLoading && movies.length === 0 && !error && <p>No movies.</p>}
                {error && <p>{error}</p>}
                {isLoading && <p>Loading...</p>}
            </section>
        </Fragment>
    );
}

export default App;
