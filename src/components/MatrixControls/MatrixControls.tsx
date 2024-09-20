import React from 'react';
import styles from './MatrixControls.module.css';

interface MatrixControlsProps {
  size: number;
  onSizeChange: (newSize: number) => void;
  onGenerate: () => void;
  isDirected?: boolean;  // Необязательный пропс для типа графа
  onTypeChange?: (isDirected: boolean) => void; // Необязательный пропс для изменения типа графа
}

const MatrixControls: React.FC<MatrixControlsProps> = ({ size, onSizeChange, onGenerate, isDirected, onTypeChange }) => {
  return (
    <div className={styles.container}>
      <label>
        Размер матрицы (1-10):
        <input
          type="number"
          value={size}
          onChange={(e) => onSizeChange(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
          min="1"
          max="10"
        />
      </label>
      {/* Условно отображаем переключатель типа графа, если есть проп onTypeChange */}
      {onTypeChange && (
        <label className={styles.typeLabel}>
          <input
            type="checkbox"
            checked={!!isDirected}
            onChange={(e) => onTypeChange(e.target.checked)}
          />
          Ориентированный граф
        </label>
      )}
      <button onClick={onGenerate}>Сгенерировать матрицу</button>
    </div>
  );
};

export default MatrixControls;