function distance(p1: number[], p2: number[]): number {
    if (p1.length !== p2.length) {
        throw new Error('Coordinates Do Not Match');
    }

    let totalDistance = 0;

    for (let i = 0; i < p1.length; i++) {
        totalDistance += Math.pow(p1[i] - p2[i], 2);
    }

    return totalDistance;
}

export default distance;
