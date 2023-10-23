import { useRef, useState } from "react";
import "./App.css"

function App() {
  const [movies, setMovies] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const hasMovies = movies?.length > 0;
  const inputText = useRef(null);

  const searchMovies = (event) => {
    event.preventDefault();
    if (lastSearch === inputText.current.value) {
      alert("Ya has buscado esa película");
      return;
    }
    fetch(`https://www.omdbapi.com/?apikey=ad495072&s=${inputText.current.value}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search);
        setLastSearch(inputText.current.value);
      });
    inputText.current.value = "";
  }

  const changeInputSearchMovies = () => {
    fetch(`https://www.omdbapi.com/?apikey=ad495072&s=${inputText.current.value}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search);
        setLastSearch(inputText.current.value);
      });
  }

  return (
    <>
      <header>
        <h4>Buscar películas en FilmFinder</h4>
        <form action="" className='form' onSubmit={searchMovies}>
          <input onChange={changeInputSearchMovies} ref={inputText} type="text" placeholder="Avengers, Fast and the Furious, Titanic" />
          <button type="submit">Buscar</button>
        </form>
      </header>
      <main>
        {hasMovies ? (
          <ul>
            {movies.map((movie) => {
              return (
                <li key={movie.imdbID}>
                  <h3>{movie.Title}</h3>
                  <img src={movie.Poster} alt={movie.Title} />
                  <p>{movie.Year}</p>
                </li>
              )
            })}
          </ul>
        ) : (
          <p>No se encontró ninguna película</p>
        )}
      </main>
    </>
  )
}


export default App
