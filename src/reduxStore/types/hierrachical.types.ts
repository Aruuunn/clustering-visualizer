export enum HierarchicalClusteringType {
    AGGLOMERATIVE = 'AGGLOMERATIVE',
    DIVISIVE = 'DIVISIVE',
}

export enum HierarchicalActionTypes {
    SET_NUMBER_OF_CLUSTERS = 'SET_NUMBER_OF_CLUSTERS',
    SET_TYPE = 'SET_TYPE',
    SET_SILHOUETTE_SCORES = 'SET_SILHOUETTE_SCORES',
}

export default HierarchicalActionTypes;
