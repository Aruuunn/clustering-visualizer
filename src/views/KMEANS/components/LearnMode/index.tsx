import React, { ReactElement }  from "react";

import KMEANS from "./components/KMEANS";
import Container from "./components/Container";



function LearnMode ():ReactElement {
 
    return (
      <Container>
        <KMEANS />
      </Container>
    );
  
}

export default LearnMode;
