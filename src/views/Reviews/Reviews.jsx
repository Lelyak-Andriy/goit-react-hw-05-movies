import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as apiService from '../../services/apiService';
import styles from './Reviews.module.css';

export default function Reviews() {
  const [reviews, setReviews] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    apiService.getMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  return (
    <div>
      {reviews && reviews.total_results === 0 && (
        <p className={styles.noReview}>
          We don't have any reviews for this movie.
        </p>
      )}
      <ul className={styles.list}>
        {reviews &&
          reviews.results.map(item => (
            <li key={item.id}>
              <h3>Author: {item.author}</h3>
              <p>{item.content}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
