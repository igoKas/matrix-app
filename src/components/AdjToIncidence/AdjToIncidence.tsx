import React, { useEffect, useState } from 'react';
import styles from './AdjToIncidence.module.css';
import MatrixInput from '../MatrixInput/MatrixInput';
import { generateUndirectedMatrix, adjToIncidenceMatrix, generateMatrix } from '../../common/utils';
import MatrixControls from '../MatrixControls/MatrixControls';

const AdjToIncidence: React.FC = () => {
    const [size, setSize] = useState<number>(4);
    const [isDirected, setIsDirected] = useState<boolean>(false); // Состояние для типа графа (ориентированный или нет)
    const [matrix, setMatrix] = useState<number[][]>(
        Array.from({ length: size }, () => Array(size).fill(''))
    );
    const [incidenceMatrix, setIncidenceMatrix] = useState<number[][] | null>(null);

    // Обновление матрицы смежности при изменении размера
    useEffect(() => {
        setMatrix(Array.from({ length: size }, () => Array(size).fill('')));
        setIncidenceMatrix(null); // Сброс инцидентной матрицы при изменении размера
    }, [size]);

    // Обработка изменений в матрице смежности
    const handleMatrixChange = (i: number, j: number, value: number) => {
        const updatedMatrix = [...matrix];
        updatedMatrix[i][j] = value;
        setMatrix(updatedMatrix);
    };

    // Генерация случайной матрицы в зависимости от типа графа (ориентированный/неориентированный)
    const handleGenerateMatrix = () => {
        const newMatrix = isDirected ? generateMatrix(size) : generateUndirectedMatrix(size);
        setMatrix(newMatrix);
        setIncidenceMatrix(null); // Сброс инцидентной матрицы при новой генерации
    };

    // Преобразование матрицы смежности в матрицу инцидентности
    const handleTransformation = () => {
        const incidence = adjToIncidenceMatrix(matrix);
        setIncidenceMatrix(incidence);
    };

    return (
        <div className={styles.container}>
            <h1>Преобразование матрицы смежности в матрицу инцидентности</h1>

            {/* Контролы для выбора размера и типа графа */}
            <MatrixControls
                size={size}
                onSizeChange={setSize}
                onGenerate={handleGenerateMatrix}
                isDirected={isDirected}
                onTypeChange={setIsDirected} // Используем проп onTypeChange
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

            <button onClick={handleTransformation}>Преобразовать в матрицу инцидентности</button>
        </div>
    );
};

export default AdjToIncidence;