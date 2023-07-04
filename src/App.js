import { Fragment } from "react";
import { useState } from "react";

import MovieList from "./components/MovieList";

// const dummyMovies = [
//     {
//         id: 1,
//         title: 'Some Dummy Movie',
//         openingText: 'This is the opening',
//         releaseDate: '2023-7-7',
//     },
//     {
//         id: 2,
//         title: 'Some Dummy Movie 2',
//         openingText: 'This is the opening',
//         releaseDate: '2022-17-7',
//     },
// ]

function App() {

    const [movies, setMovies] = useState([]);

    function fetchMoviesHandler() {
        fetch('https://swapi.dev/api/films/')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const transformedMovies = data.results.map(movieData => {
                    return {
                        id: movieData.episode_id,
                        title: movieData.title,
                        openingText: movieData.opening_crawl,
                        releaseDate: movieData.release_date,
                    };
                });
                setMovies(transformedMovies);
            });
    }




    return (
        <Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                <MovieList movies={movies} />
            </section>
        </Fragment>
    );
}

export default App;
