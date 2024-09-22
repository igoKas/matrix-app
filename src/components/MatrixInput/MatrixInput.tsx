import React from 'react';
import styles from './MatrixInput.module.css';

interface MatrixInputProps {
  matrix: number[][];
  onChange: (i: number, j: number, value: number) => void;
  disabled?: boolean;
  allowNegative?: boolean;
}

const MatrixInput: React.FC<MatrixInputProps> = ({ matrix, onChange, disabled = false, allowNegative = false }) => {
  return (
    <div className={styles.matrix_table}>
      <table>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value) || 0;
                      if (allowNegative) {
                        onChange(rowIndex, colIndex, Math.max(-1, Math.min(1, newValue)));
                      } else {
                        onChange(rowIndex, colIndex, Math.max(0, Math.min(1, newValue)));
                      }
                    }}
                    disabled={disabled}
                    style={{ width: '40px' }}
                    min={allowNegative ? '-1' : '0'}
                    max="1"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixInput;