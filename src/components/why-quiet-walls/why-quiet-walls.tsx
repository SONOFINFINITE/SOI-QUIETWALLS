import { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './why-quiet-walls.module.scss';
import { Timer, Volume2, Palette, Shield, Box, Leaf } from 'lucide-react';

export interface WhyQuietWallsProps {
    className?: string;
}

export const WhyQuietWalls: FC<WhyQuietWallsProps> = ({ className }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    cardsRef.current.forEach((card, index) => {
                        if (card) {
                            setTimeout(() => {
                                card.classList.add(styles['wqw__card--visible']);
                            }, index * 200);
                        }
                    });
                }
            },
            {
                threshold: 0.2
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="services" className={styles.wqw__wrapper} ref={sectionRef}>
            <div className={styles['wqw__content-wrapper']}>
                <p className={styles['wqw__section-prefix']}>Почему мы?</p>
                <h2 className={styles['wqw__section-heading']}>Инновация в финишной отделке</h2>
                <div className={classNames(styles['wqw__grid-wrapper'], className)}>
                    <div className={styles.wqw__card} ref={el => cardsRef.current[0] = el as HTMLDivElement}>
                        <div className={styles['wqw__card-header']}>
                            <div className={styles['wqw__card-icon']}>
                                <Timer className={styles['wqw__card-icon-svg']} />
                            </div>
                            <h3 className={styles['wqw__card-title']}>Быстрый монтаж</h3>
                        </div>
                        <p className={styles['wqw__card-text']}>
                            Не требуется специальная подготовка стен, если требуется поменять дизайн, цвет, фактуру — её можно заменить новым видом
                            полотна, без демонтажа системы
                        </p>
                    </div>

                    <div className={styles.wqw__card} ref={el => cardsRef.current[1] = el as HTMLDivElement}>
                        <div className={styles['wqw__card-header']}>
                            <div className={styles['wqw__card-icon']}>
                                <Volume2 className={styles['wqw__card-icon-svg']} />
                            </div>
                            <h3 className={styles['wqw__card-title']}>Акустический комфорт</h3>
                        </div>
                        <p className={styles['wqw__card-text']}>
                            Материал отлично поглощает отраженный звук, улучшает разборчивость речи и уменьшает передачу звука
                        </p>
                    </div>

                    <div className={styles.wqw__card} ref={el => cardsRef.current[2] = el as HTMLDivElement}>
                        <div className={styles['wqw__card-header']}>
                            <div className={styles['wqw__card-icon']}>
                                <Palette className={styles['wqw__card-icon-svg']} />
                            </div>
                            <h3 className={styles['wqw__card-title']}>Уникальный дизайн</h3>
                        </div>
                        <p className={styles['wqw__card-text']}>
                            Возможность интегрирования как открытых так и скрытых за полотном осветительных приборов
                        </p>
                    </div>

                    <div className={styles.wqw__card} ref={el => cardsRef.current[3] = el as HTMLDivElement}>
                        <div className={styles['wqw__card-header']}>
                            <div className={styles['wqw__card-icon']}>
                                <Shield className={styles['wqw__card-icon-svg']} />
                            </div>
                            <h3 className={styles['wqw__card-title']}>Долговечность</h3>
                        </div>
                        <p className={styles['wqw__card-text']}>
                            Текстиль устойчив к выгоранию, высокопрочный и не пропускает влагу, а также очень легок в уходе
                        </p>
                    </div>

                    <div className={styles.wqw__card} ref={el => cardsRef.current[4] = el as HTMLDivElement}>
                        <div className={styles['wqw__card-header']}>
                            <div className={styles['wqw__card-icon']}>
                                <Box className={styles['wqw__card-icon-svg']} />
                            </div>
                            <h3 className={styles['wqw__card-title']}>Антивандальность</h3>
                        </div>
                        <p className={styles['wqw__card-text']}>Не царапается и не рвется даже при механическом воздействии средней силы</p>
                    </div>

                    <div className={styles.wqw__card} ref={el => cardsRef.current[5] = el as HTMLDivElement}>
                        <div className={styles['wqw__card-header']}>
                            <div className={styles['wqw__card-icon']}>
                                <Leaf className={styles['wqw__card-icon-svg']} />
                            </div>
                            <h3 className={styles['wqw__card-title']}>Гипоаллергенность</h3>
                        </div>
                        <p className={styles['wqw__card-text']}>
                            100% полиэстер, не содержит клея и обладает антистатическим и антибактериальным эффектом
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
