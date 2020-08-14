import React, { ReactElement, useState } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { connect, ConnectedProps } from "react-redux";

import KMEANSImage from "../../../../assets/kmeans.png";
import StepOneImage from "../../../../assets/step1.png";
import EnterNumberOfClustersImage from "../../../../assets/enterNumberOfClusters.png";
import initializeCentroidsImage from "../../../../assets/initializeCentroids.png";

const mapStateToProps = (state: any) => ({ global: state.global });

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const pages: ReactElement[] = [
  <>
    <img
      src={KMEANSImage}
      style={{ width: "100%", height: "auto" }}
      alt="kmeans"
    />
    <Typography variant="body1" style={{ margin: "5px" }}>
      <b>K-means algorithm</b> is an iterative algorithm that tries to partition
      the dataset into Kpre-defined distinct non-overlapping subgroups
      (clusters) where each data point belongs to only one group. It tries to
      make the intra-cluster data points as similar as possible while also
      keeping the clusters as different (far) as possible. It assigns data
      points to a cluster such that the sum of the squared distance between the
      data points and the cluster’s centroid (arithmetic mean of all the data
      points that belong to that cluster) is at the minimum. The less variation
      we have within clusters, the more homogeneous (similar) the data points
      are within the same cluster.
    </Typography>
  </>,
  <div>
    <img
      src={StepOneImage}
      style={{ width: "100%", height: "auto" }}
      alt="step 1"
    />

    <Typography variant="body1" style={{ margin: "5px" }}>
      Click on the blank space to create Data points. Create atleast 5 points to
      continue.
    </Typography>
  </div>,
  <div>
    <img
      src={EnterNumberOfClustersImage}
      style={{ width: "100%", height: "auto" }}
      alt="enter number of clusters"
    />

    <Typography variant="body1" style={{ margin: "5px" }}>
      You need to know the total number of clusters you want for k-means
      algorithm to work. So, go ahead and enter the number of clusters greater
      than 1
    </Typography>
  </div>,
  <div>
    <Typography>
      Now you can set speed as per your convenience (slow is recommended if you
      are learning k-means) and press start to watch the visualization.
      <strong> Continue for learning K-Means step by step</strong>
    </Typography>
  </div>,
  <div>
    <img
      src={initializeCentroidsImage}
      style={{ width: "100%", height: "auto" }}
      alt="initialize centroids"
    />
    <Typography variant="h5"> Step 1: Initialize Centroids</Typography>
    <Typography variant="body1">
      Centroids play a key role in the k-means algorithm. Centroids are nothing but a bunch of
      data points but you will understand why it's called centroid in a later
      step. Each cluster has a single centroid. They are assigned{" "}
      <b>randomly a data point</b> from the bunch of data points initially.
    </Typography>
  </div>,
];

function KMEANS(props: Props): ReactElement {
  const [currentPage, setPage] = useState<number>(4);

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="flex-start"
    >
      <Typography variant="h5" style={{ margin: "5px", width: "100%" }}>
        KMEANS
      </Typography>
      <div style={{ height: "100%" }}>{pages[currentPage]}</div>
      <Grid container justify="flex-end">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setPage((s) => s + 1)}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
}

export default connector(KMEANS);
