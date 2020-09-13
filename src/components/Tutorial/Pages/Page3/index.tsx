import React from 'react';
import { Typography, DialogTitle, DialogContent } from '@material-ui/core';

export const Page3 = () => {
    return [
        <DialogTitle key={0}>
            {' '}
            <Typography variant="h4" style={{ fontWeight: 'bold', width: '100%' }}>
                Clustering Algorithms
            </Typography>
        </DialogTitle>,

        <DialogContent key={1}>
            <div style={{ minHeight: '500px' }}>
                <Typography variant="body1">
                    There are a lot of clustering Algorithms. For Now <em>only</em> the algorithms given below are
                    supported in this application.
                </Typography>

                <div style={{ width: '100%', marginTop: '20px', fontWeight: 'normal' }}>
                    <ul>
                        <li>
                            {' '}
                            <Typography component="span" variant="body1">
                                Kmeans
                            </Typography>
                        </li>
                        <li>
                            {' '}
                            <Typography component="span" variant="body1">
                                DBSCAN
                            </Typography>
                        </li>
                        <li>
                            {' '}
                            <Typography component="span" variant="body1">
                                Mean Shift
                            </Typography>
                        </li>
                        <li>
                            {' '}
                            <Typography component="span" variant="body1">
                                Hierarchical Clustering
                            </Typography>
                        </li>
                    </ul>
                </div>
            </div>
        </DialogContent>,
    ];
};

export default Page3;
