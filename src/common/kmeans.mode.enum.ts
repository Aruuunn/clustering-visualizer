// Different modes of KMEANS

/**
 * SingleIteration mode - run kmeans algorithm once
 * MulitpleIteration mode - run kmeans many times
 *
 * Since Kmeans involves randome intialization, it may result in different results
 * every time kmeans is runned. So, running kmeans many times makes sure you get the best
 * possible clusters.
 */
export enum KMEANSMode {
    SingleIteration = 'SingleIteration',
    MultipleIteration = 'MultipleIteration',
}

export default KMEANSMode;
