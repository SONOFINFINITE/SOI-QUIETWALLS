import { forwardRef, useImperativeHandle, useState } from 'react';
import { Toast } from '../toast/toast';

interface ToastMessage {
    id: number;
    message: string;
    type: 'success' | 'error';
}

export interface ToastContainerRef {
    showToast: (message: string, type: 'success' | 'error') => void;
}

export const ToastContainer = forwardRef<ToastContainerRef>((_, ref) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
    };

    useImperativeHandle(ref, () => ({
        showToast
    }));

    const removeToast = (id: number) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <>
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </>
    );
});

// Создаем глобальный контейнер для тостов
let toastContainer: ToastContainerRef | null = null;

export const setToastContainer = (container: ToastContainerRef | null) => {
    toastContainer = container;
};

export const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    toastContainer?.showToast(message, type);
};
