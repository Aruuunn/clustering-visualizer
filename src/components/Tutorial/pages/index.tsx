import React, { ReactElement } from 'react';
import Page1 from './page1';
import Page2 from './page2';

export * from './page1';
export * from './page2';

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
        default:
            return null;
    }
}
