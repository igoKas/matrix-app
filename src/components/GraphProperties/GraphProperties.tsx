import React, { useState, useEffect } from 'react';
import { calculateGraphProperties, generateUndirectedMatrix, isMatrixFilled } from '../../common/utils';
import MatrixControls from '../MatrixControls/MatrixControls';
import MatrixInput from '../MatrixInput/MatrixInput';
import styles from './GraphProperties.module.css';

const GraphProperties: React.FC = () => {
  const [size, setSize] = useState<number>(4);
  const [matrix, setMatrix] = useState<number[][]>(Array.from({ length: size }, () => Array(size).fill('')));
  const [properties, setProperties] = useState<{ radius: number; diameter: number; eccentrics: number[] } | null>(null);

  useEffect(() => {
    setMatrix(Array.from({ length: size }, () => Array(size).fill('')));
    setProperties(null);
  }, [size]);

  const handleMatrixChange = (i: number, j: number, value: number) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[i][j] = value;
    updatedMatrix[j][i] = value;
    setMatrix(updatedMatrix);
  };

  const handleGenerateMatrix = () => {
    setMatrix(generateUndirectedMatrix(size));
    setProperties(null);
  };

  const handleCalculateProperties = () => {
    setProperties(calculateGraphProperties(matrix));
  };

  return (
    <div className={styles.container}>
      <h1>Вычисление радиуса и диаметра графа</h1>

      <MatrixControls
        size={size}
        onSizeChange={setSize}
        actions={[
          { label: 'Сгенерировать матрицу', onClick: handleGenerateMatrix }
        ]}
      />

      <h2>Матрица смежности</h2>
      <MatrixInput matrix={matrix} onChange={handleMatrixChange} />

      <button onClick={handleCalculateProperties} disabled={!isMatrixFilled(matrix)}>
        Вычислить свойства графа
      </button>

      {properties && (
        <div className={styles.properties_container}>
          <div>
            <h2>Свойства графа</h2>
            <p>Радиус: {properties.radius}</p>
            <p>Диаметр: {properties.diameter}</p>
          </div>
          <div>
            <h2>Эксцентриситеты вершин:</h2>
            <ul>
              {properties.eccentrics.map((ecc, index) => (
                <li key={index}>Вершина {index + 1}: {ecc}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphProperties;