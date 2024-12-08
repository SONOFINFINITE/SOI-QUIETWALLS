import { createBoard } from '@wixc3/react-board';
import { Seo } from '../../../components/seo/Seo';

export default createBoard({
    name: 'Seo',
    Board: () => <Seo />,
    environmentProps: {
        windowWidth: 1318
    }
});
