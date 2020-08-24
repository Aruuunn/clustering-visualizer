import distance from './distance';
import calculateDistance from './distance';

export const max = (a: number, b: number): number => (a > b ? a : b);

export const findNextNearestCluster = (clusterNumber: number, point: number[], centroids: number[][]): number => {
    let best = clusterNumber === 0 ? 1 : 0;
    let bestDist = 100000;

    for (let i = 0; i < centroids.length; i++) {
        if (i === clusterNumber) {
            continue;
        }
        const dist = calculateDistance(point, centroids[i]);
        if (dist < bestDist) {
            bestDist = dist;
            best = i;
        }
    }
    return best;
};

export const calculateB = (
    clusterNumber: number,
    point: number[],
    centroids: number[][],
    clusters: number[][][],
): number => {
    const nextCluster = findNextNearestCluster(clusterNumber, point, centroids);
    const cluster = clusters[nextCluster];

    if (cluster === null || cluster.length === 0) {
        throw new Error('Unexpectedly got an empty cluster');
    }

    let averageDist = 0;

    for (let i = 0; i < cluster.length; i++) {
        averageDist += calculateDistance(point, cluster[i]) / cluster.length;
    }
    return averageDist;
};

export const claculteA = (pointIndex: number, cluster: number[][]): number => {
    let averageDist = 0;
    for (let i = 0; i < cluster.length; i++) {
        if (i === pointIndex) {
            continue;
        }
        averageDist += distance(cluster[pointIndex], cluster[i]) / cluster.length;
    }
    return averageDist;
};

export const calculateSilhouetteScore = (clusters: number[][][], centroids: number[][]): number => {
    if (clusters.length === 0) {
        throw new Error('clusters should not be empty');
    }

    let silhouetteScore = 0;
    let total = 0;

    for (let iter = 0; iter < clusters.length; iter++) {
        const cluster = clusters[iter];

        for (let i = 0; i < cluster.length; i++) {
            const b = calculateB(iter, cluster[i], centroids, clusters);
            const a = claculteA(i, cluster);
            silhouetteScore += (b - a) / max(a, b);
            total += 1;
        }
    }

    if (total === 0) {
        throw new Error('Total number of points should not be Zero');
    }

    return silhouetteScore / total;
};
