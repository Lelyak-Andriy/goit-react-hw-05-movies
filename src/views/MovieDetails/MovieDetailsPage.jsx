import { useEffect, useState, lazy, Suspense } from 'react';
import {
  Routes,
  Route,
  NavLink,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import * as apiService from '../../services/apiService';
import styles from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('../Cast/Cast' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('../Reviews/Reviews' /* webpackChunkName: "reviews" */),
);

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    apiService.getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  const goBack = () => {
    navigate(
      location.state?.from?.pathname
        ? `${location.state?.from?.pathname}${location.state?.from?.search}`
        : '/',
    );
  };

  return (
    <div>
      <button className={styles.button} type="button" onClick={goBack}>
        Go back
      </button>
      {movie && (
        <div className={styles.details}>
          <div>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : 'https://pomogaetsrazu.ru/images/offers/2829219234.jpg'
              }
              alt={movie.title}
              className={styles.image}
            />
          </div>
          <div>
            <div className={styles.info}>
              <h1>
                {movie.title || movie.name}({movie.release_date.slice(0, 4)})
              </h1>
              <h3>Rating {movie.vote_average}</h3>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map(el => (
                  <li key={el.id}> {el.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <div>
        <h3>Additional information:</h3>
        <NavLink
          to="cast"
          state={{
            from: location.state?.from ?? '/',
            label: location.state?.label,
          }}
          className={styles.link}
        >
          Cast
        </NavLink>
        <NavLink
          to="reviews"
          state={{
            from: location.state?.from ?? '/',
            label: location.state?.label,
          }}
          className={styles.link}
        >
          Reviews
        </NavLink>
        <Suspense
          fallback={
            <>
              <Loader type="Hearts" color="#FFC0CB" height={80} width={80} />
            </>
          }
        >
          <Routes>
            <Route path="cast" element={<Cast movieId={movieId} />} />
            <Route path="reviews" element={<Reviews />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
