import { FC, useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames';
import styles from './video-stories.module.scss';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';
import video1 from '../../assets/tbs_Homepage_header_lores--online-audio-convert.com.mp4';
import video2 from '../../assets/tbs_Homepage_header_lores.mov';
import kvartiraImg from '../../assets/kvartira.jpg';
import otelImg from '../../assets/otel.png';
import spalnyaImg from '../../assets/spalnya.jpg';
import kabinetImg from '../../assets/kabinet.jpeg';
import koridorImg from '../../assets/koridor.png';
import restoranImg from '../../assets/restaran.jpeg';
import logoImg from '../../assets/LOGO-woutBG.png';

export interface VideoStoriesProps {
    className?: string;
}

interface StoryCircle {
    id: number;
    title: string;
    thumbnail: string;
    videos: StoryVideo[];
}

interface StoryVideo {
    id: number;
    src: string;
    title: string;
}

// Временные данные для демонстрации
const storyCircles: StoryCircle[] = [
    {
        id: 1,
        title: 'КВАРТИРА',
        thumbnail: kvartiraImg,
        videos: [
            { id: 1, src: video1, title: 'Квартира 1' },
            { id: 2, src: video2, title: 'Квартира 2' }
        ]
    },
    {
        id: 2,
        title: 'ОТЕЛЬ',
        thumbnail: otelImg,
        videos: [
            { id: 1, src: video1, title: 'Отель 1' },
            { id: 2, src: video2, title: 'Отель 2' }
        ]
    },
    {
        id: 3,
        title: 'СПАЛЬНЯ',
        thumbnail: spalnyaImg,
        videos: [
            { id: 1, src: video1, title: 'Спальня 1' },
            { id: 2, src: video2, title: 'Спальня 2' }
        ]
    },
    {
        id: 4,
        title: 'КАБИНЕТ',
        thumbnail: kabinetImg,
        videos: [
            { id: 1, src: video1, title: 'Кабинет 1' },
            { id: 2, src: video2, title: 'Кабинет 2' }
        ]
    },
    {
        id: 5,
        title: 'КОРИДОР',
        thumbnail: koridorImg,
        videos: [
            { id: 1, src: video1, title: 'Коридор 1' },
            { id: 2, src: video2, title: 'Коридор 2' }
        ]
    },
    {
        id: 6,
        title: 'РЕСТОРАН',
        thumbnail: restoranImg,
        videos: [
            { id: 1, src: video1, title: 'Ресторан 1' },
            { id: 2, src: video2, title: 'Ресторан 2' }
        ]
    }
];

export const VideoStories: FC<VideoStoriesProps> = ({ className }) => {
    const [activeCircle, setActiveCircle] = useState<number | null>(null);
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressIntervalRef = useRef<number | null>(null);

    // Обработчик открытия сторис
    const openStory = (circleId: number) => {
        setActiveCircle(circleId);
        setActiveVideoIndex(0);
        setProgress(0);
        setIsPlaying(true);
    };

    // Обработчик закрытия сторис
    const closeStory = () => {
        setActiveCircle(null);
        setActiveVideoIndex(0);
        setProgress(0);
        setIsPlaying(false);
        if (progressIntervalRef.current) {
            window.clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
    };

    // Обработчик перехода к следующему видео
    const nextVideo = useCallback(() => {
        if (activeCircle === null) return;

        const currentCircle = storyCircles.find((circle) => circle.id === activeCircle);
        if (!currentCircle) return;

        if (activeVideoIndex < currentCircle.videos.length - 1) {
            setActiveVideoIndex((prev) => prev + 1);
            setProgress(0);
        } else {
            // Если это последнее видео в текущем круге, переходим к следующему кругу
            const currentCircleIndex = storyCircles.findIndex((circle) => circle.id === activeCircle);
            if (currentCircleIndex < storyCircles.length - 1) {
                setActiveCircle(storyCircles[currentCircleIndex + 1].id);
                setActiveVideoIndex(0);
                setProgress(0);
            } else {
                // Если это последнее видео в последнем круге, закрываем сторис
                closeStory();
            }
        }
    }, [activeCircle, activeVideoIndex]);

    // Обработчик перехода к предыдущему видео
    const prevVideo = () => {
        if (activeCircle === null) return;

        if (activeVideoIndex > 0) {
            setActiveVideoIndex((prev) => prev - 1);
            setProgress(0);
        } else {
            // Если это первое видео в текущем круге, переходим к предыдущему кругу
            const currentCircleIndex = storyCircles.findIndex((circle) => circle.id === activeCircle);
            if (currentCircleIndex > 0) {
                const prevCircle = storyCircles[currentCircleIndex - 1];
                setActiveCircle(prevCircle.id);
                setActiveVideoIndex(prevCircle.videos.length - 1);
                setProgress(0);
            }
        }
    };

    // Обработчик клика на левую часть экрана (предыдущее видео)
    const handleLeftClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        prevVideo();
    };

    // Обработчик клика на правую часть экрана (следующее видео)
    const handleRightClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        nextVideo();
    };

    // Обработчик нажатия клавиш (стрелки влево/вправо)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (activeCircle === null) return;

            if (e.key === 'ArrowLeft') {
                prevVideo();
            } else if (e.key === 'ArrowRight') {
                nextVideo();
            } else if (e.key === 'Escape') {
                closeStory();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeCircle, activeVideoIndex, nextVideo]);

    // Управление воспроизведением видео и прогрессом
    useEffect(() => {
        if (activeCircle === null || !videoRef.current) return;

        const videoElement = videoRef.current;

        const playVideo = async () => {
            try {
                videoElement.currentTime = 0;
                await videoElement.play();
                setIsPlaying(true);

                // Запускаем интервал для обновления прогресса
                if (progressIntervalRef.current) {
                    window.clearInterval(progressIntervalRef.current);
                }

                progressIntervalRef.current = window.setInterval(() => {
                    if (videoElement.duration) {
                        setProgress((videoElement.currentTime / videoElement.duration) * 100);
                    }
                }, 100);
            } catch (error) {
                console.error('Ошибка воспроизведения видео:', error);
                setIsPlaying(false);
            }
        };

        playVideo();

        // Обработчик окончания видео
        const handleVideoEnd = () => {
            nextVideo();
        };

        videoElement.addEventListener('ended', handleVideoEnd);

        return () => {
            videoElement.pause();
            videoElement.removeEventListener('ended', handleVideoEnd);
            if (progressIntervalRef.current) {
                window.clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
            }
        };
    }, [activeCircle, activeVideoIndex, nextVideo]);

    // Получаем текущее видео
    const getCurrentVideo = () => {
        if (activeCircle === null) return null;

        const currentCircle = storyCircles.find((circle) => circle.id === activeCircle);
        if (!currentCircle) return null;

        return currentCircle.videos[activeVideoIndex];
    };

    // Получаем текущий круг
    const getCurrentCircle = () => {
        if (activeCircle === null) return null;

        return storyCircles.find((circle) => circle.id === activeCircle);
    };

    // Обработчик клика по фону модального окна
    const handleModalBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeStory();
        }
    };

    return (
        <section className={classNames(styles.root, className)}>
            <div className={styles.stories}>
                <div className={styles.stories__content}>
                    <p className={styles['stories__section-prefix']}>Видео</p>
                    <h2 className={styles['stories__section-heading']}>Наши работы</h2>
                </div>

                <div className={styles.stories__circles}>
                    {storyCircles.map((circle) => (
                        <div key={circle.id} className={styles.stories__circle} onClick={() => openStory(circle.id)}>
                            <div className={styles['stories__circle-image']}>
                                <img src={circle.thumbnail} alt={circle.title} />
                            </div>
                            <p className={styles['stories__circle-title']}>{circle.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Модальное окно для просмотра сторис */}
            {activeCircle !== null && (
                <div className={styles.stories__modal} onClick={handleModalBackdropClick}>
                    <div className={styles['stories__modal-content']}>
                        {/* Видео */}
                        <div className={styles['stories__video-container']}>
                            <video ref={videoRef} className={styles.stories__video} src={getCurrentVideo()?.src} playsInline muted></video>

                            {/* Полоса прогресса */}
                            <div className={styles['stories__progress-container']}>
                                {getCurrentCircle()?.videos.map((video, index) => (
                                    <div
                                        key={video.id}
                                        className={classNames(styles['stories__progress-bar'], {
                                            [styles['stories__progress-bar--active']]: index === activeVideoIndex
                                        })}
                                    >
                                        <div
                                            className={styles['stories__progress-fill']}
                                            style={{
                                                width: index === activeVideoIndex ? `${progress}%` : index < activeVideoIndex ? '100%' : '0%'
                                            }}
                                        ></div>
                                    </div>
                                ))}
                            </div>

                            {/* Шапка с аватаром и названием аккаунта */}
                            <div className={styles['stories__header']}>
                                <div className={styles['stories__account']}>
                                    <div className={styles['stories__avatar']}>
                                        <img src={logoImg} alt="Тихие стены" />
                                    </div>
                                    <div className={styles['stories__account-info']}>
                                        <p className={styles['stories__account-name']}>Тихие стены Обнинск</p>
                                        <p className={styles['stories__timestamp']}>@Obninsktihiestenirf</p>
                                    </div>
                                </div>
                                <button className={styles['stories__close-btn']} onClick={closeStory}>
                                    <X className={styles['stories__close-icon']} />
                                </button>
                            </div>

                            {/* Стрелки навигации для десктопа */}
                            <button
                                className={styles['stories__nav-arrow--left']}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevVideo();
                                }}
                            >
                                <ArrowLeft className={styles['stories__nav-arrow-icon']} />
                            </button>
                            <button
                                className={styles['stories__nav-arrow--right']}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextVideo();
                                }}
                            >
                                <ArrowRight className={styles['stories__nav-arrow-icon']} />
                            </button>

                            {/* Области для навигации */}
                            <div className={styles['stories__nav-area--left']} onClick={handleLeftClick}></div>
                            <div className={styles['stories__nav-area--right']} onClick={handleRightClick}></div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
