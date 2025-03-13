import { FC, useEffect, useState, useRef } from 'react';
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
        description: 'Консультация специалиста и подбор текстиля для ваших целей, после выявления вашей потребности выезд на замер.'
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

export const SetupSteps: FC<SetupStepsProps> = ({ className }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [maxReachedStep, setMaxReachedStep] = useState(0);
    const elementRef = useRef<HTMLDivElement | null>(null);
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    const handleScroll = () => {
        const element = elementRef.current;
        if (!element || window.innerWidth <= 350) return;

        const rect = element.getBoundingClientRect();
        const scrollPercentage = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const stepProgress = Math.min(Math.max(scrollPercentage, 0), 1);
        const currentStep = Math.floor(stepProgress * steps.length);
        const newStep = Math.min(currentStep, steps.length - 1);
        
        // Обновляем максимально достигнутый шаг
        if (newStep > maxReachedStep) {
            setMaxReachedStep(newStep);
        }
        
        // Устанавливаем активный шаг не меньше максимально достигнутого
        setActiveStep(Math.max(newStep, maxReachedStep));
    };

    useEffect(() => {
        if (inView) {
            if (window.innerWidth <= 350) {
                // Автоматическая анимация для мобильных
                const interval = setInterval(() => {
                    setActiveStep((prev) => {
                        const newStep = prev < steps.length - 1 ? prev + 1 : prev;
                        setMaxReachedStep(Math.max(maxReachedStep, newStep));
                        return newStep;
                    });
                }, 2000);
                return () => clearInterval(interval);
            } else {
                // Анимация по скроллу для десктопа
                window.addEventListener('scroll', handleScroll);
                handleScroll(); // Инициализация при первом рендере
                return () => window.removeEventListener('scroll', handleScroll);
            }
        }
    }, [inView, maxReachedStep]);

    return (
        <div 
            id="setup" 
            className={classNames(styles.root, className)} 
            ref={(node) => {
                elementRef.current = node;
                ref(node);
            }}
        >
            <div className={styles.ss__content}>
                <p className={styles['ss__section-prefix']}>Как это работает? </p>
                <h2 className={styles['ss__section-heading']}>Реализация Тихих стен</h2>
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
