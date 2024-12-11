import { createBoard } from '@wixc3/react-board';
import { Hero } from '../../../components/hero/hero';

export default createBoard({
    name: 'Hero',
    Board: () => <Hero />,
    environmentProps: {
        windowWidth: 1920,
        windowHeight: 1080
    }
});
