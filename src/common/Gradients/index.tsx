import React, { ReactElement } from 'react'

interface Props {
    
}

function Gradients(props: Props): ReactElement {
    return (
        <defs>
           <linearGradient id="Deep-Space" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#434343", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "rgb(0,0,0)", stopOpacity: 1 }}
              />
            </linearGradient>
            <linearGradient id="Piggy-Pink" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#ee9ca7", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#ffdde1", stopOpacity: 1 }}
              />
            </linearGradient>
            <linearGradient id="JShine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#12c2e9", stopOpacity: 1 }}
              />
               <stop
                offset="50%"
                style={{ stopColor: "#c471ed", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#ffdde1", stopOpacity: 1 }}
              />
            </linearGradient>
            <linearGradient id="Moonlit-asteroid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#0F2027", stopOpacity: 1 }}
              />
               <stop
                offset="50%"
                style={{ stopColor: "#203A43", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#2C5364", stopOpacity: 1 }}
              />
            </linearGradient>
            <linearGradient id="Flare" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#f12711", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#f5af19", stopOpacity: 1 }}
              />
            </linearGradient>
  
            <linearGradient id="Black-Rose" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#f4c4f3", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#fc67fa", stopOpacity: 1 }}
              />
            </linearGradient> 
        </defs>
    )
}

export default Gradients