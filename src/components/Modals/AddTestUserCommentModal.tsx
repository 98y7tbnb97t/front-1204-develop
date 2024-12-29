import React, { useState } from 'react';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import ChangeLanguageBtns from '../UI/ChangeLanguageBtns';
import { Elanguages } from '../../store/reducers/TranslateSlice';
import TestLessonService from '../../services/TestLessonService';
import { AxiosError } from 'axios';
import { ServerError } from '../../models/response/ServerError';
import SuccessModal from '../UI/SuccessModal'; // Import the SuccessModal component
import { translations } from '../../utils/translations';

interface AddTestUserCommentModalProps {
    active: boolean;
    setActive: (active: boolean) => void;
    test_user_id: string;
}

interface CommentTemplate {
    [Elanguages.RU]: string;
    [Elanguages.EN]: string;
    [Elanguages.AM]: string;
}

const commentTemplates: CommentTemplate[] = [
    {
        [Elanguages.RU]: "Хорошо ориентируется на доске и быстро усваивает новые концепции.",
        [Elanguages.EN]: "Has a good understanding of the board and quickly grasps new concepts.",
        [Elanguages.AM]: "Լավ է կողմնորոշվում խաղատախտակին և արագ ընկալում է նոր գաղափարները:"
    },
    {
        [Elanguages.RU]: "Ученик активно задавал вопросы, проявляя интерес и стремление к обучению.",
        [Elanguages.EN]: "The student actively asked questions, showing interest and a desire to learn.",
        [Elanguages.AM]: "Ուսանողը ակտիվ հարցեր էր տալիս՝ ցուցաբերելով հետաքրքրություն և ուսման ձգտում:"
    },
    {
        [Elanguages.RU]: "Видна сильная мотивация к обучению и желание углубить шахматные знания.",
        [Elanguages.EN]: "Strong motivation to learn is evident, with a desire to deepen chess knowledge.",
        [Elanguages.AM]: "Տեսանելի է ուսման բարձր մոտիվացիան և շախմատային գիտելիքների խորացման ցանկությունը:"
    },
    {
        [Elanguages.RU]: "Заметно, что мотивация у ученика недостаточно высока, нужно усилить вовлеченность.",
        [Elanguages.EN]: "It is noticeable that the student's motivation is not strong enough; engagement needs to be improved.",
        [Elanguages.AM]: "Նկատելի է, որ ուսանողի մոտիվացիան բավարար չէ, անհրաժեշտ է ուժեղացնել ներգրավվածությունը:"
    },
    {
        [Elanguages.RU]: "Проблемы с концентрацией внимания, требуется работа над дисциплиной.",
        [Elanguages.EN]: "Issues with concentration, work on discipline is required.",
        [Elanguages.AM]: "Խնդիրներ են առաջանում ուշադրության կենտրոնացման հետ, անհրաժեշտ է աշխատել կարգապահության վրա:"
    }
];

const AddTestUserCommentModal: React.FC<AddTestUserCommentModalProps> = ({ active, setActive, test_user_id }) => {
    const [comment, setComment] = useState<string>('');
    const [language, setLanguage] = useState<Elanguages>(Elanguages.RU); // Default language
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false); // State for success message
    const { 
        addCommentText, 
        inputCommentText, 
        commentAddedText,
        saveText,
        cancelText
    } = translations.testLesson;
    const handleSubmit = () => {
        TestLessonService.addTestUserComment(test_user_id, comment).then(() => {
            setComment('');
            setSuccess(true); // Set success to true
        }).catch((e: AxiosError) => {
            const event = e.response?.data as ServerError;
            setError(event.error); // Set the error message
        });
    };

    const insertTemplate = (template: CommentTemplate) => {
        setComment(prev => prev + template[language] + '\n'); // Append the selected template in the current language
    };

    return (
        <>
            <Modal className='p-2' active={active} setActive={setActive}>
                <h1 className='text-2xl font-bold text-center mb-4'>{addCommentText[language]}</h1>
                <ChangeLanguageBtns className='mb-2' onLangChange={setLanguage} language={language} />
                {commentTemplates.map((template, index) => (
                    <Button className='mb-2' key={index} onClick={() => insertTemplate(template)}>
                        {index + 1}. {template[language]} {/* Display template in the selected language */}
                    </Button>
                ))}
                <textarea
                    className='w-full h-24 p-2 border rounded'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={inputCommentText[language]}
                />
                {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message in red */}
                <div className="flex w-full mt-4">
                    <Button onClick={handleSubmit} className='mr-4 w-full !bg-gradient-button-green'>{saveText[language]}</Button>
                    <Button onClick={() => setActive(false)} className='w-full'>{cancelText[language]}</Button>
                </div>
            </Modal>
            <SuccessModal active={success} setActive={setSuccess} message={commentAddedText[language]} /> {/* Success modal */}
        </>
    );
};

export default AddTestUserCommentModal;