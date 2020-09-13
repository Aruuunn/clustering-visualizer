import { ReactElement } from 'react';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import Page6 from './Page6';
import Page7 from './Page7';
import Page8 from './Page8';
import Page9 from './Page9';

type Props = {
    page: number;
};

export default function Pages(props: Props): null | ReactElement[] {
    const { page } = props;

    switch (page) {
        case 1:
            return Page1();
        case 2:
            return Page2();
        case 3:
            return Page3();
        case 4:
            return Page4();
        case 5:
            return Page5();
        case 6:
            return Page6();
        case 7:
            return Page7();
        case 8:
            return Page8();
        case 9:
            return Page9();
        default:
            return null;
    }
}
