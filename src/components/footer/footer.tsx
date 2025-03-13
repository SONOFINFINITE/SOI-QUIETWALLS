import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './footer.module.scss';
import { PartnerModal } from '../partner-modal/partner-modal';
import LOGO from '../../assets/LOGO-woutBG.png';

export interface FooterProps {
    className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
    const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
    const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className={classNames(styles.footer, className)}>
            <div className={styles.footer__wrapper}>
                <div className={styles.div2}>
                    <img
                        src={LOGO}
                        width="112"
                        height="123"
                        alt="Silent Walls"
                        className={styles.footer__logo}
                    />
                    <div className={styles.footer__left}>
                        <p className={styles.footer__address}>г.Обнинск Киевское шоссе 59 Павильон 1.24</p>
                    </div>
                    <div className={styles.contact__info}>
                        <h4 className={styles.contact__title}>Связаться с нами</h4>
                        <p>8 953 333 12 11</p>
                        <p>8 964 140 77 45 </p>
                        <p>sales@тихиестены40.рф</p>
                    </div>
                    <div className={styles.footer__social}>
                        <a href="https://wa.me/89533331211" target="_blank" rel="noopener noreferrer" className={styles.social__link}>
                        <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px">    <path d="M25,2C12.318,2,2,12.318,2,25c0,3.96,1.023,7.854,2.963,11.29L2.037,46.73c-0.096,0.343-0.003,0.711,0.245,0.966 C2.473,47.893,2.733,48,3,48c0.08,0,0.161-0.01,0.24-0.029l10.896-2.699C17.463,47.058,21.21,48,25,48c12.682,0,23-10.318,23-23 S37.682,2,25,2z M36.57,33.116c-0.492,1.362-2.852,2.605-3.986,2.772c-1.018,0.149-2.306,0.213-3.72-0.231 c-0.857-0.27-1.957-0.628-3.366-1.229c-5.923-2.526-9.791-8.415-10.087-8.804C15.116,25.235,13,22.463,13,19.594 s1.525-4.28,2.067-4.864c0.542-0.584,1.181-0.73,1.575-0.73s0.787,0.005,1.132,0.021c0.363,0.018,0.85-0.137,1.329,1.001 c0.492,1.168,1.673,4.037,1.819,4.33c0.148,0.292,0.246,0.633,0.05,1.022c-0.196,0.389-0.294,0.632-0.59,0.973 s-0.62,0.76-0.886,1.022c-0.296,0.291-0.603,0.606-0.259,1.19c0.344,0.584,1.529,2.493,3.285,4.039 c2.255,1.986,4.158,2.602,4.748,2.894c0.59,0.292,0.935,0.243,1.279-0.146c0.344-0.39,1.476-1.703,1.869-2.286 s0.787-0.487,1.329-0.292c0.542,0.194,3.445,1.604,4.035,1.896c0.59,0.292,0.984,0.438,1.132,0.681 C37.062,30.587,37.062,31.755,36.57,33.116z"/></svg>
                        </a>
                        <a href="https://t.me/Obninsktihiestenirf" target="_blank" rel="noopener noreferrer" className={styles.social__link}>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18 0C8.05875 0 0 8.05875 0 18C0 27.9412 8.05875 36 18 36C27.9412 36 36 27.9412 36 18C36 8.05875 27.9412 0 18 0ZM26.5912 12.3825L23.6587 24.3638C23.4412 25.2375 22.8637 25.4775 22.1325 25.0688L17.6925 21.8663L15.5475 23.9288C15.3112 24.165 15.1162 24.36 14.655 24.36L14.9737 19.8413L23.0137 12.5663C23.3775 12.2437 22.9312 12.0638 22.4475 12.3863L12.345 18.7013L8.0175 17.3888C7.16625 17.1413 7.14375 16.4888 8.19375 16.08L25.1737 10.1513C25.8937 9.91875 26.8537 10.395 26.5912 12.3825Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>
                    </div>
                </div>

                <nav className={styles.footer__nav}>
                    <a href="#services" className={styles.footer__link} onClick={(e) => handleSmoothScroll(e, '#services')}>
                        Почему мы
                    </a>
                    <a href="#flipping" className={styles.footer__link} onClick={(e) => handleSmoothScroll(e, '#flipping')}>
                        Применение
                    </a>
                    <a href="#prices" className={styles.footer__link} onClick={(e) => handleSmoothScroll(e, '#prices')}>
                        Установка
                    </a>
                    <a href="#portfolio" className={styles.footer__link} onClick={(e) => handleSmoothScroll(e, '#portfolio')}>
                        Функционал
                    </a>
                    <a href="#faq" className={styles.footer__link} onClick={(e) => handleSmoothScroll(e, '#faq')}>
                        FAQ
                    </a>
                </nav>

                <div className={styles.footer__forms}>
                    <button 
                        onClick={() => setIsPartnerModalOpen(true)} 
                        className={styles.form__button}
                    >
                        <span className={styles.form__button_text}>Хотите стать партнёром?</span>
                        <span className={styles.form__button_highlight}>Напишите нам</span>
                    </button>
                    <button 
                        onClick={() => setIsConsultModalOpen(true)} 
                        className={styles.form__button}
                    >
                        <span className={styles.form__button_text}>Остались вопросы?</span>
                        <span className={styles.form__button_highlight}>Получить консультацию</span>
                    </button>
                </div>

            </div>

            <PartnerModal 
                isOpen={isPartnerModalOpen}
                onClose={() => setIsPartnerModalOpen(false)}
                submitButtonText="Стать партнёром"
                title="Стать партнёром"
                description="Оставьте контактные данные, мы свяжемся с вами и расскажем подробнее об условиях сотрудничества"
                type="partner"
            />
            <PartnerModal 
                isOpen={isConsultModalOpen}
                onClose={() => setIsConsultModalOpen(false)}
                submitButtonText="Получить консультацию"
                title="Остались вопросы?"
                description="Оставьте контактные данные, мы перезвоним вам и проконсультируем по любому вопросу"
                type="consultation"
            />
        </footer>
    );
};
