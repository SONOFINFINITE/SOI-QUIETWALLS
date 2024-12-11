import React from 'react';
import classNames from 'classnames';
import styles from './header.module.scss';
import { DrawerMenu } from '../drawer-menu/drawer-menu';
import LOGO from '../../assets/LOGO-woutBG.png';

export interface HeaderProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Header: React.FC<HeaderProps> = ({ className }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isInHero, setIsInHero] = React.useState(true);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Handle ESC key press
    React.useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('keydown', handleEsc);
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isMenuOpen]);

    // Prevent body scroll when menu is open
    React.useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    React.useEffect(() => {
        const handleScroll = () => {
            const heroSection = document.getElementById('hero');
            if (heroSection) {
                const heroBottom = heroSection.getBoundingClientRect().bottom;
                setIsInHero(heroBottom > 0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className={classNames(styles.root, className, {
                [styles['in-hero']]: isInHero
            })}>
                <div className={styles.header__wrapper}>
                    <img
                        src={LOGO}
                        width="112"
                        height="123"
                        alt="Обнинск"
                        className={styles.header__logo}
                    />
                    <button className={styles['header__menu-btn']} onClick={toggleMenu} aria-label="Toggle menu">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={classNames('lucide', 'lucide-menu', styles.svg1)}
                        >
                            <line x1="4" x2="20" y1="12" y2="12" />
                            <line x1="4" x2="20" y1="6" y2="6" />
                            <line x1="4" x2="20" y1="18" y2="18" />
                        </svg>
                    </button>
                </div>
            </header>
            <DrawerMenu isOpen={isMenuOpen} onClose={toggleMenu} />
        </>
    );
};

export default Header;
