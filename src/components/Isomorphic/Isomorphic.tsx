import React, { useState, useEffect } from 'react';
import { areIsomorphic, generateUndirectedMatrix, isMatrixFilled } from '../../common/utils';
import MatrixControls from '../MatrixControls/MatrixControls';
import MatrixInput from '../MatrixInput/MatrixInput';
import styles from './Isomorphic.module.css';

const GraphProperties: React.FC = () => {
  const [size, setSize] = useState<number>(4);
  const [matrix1, setMatrix1] = useState<number[][]>(Array.from({ length: size }, () => Array(size).fill('')));
  const [matrix2, setMatrix2] = useState<number[][]>(Array.from({ length: size }, () => Array(size).fill('')));
  const [isomorphic, setIsomorphic] = useState<boolean | null>(null);

  useEffect(() => {
    setMatrix1(Array.from({ length: size }, () => Array(size).fill('')));
    setMatrix2(Array.from({ length: size }, () => Array(size).fill('')));
    setIsomorphic(null);
  }, [size]);

  const handleMatrix1Change = (i: number, j: number, value: number) => {
    const updatedMatrix = [...matrix1];
    updatedMatrix[i][j] = value;
    setMatrix1(updatedMatrix);
  };

  const handleMatrix2Change = (i: number, j: number, value: number) => {
    const updatedMatrix = [...matrix2];
    updatedMatrix[i][j] = value;
    setMatrix2(updatedMatrix);
  };

  const handleGenerateMatrix = () => {
    setMatrix1(generateUndirectedMatrix(size));
    setMatrix2(generateUndirectedMatrix(size));
    setIsomorphic(null);
  };

  const handleCalculateProperties = () => {
    setIsomorphic(areIsomorphic(matrix1, matrix2));
  };

  return (
    <div className={styles.container}>
      <h1>Проверка на изоморфность графов</h1>

      <MatrixControls
        size={size}
        onSizeChange={setSize}
        actions={[
          { label: 'Сгенерировать матрицы', onClick: handleGenerateMatrix }
        ]}
      />

      <div className={styles.matrixes_container}>
        <div className={styles.matrix_container}>
          <h2>Матрица смежности 1</h2>
          <MatrixInput matrix={matrix1} onChange={handleMatrix1Change} />
        </div>
        <div className={styles.matrix_container}>
          <h2>Матрица смежности 2</h2>
          <MatrixInput matrix={matrix2} onChange={handleMatrix2Change} />
        </div>
      </div>

      <button onClick={handleCalculateProperties} disabled={!isMatrixFilled(matrix1) || !isMatrixFilled(matrix2)}>
        Проверить изоморфность
      </button>

      {isomorphic !== null && isomorphic ? <p>Графы изоморфны</p> : isomorphic !== null && !isomorphic ? <p>Графы не изоморфны</p> : null}
    </div>
  );
};

export default GraphProperties;