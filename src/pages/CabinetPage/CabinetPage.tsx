import { Disclosure } from '@headlessui/react';
import { AiFillQuestionCircle } from '@react-icons/all-files/ai/AiFillQuestionCircle';
import { CiEdit } from '@react-icons/all-files/ci/CiEdit';
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown';
import { IoIosArrowUp } from '@react-icons/all-files/io/IoIosArrowUp';
import copy from 'copy-to-clipboard';
import cryptoRandomString from 'crypto-random-string';
import enGB from 'date-fns/locale/en-GB';
import { FC, useEffect, useRef, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import Man from '../../assets/icons/man.png';
import WoMan from '../../assets/icons/woman.png';
import SuccessModal from '../../components/Modals/SuccessModal.tsx';
import UserSessionModal from '../../components/Modals/UserSessionModal.tsx';
import CheckBox from '../../components/UI/Main/Checkbox/CheckBox.tsx';
import Input from '../../components/UI/Main/Input.tsx';
import Select from '../../components/UI/Main/Select.tsx';
import MainButton from '../../components/UI/MainButton.tsx';
import Modal from '../../components/UI/Modal.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { useQuery } from '../../hooks/useQuery.ts';
import { ISelect } from '../../models/ISelect.ts';
import { getGroups } from '../../store/reducers/GroupSlice.ts';
import { clearSession } from '../../store/reducers/SessionSlice.ts';
import { editUser, logout } from '../../store/reducers/UserSlice.ts';
import { emailValidation } from '../../utils/ValidationRules.ts';

import studentIcon from '../../assets/studentRole.jpeg';
import tranerIcon from '../../assets/tranerRole.jpeg';

import nationalityArmImg from '../../assets/aboutNationality/about_nationality_arm.png';
import nationalityEngImg from '../../assets/aboutNationality/about_nationality_eng.png';
import nationalityRusImg from '../../assets/aboutNationality/about_nationality_ru.png';

import { useNavigate } from 'react-router-dom';
import LanguageBtns from '../../components/Layouts/LanguageBtns/LanguageBtns.tsx';
import AppDownloadModal from '../../components/Modals/AppDownloadModal.tsx';
import RemoveUserModal from '../../components/Modals/RemoveUserModal.tsx';
import Button from '../../components/UI/Button.tsx';
import CopyWrapper from '../../components/UI/CopyWrapper.tsx';
import GraphicCalendar, {
  ICalendarItem,
  IDayItem,
  createCalendarGraphic,
  getUSerSchedule,
} from '../../components/UI/GraphicCalendar.tsx';
import {
  lessonFormatTypes,
  userCountries,
  userLanguages,
} from '../../constants.ts';
import { BACK_URL } from '../../http/index.ts';
import { IUserData } from '../../models/IUserData.ts';
import {
  EWeekDays,
  EditRequestValue,
  User,
  UserSchedule,
} from '../../models/User.ts';
import { EditUserReQData } from '../../models/response/EditUserReqData.ts';
import { Elanguages } from '../../store/reducers/TranslateSlice.ts';
import { createSelectOptionsFromObj } from '../../utils/createSelectOptionsFromObj.ts';
import { getUserRejectedRequests } from '../../utils/getUserRejectedRequests.ts';
import {
  fieldsTranslations,
  rolesTexts,
} from '../../utils/getValueAndFieldText.tsx';
import {
  ITranslateItemElement,
  ITranslateItemString,
  translations,
} from '../../utils/translations.tsx';
import { UserRoles, isUserDirector } from '../../utils/userRoles.ts';
import './CabinetPage.css';
import { userCities } from '../../models/ECities.ts';
import { userNationalities } from '../../models/ENationalities.ts';
import SelectSearch from '../../components/UI/Main/SelectSearch.tsx';

registerLocale('enGB', enGB);

enum EFormFields {
  name = 'name',
  sname = 'sname',
  tname = 'tname',
  email = 'email',
  comment = 'comment',
  parentName = 'parentName',
  actualMail = 'actualMail',
  nationality = 'nationality',
  languages = 'languages',
  city = 'city',
  whatsappNumber = 'whatsappNumber',
  born = 'born',
  country = 'country',
  format = 'format',
  durency = 'durency',
  sex = 'sex',
  password = 'password',
  avatar = 'avatar',
}

type Form = {
  [EFormFields.name]: string;
  [EFormFields.sname]: string;
  [EFormFields.tname]: string;
  [EFormFields.email]: string;
  [EFormFields.comment]: string;
  [EFormFields.parentName]: string;
  [EFormFields.actualMail]: string;
  [EFormFields.nationality]: ISelect;
  [EFormFields.languages]: ISelect[];
  [EFormFields.city]: ISelect;
  [EFormFields.whatsappNumber]: string;
  [EFormFields.born]: Date | undefined;
  [EFormFields.country]: ISelect;
  [EFormFields.format]: ISelect;
  [EFormFields.durency]: ISelect;
  [EFormFields.sex]: string;
  [EFormFields.password]: string;
  [EFormFields.avatar]: string;
};

const durencyOptions = [
  { id: '1', name: '20', slug: '20' },
  { id: '2', name: '40', slug: '40' },
  { id: '3', name: '60', slug: '60' },
  { id: '3', name: '90', slug: '90' },
] as ISelect[];

const {
  adminInfoText,
  readyForSimulationsText,
  yesText,
  noText,
  detailsText,
  onlineTournamentsText,
  offlineTournamentsText,
  teacherText,
  itemText,
  groupsText,
  countryText,
  deleteAccountText,
  changePassText,
  formatText,
  lessonDurationText,
  logoutText,
  saveText,
  nameText,
  surNameText,
  sеcondNameText,
  levelText,
  passwordText,
  autoText,
  readyForSimulationsDescriptionText,
  onlineTournamentsDescriptionText,
  offlineTournamentsDescriptionText,
  levelsDescriptionText,
  editText,
  readyForSimulationsModalTitle,
  onlineTournamentsModalTitle,
  offlineTournamentsModalTitle,
  levelsModalTitle,
  parentNameText,
  actualMailText,
  nationalityText,
  languagesText,
  cityText,
  whatsAppNumberText,
  graphicCommentsText,
  registerSuccessText,
  waitingForSuccessText,
  dataSavedText,
  studentLanguagesText,
  forGetAccessText,
  getAccessStep1,
  getAccessStep2,
  getAccessStep3,
  adminMsgText,
  getAccessForAdmin,
  copyText,
  copiedText,
  iTrainerText,
  iStudentText,
  fieldMustUpdateText,
  fieldMustFilledText,
  beforeUsePlatformText,
  sexText,
  birthDateText,
  thankYouText,
  fillAllFieldsText,
  cooperationText,
  ourGoalText,
  changeText,
} = translations.profile;
const { emailText } = translations.messenger;

const enum InfoModalTextsEnum {
  READY_FOR_SIMULS = 'READY_FOR_SIMULS',
  ONLINE_TOURNAMENTS = 'ONLINE_TOURNAMENTS',
  OFFLINE_TOURNAMENTS = 'OFFLINE_TOURNAMENTS',
  LEVELS = 'LEVELS',
  NATIONALITY = 'NATIONALITY',
}

const nationalityImages = {
  ru: nationalityRusImg,
  en: nationalityEngImg,
  am: nationalityArmImg,
};

const infoModalTexts: {
  [key in InfoModalTextsEnum]: {
    title: ITranslateItemString;
    text?: ITranslateItemElement;
    img?: ITranslateItemString;
  };
} = {
  [InfoModalTextsEnum.READY_FOR_SIMULS]: {
    title: readyForSimulationsModalTitle,
    text: readyForSimulationsDescriptionText,
  },
  [InfoModalTextsEnum.ONLINE_TOURNAMENTS]: {
    title: onlineTournamentsModalTitle,
    text: onlineTournamentsDescriptionText,
  },
  [InfoModalTextsEnum.OFFLINE_TOURNAMENTS]: {
    title: offlineTournamentsModalTitle,
    text: offlineTournamentsDescriptionText,
  },
  [InfoModalTextsEnum.LEVELS]: {
    title: levelsModalTitle,
    text: levelsDescriptionText,
  },
  [InfoModalTextsEnum.NATIONALITY]: {
    title: nationalityText,
    img: nationalityImages,
  },
};

const calendarGraphic = createCalendarGraphic();

const CabinetPage: FC = () => {
  const navigate = useNavigate();
  const language = useAppSelector((state) => state.TranslateSlice.language);

  const {
    control,
    register,
    getValues,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      country: '',
      format: '',
      durency: '',
      languages: [],
    },
  });

  const [modal, setModal] = useState<boolean>(false);
  const [rolesModalOpened, setRolesModalOpened] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRoles>(UserRoles.TRANER);
  const [calendarError, setCalendrarError] = useState<string>('');
  const [calendar, setCalendar] = useState<ICalendarItem[]>(calendarGraphic);
  const [modal2, setModal2] = useState<boolean>(false);
  const [modal3, setModal3] = useState<boolean>(false);
  const [modal4, setModal4] = useState<boolean>(false);
  const [errorsModalOpened, setErrorsModalOpened] = useState<boolean>(false);
  const [infoTextKey, setInfoTextKey] = useState<InfoModalTextsEnum | ''>('');
  const { user } = useAppSelector((state) => state.UserSlice);
  const { groups } = useAppSelector((state) => state.GroupSlice);
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState<boolean>(false);
  const [changePwd, setChangePwd] = useState<boolean>(false);
  const [smsText] = useState<string>(adminMsgText[language]);
  const EmailValidation = emailValidation(language);
  const [isAppDownloadModalOpened, setIsAppDownloadModalOpened] =
    useState<boolean>(false);
  const [isUserSessionModalOpened, setIsUserSessionModalOpened] =
    useState<boolean>(false);

  const getValueFromUserData = (userDataKey: string): EditRequestValue | '' => {
    if (user.editRequest) {
      const rejectedRequestData = user.editRequest.find(
        (item) => item.field === userDataKey && item.rejectedAt,
      );
      const newRequestData = user.editRequest.find(
        (item) => item.field === userDataKey && !item.rejectedAt,
      );
      if (newRequestData || rejectedRequestData) {
        return (newRequestData || rejectedRequestData)?.value || '';
      } else if (user?.[userDataKey as keyof typeof user]) {
        return (
          (user[userDataKey as keyof typeof user] as EditRequestValue) || ''
        );
      } else {
        return '';
      }
    } else if (user[userDataKey as keyof typeof user]) {
      return (user[userDataKey as keyof typeof user] as EditRequestValue) || '';
    } else return '';
  };

  const languagesOptions = createSelectOptionsFromObj(userLanguages, language);
  const countryOptions = createSelectOptionsFromObj(userCountries, language);
  const cityOptions = createSelectOptionsFromObj(userCities, language);
  const formatOptions = createSelectOptionsFromObj(lessonFormatTypes, language);
  const nationalityOptions = createSelectOptionsFromObj(userNationalities, language);
  const curRole = user.role === UserRoles.NEWUSER ? userRole : user.role;
  const [copyState, setCopyState] = useState<boolean>(false);
  const [userdata, setUserdata] = useState<IUserData>({
    _id: '',
    name: '',
    sname: '',
    tname: '',
    role: '',
    email: '',
    archive: false,
  });
  const [wasModalOpened, setWasModalOpened] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user.role === UserRoles.NEWUSER) {
      if (!user?.editRequest?.find((item) => item.field === 'role')) {
        setRolesModalOpened(true);
      } else {
        setModal2(true);
      }
    }
  }, []);

  const logOutHandler = async () => {
    await dispatch(logout());
    dispatch(clearSession());
  };

  const sessionHandler = async () => {
    setIsUserSessionModalOpened(true);
  };

  const onChangeCalendar = (
    clb: ((state: ICalendarItem[]) => ICalendarItem[]) | ICalendarItem[],
  ) => {
    clearErrors('shedule');
    setCalendar(clb);
  };

  const removeHandler = (user: User) => {
    setUserdata({
      _id: user._id,
      name: user.name,
      sname: user.sname,
      role: user.role,
      requizits: user.requizits,
      email: user.email,
      archive: user.archive ?? false,
    });
    setModal4(true);
  };

  const query = useQuery();

  const req = query.get('req');
  useEffect(() => {
    if (req) {
      setModal(true);
    }
  }, [req]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getGroups({}));
    };
    void fetchData();
  }, [dispatch]);

  useEffect(() => {
    const born = getValueFromUserData('born');
    const role = getValueFromUserData('role');
    const email = getValueFromUserData('email');
    const name = getValueFromUserData('name');
    const sname = getValueFromUserData('sname');
    const tname = getValueFromUserData('tname');
    const parentName = getValueFromUserData('parentName');
    const actualMail = getValueFromUserData('actualMail');
    const nationality = getValueFromUserData('nationality');
    const city = getValueFromUserData('city');
    const whatsappNumber = getValueFromUserData('whatsappNumber');
    const comment = getValueFromUserData('comment');
    const sex = getValueFromUserData('sex');
    const shedule = getValueFromUserData('shedule');
    const format = getValueFromUserData('format');
    const country = getValueFromUserData('country');
    const avatar = getValueFromUserData('avatar');
    if (born && typeof born === 'string') setValue('born', new Date(born));
    if (role && role !== UserRoles.NEWUSER) setUserRole(role as UserRoles);

    if (country) {
      const c = countryOptions.find((c) => c.slug === country) as ISelect;
      setValue('country', c);
    }

    if (city) {
      const c = cityOptions.find((c) => c.slug === city) as ISelect;
      setValue('city', c);
    }
    if (nationality) {
      const c = nationalityOptions.find((c) => c.slug === nationality) as ISelect;
      setValue('nationality', c);
    }

    if (format) {
      const c = formatOptions.find((c) => c.slug === format) as ISelect;
      setValue('format', c);
    }
    const languages = getValueFromUserData('languages');

    if (languages && languages?.length) {
      const c = languagesOptions.filter(
        (c) => languages && languages.includes(c.slug as string & UserSchedule),
      );
      setValue('languages', c);
    }

    const durency = getValueFromUserData('durency');
    if (email) setValue('email', email);
    if (name) setValue('name', name);
    if (sname) setValue('sname', sname);
    if (tname) setValue('tname', tname);
    if (parentName) setValue('parentName', parentName);
    if (actualMail) setValue('actualMail', actualMail);
    if (whatsappNumber) setValue('whatsappNumber', whatsappNumber);
    if (comment) setValue('comment', comment);
    if (sex) setValue('sex', sex);
    if (avatar) setValue('avatar', avatar);

    if (durency) {
      const c = durencyOptions.find((c) => c.slug === durency) as ISelect;
      setValue('durency', c);
    }

    if (shedule) {
      const updatedCalendar = getUSerSchedule(calendar, shedule);
      setCalendar(updatedCalendar);
    }
  }, [user, language]);

  useEffect(() => {
    const handleModalClose = (event: MouseEvent) => {
      if (
        wasModalOpened &&
        !modal4 &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        void logOutHandler();
      }
    };
    window.addEventListener('click', handleModalClose as EventListener);
    return () => {
      window.removeEventListener('click', handleModalClose as EventListener);
    };
  }, [modal4, wasModalOpened]);
  const onSubmit: SubmitHandler<Form> = async (data) => {
    const date: UserSchedule[] = [];

    calendar.forEach(({ id, time, ...item }) => {
      const days: EWeekDays[] = [];
      const calendarDays: IDayItem = item;
      for (const key in calendarDays) {
        if (item[key as keyof IDayItem]) days.push(key as keyof IDayItem);
      }
      if (days.length) date.push({ time, days });
    });
    if (user.role === UserRoles.PROGRAMMER || date.length) {
      clearErrors('shedule');
      const payload = {} as { password: string };
      if (changePwd && data.password.length > 0) {
        payload.password = data.password;
      }

      const {
        email,
        country,
        format,
        durency,
        languages,
        born,
        avatar,
        city,
        nationality,
        ...fields
      } = data;
      const reqData: EditUserReQData = {
        ...fields,
        email: email,
        country: country.slug,
        city: city.slug,
        born,
        format: format.slug,
        shedule: date,
        durency: durency.slug,
        avatar,
        nationality: nationality.slug,
        languages: languages.map((item) => item.slug) as Elanguages[],
        ...payload,
      };
      if (user.role === UserRoles.NEWUSER) reqData.role = curRole;
      if ('password' in reqData && !reqData.password) delete reqData?.password;

      for (const k in reqData) {
        const key = k as keyof EditUserReQData;
        const isFieldsNotChanged =
          typeof reqData[key] === 'string' &&
          getValueFromUserData(key) === reqData[key];
        const isLanguageNotChanged =
          key === 'languages' &&
          getValueFromUserData('languages') &&
          reqData?.languages &&
          reqData.languages.every(
            (item, index) =>
              item === (getValueFromUserData('languages') as string[])?.[index],
          );
        const isDatesNotChanged =
          key === 'born' &&
          new Date(getValueFromUserData('born') as string).toDateString() ===
            new Date(reqData.born as Date).toDateString();
        const userSchedule =
          getValueFromUserData('shedule') &&
          getValueFromUserData('shedule').map(({ _id, ...item }) => item);
        const isScheduleNotChanged =
          key === 'shedule' &&
          JSON.stringify(userSchedule) === JSON.stringify(date);
        const isNotEited =
          isFieldsNotChanged ||
          isLanguageNotChanged ||
          isDatesNotChanged ||
          isScheduleNotChanged;

        if (isNotEited) {
          delete reqData[key];
        }
      }
      await dispatch(editUser(reqData));
      setModal2(true);
      navigate('/profile');
    } else {
      setError('shedule', {
        type: 'manual',
        message: fieldMustFilledText[language],
      });
    }
  };
  const isStudentOrTrainer =
    curRole === UserRoles.TRANER || curRole === UserRoles.STUDENT;
  const isStudent = curRole === UserRoles.STUDENT;

  const languagesSelectName = `${
    isStudent ? studentLanguagesText[language] : languagesText[language]
  }`;

  let successModalMsg = '';
  if (user.role !== UserRoles.NEWUSER) {
    successModalMsg = !isUserDirector(user.role)
      ? waitingForSuccessText[language]
      : dataSavedText[language];
  }

  useEffect(() => {
    if (user.editRequest) {
      for (const key in getValues()) {
        if (
          user.editRequest.find(
            (item) => item.field === key && getUserRejectedRequests(user, item),
          )
        ) {
          setError(key, {
            type: 'manual',
            message: fieldMustUpdateText[language],
          });
        }
      }
    }
    if (
      user.editRequest.find(
        (item) =>
          item.field === 'shedule' && getUserRejectedRequests(user, item),
      )
    ) {
      setError('shedule', {
        type: 'manual',
        message: fieldMustUpdateText[language],
      });
    }
  }, [user]);

  const onFormSubmit = (e: Event) => {
    e.preventDefault();

    Object.values(errors).length
      ? setErrorsModalOpened(true)
      : handleSubmit(onSubmit)();
  };

  useEffect(() => {
    function checkFCM() {
      setIsAppDownloadModalOpened(true);
    }
    (!user.fcm || user.fcm.length === 0) &&
      user.born &&
      user.role !== 'DIRECTOR' &&
      user.role !== 'ZDIRECTOR' &&
      user.role !== 'ADMIN' &&
      checkFCM();
  }, []);
  return (
    <div className="w-full">
      <div className="px-1  md:px-10 2xl:px-2 py-2 md:py-5 overflow-auto h-full">
        <LanguageBtns className={'justify-center'} />
        <form
          onSubmit={onFormSubmit}
          className="w-full flex flex-col items-center px-2 sm:px-5 py-5 bg-[#f0f0f0] rounded-xl"
        >
          <div className="flex profile-main  gap-2 justify-between items-stretch w-full mb-6">
            <div className="min-w-[400px] flex items-center border xl:mr-5 border-[#B7975A] rounded-xl px-4 py-10 2xl:mr-5">
              <div className="max-w-32 max-h-32 mr-3 sn:mr-10 overflow-hidden sm:mb-5 border-[#B7975A] border rounded-full">
                <img className="w-full h-full" src={user.avatar} alt="avatar" />
              </div>
              {!edit && (
                <div className="flex flex-col">
                  <p className="font-bold text-md sm:text-xl flex items-center text-gray-600">
                    <span className="text-black">
                      {sеcondNameText[language]}:{' '}
                    </span>{' '}
                    {getValueFromUserData('sname') as string}
                  </p>
                  <p className="font-bold text-md sm:text-xl flex items-center text-gray-600">
                    <span className="text-black">{nameText[language]}: </span>{' '}
                    {getValueFromUserData('name') as string}
                  </p>
                  <p className="text-red-500">
                    {errors.name?.message && 'Имя: ' + errors.name?.message}
                  </p>

                  <p className="text-red-500">
                    {errors.sname?.message &&
                      'Фамилия: ' + errors.sname?.message}
                  </p>
                  <p className="font-bold text-md sm:text-xl flex items-center text-gray-600">
                    <span className="text-black">
                      {surNameText[language]}:{' '}
                    </span>{' '}
                    {getValueFromUserData('tname') as string}
                  </p>
                  <p className="text-red-500">
                    {errors.tname?.message &&
                      'Отчество: ' + errors.tname?.message}
                  </p>

                  <button
                    title={editText[language]}
                    className="ml-3 text-2xl mt-2"
                    onClick={() => setEdit(true)}
                  >
                    <CiEdit />
                  </button>
                </div>
              )}
              <div className={[edit ? 'flex flex-col' : 'hidden'].join(' ')}>
                <label className='ml-4 text-base text-gray-500'>{nameText[language]}:</label>
                <Input
                  wrapperClass="mb-6"
                  type="text"
                  placeholder={nameText[language] + ':'}
                  error={errors.name?.message}
                  register={register('name', {
                    required: fieldMustFilledText[language],
                    onChange: () => clearErrors('name'),
                    pattern: {
                      value: /^((?!Пользователь).)*$/,
                      message: fieldMustFilledText[language],
                    },
                    validate: {
                      spaceCheck: (value) =>
                        /^[^\s()-]*$/.test(value) ||
                        'The field must not contain spaces',
                    },
                  })}
                />
                <label className='ml-4 text-base text-gray-500'>{sеcondNameText[language]}:</label>
                <Input
                  wrapperClass="mb-6"
                  type="text"
                  placeholder={sеcondNameText[language] + ':'}
                  error={errors.sname?.message}
                  register={register('sname', {
                    required: fieldMustFilledText[language],
                    onChange: () => clearErrors('sname'),
                    validate: {
                      spaceCheck: (value) =>
                        /^[^\s()-]*$/.test(value) ||
                        'The field must not contain spaces',
                    },
                  })}
                />
                <label className='ml-4 text-base text-gray-500'>{surNameText[language]}:</label>
                <Input
                  type="text"
                  placeholder={`${surNameText[language]}:`}
                  error={errors.tname?.message}
                  register={register('tname', {
                    onChange: () => clearErrors('tname'),
                    validate: {
                      spaceCheck: (value) =>
                        /^[^\s()-]*$/.test(value) ||
                        'The field must not contain spaces',
                    },
                  })}
                />
              </div>
            </div>
            {user.role === UserRoles.PROGRAMMER && (
              <div className={'w-full flex flex-col gap-6'}>
                <Input
                  read={!!user.lichess}
                  className={
                    user.lichess
                      ? 'bg-gray-300'
                      : '' + ' font-bold text-gray-700 placeholder:font-normal'
                  }
                  wrapperClass="w-full self-start"
                  type="text"
                  placeholder={emailText[language]}
                  error={errors.email?.message}
                  register={register('email', {
                    ...EmailValidation,
                    onChange: () => clearErrors('email'),
                  })}
                />
                <div className="relative flex justify-between gap-6 w-auto md:w-full items-center password-container">
                  <CheckBox
                    checked={changePwd}
                    onChange={() => setChangePwd(!changePwd)}
                    wrapperClass="shrink-0 sm:shrink w-[160px] sm:w-[200px]"
                    label={changePassText[language]}
                  />
                  <div className="relative w-full">
                    <Input
                      read={!changePwd}
                      className={`${
                        changePwd ? 'bg-white' : 'bg-gray-300'
                      } password-input`}
                      wrapperClass="password-input-wrapper w-full"
                      type="text"
                      placeholder={`${passwordText[language]}:`}
                      register={register('password')}
                    />
                    <button
                      type="button"
                      className="top-0 right-0 absolute text-[#353535] font-semibold border border-[#B7975A] bg-white rounded-full h-full px-3 md:px-10"
                      onClick={() =>
                        changePwd &&
                        setValue(
                          'password',
                          cryptoRandomString({
                            length: 15,
                            type: 'base64',
                          }),
                        )
                      }
                    >
                      {autoText[language]}
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="mr-auto">
              <h3 className="text-[20px] font-bold mb-2">Аватар</h3>
              <div className="flex mb-8">
                <div className="mr-5">
                  <input
                    className="peer hidden"
                    id="avatarMan"
                    type="radio"
                    {...register('avatar')}
                    value={`${BACK_URL}/uploads/files/man.png`}
                  />
                  <label
                    className={
                      'aspect-square cursor-pointer p-2 flex rounded-full overflow-hidden border-gray-500 border-2 peer-checked:border-[#B7975A]'
                    }
                    htmlFor="avatarMan"
                  >
                    <img
                      className="max-w-[40px]"
                      src={`${BACK_URL}/uploads/files/man.png`}
                      alt="man"
                    />
                  </label>
                </div>
                <div className="mr-5">
                  <input
                    className="peer hidden"
                    type="radio"
                    id="avatarWoman"
                    {...register('avatar')}
                    value={`${BACK_URL}/uploads/files/woman.png`}
                  />
                  <label
                    className={
                      'aspect-square cursor-pointer p-2 flex rounded-full overflow-hidden border-gray-500 border-2 peer-checked:border-[#B7975A]'
                    }
                    htmlFor="avatarWoman"
                  >
                    <img
                      className="max-w-[40px]"
                      src={`${BACK_URL}/uploads/files/woman.png`}
                      alt="woman"
                    />
                  </label>
                </div>
              </div>
              {user.role !== UserRoles.PROGRAMMER &&
                user.role !== UserRoles.NEWUSER && (
                  <MainButton
                    onClick={() => void sessionHandler()}
                    type="button"
                    className="mx-auto -translate-x-2"
                  >
                    Аккаунты
                  </MainButton>
                )}
            </div>
            {groups.length > 0 && curRole === UserRoles.STUDENT && (
              <div className="flex flex-col basis-[70%] border rounded-xl p-2 border-[#B7975A]">
                <p className="mb-5 text-lg max-2xl:text-base font-bold text-center text-red-500">
                  {adminInfoText[language]}
                </p>
                <div className="w-full">
                  <div className="flex info-block  max-w-[1000px] w-full">
                    <div className="flex flex-col w-full mr-5 optionsBlock">
                      <div className="w-full border border-[#B7975A] flex justify-between rounded-full py-3 px-5 font-bold max-2xl:font-semibold mb-3">
                        <div>
                          {readyForSimulationsText[language]}:{' '}
                          {user.seance ? yesText[language] : noText[language]}
                        </div>
                        <button
                          type="button"
                          className="flex items-center text-sm text-blue-600"
                          onClick={() => {
                            setModal3(true),
                              setInfoTextKey(
                                InfoModalTextsEnum.READY_FOR_SIMULS,
                              );
                          }}
                        >
                          {detailsText[language]}{' '}
                          <AiFillQuestionCircle className="ml-2 text-xl text-gray-600" />
                        </button>
                      </div>
                      <div className="w-full border border-[#B7975A] flex justify-between rounded-full py-3 px-5 font-bold max-2xl:font-semibold mb-3">
                        <div className="">
                          {onlineTournamentsText[language]}:{' '}
                          {user.online ? yesText[language] : noText[language]}
                        </div>
                        <button
                          type="button"
                          className="flex items-center text-sm text-blue-600"
                          onClick={() => {
                            setModal3(true),
                              setInfoTextKey(
                                InfoModalTextsEnum.ONLINE_TOURNAMENTS,
                              );
                          }}
                        >
                          {detailsText[language]}{' '}
                          <AiFillQuestionCircle className="ml-2 text-xl text-gray-600" />
                        </button>
                      </div>
                      <div className="w-full border border-[#B7975A] flex justify-between rounded-full py-3 px-5 font-bold max-2xl:font-semibold mb-3">
                        <div className="">
                          {offlineTournamentsText[language]}:{' '}
                          {user.offline ? yesText[language] : noText[language]}
                        </div>
                        <button
                          type="button"
                          className="flex items-center text-sm text-blue-600"
                          onClick={() => {
                            setModal3(true),
                              setInfoTextKey(
                                InfoModalTextsEnum.OFFLINE_TOURNAMENTS,
                              );
                          }}
                        >
                          {detailsText[language]}{' '}
                          <AiFillQuestionCircle className="ml-2 text-xl text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="w-full border border-[#B7975A] rounded-full py-3 px-5 font-bold max-2xl:font-semibold mb-3">
                        <div className="">
                          {teacherText[language]}:{' '}
                          {
                            groups[0].users.find(
                              (user) => user.role === 'DIRECTOR',
                            )?.name
                          }
                        </div>
                      </div>
                      <div className="w-full border flex justify-between border-[#B7975A] rounded-full py-3 px-5 font-bold max-2xl:font-semibold mb-3">
                        <div className="">
                          {itemText[language]}:{' '}
                          {groups[0].level.replace(
                            levelText.ru,
                            levelText[language],
                          )}
                        </div>
                        <button
                          type="button"
                          className="flex items-center text-sm text-blue-600"
                          onClick={() => {
                            setModal3(true),
                              setInfoTextKey(InfoModalTextsEnum.LEVELS);
                          }}
                        >
                          {detailsText[language]}{' '}
                          <AiFillQuestionCircle className="ml-2 text-xl text-gray-600" />
                        </button>
                      </div>
                      <div className="w-full border border-[#B7975A] rounded-3xl py-3 px-5 font-bold max-2xl:font-semibold mb-3">
                        {groups.length > 3 ? (
                          <Disclosure>
                            {({ open }) => (
                              /* Use the `open` state to conditionally change the direction of an icon. */
                              <>
                                <Disclosure.Button
                                  as="div"
                                  className="cursor-pointer flex items-center"
                                >
                                  Группы:{' '}
                                  {groups.map((group, index) => {
                                    index++;
                                    if (index < 4) {
                                      return group.name + ', ';
                                    }
                                  })}{' '}
                                  <span className="text-base text-blue-600 flex items-center">
                                    еще{' '}
                                    {open ? (
                                      <IoIosArrowUp className="ml-2 mt-1" />
                                    ) : (
                                      <IoIosArrowDown className="ml-2 mt-1" />
                                    )}
                                  </span>
                                </Disclosure.Button>
                                <Disclosure.Panel>
                                  {groups.map((group, index) => {
                                    index++;
                                    if (index > 3) {
                                      return group.name + ', ';
                                    }
                                  })}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ) : (
                          <>
                            {groupsText[language]}:{' '}
                            {groups.map((group) => group.name + ', ')}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {user.role === UserRoles.NEWUSER && (
              <div
                className={
                  'w-full flex gap-[10px] items-center justify-center h-full border-[#B7975A] rounded-xl border-[1px] p-1'
                }
              >
                <h4 className={'text-[16px] whitespace-nowrap md:text-[24px]'}>
                  <strong>
                    {userRole === UserRoles.STUDENT
                      ? iStudentText[language]
                      : iTrainerText[language]}
                  </strong>
                </h4>
                <Button
                  type={'button'}
                  onClick={() => setRolesModalOpened(true)}
                  className={'max-w-[300px]'}
                >
                  {changeText[language]}
                </Button>
              </div>
            )}
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
              {isStudentOrTrainer ? (
                <>
                  <div
                    className={`mb-3 sm:mb-[20px] flex gap-x-3 gap-y-6 justify-between form-first-col flex-col md:flex-row items-start`}
                  >
                    <CopyWrapper value={getValues('born')}>
                      <Controller
                        name="born"
                        control={control}
                        rules={{ required: fieldMustFilledText[language] }}
                        render={() => (
                          <div className="flex w-full">
                            <DatePicker
                              wrapperClassName="w-full"
                              selected={getValues('born')}
                              dateFormat="dd.MM.yyyy"
                              locale="enGB"
                              onChange={(date: Date) => {
                                clearErrors('born');
                                setValue('born', date);
                              }}
                              placeholderText={birthDateText[language]}
                              customInput={
                                <InputMask mask="99.99.9999">
                                  {(inputProps) => (
                                    <Input
                                      {...inputProps}
                                      type="text"
                                      className="text-center w-full font-bold text-gray-700 placeholder:font-normal"
                                      wrapperClass="w-full"
                                      error={errors.born?.message}
                                    />
                                  )}
                                </InputMask>
                              }
                            />
                          </div>
                        )}
                      />
                    </CopyWrapper>
                    {isStudent && (
                      <CopyWrapper value={getValues('parentName')}>
                        <Input
                          className={
                            'font-bold text-gray-700 placeholder:font-normal'
                          }
                          wrapperClass="w-full"
                          type="text"
                          placeholder={parentNameText[language]}
                          error={errors.parentName?.message}
                          register={register('parentName', {
                            required: fieldMustFilledText[language],
                            onChange: () => clearErrors('parentName'),
                          })}
                        />
                      </CopyWrapper>
                    )}
                    <div
                      className={
                        'w-full  flex items-center gap-[4px] rounded-full pr-[8px]'
                      }
                    >
                      <Controller
                        name="nationality"
                        control={control}
                        rules={{ required: fieldMustFilledText[language] }}
                        render={({ field: { onChange } }) => (
                          <SelectSearch
                            className="select"
                            wrapperClass="w-full"
                            error={errors.nationality?.message}
                            name={nationalityText[language]}
                            options={nationalityOptions}
                            value={getValues('nationality')}
                            onChange={(e) => {
                              clearErrors('nationality');
                              onChange(e);
                            }}
                          />
                        )}
                      />
                      <button
                        type="button"
                        className="flex whitespace-nowrap font-bold items-center text-sm text-blue-600 "
                        onClick={() => {
                          setModal3(true),
                            setInfoTextKey(InfoModalTextsEnum.NATIONALITY);
                        }}
                      >
                        {detailsText[language]}
                        <AiFillQuestionCircle className="ml-2 text-xl text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div
                    className={`mb-6 flex  gap-x-3 gap-y-6 justify-between form-first-col flex-col md:flex-row items-start`}
                  >
                    <Controller
                      name="languages"
                      control={control}
                      rules={{ required: fieldMustFilledText[language] }}
                      render={({ field: { onChange } }) => (
                        <SelectSearch
                          multiple={true}
                          className="select"
                          wrapperClass="w-full"
                          error={errors.languages?.message}
                          name={languagesSelectName}
                          options={languagesOptions}
                          showMultipleValues={true}
                          value={getValues('languages')}
                          onChange={(e) => {
                            clearErrors('languages');
                            onChange(e);
                          }}
                        />
                      )}
                    />
                    <CopyWrapper
                      value={getValues('country')?.name}
                      btnClass={'top-[17px] md:top-[26px]'}
                    >
                      <Controller
                        name="country"
                        control={control}
                        rules={{ required: fieldMustFilledText[language] }}
                        render={({ field: { onChange } }) => (
                          <SelectSearch
                            className="select"
                            wrapperClass="w-full"
                            error={errors.country?.message}
                            name={`${countryText[language]}`}
                            options={countryOptions}
                            value={getValues('country')}
                            onChange={(e) => {
                              clearErrors('country');
                              onChange(e);
                            }}
                          />
                        )}
                      />
                    </CopyWrapper>
                    <Controller
                        name="city"
                        control={control}
                        rules={{ required: fieldMustFilledText[language] }}
                        render={({ field: { onChange } }) => (
                          <SelectSearch
                            className="select"
                            wrapperClass="w-full"
                            error={errors.city?.message}
                            name={`${cityText[language]}`}
                            options={cityOptions}
                            value={getValues('city')}
                            onChange={(e) => {
                              clearErrors('city');
                              onChange(e);
                            }}
                          />
                        )}
                      />
                  </div>
                  <div
                    className={`mb-3 sm:mb-[20px] flex gap-x-3 gap-y-6 justify-between items-start form-first-col flex-col md:flex-row`}
                  >
                    <CopyWrapper value={getValues('whatsappNumber')}>
                      <Input
                        className={
                          'font-bold text-gray-700 placeholder:font-normal'
                        }
                        wrapperClass="w-full "
                        type="text"
                        placeholder={whatsAppNumberText[language]}
                        error={errors?.whatsappNumber?.message}
                        register={register('whatsappNumber', {
                          required: fieldMustFilledText[language],
                          onChange: () => clearErrors('whatsappNumber'),
                        })}
                      />
                    </CopyWrapper>

                    {curRole === UserRoles.STUDENT && (
                      <CopyWrapper value={getValues('actualMail')}>
                        <Input
                          className={
                            'font-bold text-gray-700 placeholder:font-normal'
                          }
                          wrapperClass="w-full"
                          type="text"
                          placeholder={actualMailText[language]}
                          error={errors?.actualMail?.message}
                          register={register('actualMail', {
                            ...EmailValidation,
                            onChange: () => clearErrors('actualMail'),
                          })}
                        />
                      </CopyWrapper>
                    )}
                    <div className="w-full">
                      {user.role !== UserRoles.PROGRAMMER && (
                        <Input
                          read={!!user.lichess}
                          className={
                            user.lichess
                              ? 'bg-gray-300'
                              : '' +
                                ' font-bold text-gray-700 placeholder:font-normal'
                          }
                          wrapperClass="w-full"
                          type="text"
                          placeholder={emailText[language]}
                          error={errors.email?.message}
                          register={register('email', {
                            ...EmailValidation,
                            onChange: () => clearErrors('email'),
                          })}
                        />
                      )}
                      {user.lichess && (
                        <p className="mt-5">
                          Эта почта с которой вы прошли регистрацию на{' '}
                          <a
                            href="https://lichess.org"
                            target="_blank"
                            className="text-blue-500"
                          >
                            lichess.org
                          </a>
                          , далее прошли авторизацию с{' '}
                          <a
                            href="https://lichess.org"
                            target="_blank"
                            className="text-blue-500"
                          >
                            lichess.org
                          </a>{' '}
                          на нашем портале{' '}
                          <a
                            href="https://puzzle.araratchess.com"
                            target="_blank"
                            className="text-blue-500"
                          >
                            puzzle.araratchess.com
                          </a>
                          . Если вы забудете пароль от вашего lichess, можно
                          восстановить по этой почте
                        </p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className={`mb-6 flex gap-x-3 gap-y-6 justify-between form-first-col flex-col md:flex-row items-start`}
                >
                  {user.role !== UserRoles.PROGRAMMER && (
                    <>
                      <CopyWrapper value={getValues('born')}>
                        <Controller
                          name="born"
                          control={control}
                          rules={{ required: fieldMustFilledText[language] }}
                          render={() => (
                            <div className="flex w-full ">
                              <DatePicker
                                wrapperClassName="w-full"
                                selected={getValues('born')}
                                dateFormat="dd.MM.yyyy"
                                locale="enGB"
                                onChange={(date: Date) => {
                                  clearErrors('born');
                                  setValue('born', date);
                                }}
                                placeholderText="Дата рождения"
                                customInput={
                                  <InputMask mask="99.99.9999">
                                    {(inputProps) => (
                                      <Input
                                        {...inputProps}
                                        type="text"
                                        className=" text-center w-full !font-bold !text-gray-700 placeholder:font-normal"
                                        wrapperClass="w-full"
                                        error={errors.born?.message}
                                      />
                                    )}
                                  </InputMask>
                                }
                              />
                            </div>
                          )}
                        />
                      </CopyWrapper>
                      <CopyWrapper
                        value={getValues('country')?.name}
                        btnClass={'top-[17px] md:top-[26px]'}
                      >
                        <Controller
                          name="country"
                          control={control}
                          rules={{ required: fieldMustFilledText[language] }}
                          render={({ field: { onChange } }) => (
                            <Select
                              className="select !mb-0"
                              wrapperClass=""
                              error={errors.country?.message}
                              name={`${countryText[language]}:`}
                              options={countryOptions}
                              value={getValues('country')}
                              onChange={(e) => {
                                onChange(e);
                              }}
                            />
                          )}
                        />
                      </CopyWrapper>
                    </>
                  )}

                  <div className="w-full">
                    {user.role !== UserRoles.PROGRAMMER && (
                      <Input
                        read={!!user.lichess}
                        className={user.lichess && 'bg-gray-300'}
                        wrapperClass="w-full"
                        type="text"
                        placeholder={emailText[language]}
                        error={errors.email?.message}
                        register={register('email', {
                          ...EmailValidation,
                          onChange: () => clearErrors('email'),
                        })}
                      />
                    )}

                    {user.lichess && (
                      <p className="mt-5">
                        Эта почта с которой вы прошли регистрацию на{' '}
                        <a
                          href="https://lichess.org"
                          target="_blank"
                          className="text-blue-500"
                        >
                          lichess.org
                        </a>
                        , далее прошли авторизацию с{' '}
                        <a
                          href="https://lichess.org"
                          target="_blank"
                          className="text-blue-500"
                        >
                          lichess.org
                        </a>{' '}
                        на нашем портале{' '}
                        <a
                          href="https://puzzle.araratchess.com"
                          target="_blank"
                          className="text-blue-500"
                        >
                          puzzle.araratchess.com
                        </a>
                        . Если вы забудете пароль от вашего lichess, можно
                        восстановить по этой почте
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col md:flex-nowrap  flex-wrap justify-center gap-2 sm:flex-row items-center">
                {user.role !== UserRoles.PROGRAMMER && (
                  <div className="flex items-center ">
                    <div className="mr-5">
                      <input
                        className="peer hidden"
                        id="man"
                        type="radio"
                        {...register('sex', {
                          required: fieldMustFilledText[language],
                          onChange: () => clearErrors('sex'),
                        })}
                        value="man"
                      />
                      <label
                        className={
                          'aspect-square cursor-pointer p-2 flex rounded-full overflow-hidden bg-gradient-button peer-checked:bg-gradient-appricot'
                        }
                        htmlFor="man"
                      >
                        <img className="max-w-[40px]" src={Man} alt="man" />
                      </label>
                    </div>
                    <div className="mr-5">
                      <input
                        className="peer hidden"
                        type="radio"
                        id="woman"
                        {...register('sex', {
                          required: fieldMustFilledText[language],
                          onChange: () => clearErrors('sex'),
                        })}
                        value="woman"
                      />
                      <label
                        className={
                          'aspect-square cursor-pointer p-2 flex rounded-full overflow-hidden bg-gradient-button peer-checked:bg-gradient-appricot'
                        }
                        htmlFor="woman"
                      >
                        <img className="max-w-[40px]" src={WoMan} alt="woman" />
                      </label>
                    </div>
                    <p className="text-red-500 font-bold text-lg">
                      {errors.sex?.message &&
                        `${sexText[language]}: ` + errors.sex?.message}
                    </p>
                  </div>
                )}

                {!user.lichess && user.role !== UserRoles.PROGRAMMER && (
                  <div className="relative flex justify-between gap-6 w-auto md:w-full items-center password-container">
                    <CheckBox
                      checked={changePwd}
                      onChange={() => setChangePwd(!changePwd)}
                      wrapperClass="shrink-0 sm:shrink w-[160px] sm:w-[200px]"
                      label={changePassText[language]}
                    />
                    <div className="relative w-full">
                      <Input
                        read={!changePwd}
                        className={`${
                          changePwd ? 'bg-white' : 'bg-gray-300'
                        } password-input`}
                        wrapperClass="password-input-wrapper w-full"
                        type="text"
                        placeholder={`${passwordText[language]}:`}
                        register={register('password')}
                      />
                      <button
                        type="button"
                        className="top-0 right-0 absolute text-[#353535] font-semibold border border-[#B7975A] bg-white rounded-full h-full px-3 md:px-10"
                        onClick={() =>
                          changePwd &&
                          setValue(
                            'password',
                            cryptoRandomString({
                              length: 15,
                              type: 'base64',
                            }),
                          )
                        }
                      >
                        {autoText[language]}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex lg:flex-row  flex-col gap-x-3 gap-y-6 w-full mt-5 items-start">
            {isStudent && (
              <>
                <Controller
                  name="format"
                  control={control}
                  rules={{ required: fieldMustFilledText[language] }}
                  render={({ field: { onChange } }) => (
                    <Select
                      className="basis-1/5"
                      wrapperClass="select-wrapper"
                      error={errors.format?.message}
                      name={`${formatText[language]}:`}
                      options={formatOptions}
                      value={getValues('format')}
                      onChange={(e) => {
                        clearErrors('format');
                        onChange(e);
                      }}
                    />
                  )}
                />
                <Controller
                  name="durency"
                  control={control}
                  rules={{ required: fieldMustFilledText[language] }}
                  render={({ field: { onChange } }) => (
                    <Select
                      className="basis-1/5"
                      wrapperClass="select-wrapper"
                      error={errors.durency?.message}
                      name={`${lessonDurationText[language]}:`}
                      options={durencyOptions}
                      value={getValues('durency')}
                      onChange={(e) => {
                        clearErrors('durency');
                        onChange(e);
                      }}
                    />
                  )}
                />
              </>
            )}
            {user.role !== UserRoles.PROGRAMMER && (
              <CopyWrapper value={getValues('comment')}>
                <Input
                  type="text"
                  className={
                    '!font-bold !text-gray-700 placeholder:font-normal mb-2'
                  }
                  placeholder={graphicCommentsText[language]}
                  error={errors.comment?.message}
                  register={register('comment', {
                    required: fieldMustFilledText[language],
                    onChange: () => clearErrors('comment'),
                  })}
                  wrapperClass={'w-full'}
                />
              </CopyWrapper>
            )}
          </div>
          {user.role !== UserRoles.PROGRAMMER && (
            <GraphicCalendar
              scheduleEditHistory={user.scheduleEditHistory}
              calendar={calendar}
              calendarError={errors?.shedule?.message || ''}
              setCalendar={onChangeCalendar}
              profileOwner={user}
              curRole={curRole}
            />
          )}

          <div className="mt-12 flex flex-col sm:flex-row gap-3  justify-between w-full">
            <MainButton
              onClick={() => void logOutHandler()}
              type="button"
              className="flex self-end"
            >
              {logoutText[language]}
            </MainButton>
            <MainButton
              onClick={() => {
                setWasModalOpened(true);
                removeHandler(user);
              }}
              type="button"
              className="w-full !bg-red-600 !bg-none"
            >
              {deleteAccountText[language]}
            </MainButton>

            <MainButton className="flex self-stretch items-center !bg-gradient-button-green">
              {saveText[language]}
            </MainButton>
          </div>
        </form>
      </div>
      <Modal active={modal} setActive={setModal} className={'max-w-[800px]'}>
        <h2
          className={
            'text-center text-[30px] mb-[10px] font-bold dark:text-white py-[10px]'
          }
        >
          {thankYouText[language]}
        </h2>
        <h4
          className={
            'text-center text-[24px] mb-[6px] dark:text-white py-[10px]'
          }
        >
          {cooperationText[language]}
        </h4>
        <p
          className={
            'text-center text-[24px] mb-[6px] dark:text-white py-[10px]'
          }
        >
          {ourGoalText[language]}
        </p>
        <hr />
        <h2
          className={
            'text-center text-[24px] text-blue-400 font-bold  py-[10px]'
          }
        >
          {beforeUsePlatformText[language]}
        </h2>
        <Button onClick={() => setModal(false)}>Ok</Button>
      </Modal>
      <Modal
        active={errorsModalOpened}
        setActive={setErrorsModalOpened}
        className={'max-w-[800px]'}
      >
        <h2
          className={
            'text-center text-[30px] mb-[10px] font-bold dark:text-white py-[10px]'
          }
        >
          {fillAllFieldsText[language]}
        </h2>
        <div className={'flex flex-col gap-3 mb-3'}>
          {Object.keys(errors).map((key: string) => {
            return (
              <p key={key} className={'text-red-600 text-[18px] text-center font-bold'}>
                {
                  fieldsTranslations?.[key as keyof typeof fieldsTranslations][
                    language
                  ]
                }
              </p>
            );
          })}
        </div>
        <Button onClick={() => setErrorsModalOpened(false)}>Ok</Button>
      </Modal>
      <SuccessModal
        className={user.role === UserRoles.NEWUSER ? 'max-w-[600px]' : ''}
        modal={modal2}
        setModal={setModal2}
        title={
          user.role === UserRoles.NEWUSER
            ? `${registerSuccessText[language]} ${rolesTexts[curRole][language]}`
            : ''
        }
        message={successModalMsg}
      >
        {user.role === UserRoles.NEWUSER && (
          <div className="flex flex-col items-center mt-3 dark:text-white">
            {curRole === UserRoles.STUDENT ? (
              <>
                <p className="mb-3">{forGetAccessText[language]}</p>
                <ul>
                  <li>1. {getAccessStep1[language]}</li>
                  <li>2. {getAccessStep2[language]}</li>
                  <li>
                    3. {getAccessStep3[language][0]}{' '}
                    <a
                      className="text-blue-500 underline font-semibold"
                      target="_blank"
                      href="https://wa.me/+37499553191 "
                    >
                      {getAccessStep3[language][1]}
                    </a>
                    {getAccessStep3[language][2]}
                  </li>
                </ul>
                <p className="whitespace-pre-wrap mt-3 mb-2">{smsText}</p>
                <span
                  className="font-bold italic cursor-pointer"
                  onClick={() => {
                    copy(smsText);
                    setCopyState(true);
                  }}
                >
                  ({copyState ? copiedText[language] : copyText[language]})
                </span>
              </>
            ) : (
              <p className="mt-8 text-center">{getAccessForAdmin[language]}</p>
            )}
          </div>
        )}
      </SuccessModal>
      <Modal
        active={rolesModalOpened}
        setActive={setRolesModalOpened}
        className={'!max-w-[800px]'}
      >
        <div
          className={
            'flex items-center justify-center gap-[20px] sm:gap-[20px] mb-[20px]'
          }
        >
          <button
            className={'w-full'}
            onClick={() => setUserRole(UserRoles.TRANER)}
          >
            <div
              className={` w-full aspect-square rounded-[20px] border bg-white p-[16px] ${
                userRole === UserRoles.TRANER ? '!bg-blue-600' : ''
              }`}
            >
              <img
                src={tranerIcon}
                alt="traner"
                className={'w-full rounded-[20px]'}
              />
            </div>
            <p
              className={
                'dark:text-white text-center text-[16px] sm:text-[24px]'
              }
            >
              {iTrainerText[language]}
            </p>
          </button>
          <button
            className={'w-full'}
            onClick={() => setUserRole(UserRoles.STUDENT)}
          >
            <div
              className={` w-full aspect-square rounded-[20px] border bg-white p-[16px] ${
                userRole === UserRoles.STUDENT ? '!bg-blue-600' : ''
              }`}
            >
              <img
                src={studentIcon}
                alt="traner"
                className={'w-full rounded-[20px]'}
              />
            </div>
            <p
              className={
                'dark:text-white text-center text-[16px] sm:text-[24px]'
              }
            >
              {iStudentText[language]}
            </p>
          </button>
        </div>
        <Button onClick={() => setRolesModalOpened(false)}>OK</Button>
      </Modal>
      <Modal
        active={modal3}
        setActive={setModal3}
        className={'max-w-[800px] px-[6px]'}
      >
        {infoTextKey && (
          <>
            <h2 className="text-xl mb-10 uppercase dark:text-white">
              {infoModalTexts?.[infoTextKey]?.title[language]}
            </h2>
            {infoModalTexts?.[infoTextKey]?.text ? (
              <p>
                {
                  (
                    infoModalTexts?.[infoTextKey]?.text as ITranslateItemElement
                  )[language]
                }
              </p>
            ) : (
              <img
                src={
                  (infoModalTexts?.[infoTextKey]?.img as ITranslateItemString)[
                    language
                  ]
                }
                className={'w-full'}
                alt={infoTextKey}
              />
            )}
          </>
        )}
      </Modal>
      <RemoveUserModal
        modal={modal4}
        setModal={setModal4}
        email={JSON.stringify(userdata.email) ?? ''}
        _id={userdata._id}
        archive={userdata.archive ?? false}
      />
      <AppDownloadModal
        active={isAppDownloadModalOpened}
        onClose={setIsAppDownloadModalOpened}
      />
      <UserSessionModal
        active={isUserSessionModalOpened}
        onClose={setIsUserSessionModalOpened}
      />
    </div>
  );
};

export default CabinetPage;
