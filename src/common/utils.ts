const INF = Number.MAX_SAFE_INTEGER;

export const generateMatrix = (size: number): number[][] => {
  const newMatrix = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => (Math.random() < 0.5 ? 1 : 0))
  );

  // Убираем самопетли
  for (let i = 0; i < size; i++) {
    newMatrix[i][i] = 0;
  }

  return newMatrix;
};

export const generateUndirectedMatrix = (size: number): number[][] => {
  const newMatrix = Array.from({ length: size }, () => Array(size).fill(0));

  // Заполняем верхнюю треугольную матрицу случайными значениями
  for (let i = 0; i < size; i++) {
    for (let j = i + 1; j < size; j++) {
      const randomValue = Math.random() < 0.5 ? 1 : 0;
      newMatrix[i][j] = randomValue;
      newMatrix[j][i] = randomValue; // Отражаем значение для симметрии
    }
  }

  return newMatrix;
};

export const calculateGraphProperties = (matrix: number[][]): { radius: number; diameter: number; eccentrics: number[] } => {
  const n = matrix.length;
  const dist = floydWarshall(matrix);

  const eccentrics = Array(n).fill(0); // Массив эксцентриситетов

  for (let i = 0; i < n; i++) {
    eccentrics[i] = Math.max(...dist[i].filter(d => d < INF)); // Максимум по строке (эксцентриситет вершины)
  }

  const radius = Math.min(...eccentrics);  // Радиус — минимальный эксцентриситет
  const diameter = Math.max(...eccentrics); // Диаметр — максимальный эксцентриситет

  return { radius, diameter, eccentrics };
};

export const floydWarshall = (matrix: number[][]): number[][] => {
  const n = matrix.length;
  const dist = matrix.map(row => row.map(value => (value === 0 ? INF : value))); // Инициализация

  for (let i = 0; i < n; i++) {
    dist[i][i] = 0; // Расстояние до себя = 0
  }

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] < INF && dist[k][j] < INF) {
          dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        }
      }
    }
  }

  return dist;
};

export const warshallAlgorithm = (matrix: number[][]): number[][] => {
  const n = matrix.length;
  const reachabilityMatrix = matrix.map(row => [...row]);

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        reachabilityMatrix[i][j] = reachabilityMatrix[i][j] || (reachabilityMatrix[i][k] && reachabilityMatrix[k][j]) ? 1 : 0;
      }
    }
  }

  return reachabilityMatrix;
};

export const adjToIncidenceMatrix = (matrix: number[][]): number[][] => {
  const n = matrix.length;
  const edges: [number, number][] = [];
  let isDirected = false;

  // Проверка симметричности матрицы, чтобы определить тип графа
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) { // Проверяем только верхнюю треугольную часть
      if (matrix[i][j] !== matrix[j][i]) {
        isDirected = true;
        break;
      }
    }
    if (isDirected) break;
  }

  // Собираем список рёбер из матрицы смежности
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 1) {
        edges.push([i, j]);  // Важно фиксировать направление даже в неориентированном графе
      }
    }
  }

  // Матрица инцидентности: n вершин и edges.length рёбер
  const incidenceMatrix = Array.from({ length: n }, () => Array(edges.length).fill(0));

  edges.forEach(([u, v], index) => {
    if (isDirected) {
      incidenceMatrix[u][index] = -1; // Начальная вершина ребра
      incidenceMatrix[v][index] = 1;  // Конечная вершина ребра
    } else {
      incidenceMatrix[u][index] = 1; // В случае неориентированного графа
      incidenceMatrix[v][index] = 1;
    }
  });

  return incidenceMatrix;
};

// Функция для определения типа графа (ориентированный или неориентированный)
export const determineGraphType = (matrix: number[][]): boolean => {
  const rows = matrix.length;
  const cols = matrix[0].length;

  for (let j = 0; j < cols; j++) {
    let hasPositive = false;
    let hasNegative = false;

    for (let i = 0; i < rows; i++) {
      if (matrix[i][j] === 1) hasPositive = true;
      if (matrix[i][j] === -1) hasNegative = true;
    }

    if (hasPositive && hasNegative) {
      return true;  // Ориентированный граф
    }
  }

  return false;  // Неориентированный граф
};

