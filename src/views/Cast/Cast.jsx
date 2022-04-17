import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as apiService from '../../services/apiService';
import styles from './Cast.module.css';

export default function Cast({ movieId }) {
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    apiService
      .getMovieCredits(movieId)
      .then(credits => setCredits(credits.cast));
  }, [movieId]);

  return (
    <div>
      {credits && credits.length === 0 && (
        <p className={styles.noCast}>
          We don't have a list of cast for this movie.
        </p>
      )}
      {credits && (
        <ul id="cast" className={styles.list}>
          {credits.map(credit => (
            <li key={credit.id} className={styles.item}>
              <img
                src={
                  credit.profile_path
                    ? `https://image.tmdb.org/t/p/w300${credit.profile_path}`
                    : 'https://pomogaetsrazu.ru/images/offers/2829219234.jpg'
                }
                alt={credit.original_name}
                className={styles.image}
              />
              <div>
                <h3>{credit.original_name}</h3>
                <p>Character: {credit.character}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Cast.propTypes = {
  movieId: PropTypes.string,
};
