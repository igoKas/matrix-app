import React from 'react';
import styles from './MatrixControls.module.css';

interface ButtonAction {
  label: string;
  onClick: () => void;
}

interface MatrixControlsProps {
  size?: number;
  maxSize?: number;
  onSizeChange?: (newSize: number) => void;
  rows?: number;
  maxRows?: number;
  cols?: number;
  maxCols?: number;
  onRowsChange?: (newRows: number) => void;
  onColsChange?: (newCols: number) => void;
  actions: ButtonAction[];
}

const MatrixControls: React.FC<MatrixControlsProps> = ({
  size,
  maxSize = 10,
  onSizeChange,
  rows,
  maxRows = 5,
  cols,
  maxCols = 20,
  onRowsChange,
  onColsChange,
  actions
}) => {
  return (
    <div className={styles.container}>
      {onSizeChange && size !== undefined ? (
        <label>
          Размер матрицы (1-{maxSize}):
          <input
            className={styles.size_input}
            type="number"
            value={size}
            onChange={(e) => onSizeChange(Math.min(maxSize, Math.max(1, parseInt(e.target.value) || 1)))}
            min="1"
            max={maxSize}
          />
        </label>
      ) : (
        <>
          <label>
            Количество вершин (1-{maxRows}):
            <input
              type="number"
              value={rows}
              onChange={(e) => onRowsChange?.(Math.min(maxRows, Math.max(1, parseInt(e.target.value) || 1)))}
              min="1"
              max={maxRows}
            />
          </label>
          <label>
            Количество рёбер:
            <input
              type="number"
              value={cols}
              onChange={(e) => onColsChange?.(Math.min(maxCols, Math.max(1, parseInt(e.target.value) || 1)))}
              min="1"
              max={maxCols}
            />
          </label>
        </>
      )}

      <div className={styles.buttonContainer}>
        {actions.map((action, index) => (
          <button key={index} onClick={action.onClick}>
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MatrixControls;