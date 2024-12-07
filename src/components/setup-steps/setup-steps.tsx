import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './setup-steps.module.scss';
import { useInView } from 'react-intersection-observer';
import { SmileIcon } from 'lucide-react';

export interface SetupStepsProps {
    className?: string;
}

interface Step {
    number: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
}

const steps: Step[] = [
    {
        number: '01',
        title: 'ЗАМЕР',
        description: 'Выезд технического специалиста, консультация и подбор текстиля для ваших целей'
    },
    {
        number: '02',
        title: 'ДИЗАЙН-ПРОЕКТ',
        description: 'Обсуждение дизайн-проекта, если у вас нет готового проекта, поможем в его составлении'
    },
    {
        number: '03',
        title: 'ПОДГОТОВКА',
        description: 'Установка каркаса по периметру, подготовка акустической мембраны и необходимого количества текстиля'
    },
    {
        number: '04',
        title: 'ЧИСТЫЙ МОНТАЖ',
        description: 'Вставка акустической панели по периметру и натяжка текстиля, установка освещения, розеток и выключателей'
    },
    {
        number: '05',
        title: 'УБОРКА',
        description:
            'Минимум мусора и грязи. После монтажа Тихих стен не остается пыли и грязи, весь мусор который мы забираем с собой помещается в один пакет'
    },
    {
        number: '06',
        title: 'СЧАСТЛИВЫЙ КЛИЕНТ',
        description:
            'Наслаждайтесь комфортной акустикой и стильным интерьером. Мы гордимся тем, что создаем пространства, в которых вы чувствуете себя прекрасно',
        icon: <SmileIcon className={styles.happyIcon} />
    }
];

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const SetupSteps: FC<SetupStepsProps> = ({ className }) => {
    const [activeStep, setActiveStep] = useState(0);
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    useEffect(() => {
        if (inView) {
            const interval = setInterval(() => {
                setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [inView]);

    return (
        <div id="flipping" className={classNames(styles.root, className)} ref={ref}>
            <div className={styles.ss__content}>
                <p className={styles['ss__section-prefix']}>Как это работает? </p>
                <h2 className={styles['ss__section-heading']}>Установка Тихих стен</h2>
            </div>
            <div className={styles.timeline}>
                <div
                    className={styles.timeline_progress}
                    style={{
                        height: `${((activeStep + 1) / steps.length) * 100}%`
                    }}
                />
                {steps.map((step, index) => (
                    <div
                        key={step.number}
                        className={classNames(styles.step, {
                            [styles.active]: index <= activeStep,
                            [styles.completed]: index < activeStep,
                            [styles.even]: index % 2 === 0
                        })}
                    >
                        <div className={styles.stepContent}>
                            <h3 className={styles.stepTitle}>
                                <div className={styles.stepNumber}>{step.icon || step.number}</div>
                                {step.title}
                            </h3>
                            <p className={styles.stepDescription}>{step.description}</p>
                        </div>
                        <div className={styles.connector} />
                    </div>
                ))}
            </div>
        </div>
    );
};
