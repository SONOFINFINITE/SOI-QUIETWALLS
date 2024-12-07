import { createBoard } from '@wixc3/react-board';
import { WhyQuietWalls } from '../../../components/why-quiet-walls/why-quiet-walls';

export default createBoard({
    name: 'WhyQuietWalls',
    Board: () => <WhyQuietWalls />
});
