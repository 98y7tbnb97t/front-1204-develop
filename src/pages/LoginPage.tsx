/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import LichessLogo from '../assets/lichess.svg';
import Logo from '../assets/logo.png';
import LanguageBtns from '../components/Layouts/LanguageBtns/LanguageBtns.tsx';
import AuthError from '../components/Modals/AuthError';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { addUserToSession } from '../store/reducers/SessionSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useQuery } from '../hooks/useQuery';
import { checkAuth, login, login_lichess } from '../store/reducers/UserSlice';
import { translations } from '../utils/translations.tsx';

type Form = {
  email: string;
  password: string;
};

const LoginPage: FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [modalError, setModalError] = useState<string>('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuth } = useAppSelector((state) => state.UserSlice);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Form>();
  const query = useQuery();
  const token = query.get('token');
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const querySessionId = query.get('sessionId');
  const {
    loginText,
    emailText,
    passwordText,
    loginBtnText,
    noAccountText,
    registerText,
    loginWithLichesText,
  } = translations.login;

  // TODO!: Delete userAgent && isIosMobApp after comfirm app in AppStore + strings 133!
  const ua = navigator.userAgent;
  const isIosMobApp = ua === 'ios-mob-app';

  useEffect(() => {
    const t = async () => {
      if (token && !sessionId) {
        localStorage.setItem('token', token);
        await dispatch(checkAuth());
      }
    };
    void t();
    if (querySessionId) {
      setSessionId(querySessionId);
    }

    if (isAuth && !sessionId && querySessionId) {
      setSessionId(querySessionId);
    }
    }, [dispatch, token, querySessionId, isAuth, sessionId]);

    useEffect(() => {
      const t = async () => {
        if (isSubmitSuccessful) {
          if (isAuth && sessionId) {
            await dispatch(addUserToSession({ sessionId, userId: user._id }));
            navigate('/profile');
          } else {
            isAuth && navigate('/');
          }
        }
      };
      void t();
    }, [isSubmitSuccessful]);  // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit: SubmitHandler<Form> = async (data) => {
    await dispatch(login({ email: data.email, password: data.password }));
    const error = localStorage.getItem('error');
    if (error && error !== 'undefined') {
      setModal(true);
      setModalError(error);
    }
  };

  const lichessLogin = async () => {
    await dispatch(login_lichess());
    const error = localStorage.getItem('error');
    if (error && error !== 'undefined') {
      setModal(true);
      setModalError(error);
    }
  };

  return (
    <section className="flex items-center h-screen">
      <div className="bg-white container mx-auto flex flex-col gap-3 p-2 md:p-10 max-w-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex sm:gap-10 gap-[10px] flex-col sm:flex-row"
        >
          <div className="basis-1/2">
            <img
              className="w-40  sm:w-60 self-center mb-2 mx-auto lg:mb-5"
              src={Logo}
              alt="logo"
            />
            <div className="mt-[10px] mx-auto w-fit">
              <LanguageBtns className="min-w-[200px]" />
            </div>
          </div>
          <div className="w-full basis-1/2">
            <Input
              wrapperClasses="mb-3"
              type="email"
              label={`${emailText[language]}:`}
              placeholder={emailText[language]}
              error={errors.email?.message}
              register={register('email', {
                required: 'The field must be filled',
              })}
            />
            <Input
              wrapperClasses="mb-3"
              type="password"
              label={`${passwordText[language]}:`}
              placeholder={passwordText[language]}
              error={errors.password?.message}
              register={register('password', {
                required: 'The field must be filled',
              })}
            />
            <Button>{loginBtnText[language]}</Button>
            <p className="mt-2 lg:mt-5 mb-2 lg:mb-5 text-gray-700">
              {noAccountText[language]}{' '}
              <Link className="text-blue-500" to={'/register'}>
                {registerText[language]}
              </Link>
            </p>
          </div>
        </form>
        {!isIosMobApp && (
          <div className="landscape:ml-auto flex sm:w-[275px] w-auto">
            <a
              className=" w-full"
              href="https://lichess.org/oauth?response_type=code&client_id=lichess-api-demo&redirect_uri=https://api.araratchess.com/api/service1/auth/login_lichess&scope=email:read&code_challenge=xeZTXS07vL-CrdlqB3DuO0v85hJCn69-_ewlqnPSLp0&code_challenge_method=S256"
            >
              <Button onClick={lichessLogin}>
                <img
                  className="w-6 mr-5"
                  src={LichessLogo}
                  alt="lichess_login"
                />
                {loginWithLichesText[language]}
              </Button>
            </a>
          </div>
        )}
      </div>
      <AuthError modal={modal} setModal={setModal} error={modalError} />
    </section>
  );
};

export default LoginPage;
