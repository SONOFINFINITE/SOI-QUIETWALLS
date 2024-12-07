import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './footer.module.scss';
import { PartnerModal } from '../partner-modal/partner-modal';

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
                        src="https://xn--e1aaha1awdex0e.xn--p1ai/wp-content/uploads/2023/08/logo_white.svg"
                        width="73"
                        height="84"
                        alt="Silent Walls"
                        className={styles.footer__logo}
                    />
                    <div className={styles.footer__left}>
                        <p className={styles.footer__address}>г. Обнинск, ул. Курчатова, д. 49А, офис 709</p>
                    </div>
                    <div className={styles.contact__info}>
                        <h4 className={styles.contact__title}>Связаться с нами</h4>
                        <p>+7 (999) 999-99-99</p>
                        <p>info@silentwalls.ru</p>
                    </div>
                    <div className={styles.footer__social}>
                        <a href="https://vk.com/your_channel" target="_blank" rel="noopener noreferrer" className={styles.social__link}>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18.5 0C8.28273 0 0 8.28273 0 18.5C0 28.7173 8.28273 37 18.5 37C28.7173 37 37 28.7173 37 18.5C37 8.28273 28.7173 0 18.5 0ZM27.8499 20.6266C27.8499 20.6266 29.9283 22.6798 30.4746 23.6486C30.4898 23.6714 30.4974 23.6942 30.505 23.7094C30.7138 24.0648 30.7746 24.3366 30.6834 24.5378C30.5238 24.8781 29.9131 25.0565 29.7231 25.0717H25.8787C25.6395 25.0717 25.1387 25.0033 24.5316 24.5834C24.0612 24.2508 23.5984 23.7018 23.1508 23.168C22.4829 22.3761 21.8986 21.6854 21.3067 21.6854C21.2307 21.6853 21.1553 21.6991 21.0835 21.7262C20.5523 21.9198 19.8996 22.6494 19.8996 24.1945C19.8996 24.6904 19.5062 25.0717 19.0054 25.0717H17.2535C16.6236 25.0717 13.8847 24.8629 11.4595 22.3001C8.47304 19.1478 5.80799 12.7262 5.78273 12.6654C5.61914 12.2658 5.95945 12.0494 6.33502 12.0494H10.2199C10.6599 12.0494 10.7967 12.3212 10.8955 12.5452C11.0095 12.8094 11.5255 14.1406 12.3478 15.6097C13.6714 17.9437 14.4633 19.0037 15.1084 19.0037C15.2225 19.0036 15.3351 18.9765 15.4385 18.9243C16.4073 18.3931 16.2593 15.6857 16.2289 15.1089C16.2289 14.9837 16.2289 13.9237 15.8583 13.4229C15.5839 13.0523 15.0983 12.9155 14.8113 12.8623C14.9329 12.6935 15.0923 12.5563 15.2763 12.4625C15.8431 12.1831 16.8423 12.1375 17.8339 12.1375H18.4334C19.5062 12.1527 19.7682 12.2211 20.1388 12.3123C20.8827 12.4795 20.8979 12.9651 20.8295 14.6714C20.8143 15.0724 20.7991 15.5276 20.7991 16.0664C20.7991 16.2068 20.7915 16.3624 20.7915 16.5256C20.7687 17.3707 20.7383 18.3243 21.3219 18.8479C21.4054 18.9131 21.5051 18.9478 21.6075 18.9478C21.8239 18.9478 22.4766 18.9478 24.2361 15.6629C25.0584 14.2177 25.7035 12.5072 25.7491 12.3744C25.7795 12.3212 25.8707 12.1831 25.9771 12.1223C26.0531 12.0851 26.1371 12.0664 26.2219 12.0684H30.7594C31.1376 12.0684 31.3996 12.1375 31.4604 12.2971C31.5744 12.5605 31.4452 13.3524 29.5135 16.0208L28.6456 17.1796C26.8937 19.4832 26.8937 19.5972 27.8499 20.6266Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>
                        <a href="https://t.me/your_channel" target="_blank" rel="noopener noreferrer" className={styles.social__link}>
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
