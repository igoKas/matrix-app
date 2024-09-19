import React, { useState } from 'react';
import { generateMatrix, warshallAlgorithm } from '../../common/utils';
import MatrixControls from '../MatrixControls/MatrixControls';
import MatrixInput from '../MatrixInput/MatrixInput';

const AdjToReach: React.FC = () => {
  const [size, setSize] = useState<number>(4);
  const [matrix, setMatrix] = useState<number[][]>(generateMatrix(size));
  const [reachabilityMatrix, setReachabilityMatrix] = useState<number[][] | null>(null);

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
    <div>
      <h1>Преобразование матрицы смежности в матрицу достижимости</h1>

      <MatrixControls size={size} onSizeChange={setSize} onGenerate={handleGenerateMatrix} />

      <h2>Матрица смежности</h2>
      <MatrixInput matrix={matrix} onChange={handleMatrixChange} />

      <button onClick={handleTransformation}>Преобразовать в матрицу достижимости</button>

      {reachabilityMatrix && (
        <div>
          <h2>Матрица достижимости</h2>
          <MatrixInput matrix={reachabilityMatrix} onChange={() => {}} disabled={true} />
        </div>
      )}
    </div>
  );
};

export default AdjToReach;