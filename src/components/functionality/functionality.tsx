import classNames from 'classnames';
import styles from './functionality.module.scss';
import { useInView } from 'react-intersection-observer';
import audiosystImg from '../../assets/audiosist_raskr.jpg';
import skrytySvetImg from '../../assets/srytySvet.jpg';
import akustikaImg from '../../assets/akustika.jpg';
import rospisImg from '../../assets/rospis.jpg';
import izolImg from '../../assets/izol.jpg';
import stenyipotolokImg from '../../assets/stenypotolok.jpg';

export interface FunctionalityProps {
    className?: string;
}

export const Functionality = ({ className }: FunctionalityProps) => {
    const [ref1, inView1] = useInView({ threshold: 0.3, triggerOnce: true });
    const [ref2, inView2] = useInView({ threshold: 0.3, triggerOnce: true });
    const [ref3, inView3] = useInView({ threshold: 0.3, triggerOnce: true });
    const [ref4, inView4] = useInView({ threshold: 0.3, triggerOnce: true });
    const [ref5, inView5] = useInView({ threshold: 0.3, triggerOnce: true });
    const [ref6, inView6] = useInView({ threshold: 0.3, triggerOnce: true });

    return (
        <div id="portfolio" className={classNames(styles.root, className)}>
            <div className={styles['func__content-wrapper']}>
                <p className={styles['__section-prefix']}>Функционал</p>
                <h2 className={styles['__section-heading']}>Тихие стены решают множество задач</h2>
                <div className={styles['func__articles-wrapper']}>
                    <div
                        ref={ref1}
                        className={classNames(styles['article-left-pic-right__template'], {
                            [styles.visible]: inView1
                        })}
                    >
                        <div className={styles['template-article-left']}>
                            <h2 className={styles.article__heading}>РАСКРЫВАЕТ АУДИОСИСТЕМУ</h2>
                            <p className={styles.article__paragraph}>
                                Архитектурный текстиль незаменим для установки в кинозалах и конференц-залах, так как убирает лишние реверберации. Это
                                значит, что мы можем добиться идеального звучания, которое создаст комфортную и высококачественную звуковую атмосферу
                                для зрителей. Немаловажно, что дизайн архитектурного текстиля является самым эстетически красивым среди тех
                                материалов, которые могут обеспечить похожий эффект. За счет своей ширины материал позволяет делать помещения без
                                швов, а разнообразие фактур и цветов реализовывать практически любую задумку дизайнера.
                            </p>
                        </div>
                        <img
                            src={audiosystImg}
                            alt="Аудиосистема в действии"
                            loading="lazy"
                        />
                    </div>
                    <div
                        ref={ref2}
                        className={classNames(styles['article-right-pic-left__template'], {
                            [styles.visible]: inView2
                        })}
                    >
                        <img
                            src={akustikaImg}
                            alt="Акустическое оформление"
                            loading="lazy"
                        />
                        <div className={styles['template-article-left']}>
                            <h2 className={styles.article__heading}>Безупречная акустика</h2>
                            <p className={styles.article__paragraph}>
                                За счет вставки акустической мембраны, звук равномерно распределяется по площади помещения, увеличивается
                                разборчивость голоса и звуков, достигается эффект акустического комфорта
                            </p>
                        </div>
                    </div>
                    <div
                        ref={ref3}
                        className={classNames(styles['article-left-pic-right__template'], {
                            [styles.visible]: inView3
                        })}
                    >
                        <div className={styles['template-article-left']}>
                            <h2 className={styles.article__heading}>Шумоизоляция</h2>
                            <p className={styles.article__paragraph}>
                                С помощью шумоизоляционной мембраны происходит защита помещения от проникновения в него шума извне, тем самым до 100%
                                уменьшается слышимость из соседних помещений
                            </p>
                        </div>
                        <img
                            src={izolImg}
                            alt="Шумоизоляционная система"
                            loading="lazy"
                        />
                    </div>
                    <div
                        ref={ref4}
                        className={classNames(styles['article-right-pic-left__template'], {
                            [styles.visible]: inView4
                        })}
                    >
                        <img
                            src={skrytySvetImg}
                            alt="Скрытый свет"
                            loading="lazy"
                        />
                        <div className={styles['template-article-left']}>
                            <h2 className={styles.article__heading}>Скрытый свет</h2>
                            <p className={styles.article__paragraph}>
                                За счет хорошей светопропускной способности текстиля, помимо стандартных световых решений, в систему Тихие стены есть
                                возможность встроить “невидимый” свет, спрятанный между полотном и мембраной
                            </p>
                        </div>
                    </div>
                    <div
                        ref={ref5}
                        className={classNames(styles['article-left-pic-right__template'], {
                            [styles.visible]: inView5
                        })}
                    >
                        <div className={styles['template-article-left']}>
                            <h2 className={styles.article__heading}>Фотопечать/роспись</h2>
                            <p className={styles.article__paragraph}>
                                Не ограничивайте себя в фантазии, на тестиль можно нанести любую фотопечать, а так же расписать стены индивидуальным
                                рисунком
                            </p>
                        </div>
                        <img
                            src={rospisImg}
                            alt="Фотопечать"
                            loading="lazy"
                        />
                    </div>
                    <div
                        ref={ref6}
                        className={classNames(styles['article-right-pic-left__template'], {
                            [styles.visible]: inView6
                        })}
                    >
                        <img
                            src={stenyipotolokImg}
                            alt="Объединение стен и потолка"
                            loading="lazy"
                        />
                        <div className={styles['template-article-left']}>
                            <h2 className={styles.article__heading}>Объединение стен и потолка</h2>
                            <p className={styles.article__paragraph}>
                                Наша монтажная система позволяет легко объединять стены и потолок в одно конструктивное решение, максимально приближая
                                эффект окраски или обоев
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
