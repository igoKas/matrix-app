interface MatrixInputProps {
    matrix: string[][]; // Массив для значений матрицы
    onMatrixChange: (newMatrix: string[][]) => void; // Обработчик для обновления матрицы
    disabled?: boolean; // Свойство для отключения инпутов
}

const MatrixInput: React.FC<MatrixInputProps> = ({ matrix, onMatrixChange, disabled = false }) => {
    // Обработчик изменения значения в инпуте
    const handleChange = (row: number, col: number, value: string) => {
        // Проверяем, является ли введенное значение допустимым (0 или 1)
        if (value === '0' || value === '1' || value === '') {
            const newMatrix = matrix.map((r, i) =>
                r.map((c, j) => (i === row && j === col ? value : c))
            );
            onMatrixChange(newMatrix); // Передаем обновлённую матрицу в родительский компонент
        }
    };

    // Рендеринг квадратной матрицы инпутов
    return (
        <div>
            {matrix.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((value, colIndex) => (
                        <input
                            key={colIndex}
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                            onKeyPress={(e) => {
                                // Разрешаем ввод только цифр 0 и 1
                                if (e.key !== '0' && e.key !== '1' && e.key !== 'Backspace') {
                                    e.preventDefault();
                                }
                            }}
                            style={{
                                width: '40px',
                                height: '40px',
                                textAlign: 'center',
                                margin: '2px',
                            }}
                            disabled={disabled} // Отключаем инпуты если свойство disabled true
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MatrixInput;