import { FC, useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './where-to-use-gallery.module.scss';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import kvartiraImg from '../../assets/kvartira.jpg';
import otelImg from '../../assets/otel.png';
import spalnyaImg from '../../assets/spalnya.jpg';
import kabinetImg from '../../assets/kabinet.jpeg';
import koridorImg from '../../assets/koridor.png';
import restoranImg from '../../assets/restaran.jpeg';
import konfzalImg from '../../assets/konfzal.jpg';
import kinoteatrImg from '../../assets/kinoteatr.jpg';

export interface WhereToUseGalleryProps {
    className?: string;
}

interface SlideData {
    id: number;
    title: string;
    link: string;
    backgroundImage?: string;
}

const slides: SlideData[] = [
    {
        id: 1,
        title: 'КВАРТИРА',
        link: '#',
        backgroundImage: kvartiraImg
    },
    {
        id: 2,
        title: 'ОТЕЛЬ',
        link: '#',
        backgroundImage: otelImg
    },
    {
        id: 3,
        title: 'СПАЛЬНЯ',
        link: '#',
        backgroundImage: spalnyaImg
    },
    {
        id: 4,
        title: 'КАБИНЕТ',
        link: '#',
        backgroundImage: kabinetImg
    },
    {
        id: 5,
        title: 'КОРИДОР',
        link: '#',
        backgroundImage: koridorImg
    },
    {
        id: 6,
        title: 'РЕСТОРАН',
        link: '#',
        backgroundImage: restoranImg
    },
    {
        id  : 7,
        title: 'КОНФЕРЕНЦ-ЗАЛ',
        link: '#',
        backgroundImage: konfzalImg
    },
    {
        id  : 8,
        title: 'КИНОТЕАТР',
        link: '#',
        backgroundImage: kinoteatrImg
    }
];


export const WhereToUseGallery: FC<WhereToUseGalleryProps> = ({ className }) => {
    const [activeSlide, setActiveSlide] = useState(1); // Начинаем с индекса 1, так как 0 - это клон последнего слайда
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Создаем расширенный массив слайдов с клонами для бесконечной прокрутки
    const extendedSlides = [
        { ...slides[slides.length - 1], id: 'clone-last' },  // Клон последнего слайда в начало
        ...slides,
        { ...slides[0], id: 'clone-first' }  // Клон первого слайда в конец
    ];

    const nextSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setActiveSlide(prev => {
                if (prev >= extendedSlides.length - 1) {
                    setTimeout(() => {
                        setIsTransitioning(false);
                        setActiveSlide(1);
                    }, 0);
                    return extendedSlides.length - 1;
                }
                return prev + 1;
            });
        }
    };

    const prevSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setActiveSlide(prev => {
                if (prev <= 0) {
                    setTimeout(() => {
                        setIsTransitioning(false);
                        setActiveSlide(extendedSlides.length - 2);
                    }, 0);
                    return 0;
                }
                return prev - 1;
            });
        }
    };

    useEffect(() => {
        const transitionTimeout = setTimeout(() => {
            setIsTransitioning(false);
        }, 500);

        return () => clearTimeout(transitionTimeout);
    }, [activeSlide]);

    useEffect(() => {
        const autoplayInterval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(autoplayInterval);
    }, [isTransitioning]);

    // Обработчик окончания транзиции
    const handleTransitionEnd = () => {
        if (activeSlide === 0) {
            setIsTransitioning(false);
            setActiveSlide(extendedSlides.length - 2);
        } else if (activeSlide === extendedSlides.length - 1) {
            setIsTransitioning(false);
            setActiveSlide(1);
        }
    };

    return (
        <section id='where-to-use' className={classNames(styles.root, className)}>
            <div className={styles.wtug}>
                <div className={styles.wtug__content}>
                    <p className={styles['wtug__section-prefix']}>Применение</p>
                    <h2 className={styles['wtug__section-heading']}>Установка в любых помещениях</h2>
                </div>

                <div className={styles.wtug__slider}>
                    <button 
                        className={classNames(styles.wtug__nav, styles['wtug__nav--prev'])} 
                        onClick={prevSlide} 
                        disabled={isTransitioning}
                    >
                        <ArrowLeft className={styles['wtug__nav-icon']} />
                    </button>

                    <div className={styles['wtug__slider-container']}>
                        <div 
                            className={styles.wtug__track} 
                            style={{ 
                                transform: `translateX(-${activeSlide * 100}%)`,
                                transition: isTransitioning ? 'transform 0.5s ease-out' : 'none'
                            }}
                            onTransitionEnd={handleTransitionEnd}
                        >
                            {extendedSlides.map((slide, index) => (
                                <div
                                    key={slide.id}
                                    className={classNames(styles.wtug__slide, { 
                                        [styles['wtug__slide--active']]: index === activeSlide 
                                    })}
                                >
                                    <div className={styles['wtug__slide-image']}>
                                        <img src={slide.backgroundImage} alt={slide.title} />
                                        <div className={styles['wtug__slide-content']}>
                                            <p className={styles['wtug__slide-title']}>
                                                {slide.title}
                                                <ArrowRight className={styles['wtug__slide-icon']} />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button 
                        className={classNames(styles.wtug__nav, styles['wtug__nav--next'])} 
                        onClick={nextSlide} 
                        disabled={isTransitioning}
                    >
                        <ArrowRight className={styles['wtug__nav-icon']} />
                    </button>
                </div>
            </div>
        </section>
    );
};
