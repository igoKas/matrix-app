import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './App.module.css';

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>Matrix App</h1>
      </header>

      <main>
        <section>
          <nav className={styles.buttons}>
            <button className={styles.button} onClick={() => handleNavigate('/graph-properties')}>
              Радиус и диаметр графа
            </button>
            <button className={styles.button} onClick={() => handleNavigate('/adj-to-incidence')}>
              Матрица смежности в матрицу инцидентности
            </button>
            <button className={styles.button} onClick={() => handleNavigate('/incidence-to-adj')}>
              Матрица инцидентности в матрицу смежности
            </button>
            <button className={styles.button} onClick={() => handleNavigate('/adj-to-reach')}>
              Матрица смежности в матрицу достижимости
            </button>
          </nav>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Выберите нужный алгоритм для работы с графами</p>
      </footer>
    </div>
  );
};

export default App;
