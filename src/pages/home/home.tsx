import classNames from 'classnames';
import styles from './home.module.scss';
import { Hero } from '../../components/hero/hero';
import { WhyQuietWalls } from '../../components/why-quiet-walls/why-quiet-walls';
import { WhereToUseGallery } from '../../components/where-to-use-gallery/where-to-use-gallery';
import { SetupSteps } from '../../components/setup-steps/setup-steps';
import { Functionality } from '../../components/functionality/functionality';
import { Faq } from '../../components/faq/faq';
import { Footer } from '../../components/footer/footer';

export interface HomeProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Home = ({ className }: HomeProps) => {
    return (
        <div className={styles.home__wrapper}>
            <Hero />
            <WhyQuietWalls />
            <WhereToUseGallery />
            <SetupSteps />
            <Functionality />
            <Faq />
            <Footer />
        </div>
    );
};
