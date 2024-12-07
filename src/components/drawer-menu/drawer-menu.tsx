import React from 'react';
import classNames from 'classnames';
import styles from './drawer-menu.module.scss';

export interface DrawerMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ isOpen, onClose }) => {
    return (
        <div className={classNames(styles.drawer, isOpen && styles.drawer_open)}>
            <div className={styles.drawer__overlay} onClick={onClose}></div>
            <div className={styles.drawer__content}>
                <div className={styles.drawer__header}>
                    <img
                        src="https://xn--e1aaha1awdex0e.xn--p1ai/wp-content/uploads/2023/08/logo_white.svg"
                        width="41"
                        height="47"
                        alt="Обнинск"
                        className={styles.drawer__logo}
                    />
                    <button className={styles.drawer__close} onClick={onClose} aria-label="Close menu">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <nav className={styles.drawer__nav}>
                    <ul>
                        <li>
                            <a href="#services" onClick={(e) => {
                                e.preventDefault();
                                onClose();
                                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                            }}>Почему мы</a>
                        </li>
                        <li>
                            <a href="#where-to-use" onClick={(e) => {
                                e.preventDefault();
                                onClose();
                                document.querySelector('#where-to-use')?.scrollIntoView({ behavior: 'smooth' });
                            }}>Применение</a>
                        </li>
                        <li>
                            <a href="#setup" onClick={(e) => {
                                e.preventDefault();
                                onClose();
                                document.querySelector('#setup')?.scrollIntoView({ behavior: 'smooth' });
                            }}>Установка</a>
                        </li>
                        <li>
                            <a href="#portfolio" onClick={(e) => {
                                e.preventDefault();
                                onClose();
                                document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
                            }}>Функционал</a>
                        </li>
                        <li>
                            <a href="#about" onClick={(e) => {
                                e.preventDefault();
                                onClose();
                                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                            }}>FAQ</a>
                        </li>
                    </ul>
                </nav>
                <div className={styles.drawer__footer}>
                    <div className={styles.drawer__social}>
                        <div className={styles.drawer__social_icons}>
                            <div className={styles.drawer__contact}>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={styles.svg2}
                                >
                                    <path
                                        d="M22.6 24C19.8222 24 17.0778 23.3944 14.3667 22.1833C11.6556 20.9722 9.18889 19.2556 6.96667 17.0333C4.74444 14.8111 3.02778 12.3444 1.81667 9.63333C0.605556 6.92222 0 4.17778 0 1.4C0 1 0.133333 0.666667 0.4 0.4C0.666667 0.133333 1 0 1.4 0H6.8C7.11111 0 7.38889 0.105556 7.63333 0.316667C7.87778 0.527778 8.02222 0.777778 8.06667 1.06667L8.93333 5.73333C8.97778 6.08889 8.96667 6.38889 8.9 6.63333C8.83333 6.87778 8.71111 7.08889 8.53333 7.26667L5.3 10.5333C5.74444 11.3556 6.27222 12.15 6.88333 12.9167C7.49444 13.6833 8.16667 14.4222 8.9 15.1333C9.58889 15.8222 10.3111 16.4611 11.0667 17.05C11.8222 17.6389 12.6222 18.1778 13.4667 18.6667L16.6 15.5333C16.8 15.3333 17.0611 15.1833 17.3833 15.0833C17.7056 14.9833 18.0222 14.9556 18.3333 15L22.9333 15.9333C23.2444 16.0222 23.5 16.1833 23.7 16.4167C23.9 16.65 24 16.9111 24 17.2V22.6C24 23 23.8667 23.3333 23.6 23.6C23.3333 23.8667 23 24 22.6 24Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <div className={styles['contact-content__wrapper']}>
                                    <a href="tel:+7999999999" className={styles.drawer__phone}>
                                        +7 999 999 99 99
                                    </a>
                                    <p className={styles.p1}>пн-пт: 9:00-19:00</p>
                                </div>
                            </div>
                            <div className={styles.div2}>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <div className={styles.tg} />
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <div className={styles.vk} />
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <div className={styles.div1} />
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <div className={styles.yt} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrawerMenu;
