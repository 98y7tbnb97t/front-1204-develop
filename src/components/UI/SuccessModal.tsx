import React from 'react';
import Modal from './Modal';

interface SuccessModalProps {
    active: boolean;
    setActive: (active: boolean) => void;
    message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ active, setActive, message }) => {
    return (
        <Modal active={active} setActive={setActive}>
            <h2 className='text-xl font-bold text-center'>{message}</h2>
            <div className="flex justify-center mt-4">
                <button onClick={() => setActive(false)} className='bg-green-500 text-white px-4 py-2 rounded'>
                    Закрыть
                </button>
            </div>
        </Modal>
    );
};

export default SuccessModal;