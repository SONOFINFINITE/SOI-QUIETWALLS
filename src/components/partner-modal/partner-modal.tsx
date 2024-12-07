import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import * as yup from 'yup';
import styles from './partner-modal.module.scss';
import { sendEmail } from '../../utils/emailService';
import { showToast } from '../toast-container/toast-container';

interface PartnerModalProps {
    isOpen: boolean;
    onClose: () => void;
    submitButtonText?: string;
    title?: string;
    description?: string;
    type?: 'partner' | 'consultation';
}

interface FormData {
    name: string;
    phone: string;
    agreement: boolean;
}

interface FormErrors {
    name?: string;
    phone?: string;
}

const schema = yup.object().shape({
    name: yup
        .string()
        .required('Имя обязательно')
        .min(2, 'Имя должно содержать минимум 2 символа')
        .matches(/^[а-яА-ЯёЁa-zA-Z\s-]+$/, 'Имя может содержать только буквы, пробелы и дефис'),
    phone: yup
        .string()
        .required('Телефон обязателен')
        .matches(/^\+?[78][-\s]?\d{3}[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/, 'Неверный формат телефона'),
    agreement: yup
        .boolean()
        .oneOf([true], 'Необходимо согласие')
});

export const PartnerModal: React.FC<PartnerModalProps> = ({ 
    isOpen, 
    onClose, 
    submitButtonText = 'Отправить',
    title = 'Стать партнёром',
    description = 'Оставьте контактные данные, мы свяжемся с вами и расскажем подробнее об условиях сотрудничества',
    type = 'partner'
}) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        agreement: false
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isValid, setIsValid] = useState<{[key: string]: boolean}>({
        name: false,
        phone: false,
        agreement: false
    });

    const [isLoading, setIsLoading] = useState(false);

    // Управление скроллом страницы
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = 'var(--scrollbar-compensation)';
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }

        // Вычисляем ширину скроллбара при монтировании
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--scrollbar-compensation', `${scrollBarWidth}px`);

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                name: '',
                phone: '',
                agreement: false
            });
            setErrors({});
            setIsValid({
                name: false,
                phone: false,
                agreement: false
            });
        }
    }, [isOpen]);

    const formatPhoneNumber = (value: string) => {
        // Удаляем все нецифровые символы
        const digits = value.replace(/\D/g, '');
        
        // Если первая цифра 9, добавляем +7
        if (digits.startsWith('9')) {
            return '+7' + digits;
        }
        
        // Если первая цифра 7, добавляем +
        if (digits.startsWith('7')) {
            return '+' + digits;
        }
        
        // Если первая цифра 8, заменяем на +7
        if (digits.startsWith('8')) {
            return '+7' + digits.substring(1);
        }
        
        return value;
    };

    const validateField = async (name: string, value: string | boolean) => {
        try {
            await schema.validateAt(name, { [name]: value });
            setErrors(prev => ({ ...prev, [name]: undefined }));
            setIsValid(prev => ({ ...prev, [name]: true }));
            return true;
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                setErrors(prev => ({ ...prev, [name]: error.message }));
                setIsValid(prev => ({ ...prev, [name]: false }));
            }
            return false;
        }
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
            setIsValid(prev => ({ ...prev, [name]: checked }));
            return;
        }
        
        const formattedValue = name === 'phone' ? formatPhoneNumber(value) : value;
        
        setFormData(prev => ({
            ...prev,
            [name]: formattedValue
        }));

        await validateField(name, formattedValue);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            console.log('Validating form...');
            const isNameValid = await validateField('name', formData.name);
            const isPhoneValid = await validateField('phone', formData.phone);

            if (!isNameValid || !isPhoneValid || !formData.agreement) {
                console.log('Form validation failed');
                setIsLoading(false);
                return;
            }

            console.log('Form validation passed, sending data...');
            const emailData = {
                name: formData.name,
                phone: formData.phone,
                type: type
            };
            console.log('Email data:', emailData);

            const result = await sendEmail(emailData);
            console.log('Send email result:', result);

            if (result.success) {
                console.log('Form submitted successfully');
                setFormData({
                    name: '',
                    phone: '',
                    agreement: false
                });
                onClose();
                showToast('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.', 'success');
            } else {
                console.error('Form submission failed:', result);
                showToast('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.', 'error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            showToast('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        onClose();
        // Очистка произойдет автоматически благодаря useEffect
    };

    const isFormValid = isValid.name && isValid.phone && isValid.agreement && 
                       formData.name.trim() !== '' && 
                       formData.phone.trim() !== '';

    return (
        <div className={classNames(styles.modal, {
            [styles.modal_open]: isOpen
        })}>
            <div className={styles.modal__overlay} onClick={handleCloseModal} />
            <div className={styles.modal__content}>
                <div className={styles.modal__header}>
                    <h2 className={styles.modal__title}>{title}</h2>
                    <button className={styles.close__button} onClick={handleCloseModal}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                <p className={styles.modal__description}>{description}</p>
                <form className={styles.modal__form} onSubmit={handleSubmit}>
                    <div className={styles.form__field}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ваше имя"
                            className={classNames(styles.form__input, {
                                [styles.form__input_error]: errors.name
                            })}
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        {errors.name && <span className={styles.form__error}>{errors.name}</span>}
                    </div>
                    <div className={styles.form__field}>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Ваш телефон"
                            className={classNames(styles.form__input, {
                                [styles.form__input_error]: errors.phone
                            })}
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        {errors.phone && <span className={styles.form__error}>{errors.phone}</span>}
                    </div>
                    <label className={styles.form__checkbox}>
                        <input
                            type="checkbox"
                            name="agreement"
                            checked={formData.agreement}
                            onChange={handleChange}
                            required
                        />
                        Согласен на обработку персональных данных
                    </label>
                    <button 
                        type="submit" 
                        className={classNames(styles.form__submit, {
                            [styles.form__submit_disabled]: !isFormValid || isLoading
                        })}
                        disabled={!isFormValid || isLoading}
                    >
                        {isLoading ? (
                            <div className={styles.spinner}>
                                <div className={styles.spinnerDot}></div>
                                <div className={styles.spinnerDot}></div>
                                <div className={styles.spinnerDot}></div>
                            </div>
                        ) : (
                            submitButtonText
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