// Преобразование матрицы инцидентности в матрицу смежности
export const incidenceToAdjMatrix = (incidenceMatrix: number[][]): number[][] => {
  const vertexCount = incidenceMatrix.length;  // Количество вершин
  const edgeCount = incidenceMatrix[0].length; // Количество рёбер

  const adjMatrix = Array.from({ length: vertexCount }, () => Array(vertexCount).fill(0));

  // Определяем, является ли граф ориентированным
  const isDirected = determineGraphType(incidenceMatrix);

  for (let j = 0; j < edgeCount; j++) {
    let fromVertex = -1;
    let toVertex = -1;

    for (let i = 0; i < vertexCount; i++) {
      if (incidenceMatrix[i][j] === 1) {
        if (fromVertex === -1) {
          fromVertex = i;
        } else {
          toVertex = i;
        }
      } else if (incidenceMatrix[i][j] === -1) {
        toVertex = i;
      }
    }

    // Преобразование для ориентированных рёбер
    if (isDirected && fromVertex !== -1 && toVertex !== -1) {
      adjMatrix[fromVertex][toVertex] = 1;
    }

    // Преобразование для неориентированных рёбер
    if (!isDirected && fromVertex !== -1 && toVertex !== -1) {
      adjMatrix[fromVertex][toVertex] = 1;
      adjMatrix[toVertex][fromVertex] = 1;
    }
  }

  return adjMatrix;
};

// Генерация случайной матрицы инцидентности для ориентированного графа
export const generateIncidenceMatrix = (rows: number, cols: number): number[][] => {
  const incidenceMatrix = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let j = 0; j < cols; j++) {
    const fromVertex = Math.floor(Math.random() * rows);
    let toVertex = Math.floor(Math.random() * rows);
    while (toVertex === fromVertex) {
      toVertex = Math.floor(Math.random() * rows); // Избегаем петель
    }
    incidenceMatrix[fromVertex][j] = 1;
    incidenceMatrix[toVertex][j] = -1;
  }

  return incidenceMatrix;
};

// Генерация случайной матрицы инцидентности для неориентированного графа
export const generateUndirectedIncidenceMatrix = (rows: number, cols: number): number[][] => {
  const incidenceMatrix = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let j = 0; j < cols; j++) {
    const v1 = Math.floor(Math.random() * rows);
    let v2 = Math.floor(Math.random() * rows);
    while (v1 === v2) {
      v2 = Math.floor(Math.random() * rows); // Избегаем петель
    }
    incidenceMatrix[v1][j] = 1;
    incidenceMatrix[v2][j] = 1;
  }

  return incidenceMatrix;
};

export const isMatrixFilled = (matrix: (number)[][]): boolean => {
  return matrix.every(row => row.every(value => value.toString() !== ""));
};

export const areIsomorphic = (matrix1: number[][], matrix2: number[][]): boolean => {
  const n = matrix1.length;

  if (n !== matrix2.length) return false; // Если размеры матриц разные

  const permute = (arr: number[]) => {
      if (arr.length <= 1) return [arr];
      const result: number[][] = [];
      for (let i = 0; i < arr.length; i++) {
          const rest = arr.slice(0, i).concat(arr.slice(i + 1));
          const perms = permute(rest);
          for (const perm of perms) {
              result.push([arr[i], ...perm]);
          }
      }
      return result;
  };

  const vertices = Array.from({ length: n }, (_, i) => i);
  const permutations = permute(vertices);

  for (const perm of permutations) {
      const transformedMatrix = matrix1.map(row => perm.map(index => row[index]));
      const isSame = transformedMatrix.every((row, i) => row.every((value, j) => value === matrix2[i][j]));
      if (isSame) return true;
  }

  return false;
};