import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { CheckCircle2, XCircle } from 'lucide-react';
import styles from './toast.module.scss';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    duration?: number;
    onClose: () => void;
}

export const Toast: FC<ToastProps> = ({ 
    message, 
    type = 'success', 
    duration = 3000,
    onClose 
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); 
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div
            className={classNames(
                styles.toast,
                styles[`toast--${type}`],
                isVisible && styles['toast--visible']
            )}
        >
            {type === 'success' ? (
                <CheckCircle2 className={styles.toast__icon} />
            ) : (
                <XCircle className={styles.toast__icon} />
            )}
            {message}
        </div>
    );
};
