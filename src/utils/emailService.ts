interface EmailData {
    name: string;
    phone: string;
    type: 'partner' | 'consultation';
}

// Активируйте свой email, перейдя по этой ссылке один раз:
// https://formsubmit.co/activate/ksmirnov23@gmail.com

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/ksmirnov23@gmail.com';

export const sendEmail = async (data: EmailData) => {
    try {
        console.log('Sending data:', data);
        console.log('Form type:', data.type); // Добавляем лог для отладки

        const response = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...data,
                _subject: data.type === 'consultation' 
                    ? 'Новая заявка на консультацию' 
                    : 'Новая заявка на партнерство',
                _template: 'table'
            })
        });

        console.log('Response received:', response);
        
        const result = await response.json();
        console.log('Response data:', result);

        if (!response.ok) {
            throw new Error(result.message || 'Failed to send message');
        }

        return { success: true };
    } catch (error) {
        console.error('Error submitting form:', error);
        return { success: false, error };
    }
};
