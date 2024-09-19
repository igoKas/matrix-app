import React from 'react';
import styles from './MatrixInput.module.css';

interface MatrixInputProps {
    matrix: number[][];
    onChange: (i: number, j: number, value: number) => void;
    disabled?: boolean;
}

const MatrixInput: React.FC<MatrixInputProps> = ({ matrix, onChange, disabled = false }) => {
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
                                        onChange={(e) =>
                                            onChange(rowIndex, colIndex, Math.min(1, Math.max(0, parseInt(e.target.value) || 0)))
                                        }
                                        disabled={disabled}
                                        style={{ width: '40px' }}
                                        min="0"
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