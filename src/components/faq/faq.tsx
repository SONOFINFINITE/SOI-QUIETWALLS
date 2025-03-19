import { useState } from 'react';
import classNames from 'classnames';
import styles from './faq.module.scss';

export interface FaqProps {
    className?: string;
}

interface FaqItem {
    question: string;
    answer: string;
}

const faqData: FaqItem[] = [
    {
        question: 'КАК ДОЛГО ПРОСЛУЖИТ АРХИТЕКТУРНЫЙ ТЕКСТИЛЬ?',
        answer: 'При правильной установке и уходе архитектурный текстиль может служить более 30 лет, сохраняя свои акустические и эстетические свойства.'
    },
    {
        question: 'СКОЛЬКО ПО ВРЕМЕНИ ЗАНИМАЕТ ПРОЦЕСС МОНТАЖА?',
        answer: 'Время монтажа зависит от площади помещения и сложности проекта. В среднем, установка занимает 1-2 дня для стандартного помещения.'
    },
    {
        question: 'КАК ЧИСТИТЬ СТЕНЫ ИЗ ТЕКСТИЛЯ?',
        answer: 'Текстильные стены можно чистить пылесосом с мягкой щеткой или специальными чистящими средствами для тканей. Рекомендуется регулярная сухая чистка.'
    },
    {
        question: 'ТКАНЬ УСТОЙЧИВА К ПЕРЕПАДАМ ТЕМПЕРАТУР?',
        answer: 'Да, наш архитектурный текстиль устойчив к температурным колебаниям и может использоваться в помещениях с различными климатическими условиями.'
    },
    {
        question: 'НУЖНА ЛИ ПОДГОТОВКА СТЕН К МОНТАЖУ?',
        answer: 'Да, стены должны быть чистыми, сухими и относительно ровными. Наши специалисты проведут оценку поверхности и при необходимости дадут рекомендации по подготовке.'
    }
];

export const Faq = ({ className }: FaqProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div id="about" className={classNames(styles.root, className)}>
            <div className={styles.faq__wrapper}>
                <span className={styles.__section_prefix}>FAQ</span>
                <h2 className={styles.__section_heading}>Отвечаем на популярные вопросы</h2>
                <div className={styles.faq__accordion}>
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className={classNames(styles.faq__item, {
                                [styles.active]: activeIndex === index
                            })}
                            onClick={() => toggleAccordion(index)}
                        >
                            <div className={styles.faq__question}>
                                <span>{item.question}</span>
                                <div className={styles.faq__icon}></div>
                            </div>
                            <div className={styles.faq__answer}>
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
