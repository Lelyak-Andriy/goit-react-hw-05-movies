import PropTypes from 'prop-types';
import styles from './NotFound.module.css';

export default function NotFound({ text }) {
  return <p className={styles.error}>{text}</p>;
}

NotFound.propTypes = {
  text: PropTypes.string,
};
