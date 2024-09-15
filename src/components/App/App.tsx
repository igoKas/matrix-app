import React, { useState, useEffect } from 'react'
import './App.css'
import MatrixInput from '../MatrixInput/MatrixInput'

const App: React.FC = () => {
  const [size, setSize] = useState<number>(3); // Изначально матрица 3x3
  const [matrix, setMatrix] = useState<string[][]>(
    Array.from({ length: size }, () => Array(size).fill(''))
  );
  const [reachabilityMatrix, setReachabilityMatrix] = useState<string[][] | null>(null);

  // Обновляем матрицу при изменении размера
  useEffect(() => {
    setMatrix(Array.from({ length: size }, () => Array(size).fill('')));
    setReachabilityMatrix(null); // Сбрасываем матрицу достижимости при изменении размера
  }, [size]);

  // Обработчик изменения размера матрицы
  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputSize = parseInt(e.target.value) || 1; // Преобразуем ввод в число, по умолчанию 1
    const newSize = Math.max(1, Math.min(inputSize, 10)); // Ограничиваем значение от 1 до 10
    setSize(newSize); // Устанавливаем новое значение размера
  };

  // Генерация случайной матрицы смежностей (с нулями и единицами), с нулями на главной диагонали
  const generateMatrix = () => {
    const newMatrix = Array.from({ length: size }, (_, i) =>
      Array.from({ length: size }, (_, j) =>
        i === j ? '0' : (Math.random() > 0.5 ? '1' : '0')
      )
    );
    setMatrix(newMatrix);
    setReachabilityMatrix(null); // Сбрасываем матрицу достижимости при новой генерации
  };

  // Преобразование матрицы смежности в матрицу достижимости с помощью алгоритма Уоршалла
  const convertToReachabilityMatrix = () => {
    const adjacencyMatrix = matrix.map(row => row.map(val => parseInt(val, 10)));

    const n = adjacencyMatrix.length;
    const reachMatrix = adjacencyMatrix.map(row => [...row]); // Копируем матрицу

    // Устанавливаем на главной диагонали 1, так как вершина достижима для самой себя
    for (let i = 0; i < n; i++) {
      reachMatrix[i][i] = 1;
    }

    // Алгоритм Уоршалла
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (reachMatrix[i][j] === 1 || (reachMatrix[i][k] === 1 && reachMatrix[k][j] === 1)) {
            reachMatrix[i][j] = 1;
          }
        }
      }
    }

    // Преобразуем обратно в строковую матрицу для рендеринга
    setReachabilityMatrix(reachMatrix.map(row => row.map(String)));
  };

  // Проверка, заполнена ли матрица
  const isMatrixFulfilled = matrix.every(row => row.every(cell => cell === '0' || cell === '1'));

  return (
    <div>
      <h1>Матрица достижимости из матрицы смежности:</h1>
      <label>
        Размер матрицы:
        <input
          type="number"
          value={size}
          onChange={handleSizeChange}
          min={1}
          max={10}
          style={{ marginLeft: '10px', width: '60px' }}
        />
      </label>
      <button onClick={generateMatrix} style={{ marginLeft: '10px' }}>
        Сгенерировать
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        {/* Матрица смежности */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2>Матрица смежности</h2>
          <MatrixInput matrix={matrix} onMatrixChange={setMatrix} />
        </div>
        {reachabilityMatrix && (
          <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>→</span>
        )}
        {/* Матрица достижимости */}
        {reachabilityMatrix && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Матрица достижимости</h2>
            <MatrixInput matrix={reachabilityMatrix} onMatrixChange={() => {}} disabled={true} />
          </div>
        )}
      </div>

      <button
        onClick={convertToReachabilityMatrix}
        style={{ marginTop: '20px' }}
        disabled={!isMatrixFulfilled} // Деактивируем кнопку, если матрица не заполнена
      >
        Преобразовать в матрицу достижимости
      </button>
    </div>
  );
};

export default App;
