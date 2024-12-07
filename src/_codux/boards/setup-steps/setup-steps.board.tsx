import { createBoard } from '@wixc3/react-board';
import { SetupSteps } from '../../../components/setup-steps/setup-steps';

export default createBoard({
    name: 'SetupSteps',
    Board: () => <SetupSteps />,
    environmentProps: {
        windowWidth: 1024,
        windowHeight: 768,
        canvasWidth: 1440
    }
});
