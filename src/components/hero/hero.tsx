import classNames from 'classnames';
import styles from './hero.module.scss';
import { Header } from '../header/header';
import backgroundVideoMov from '../../assets/tbs_Homepage_header_lores.mov';
import backgroundVideoMp4 from '../../assets/tbs_Homepage_header_lores--online-audio-convert.com.mp4';
import { useEffect, useRef } from 'react';

export interface HeroProps {
    className?: string;
}

export const Hero = ({ className }: HeroProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.play().catch((error) => {
                console.error('Error playing video:', error);
            });
        }
    }, []);

    return (
        <section id="hero" className={styles.hero}>
            <video
                ref={videoRef}
                className={styles.hero__background}
                autoPlay
                muted
                loop
                playsInline
                onError={(e) => console.error('Video error:', e)}
                src={backgroundVideoMp4}
            >
                Your browser does not support the video tag.
            </video>
            <div className={styles.hero__overlay}></div>
            <Header />
            <div className={styles['hero__content-wrapper']}>
                <div className={styles.hero__text_container}>
                    <div className={styles.div1}>
                        <div className={styles['hero__advtg-wrapper']}>
                            <p className={styles['advantage-text']}>ПРЕИМУЩЕСТВО</p>
                        </div>
                        <span className={styles.span1}>|</span>
                        <div className={styles.div2}>
                            <div className={styles.advng__speed}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className={classNames('lucide', 'lucide-zap', styles.svg1)}
                                >
                                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                                </svg>
                                <p className={styles.advtg__description}>Скорость</p>
                            </div>
                            <p className={styles.detail__descr}>Нет мокрых работ</p>
                        </div>
                    </div>
                    <p className={styles.hero__prefix}>АРХИТЕКТУРНЫЙ ТЕКСТИЛЬ</p>
                    <div className={styles.hero__text_block}>
                        <h2 className={styles['hero__main-text-lead']}>ТИХИЕ СТЕНЫ</h2>
                    </div>
                    <p className={styles.hero__postfix}>ДЛЯ ФИНИШНОЙ ОТДЕЛКИ СТЕН И ПОТОЛКОВ</p>
                </div>
            </div>
            <a href="tel:+79999999999" className={styles.hero__call_button}>
                <div className={styles.hero__call_button_inner}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                </div>
                <div className={styles.hero__call_button_pulse}></div>
            </a>
        </section>
    );
};
