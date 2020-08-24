import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';

class ErrorBoundary extends Component<any, { error: any; errorInfo: any }> {
    state = { error: null, errorInfo: null };

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
    }
    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'linear-gradient(90deg,#434343,black)',
                        color: 'white',
                    }}
                >
                    <Typography variant="h3" style={{ width: '100%' }} align="center">
                        Oh No, Something Went Wrong :(
                    </Typography>
                    <Typography variant="h5" style={{ width: '100%' }} align="center">
                        Kindly reload the page and try again.
                    </Typography>
                </Grid>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}

export default ErrorBoundary;
