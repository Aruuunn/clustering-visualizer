import React, { ReactElement } from 'react';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import Page6 from './Page6';
import Page7 from './Page7';
import Page8 from './Page8';

type Props = {
    page: number;
};

export default function Pages(props: Props): ReactElement | null {
    const { page, ...rest } = props;

    switch (page) {
        case 1:
            return <Page1 {...rest} />;
        case 2:
            return <Page2 {...rest} />;
        case 3:
            return <Page3 {...rest} />;
        case 4:
            return <Page4 {...rest} />;
        case 5:
            return <Page5 {...rest} />;
        case 6:
            return <Page6 {...rest} />;
        case 7:
            return <Page7 {...rest} />;
        case 8:
            return <Page8 {...rest} />;
        default:
            return null;
    }
}
