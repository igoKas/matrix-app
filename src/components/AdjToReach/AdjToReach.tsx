import React, { useState, useEffect } from 'react';
import { generateMatrix, warshallAlgorithm } from '../../common/utils';
import MatrixControls from '../MatrixControls/MatrixControls';
import MatrixInput from '../MatrixInput/MatrixInput';
import styles from './AdjToReach.module.css'

const AdjToReach: React.FC = () => {
  const [size, setSize] = useState<number>(4);
  const [matrix, setMatrix] = useState<number[][]>(
    Array.from({ length: size }, () => Array(size).fill(''))
  );
  const [reachabilityMatrix, setReachabilityMatrix] = useState<number[][] | null>(null);

  useEffect(() => {
    setMatrix(Array.from({ length: size }, () => Array(size).fill('')));
    setReachabilityMatrix(null); // Сбрасываем матрицу достижимости при изменении размера
  }, [size]);

  const handleMatrixChange = (i: number, j: number, value: number) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[i][j] = value;
    setMatrix(updatedMatrix);
  };

  const handleGenerateMatrix = () => {
    setMatrix(generateMatrix(size));
    setReachabilityMatrix(null);
  };

  const handleTransformation = () => {
    setReachabilityMatrix(warshallAlgorithm(matrix));
  };

  return (
    <div className={styles.container}>
      <h1>Преобразование матрицы смежности в матрицу достижимости</h1>

      <MatrixControls size={size} onSizeChange={setSize} onGenerate={handleGenerateMatrix} />

      <div className={styles.matrixes_container}>
        <div className={styles.matrix_container}>
          <h2>Матрица смежности</h2>
          <MatrixInput matrix={matrix} onChange={handleMatrixChange} />
        </div>
        {reachabilityMatrix && (
          <div className={styles.matrix_container}>
            <h2>Матрица достижимости</h2>
            <MatrixInput matrix={reachabilityMatrix} onChange={() => {}} disabled={true} />
          </div>
        )}
      </div>
      <button onClick={handleTransformation}>Преобразовать в матрицу достижимости</button>
    </div>
  );
};

export default AdjToReach;