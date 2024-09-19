import React, { useState } from 'react';
import { generateMatrix, calculateGraphProperties } from '../../common/utils';
import MatrixControls from '../MatrixControls/MatrixControls';
import MatrixInput from '../MatrixInput/MatrixInput';

const GraphProperties: React.FC = () => {
  const [size, setSize] = useState<number>(4);
  const [matrix, setMatrix] = useState<number[][]>(generateMatrix(size));
  const [properties, setProperties] = useState<{ radius: number; diameter: number; eccentrics: number[] } | null>(null);

  const handleMatrixChange = (i: number, j: number, value: number) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[i][j] = value;
    updatedMatrix[j][i] = value; // Симметричная матрица для неориентированного графа
    setMatrix(updatedMatrix);
  };

  const handleGenerateMatrix = () => {
    setMatrix(generateMatrix(size));
    setProperties(null); // Сбросить результаты
  };

  const handleCalculateProperties = () => {
    setProperties(calculateGraphProperties(matrix));
  };

  return (
    <div>
      <h1>Вычисление радиуса и диаметра графа</h1>

      <MatrixControls size={size} onSizeChange={setSize} onGenerate={handleGenerateMatrix} />

      <h2>Матрица смежности</h2>
      <MatrixInput matrix={matrix} onChange={handleMatrixChange} />

      <button onClick={handleCalculateProperties}>Вычислить свойства графа</button>

      {properties && (
        <div>
          <h2>Свойства графа</h2>
          <p>Радиус: {properties.radius}</p>
          <p>Диаметр: {properties.diameter}</p>
          <h3>Эксцентриситеты вершин:</h3>
          <ul>
            {properties.eccentrics.map((ecc, index) => (
              <li key={index}>Вершина {index + 1}: {ecc}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GraphProperties;