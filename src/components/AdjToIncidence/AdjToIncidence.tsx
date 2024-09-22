import React, { useEffect, useState } from 'react';
import styles from './AdjToIncidence.module.css';
import MatrixInput from '../MatrixInput/MatrixInput';
import { generateUndirectedMatrix, adjToIncidenceMatrix, generateMatrix, isMatrixFilled } from '../../common/utils';
import MatrixControls from '../MatrixControls/MatrixControls';

const AdjToIncidence: React.FC = () => {
  const [size, setSize] = useState<number>(4);
  const [matrix, setMatrix] = useState<number[][]>(
    Array.from({ length: size }, () => Array(size).fill(''))
  );
  const [incidenceMatrix, setIncidenceMatrix] = useState<number[][] | null>(null);

  useEffect(() => {
    setMatrix(Array.from({ length: size }, () => Array(size).fill('')));
    setIncidenceMatrix(null);
  }, [size]);

  const handleMatrixChange = (i: number, j: number, value: number) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[i][j] = value;
    setMatrix(updatedMatrix);
  };

  const handleGenerateDirectedMatrix = () => {
    const newMatrix = generateMatrix(size);
    setMatrix(newMatrix);
    setIncidenceMatrix(null);
  };

  const handleGenerateUndirectedMatrix = () => {
    const newMatrix = generateUndirectedMatrix(size);
    setMatrix(newMatrix);
    setIncidenceMatrix(null);
  };

  const handleTransformation = () => {
    const incidence = adjToIncidenceMatrix(matrix);
    setIncidenceMatrix(incidence);
  };

  return (
    <div className={styles.container}>
      <h1>Преобразование матрицы смежности в матрицу инцидентности</h1>

      <MatrixControls
        size={size}
        maxSize={5}
        onSizeChange={setSize}
        actions={[
          { label: 'Сгенерировать ориентированный граф', onClick: handleGenerateDirectedMatrix },
          { label: 'Сгенерировать неориентированный граф', onClick: handleGenerateUndirectedMatrix }
        ]}
      />

      <div className={styles.matrixes_container}>
        <div className={styles.matrix_container}>
          <h2>Матрица смежности</h2>
          <MatrixInput matrix={matrix} onChange={handleMatrixChange} />
        </div>

        {incidenceMatrix && (
          <div className={styles.matrix_container}>
            <h2>Матрица инцидентности</h2>
            <MatrixInput matrix={incidenceMatrix} onChange={() => { }} disabled={true} />
          </div>
        )}
      </div>

      <button onClick={handleTransformation} disabled={!isMatrixFilled(matrix)}>Преобразовать в матрицу инцидентности</button>
    </div>
  );
};

export default AdjToIncidence;