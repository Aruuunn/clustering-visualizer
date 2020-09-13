import React from 'react';
import { Typography, DialogContent, DialogTitle } from '@material-ui/core';

export const Page2 = () => {
    return [
        <DialogTitle key={0}>
            <Typography variant="h4" style={{ fontWeight: 'bold', width: '100%' }}>
                Parameters
            </Typography>
        </DialogTitle>,
        <DialogContent key={1}>
            <div style={{ minHeight: '500px' }}>
                {' '}
                <Typography variant="body1" style={{ width: '100%', fontWeight: 'normal' }}>
                    Each Algorithm has it&apos;s own parameters and modes. You will find information about the
                    parameters and modes for the corresponding Algorithms after selecting the algorithm. After tweaking
                    the parameters as per your will, you can press &quot;START&quot;!
                </Typography>
            </div>
        </DialogContent>,
    ];
};

export default Page2;
