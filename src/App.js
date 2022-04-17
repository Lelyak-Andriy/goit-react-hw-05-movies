import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Container from './components/Container/Container';
import AppBar from './components/AppBar/AppBar';

const HomePage = lazy(() =>
  import('./views/HomePage/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetails/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);
const NotFound = lazy(() =>
  import('./views/NotFound/NotFound' /* webpackChunkName: "not-found" */),
);

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense
        fallback={
          <>
            <Loader type="Hearts" color="#39CDD8" height={80} width={80} />
          </>
        }
      >
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
          <Route path="*" element={<NotFound text="404 Page not found" />} />
        </Routes>
      </Suspense>
    </Container>
  );
}
