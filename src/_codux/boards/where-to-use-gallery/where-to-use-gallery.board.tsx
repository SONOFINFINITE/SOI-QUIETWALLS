import { createBoard } from '@wixc3/react-board';
import { WhereToUseGallery } from '../../../components/where-to-use-gallery/where-to-use-gallery';

export default createBoard({
    name: 'WhereToUseGallery',
    Board: () => <WhereToUseGallery />,
    environmentProps: {
        windowWidth: 960
    }
});
