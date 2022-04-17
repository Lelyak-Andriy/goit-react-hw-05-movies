import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastError from '../../helpers/toastError';
import * as apiService from '../../services/apiService';
import styles from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movieToFind, setMovieToFind] = useState('');
  const [foundMovies, setFoundMovies] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');

    if (query) {
      apiService.searchMovies(query).then(res => setFoundMovies(res.results));
      setMovieToFind('');
    }
  }, [location.search]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (movieToFind.trim()) {
      const { results } = await apiService.searchMovies(movieToFind);
      setFoundMovies(results);
      navigate({ search: `query=${movieToFind}` });

      if (results.length === 0) {
        toastError();
      }
      setMovieToFind('');
    } else {
      return toast.warn('Please, enter your query!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search movie"
          value={movieToFind}
          onChange={e => setMovieToFind(e.target.value)}
        />

        <button className={styles.btn} type="submit">
          Search
        </button>
      </form>

      {foundMovies.length > 0 && (
        <ul className={styles.list}>
          {foundMovies.map(({ id, title, poster_path, name }) => (
            <li className={styles.item} key={id}>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                }}
                state={{ from: location, label: 'Search' }}
              >
                <img
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w300${poster_path}`
                      : 'https://pomogaetsrazu.ru/images/offers/2829219234.jpg'
                  }
                  alt={title}
                  className={styles.image}
                />
                <h2 className={styles.listTitle}>{title || name}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <ToastContainer autoClose={3000} theme={'colored'} />
    </div>
  );
}
