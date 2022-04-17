import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import * as apiService from '../../services/apiService';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [trends, setTrends] = useState(null);

  const location = useLocation();

  useEffect(() => {
    apiService.getTrending().then(response => {
      setTrends(response.results);
    });
  }, []);

  return (
    <>
      <h1 className={styles.title}>Trending today</h1>
      {trends && (
        <ul className={styles.list}>
          {trends.map(item => (
            <li key={item.id} className={styles.item}>
              <NavLink
                to={`movies/${item.id}`}
                state={{ from: location, label: 'Home' }}
              >
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                      : 'https://pomogaetsrazu.ru/images/offers/2829219234.jpg'
                  }
                  alt={item.title}
                  className={styles.image}
                />
                <h2 className={styles.listTitle}>{item.title || item.name}</h2>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
