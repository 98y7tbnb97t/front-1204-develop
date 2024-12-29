import { FC, useEffect, useState } from 'react';
import TopMenu from '../components/UI/TopMenu/TopMenu';
import DatePicker, { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import Input from '../components/UI/Main/Input';
import { ISelect } from '../models/ISelect';
import Man from '../assets/icons/man.png';
import WoMan from '../assets/icons/woman.png';
import PermissionsService from '../services/PermissionsService';
import { useParams } from 'react-router-dom';
import { User } from '../models/User';
import { Disclosure } from '@headlessui/react';
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown';
import { IoIosArrowUp } from '@react-icons/all-files/io/IoIosArrowUp';
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import { ITranslateItemString, translations } from '../utils/translations.tsx';
import { userCountries, userLanguages } from '../constants.ts';
import GraphicCalendar, {
  createCalendarGraphic,
  getUSerSchedule,
  ICalendarItem,
} from '../components/UI/GraphicCalendar.tsx';
import { isUserDirector, UserRoles } from '../utils/userRoles.ts';
import CopyWrapper from '../components/UI/CopyWrapper.tsx';
import { getRequisites } from '../store/reducers/BalansSlice.ts'
import Button from '../components/UI/Button.tsx';
import AutoSMSListModal from '../components/Modals/AutoSMSListModal.tsx';
import UserNotificationsModal from '../components/Modals/UserNotificationsModal.tsx';
import { ENationalities, userNationalities } from '../models/ENationalities.ts';
import { ECountries } from '../models/ECountries.ts';
import { ECities, userCities } from '../models/ECities.ts';

registerLocale('enGB', enGB);

const calendarInit = createCalendarGraphic();

const UserCabinetPage: FC = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const { role } = useAppSelector((state) => state.UserSlice.user);
  const requisitesData = useAppSelector(
    (state) => state.BalanceSlice.requisites,
  );

  const {
    adminInfoText,
    readyForSimulationsText,
    yesText,
    noText,
    onlineTournamentsText,
    offlineTournamentsText,
    itemText,
    groupsText,
    formatText,
    groupText,
    individualText,
    groupPlusIndividualText,
    lessonDurationText,
    nameText,
    surNameText,
    sеcondNameText,
    parentNameText,
    actualMailText,
    nationalityText,
    languagesText,
    cityText,
    whatsAppNumberText,
    countryText,
    teacherText,
    notFilledText,
    birthDateText,
    graphicCommentsText,
  } = translations.profile;

  const {
    emailText,
  }: {
    emailText: ITranslateItemString;
  } = translations.messenger;

  const {chatNotifications} = translations.autoSMS;
  const [user, setUser] = useState<User>();
  const [calendar, setCalendar] = useState<ICalendarItem[]>(calendarInit);
  const [userNotificationsModal, setUserNotificationsModal] = useState<boolean>(false);

  const userRequizites = requisitesData.find(({requisiteID}) => requisiteID === user?.requizits)

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        await PermissionsService.getUser(userId).then((resp) =>
          setUser(resp.data),
        );
      }
    };
    void dispatch(getRequisites());
    void fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      if (user.shedule) {
        const updatedCalendar = getUSerSchedule(calendar, user.shedule);
        setCalendar(updatedCalendar);
      }
    }
  }, [user]);

  const setEmptyValue = (
    text: ITranslateItemString,
    value: string | undefined | JSX.Element,
  ) => {
    return `${text[language]}${value ? `: ${value}` : ''}`;
  };

  const setEmptyError = (value: string | undefined | JSX.Element) => {
    return value ? `` : notFilledText[language];
  };

  const formatOptions = [
    { id: '1', name: groupText[language], slug: 'group' },
    { id: '2', name: individualText[language], slug: 'ind' },
    { id: '3', name: groupPlusIndividualText[language], slug: 'groupind' },
  ] as ISelect[];

  const userLanguagesTexts: string[] | undefined = user?.languages?.map(
    (item) => userLanguages[item].text[language],
  );

  return (
    <div className="w-full">
      <TopMenu />

      <div className="px-2 md:px-10 max-2xl:px-2 py-5 overflow-auto h-[calc(100vh-90px)]">
        <div className="w-full flex flex-col items-center px-5 py-5 bg-[#f0f0f0] rounded-xl">
          <div className="flex mb-2 gap-2 justify-end w-full items-center">
            { [UserRoles.DIRECTOR, UserRoles.ZDIRECTOR, UserRoles.ADMIN].includes(role) &&<AutoSMSListModal user_id={user?._id} users={[user || {} as User]}/>}
            { [UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(role) && <Button className='max-w-xs' onClick={() => setUserNotificationsModal(true)}>{chatNotifications[language]}</Button>}
          </div>
          <div className="flex justify-between items-stretch w-full mb-16 gap-5 flex-col xl:flex-row">
            <div className="border mr-0 border-[#B7975A] rounded-xl py-5 md:px-16 px-5 md:py-10 flex flex-col justify-center gap-4">
              <div className='flex items-center '>
                <div className="w-20 h-20 sm:w-32 sm:h-32 md:mr-10 mr-4 overflow-hidden mb-5 border-[#B7975A] border rounded-full">
                  <img
                    className="w-full h-full"
                    src={user?.avatar}
                    alt="avatar"
                  />
                </div>
                <div className="flex flex-col">
                  <CopyWrapper value={user?.name} isStatic={true}>
                    <p className="font-bold text-xl flex items-center text-gray-600">
                      <span className="text-black">{nameText[language]}: </span>{' '}
                      {user?.name}
                    </p>
                  </CopyWrapper>
                  <CopyWrapper value={user?.sname} isStatic={true}>
                    <p className="font-bold text-xl flex items-center text-gray-600">
                      <span className="text-black">
                        {sеcondNameText[language]}:{' '}
                      </span>{' '}
                      {user?.sname}
                    </p>
                  </CopyWrapper>
                  <CopyWrapper value={user?.tname} isStatic={true}>
                    <p className="font-bold text-xl flex items-center text-gray-600">
                      <span className="text-black">
                        {surNameText[language]}:{' '}
                      </span>{' '}
                      {user?.tname}
                    </p>
                  </CopyWrapper>
                </div>
              </div>
              {isUserDirector(role) && (<div className='flex justify-center items-center h-16 font-bold text-lg'>
                <span className='text-blue-600'>{userRequizites?.cardType}</span> - {userRequizites?.ownerEn}
              </div>)}
            </div>
            {user?.role === UserRoles.STUDENT &&
              user?.groups &&
              user.groups.length > 0 && (
                <div className="flex flex-col basis-[70%] border rounded-xl p-2 border-[#B7975A]">
                  <p className="mb-5 text-lg max-2xl:text-base font-bold text-center text-red-500">
                    {adminInfoText[language]}
                  </p>
                  <div className="w-full">
                    <div className="flex max-w-[1000px] w-full">
                      <div className="flex flex-col w-full mr-5">
                        <div className="w-full border border-[#B7975A] flex justify-between rounded-full py-3 px-5 font-bold max-2xl:font-semibold mb-3">
                          <div>
                            {readyForSimulationsText[language]}:{' '}
                            {user?.seance
                              ? yesText[language]
                              : noText[language]}
                          </div>
                        </div>
                        <div className="w-full border border-[#B7975A] flex justify-between rounded-full py-3 px-5 font-bold max-2xl:font-semibold mb-3">
                          <div className="">
                            {onlineTournamentsText[language]}:{' '}
                            {user.online ? yesText[language] : noText[language]}
                          </div>
                        </div>
                        <div className="w-full border border-[#B7975A] flex justify-between rounded-full py-3 px-5 font-bold max-2xl:font-semibold mb-3">
                          <div className="">
                            {offlineTournamentsText[language]}:{' '}
                            {user.offline
                              ? yesText[language]
                              : noText[language]}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="w-full border border-[#B7975A] rounded-full py-3 px-5 font-bold max-2xl:font-semibold mb-3">
                          <div className="">
                            {teacherText[language]}:{' '}
                            {
                              user?.groups[0]?.users?.find(
                                (user) => user?.role === 'DIRECTOR',
                              )?.name
                            }
                          </div>
                        </div>
                        <div className="w-full border border-[#B7975A] rounded-full py-3 px-5 font-bold max-2xl:font-semibold mb-3">
                          <div className="">
                            {itemText[language]}: {user.groups[0].level}
                          </div>
                        </div>
                        <div className="w-full border border-[#B7975A] rounded-3xl py-3 px-5 font-bold max-2xl:font-semibold mb-3">
                          {user.groups.length > 3 ? (
                            <Disclosure>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button
                                    as="div"
                                    className="cursor-pointer flex items-center"
                                  >
                                    {groupsText[language]}:{' '}
                                    {user?.groups?.map((group, index) => {
                                      index++;
                                      if (index < 4) {
                                        return group.name + ', ';
                                      }
                                    })}{' '}
                                    <span className="text-lg">
                                      {open ? (
                                        <IoIosArrowUp />
                                      ) : (
                                        <IoIosArrowDown />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                  <Disclosure.Panel>
                                    {user?.groups?.map((group, index) => {
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
                              {user.groups.map((group) => group.name + ', ')}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
              {user?.role !== UserRoles.PROGRAMMER && (
                <>
                  <div className="flex justify-between items-center flex-col gap-x-[4px] gap-y-6 my-5 sm:flex-row">
                    <div className="flex  mr-2 w-full">
                      <CopyWrapper
                        value={
                          user?.born ? new Date(user?.born)?.toDateString() : ''
                        }
                      >
                        <DatePicker
                          wrapperClassName="w-full"
                          selected={user?.born ? new Date(user?.born) : null}
                          dateFormat="dd.MM.yyyy"
                          locale="enGB"
                          onChange={() => {return}}
                          readOnly
                          placeholderText={setEmptyValue(
                            birthDateText,
                            user?.born && user.born.toString(),
                          )}
                          customInput={
                            <Input
                              error={setEmptyError(
                                user?.born && user.born.toString(),
                              )}
                              type="text"
                              className="text-center w-full"
                              wrapperClass="w-full"
                            />
                          }
                        />
                      </CopyWrapper>
                    </div>
                    {user?.role === UserRoles.STUDENT && (
                      <CopyWrapper value={user?.parentName}>
                        <Input
                          type="text"
                          className="text-center"
                          wrapperClass="mr-2 w-full"
                          read={true}
                          value={setEmptyValue(
                            parentNameText,
                            user?.parentName,
                          )}
                          error={setEmptyError(user?.parentName)}
                        />
                      </CopyWrapper>
                    )}

                    <CopyWrapper value={userNationalities[user?.nationality as ENationalities] && userNationalities[user?.nationality as ENationalities].text[language]}>
                      <Input
                        type="text"
                        className=" text-center"
                        wrapperClass="mr-2 w-full"
                        read={true}
                        value={setEmptyValue(
                          nationalityText,
                          userNationalities[user?.nationality as ENationalities] && userNationalities[user?.nationality as ENationalities].text[language],
                        )}
                        error={setEmptyError(user?.nationality)}
                      />
                    </CopyWrapper>

                    <div className="flex items-center">
                      <div className="mr-5">
                        <input
                          className="peer hidden"
                          id="man"
                          type="radio"
                          value="man"
                          readOnly
                          checked={user?.sex === 'man' && true}
                        />
                        <label
                          className={
                            'cursor-pointer w-[40px] p-2 flex rounded-full overflow-hidden bg-gradient-button peer-checked:bg-gradient-appricot'
                          }
                          htmlFor="man"
                        >
                          <img src={Man} alt="man" />
                        </label>
                      </div>
                      <div className="mr-5">
                        <input
                          className="peer hidden"
                          type="radio"
                          id="woman"
                          value="woman"
                          readOnly
                          checked={user?.sex === 'woman' && true}
                        />
                        <label
                          className={
                            'cursor-pointer w-[40px] p-2 flex rounded-full overflow-hidden bg-gradient-button peer-checked:bg-gradient-appricot'
                          }
                          htmlFor="woman"
                        >
                          <img src={WoMan} alt="woman" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex my-5 flex-col gap-y-6 sm:flex-row gap-x-[4px]">
                    <CopyWrapper value={userLanguagesTexts?.join(', ')}>
                      <Input
                        type="text"
                        className=" text-center"
                        wrapperClass="mr-2 w-full"
                        read={true}
                        error={setEmptyError(
                          userLanguagesTexts && userLanguagesTexts.join(', '),
                        )}
                        value={setEmptyValue(
                          languagesText,
                          userLanguagesTexts && userLanguagesTexts.join(', '),
                        )}
                      />
                    </CopyWrapper>
                    <CopyWrapper value={userCountries[user?.country as ECountries] && userCountries[user?.country as ECountries].text[language]}>
                      <Input
                        type="text"
                        className="text-center"
                        wrapperClass="mr-2 w-full"
                        error={setEmptyError(user?.country as string)}
                        read={true}
                        value={setEmptyValue(
                          countryText,
                          userCountries[user?.country as ECountries] && userCountries[user?.country as ECountries].text[language],
                        )}
                      />
                    </CopyWrapper>
                    <CopyWrapper value={userCities[user?.city as ECities] && userCities[user?.city as ECities].text[language]}>
                      <Input
                        type="text"
                        className=" text-center"
                        wrapperClass="mr-2 w-full"
                        read={true}
                        value={setEmptyValue(cityText, userCities[user?.city as ECities] && userCities[user?.city as ECities].text[language])}
                        error={setEmptyError(user?.city)}
                      />
                    </CopyWrapper>
                  </div>
                </>
              )}

              <div className="flex my-5 flex-col sm:flex-row gap-y-6 gap-x-[4px] gap-y-6">
                {user?.role !== UserRoles.PROGRAMMER && (
                  <CopyWrapper value={user?.whatsappNumber}>
                    <Input
                      type="text"
                      className=" text-center"
                      wrapperClass="mr-2 w-full"
                      error={setEmptyError(user?.whatsappNumber)}
                      read={true}
                      value={setEmptyValue(
                        whatsAppNumberText,
                        user?.whatsappNumber,
                      )}
                    />
                  </CopyWrapper>
                )}
                {user?.role === UserRoles.STUDENT && (
                  <CopyWrapper value={user?.actualMail}>
                    <Input
                      read={true}
                      wrapperClass="w-full  mr-2"
                      type="text"
                      placeholder={actualMailText[language]}
                      value={user?.actualMail}
                    />
                  </CopyWrapper>
                )}
                <CopyWrapper value={user?.email}>
                  <Input
                    read={true}
                    wrapperClass="w-full  mr-2"
                    type="text"
                    placeholder={emailText[language]}
                    value={user?.email}
                  />
                </CopyWrapper>
              </div>
              {user?.role !== UserRoles.PROGRAMMER && (
                <>
                  <div className="flex my-5 flex-col sm:flex-row gap-x-[4px] gap-y-6">
                    {user?.role === UserRoles.STUDENT && (
                      <>
                        <CopyWrapper value={user?.format}>
                          <Input
                            type="text"
                            className=" text-center"
                            wrapperClass="mr-2 w-full"
                            read={true}
                            error={setEmptyError(
                              formatOptions.find(
                                (option) => option.slug === user?.format,
                              )?.name,
                            )}
                            value={setEmptyValue(
                              formatText,
                              formatOptions.find(
                                (option) => option.slug === user?.format,
                              )?.name,
                            )}
                          />
                        </CopyWrapper>
                        <CopyWrapper value={user?.durency}>
                          <Input
                            type="text"
                            className=" text-center"
                            wrapperClass="mr-2 w-full"
                            error={setEmptyError(user?.durency)}
                            read={true}
                            value={setEmptyValue(
                              lessonDurationText,
                              user?.durency,
                            )}
                          />
                        </CopyWrapper>
                      </>
                    )}
                    <CopyWrapper value={user?.comment}>
                      <Input
                        type="text"
                        className=" text-center"
                        wrapperClass="mr-2 w-full"
                        error={setEmptyError(user?.comment)}
                        read={true}
                        value={setEmptyValue(
                          graphicCommentsText,
                          user?.comment,
                        )}
                      />
                    </CopyWrapper>
                  </div>
                  <GraphicCalendar
                    scheduleEditHistory={user?.scheduleEditHistory || []}
                    calendar={calendar}
                    calendarError={''}
                    setCalendar={setCalendar}
                    disabled={true}
                    profileOwner={user}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      { user?._id && <UserNotificationsModal user_id={user._id} active={userNotificationsModal} setActive={setUserNotificationsModal} />}
    </div>
  );
};

export default UserCabinetPage;
