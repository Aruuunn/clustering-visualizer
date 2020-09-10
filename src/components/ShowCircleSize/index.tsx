import React from 'react';

interface Props {
    radius: number;
}

const ShowCircleSize = (props: Props) => {
    const w = window.screen.width;
    const h = window.screen.height;
    return (
        <g>
            <rect width="100%" height="100%" style={{ backgroundColor: 'black', opacity: '0.5' }} />
            <circle cx={w / 2} cy={h / 2} r={props.radius} fill="transparent" stroke="white" strokeWidth="3" />
        </g>
    );
};

export default ShowCircleSize;
