import React from 'react';

interface MatrixControlsProps {
  size: number;
  onSizeChange: (newSize: number) => void;
  onGenerate: () => void;
}

const MatrixControls: React.FC<MatrixControlsProps> = ({ size, onSizeChange, onGenerate }) => {
  return (
    <div>
      <label>Размер матрицы (1-10):</label>
      <input
        type="number"
        value={size}
        onChange={(e) => onSizeChange(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
        min="1"
        max="10"
      />
      <button onClick={onGenerate}>Сгенерировать матрицу</button>
    </div>
  );
};

export default MatrixControls;