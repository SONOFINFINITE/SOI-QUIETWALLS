interface EmailData {
    name: string;
    phone: string;
    type: 'partner' | 'consultation';
}

// Web3Forms API ключ
const WEB3FORMS_ACCESS_KEY = 'b038c7d1-615e-4322-abaf-2ac23e61303f';
const WEB3FORMS_API_ENDPOINT = 'https://api.web3forms.com/submit';

// Адрес получателя
const RECIPIENT_EMAIL = 'tihiesteny40@gmail.com';

/**
 * Отправка электронного письма через Web3Forms API
 * Бесплатный тариф: 1000 писем в месяц
 * Документация: https://web3forms.com/docs
 */
export const sendEmail = async (data: EmailData) => {
    try {
        console.log('Отправка данных:', data);
        
        const subject = data.type === 'consultation' 
            ? 'Новая заявка на консультацию' 
            : 'Новая заявка на партнерство';
        
        // Добавляем временную метку для уникальности письма
        const timestamp = new Date().toLocaleString('ru-RU');
        
        const formData = {
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `${subject} - ${timestamp}`,
            from_name: 'Тихие Стены - Сайт',
            to_email: RECIPIENT_EMAIL,
            name: data.name,
            phone: data.phone,
            message: `Тип заявки: ${data.type === 'consultation' ? 'Консультация' : 'Партнерство'}`,
            timestamp: timestamp
        };
        
        const response = await fetch(WEB3FORMS_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        console.log('Ответ получен:', response);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Данные ошибки:', errorData);
            throw new Error(errorData.message || 'Ошибка отправки сообщения');
        }
        
        const result = await response.json();
        console.log('Данные ответа:', result);
        
        if (result.success) {
            return { success: true, messageId: result.message_id };
        } else {
            throw new Error(result.message || 'Ошибка отправки сообщения');
        }
    } catch (error) {
        console.error('Ошибка отправки формы:', error);
        return { success: false, error };
    }
};

// Альтернативное решение: обычная форма с отправкой на email
export const sendEmailViaFormSubmit = async (data: EmailData) => {
    try {
        console.log('Отправка данных через FormSubmit:', data);
        
        // Можно использовать formsubmit.co без AJAX
        const FORM_ENDPOINT = 'https://formsubmit.co/ajax/tihiesteny40@gmail.com';
        
        const response = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                phone: data.phone,
                type: data.type === 'consultation' ? 'Консультация' : 'Партнерство',
                _subject: data.type === 'consultation' 
                    ? 'Новая заявка на консультацию' 
                    : 'Новая заявка на партнерство',
                _template: 'table'
            })
        });
        
        console.log('Ответ FormSubmit получен:', response);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка отправки через FormSubmit');
        }
        
        const result = await response.json();
        console.log('Данные ответа FormSubmit:', result);
        
        return { success: true };
    } catch (error) {
        console.error('Ошибка отправки формы через FormSubmit:', error);
        return { success: false, error };
    }
};

