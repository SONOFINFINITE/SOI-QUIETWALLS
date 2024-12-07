import { createBoard } from '@wixc3/react-board';
import { Functionality } from '../../../components/functionality/functionality';

export default createBoard({
    name: 'Functionality',
    Board: () => <Functionality />,
    environmentProps: {
        windowWidth: 1754
    }
});
