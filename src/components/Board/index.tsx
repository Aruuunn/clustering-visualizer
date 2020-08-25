import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Ref } from 'react';

import GlobalActionTypes from '../../reduxStore/types/Global.types';
import { Node } from '../../reduxStore/reducers/global';
import Gradients from '../../common/Gradients';
import { RootState } from '../../reduxStore/reducers';
import { ReactElement } from 'react';

const mapStateToProps = (state: RootState) => ({ global: state.global, userPreference: state.userPreferences });

const mapDispatchToProps = {
    setCoordinates: (coordinates: Node[]) => ({
        type: GlobalActionTypes.SET_COORDINATES_OF_NODES,
        payload: coordinates,
    }),
    updateCoordinates: (node: Node) => ({
        type: GlobalActionTypes.UPDATE_COORDINATES,
        payload: node,
    }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type IBoardProps = PropsFromRedux & {
    component?: ReactElement;
};

type BoardState = {
    bg: React.RefObject<SVGSVGElement>;
    container: React.RefObject<HTMLDivElement>;
};

class Board extends React.Component<IBoardProps, BoardState> {
    constructor(props: IBoardProps) {
        super(props);
        this.state = {
            bg: React.createRef(),
            container: React.createRef(),
        };
    }

    componentDidUpdate() {
        if (this.state.bg.current !== null) {
            this.state.bg.current.addEventListener('touchmove', (e: TouchEvent) => e.preventDefault());
        }
    }

    handleMove = (event: React.PointerEvent<SVGSVGElement>, id: number) => {
        if (this.props.global.start === true) {
            return;
        }
        event.persist();
        const currentNode = event.target as SVGSVGElement;
        let X = 0,
            Y = 0;

        const handleNodeMove = (event: PointerEvent): void => {
            if (this.state.bg.current === null) {
                return;
            }

            X = event.clientX - this.state.bg.current.getBoundingClientRect().left;
            Y = event.clientY - this.state.bg.current.getBoundingClientRect().top;
            currentNode.setAttribute('cx', X.toString());
            currentNode.setAttribute('cy', Y.toString());
            this.props.updateCoordinates({ id, coordinates: [X, Y] });
        };

        const removeListeners = () => {
            if (this.state.bg.current === null) {
                return;
            }

            this.state.bg.current.removeEventListener('pointermove', handleNodeMove);
            this.state.bg.current.removeEventListener('pointerup', removeListeners);
        };

        if (this.state.bg.current !== null) {
            this.state.bg.current.addEventListener('pointermove', handleNodeMove);
            this.state.bg.current.addEventListener('pointerup', removeListeners);
        }
    };

    handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
        if (this.props.global.start === true) {
            return;
        }
        event.persist();
        const target = event.target as SVGSVGElement;
        const X = event.clientX - target.getBoundingClientRect().left;
        const Y = event.clientY - target.getBoundingClientRect().top;

        if (X <= 20 || Y <= 20 || !X || !Y) {
            return;
        }

        this.props.setCoordinates([
            ...this.props.global.coordinatesOfNodes,
            { coordinates: [X, Y], id: this.props.global.coordinatesOfNodes.length },
        ]);
    };

    public render() {
        return (
            <div ref={this.state.container}>
                <svg width="100%" height="99vh" ref={this.state.bg} onClick={this.handleClick}>
                    <defs>
                        <marker id="markerArrow" markerWidth="10" markerHeight="10" refX="23" refY="6" orient="auto">
                            <path d="M2,2 L2,11 L10,6 L2,2" fill="white" />
                        </marker>
                    </defs>
                    <Gradients />

                    <rect width="100%" height="100%" style={{ fill: 'url(#Deep-Space)' }} />

                    {this.props.global.coordinatesOfNodes.map((o: Node) => (
                        <g
                            key={o.id}
                            onPointerDown={(e: React.PointerEvent<SVGSVGElement>) =>
                                !this.props.global.start ? this.handleMove(e, o.id) : null
                            }
                        >
                            <circle
                                cx={o.coordinates[0]}
                                cy={o.coordinates[1]}
                                r={this.props.userPreference.sizeOfPoint || 9}
                                style={{ fill: 'white' }}
                                stroke="grey"
                                strokeWidth="0.5"
                            />
                        </g>
                    ))}
                    {this.props.component}
                </svg>
            </div>
        );
    }
}

export default connector(Board);
