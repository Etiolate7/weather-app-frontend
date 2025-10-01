import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.bgImage}>
        <h3 className={styles.title}>Weather App</h3>
        <div className={styles.middle}>
          <input id="cityNameInput" type="text" placeholder="Search City" />
          <button id="addCity"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </div>
      </div>
    </div>
  );
}

export default Home;
