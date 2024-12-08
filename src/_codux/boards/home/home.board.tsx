import { createBoard } from '@wixc3/react-board';
import { Home } from '../../../pages/home/home';

export default createBoard({
    name: 'Home',
    Board: () => <Home />,
    environmentProps: {
        windowWidth: 1824.6666666666667
    }
});
