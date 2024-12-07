import React from 'react';
import { Home } from './pages/home/home';
import { PartnerModal } from './components/partner-modal/partner-modal';
import { ToastContainer, ToastContainerRef, setToastContainer } from './components/toast-container/toast-container';

function App() {
    const [isPartnerModalOpen, setIsPartnerModalOpen] = React.useState(false);
    const [isConsultModalOpen, setIsConsultModalOpen] = React.useState(false);
    const toastContainerRef = React.useRef<ToastContainerRef>(null);

    React.useEffect(() => {
        if (toastContainerRef.current) {
            setToastContainer(toastContainerRef.current);
        }
    }, []);

    return (
        <>
            <Home />
            <PartnerModal 
                isOpen={isPartnerModalOpen}
                onClose={() => setIsPartnerModalOpen(false)}
                submitButtonText="Стать партнёром"
                title="Стать партнёром"
                description="Оставьте контактные данные, мы свяжемся с вами и расскажем подробнее об условиях сотрудничества"
                type="partner"
            />
            <PartnerModal 
                isOpen={isConsultModalOpen}
                onClose={() => setIsConsultModalOpen(false)}
                submitButtonText="Получить консультацию"
                title="Остались вопросы?"
                description="Оставьте контактные данные, мы перезвоним вам и проконсультируем по любому вопросу"
                type="consultation"
            />
            <ToastContainer ref={toastContainerRef} />
        </>
    );
}

export default App;
