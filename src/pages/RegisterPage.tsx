/* eslint-disable @typescript-eslint/no-misused-promises */
import {FC, useEffect, useState} from 'react'
import {SubmitHandler, useForm} from "react-hook-form";
import {Link, useNavigate} from 'react-router-dom';
import Logo from '../assets/logo.png'
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {registration} from '../store/reducers/UserSlice';
import {ServerError} from '../models/response/ServerError';
import {emailValidation, PasswordValidation} from '../utils/ValidationRules';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import AuthError from '../components/Modals/AuthError';
import CheckBox from "../components/UI/Main/Checkbox/CheckBox.tsx";
import {translations} from "../utils/translations.tsx";

type Form = {
    email: string,
    name: string,
    sname: string,
    password: string,
    confirm_password: string
};

const RegisterPage: FC = () => {
    const language = useAppSelector(state => state.TranslateSlice.language)
    const [modal, setModal] = useState<boolean>(false);
    const [modalError, setModalError] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false)
    const [isPrivacyAccepError, setIsPrivacyAcceptError] = useState(false)
    const {isAuth} = useAppSelector(state => state.UserSlice);
    const {register, handleSubmit, watch, formState: {errors, isSubmitSuccessful}} = useForm<Form>();

    const {
        titleText,
        nameText,
        emailText,
        passwordText,
        lastNameText,
        confirmPasswordText,
        acceptTermsText,
        registerBtnText,
        alreadyHaveAccountText,
    } = translations.register

    useEffect(() => {
        if (isSubmitSuccessful) {
            if (isAuth) {
                navigate('/');
            }
        }
    }, [isSubmitSuccessful]) // eslint-disable-line react-hooks/exhaustive-deps

    const onAcceptCheckoboxChange = () => {
        if (isPrivacyAccepError) setIsPrivacyAcceptError(false)
        setIsPrivacyAccepted(prevState => !prevState)
    }

    const onSubmit: SubmitHandler<Form> = async (data) => {
        if (!isPrivacyAccepted) {
            setIsPrivacyAcceptError(true)
            return;
        }
        const response = await dispatch(registration({
            email: data.email,
            name: data.name,
            sname: data.sname,
            password: data.password
        }));
        const res = response.payload as ServerError;
        if (res?.error) {
            setModal(true);
            setModalError(res.error)
        }
    }

    return (
        <section className="flex items-center">
            <form onSubmit={handleSubmit(onSubmit)} className='bg-white container mx-auto flex flex-col p-10 max-w-2xl'>
                <img className='w-40 self-center mb-5' src={Logo} alt="logo"/>
                <h1 className='text-2xl font-semibold tracking-wider text-gray-800 capitalize '>{titleText[language]}</h1>
                <Input
                    wrapperClasses='mb-5'
                    type="email"
                    label={`${emailText[language]}:`}
                    placeholder={emailText[language]}
                    error={errors.email?.message}
                    register={register('email', emailValidation(language))}
                />
                <Input
                    wrapperClasses='mb-5'
                    type="text"
                    label={`${nameText[language]}:`}
                    placeholder={nameText[language]}
                    error={errors.name?.message}
                    register={register('name', {required: "The field must be filled"})}/>
                <Input
                    wrapperClasses='mb-5'
                    type="text"
                    label={`${lastNameText[language]}:`}
                    placeholder={lastNameText[language]}
                    error={errors.sname?.message}
                    register={register('sname', {required: "The field must be filled"})}/>
                <Input
                    wrapperClasses='mb-5'
                    type="password"
                    label={`${passwordText[language]}:`}
                    placeholder={passwordText[language]}
                    error={errors.password?.message}
                    register={register('password', PasswordValidation)}
                />
                <Input
                    wrapperClasses='mb-5'
                    type="password"
                    label={`${confirmPasswordText[language]}:`}
                    placeholder={confirmPasswordText[language]}
                    error={errors.confirm_password?.message}
                    register={register('confirm_password', {
                        required: "The field must be filled",
                        validate: (val: string) => {
                            if (watch('password') != val) {
                                return "Your passwords do no match";
                            }
                        },
                    })}/>
                <div>
                    <CheckBox
                        checked={isPrivacyAccepted}
                        onChange={onAcceptCheckoboxChange}
                        wrapperClass='mb-[10px]'
                        labelClass={`!whitespace-pre-wrap ${isPrivacyAccepError ? 'text-red-600' : ""}`}
                        label={<>{acceptTermsText[language][0]} <Link className="text-blue-700" to="/terms">{acceptTermsText[language][1]}</Link> {acceptTermsText[language][2]} <Link className="text-blue-700" to='/policy'>{acceptTermsText[language][3]}</Link>{acceptTermsText[language][4]}</>}
                    />
                </div>
                <Button>{registerBtnText[language]}</Button>
                <p className='mt-5 text-gray-700'>{alreadyHaveAccountText[language][0]} <Link className='text-blue-500'
                                                                                              to={'/login'}>{alreadyHaveAccountText[language][1]}</Link></p>
            </form>
            <AuthError modal={modal} setModal={setModal} error={modalError}/>
        </section>
    )
}

export default RegisterPage;