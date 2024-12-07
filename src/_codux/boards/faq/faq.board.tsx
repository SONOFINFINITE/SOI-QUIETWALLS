import { createBoard } from '@wixc3/react-board';
import { Faq } from '../../../components/faq/faq';

export default createBoard({
    name: 'FAQ',
    Board: () => <Faq />
});
