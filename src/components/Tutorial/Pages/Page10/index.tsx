import React from 'react';
import { Typography, Link, DialogTitle, DialogContent } from '@material-ui/core';

export const Page9 = () => {
    return [
        <DialogTitle key={0}>
            {' '}
            <Typography variant="h4" style={{ fontWeight: 'bold', width: '100%' }}>
                Finish
            </Typography>
        </DialogTitle>,
        <DialogContent key={1}>
            <div style={{ minHeight: '500px' }}>
                <Typography variant="body1" style={{ width: '100%', fontWeight: 'normal' }}>
                    You have been introduced to the core features of the application. Hope you enjoy using it!
                </Typography>
                <Typography variant="body1" style={{ marginTop: '30px', width: '100%' }}>
                    You can find the source code of this application{' '}
                    <Link
                        target="_blank"
                        rel="no-referrer"
                        color="secondary"
                        href="https://github.com/ArunMurugan78/clustering-visualizer"
                    >
                        Here
                    </Link>
                </Typography>
            </div>
        </DialogContent>,
    ];
};

export default Page9;
