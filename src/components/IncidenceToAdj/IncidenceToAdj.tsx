import React, { useState, useEffect } from 'react';
import { 
    incidenceToAdjMatrix, 
    generateIncidenceMatrix, 
    generateUndirectedIncidenceMatrix, 
    determineGraphType, 
    isMatrixFilled 
} from '../../common/utils';
import MatrixControls from '../MatrixControls/MatrixControls';
import MatrixInput from '../MatrixInput/MatrixInput';
import styles from './IncidenceToAdj.module.css';

const IncidenceToAdj: React.FC = () => {
    const [rows, setRows] = useState<number>(4);
    const [cols, setCols] = useState<number>(12);
    const [matrix, setMatrix] = useState<(number)[][]>(Array.from({ length: rows }, () => Array(cols).fill('')));
    const [adjMatrix, setAdjMatrix] = useState<number[][] | null>(null);
    const [isDirected, setIsDirected] = useState<boolean>(false);

    const maxVertices = 5;
    const maxEdges = isDirected ? rows * (rows - 1) : (rows * (rows - 1)) / 2; 
    const isMatrixValid = isMatrixFilled(matrix) && cols <= maxEdges;

    useEffect(() => {
        setMatrix(Array.from({ length: rows }, () => Array(cols).fill('')));
        setAdjMatrix(null);
    }, [rows, cols]);

    useEffect(() => {
        setIsDirected(determineGraphType(matrix));
    }, [matrix]);

    const handleMatrixChange = (i: number, j: number, value: number) => {
        const updatedMatrix = [...matrix];
        updatedMatrix[i][j] = value;
        setMatrix(updatedMatrix);
    };

    const handleGenerateDirectedMatrix = () => {
        setMatrix(generateIncidenceMatrix(rows, cols));
        setAdjMatrix(null);
    };

    const handleGenerateUndirectedMatrix = () => {
        setMatrix(generateUndirectedIncidenceMatrix(rows, cols));
        setAdjMatrix(null);
    };

    const handleTransformation = () => {
        const adj = incidenceToAdjMatrix(matrix);
        setAdjMatrix(adj);
    };

    return (
        <div className={styles.container}>
            <h1>Преобразование матрицы инцидентности в матрицу смежности</h1>

            <MatrixControls
                rows={rows}
                cols={cols}
                maxRows={maxVertices}
                maxCols={rows * (rows - 1)}
                onRowsChange={setRows}
                onColsChange={setCols}
                actions={[
                    { label: 'Сгенерировать ориентированный граф', onClick: handleGenerateDirectedMatrix },
                    { label: 'Сгенерировать неориентированный граф', onClick: handleGenerateUndirectedMatrix }
                ]}
            />

            <div className={styles.matrixes_container}>
                <div className={styles.matrix_container}>
                    <h2>Матрица инцидентности</h2>
                    <MatrixInput matrix={matrix} onChange={handleMatrixChange} allowNegative={true} />
                </div>

                {adjMatrix && (
                    <div className={styles.matrix_container}>
                        <h2>Матрица смежности</h2>
                        <MatrixInput matrix={adjMatrix} onChange={() => { }} disabled={true} />
                    </div>
                )}
            </div>

            <button onClick={handleTransformation} disabled={!isMatrixValid}>
                Преобразовать в матрицу смежности
            </button>

            {cols > maxEdges && (
                <p className={styles.error}>
                    Количество рёбер превышает максимально возможное ({maxEdges}) для {rows} вершин.
                </p>
            )}
        </div>
    );
};

export default IncidenceToAdj;