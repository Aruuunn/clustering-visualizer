import React, { ReactElement, useState } from "react";
import { Typography, Grid, Button , useMediaQuery ,useTheme } from "@material-ui/core";
import { connect, ConnectedProps } from "react-redux";

import KMEANSImage from "../../../../assets/kmeans.png";
import StepOneImage from "../../../../assets/step1.png";
import EnterNumberOfClustersImage from "../../../../assets/enterNumberOfClusters.png";
import initializeCentroidsImage from "../../../../assets/initializeCentroids.png";
import stepTwoImage from "../../../../assets/step2-kmeans.png";
import calculateCentroidsImage from "../../../../assets/calculateCentroids.png";
import closeIcon from "../../../../assets/close.svg";
import GlobalActionTypes from "../../../../store/types/global.types";

const mapStateToProps = (state: any) => ({ global: state.global });

const mapDispatchToProps = {
  close:() => ({type:GlobalActionTypes.SET_LEARN_MODE,payload:false})
};

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
      Click on the blank space to create Data points. Create atleast 5 points.
    </Typography>
  </div>,
  <div>
    <img
      src={EnterNumberOfClustersImage}
      style={{ width: "100%", height: "auto" }}
      alt="enter number of clusters"
    />
    <Typography>Select number of clusters</Typography>

    <Typography variant="body1" style={{ margin: "5px" }}>
      You need to know the total number of clusters you want for k-means
      algorithm to work. This is the 'K' in K-Means. So, go ahead and enter the number of clusters greater
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
    <Typography variant="h5" style={{ marginBottom: "5px" }}>
      {" "}
      Step 1: Initialize Centroids
    </Typography>
    <Typography variant="body1">
      Centroids play a key role in the k-means algorithm. Centroids are data
      points that determine the cluster a given data point belongs to. You will
      understand why it's called centroid in a later step. Each cluster has a
      single centroid. They are assigned <b>randomly a data point</b> from the
      bunch of data points initially.
    </Typography>
  </div>,
  <div>
    <img
      src={stepTwoImage}
      style={{ width: "100%", height: "auto", marginBottom: "5px" }}
      alt="determine the cluster"
    />
    <Typography variant="h5" style={{ marginBottom: "5px" }}>
      {" "}
      Step 2: Determine the cluster
    </Typography>
    <Typography variant="body1">
      We take data points one by one and determine which cluster they belong to.
      Lets first take a single data point (it will be a yellow circle). Then we
      determine the distance between this point and all other centroids one by
      one. The current point belongs to the cluster whose centroid is closest to
      this point.
    </Typography>
  </div>,
  <div>
    <img
      src={calculateCentroidsImage}
      style={{ width: "100%", height: "auto", marginBottom: "5px" }}
      alt="determine the cluster"
    />
    <Typography variant="h5" style={{ marginBottom: "5px" }}>
      {" "}
      Step 3: Calculate Centroids
    </Typography>
    <Typography variant="body1">
      In this step we will update the centroids. We update each centroid by
      finding the "geometrical Centroid" of the data points which belong to the
      same cluster as determined in the previous step.The dashed arrow shows the
      shift of each centroid.
    </Typography>
  </div>,
  <div>
    <Typography variant="h5" style={{ marginBottom: "5px" }}>
      {" "}
      Step 4: Iteration
    </Typography>
    <Typography variant="body1">
      We iterate through the last two steps ,i.e find the cluster to which each
      data point belongs with respect to the centroid, update values of the
      centroid and so on. We iterate till the stage when the centroids of the
      clusters doesn't change even after updation. Congratulations! We have come
      to the end.
    </Typography>
  </div>,
];

function KMEANS(props: Props): ReactElement {

  const [currentPage, setPage] = useState<number>(0);

  const theme = useTheme();
  const  sm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="flex-start"
    >
      <Grid container justify="space-between" alignItems="flex-start"  style={{ margin: "5px", width: "100%" }}>
        <Typography variant="h5">
          K MEANS
        </Typography>
        <img src={closeIcon} alt="close" onClick={() => props.close()}/>
      </Grid>

      <div style={{ height:(sm ? "70vh" : "60vh"), overflow: "auto" }}>
        {pages[currentPage]} 
      </div>
      <Grid container justify="flex-end">
        {currentPage !== 0 ? (
          <Button
            variant="text"
            color="secondary"
            style={{ margin: "10px" }}
            onClick={() => setPage((s) => s - 1)}
          >
            Previous
          </Button>
        ) : null}
        {currentPage !== pages.length - 1 ? (
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: "10px" }}
            onClick={() => setPage((s) => s + 1)}
          >
            Next
          </Button>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default connector(KMEANS);
