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