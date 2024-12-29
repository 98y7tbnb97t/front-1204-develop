import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IUserData } from '../../models/IUserData.ts';
import { User } from '../../models/User.ts';
import PermissionsService, {
  IPayload,
} from '../../services/PermissionsService';
import { getRequisites } from '../../store/reducers/BalansSlice.ts';
import { EGroupChatKeys, basicChats, IBasicChats } from '../../utils/basicChats.ts';
import { translations } from '../../utils/translations.tsx';
import { UserRoles, isUserDirector } from '../../utils/userRoles.ts';
import Button from '../UI/Button';
import Input from '../UI/Input';
import CheckBox from '../UI/Main/Checkbox/CheckBox.tsx';
import Modal from '../UI/Modal';
import AuthErrorModal from './AuthError.tsx';
import SuccessModal from './SuccessModal';
import { ECountries } from '../../models/ECountries.ts';

interface AddUserToAddGroupModalProps {
  modal: boolean;
  setModal: (bool: boolean) => void;
  onEditData: (user: User) => void;
  userdata: IUserData;
  openEditRequests: (id: string) => void;
}

interface IUserInfo {
  name: string;
  sname: string;
  tname: string;
  allgroups: boolean;
}

type IGroupChats = {
  [key in EGroupChatKeys]?: boolean;
};

type Form = {
  group_id: string;
};

const {
  editDataText,
  nameText,
  surnameText,
  fatherNameText,
  roleText,
  levelsText,
  directorText,
  zDirectorText,
  adminText,
  trainerText,
  studentText,
  newUserText,
  submitText,
  trainerMedhodistText,
  programmerText,
  dataChangedText,
} = translations.access;

const levels = [
  { id: 0, level: 1 },
  { id: 1, level: 2 },
  { id: 2, level: 3 },
  { id: 3, level: 4 },
  { id: 4, level: 5 },
  { id: 5, level: 6 },
  { id: 6, level: 7 },
  { id: 7, level: 8 },
  { id: 8, level: 9 },
  { id: 9, level: 10 },
];

const sortNumbersAsc = (numbers: number[]): number[] =>
  numbers.slice().sort((a, b) => a - b);

const PermissionsModal: FC<AddUserToAddGroupModalProps> = ({
  modal,
  setModal,
  userdata,
  onEditData,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.UserSlice);
  const requisitesData = useAppSelector(
    (state) => state.BalanceSlice.requisites,
  );

  const [modalError] = useState<string>('');
  const [role, setRole] = useState<UserRoles>(userdata.role);
  const [requizits, setRequizits] = useState<number>(userdata?.requizits || 0);
  const [eModal, setEModal] = useState<boolean>(false);
  const [sModal, setSModal] = useState<boolean>(false);
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);

  useForm<Form>();

  const filteredGroupChats = useMemo<IBasicChats[]>(() => basicChats
    .filter(
      (item) =>
        !item.autoAdd && (!item.forRoles || item.forRoles.includes(role)),
    )
    .sort(
      (a, b) =>
        (a?.fixedIndex?.[role] || a?.index?.[role] || 99) -
        +(b?.fixedIndex?.[role] || b?.index?.[role] || 99),
    ), [role]);
  
  const isNewRegisteredUser = basicChats.every(
    (item) => !userdata[item.key as keyof IUserData],
  );

  const filteredGroupChatsObj = useMemo<IGroupChats>(() => filteredGroupChats.reduce(
    (acc: IGroupChats, cur) => {
      acc[cur.key] =
        ((isNewRegisteredUser) &&
          cur.defaultActive &&
          cur.defaultActive.includes(role)) ||
        !!userdata?.[cur.key as keyof IUserData];
      return acc;
    },
    {},
  ), [filteredGroupChats, userdata]);

  const [userInfo, setUserInfo] = useState<IUserInfo & IGroupChats>({
    name: '',
    sname: '',
    tname: '',
    seance: false,
    online: false,
    offline: false,
    allgroups: false,
    ...filteredGroupChatsObj,
  });
  useEffect(() => {
    Object.keys(userInfo).forEach((key) => {
      if(key !== 'name' && key !== 'sname' && key !== 'tname' && key !== 'allgroups' && !(key in filteredGroupChatsObj)) {
        (userInfo as unknown as {[key: string]: boolean})[key] = false;
      }
    })
    setUserInfo(userInfo);
  }, [filteredGroupChatsObj, setUserInfo])
  const language = useAppSelector((state) => state.TranslateSlice.language);

  const toggleLevel = (level: number) => {
    setSelectedLevels((prev) => {
      const updatedLevels = prev.includes(level)
        ? prev.filter((lvl) => lvl !== level)
        : [...prev, level];
      return sortNumbersAsc(updatedLevels);
    });
  };

  useEffect(() => {
    if (!requisitesData.length) void dispatch(getRequisites());
  }, []);
  useEffect(() => {
    const {
      name,
      sname,
      tname,
      allgroups,
      techTrainer,
      techStudents,
      programmers,
      adminProblems,
      admins,
      trainerProblems,
      trainingProgram,
      araratInt,
      report,
      urgent,
      testForNewTrainers,
      groupForNewTrainers,
      importantNews,
      chatForChecks,
      armTrainers,
      rusTrainers,
      engTrainers,
      fraTrainers,
      gerTrainers,
      psycho,
      seance,
      online,
      offline,
      testLessonQuestions,
    } = userdata;
    setUserInfo({
      name,
      sname,
      tname: tname || '',
      allgroups: !!allgroups,

      // -----
      techTrainer: !!techTrainer,
      psycho: !!psycho,
      techStudents: !!techStudents,
      programmers: !!programmers,
      adminProblems: !!adminProblems,
      admins: !!admins,
      trainerProblems: !!trainerProblems,
      trainingProgram: !!trainingProgram,
      araratInt: !!araratInt,
      report: !!report,
      urgent: !!urgent,
      importantNews: !!importantNews,
      chatForChecks: !!chatForChecks,
      testForNewTrainers: !!testForNewTrainers,
      groupForNewTrainers: !!groupForNewTrainers,
      armTrainers: !!armTrainers,
      rusTrainers: !!rusTrainers,
      engTrainers: !!engTrainers,
      fraTrainers: !!fraTrainers,
      gerTrainers: !!gerTrainers,
      testLessonQuestions: !!testLessonQuestions,
      seance: !!seance,
      online: !!online,
      offline: !!offline,
    });
    setRole(userdata.role);
    if (userdata?.requizits) setRequizits(userdata.requizits);
    else if (userdata.country) {
      const countries = requisitesData
        .filter((item) =>
          item.countries.includes(userdata.country as ECountries),
        )
        .sort((a, b) => a.users - b.users);
      if (countries[0]) setRequizits(countries[0].requisiteID);
    }
  }, [userdata]);

  useEffect(() => {
    setUserInfo((prevState) => ({
      ...prevState,
      ...filteredGroupChatsObj,
    }));
  }, [role]);

  useEffect(() => {
    if (userdata?.open_level && userdata?.open_level?.length > 0) {
      setSelectedLevels(sortNumbersAsc(userdata.open_level));
    } else {
      setSelectedLevels(sortNumbersAsc(levels.map((level) => level.id + 1)));
    }
  }, [userdata]);
  const submit = async () => {
    const data: IPayload = {
      name: userInfo.name,
      role: role,
      sname: userInfo.sname,
      allgroups: userInfo.allgroups,
      tname: userInfo.tname,
      requizits,
      open_level: JSON.stringify(selectedLevels),

      //
      techTrainer: !!userInfo.techTrainer,
      techStudents: !!userInfo.techStudents,
      programmers: !!userInfo.programmers,
      adminProblems: !!userInfo.adminProblems,
      admins: !!userInfo.admins,
      trainerProblems: !!userInfo.trainerProblems,
      trainingProgram: !!userInfo.trainingProgram,
      araratInt: !!userInfo.araratInt,
      report: !!userInfo.report,
      urgent: !!userInfo.urgent,
      testForNewTrainers: !!userInfo.testForNewTrainers,
      groupForNewTrainers: !!userInfo.groupForNewTrainers,
      importantNews: !!userInfo.importantNews,
      chatForChecks: !!userInfo.chatForChecks,
      armTrainers: !!userInfo.armTrainers,
      rusTrainers: !!userInfo.rusTrainers,
      engTrainers: !!userInfo.engTrainers,
      fraTrainers: !!userInfo.fraTrainers,
      gerTrainers: !!userInfo.gerTrainers,
      testLessonQuestions: !!userInfo.testLessonQuestions,
      seance: !!userInfo.seance,
      online: !!userInfo.online,
      offline: !!userInfo.offline,
      notifications: !!userInfo.notifications,
      psycho: !!userInfo.psycho,
    };
    await PermissionsService.setRole(userdata._id, data).then((res) => {
      setSModal(true);
      setModal(false);
      onEditData(res.data.user);
    });
  };
  return (
    <>
      <Modal active={modal} setActive={setModal} className="items-center">
        <h1 className="text-2xl font-semibold tracking-wider dark:text-white text-gray-800 capitalize ">
          {editDataText[language]}
        </h1>
        <p className="text-center pt-5 mb-2 dark:text-white">
          {userdata.name} {userdata.sname} {userdata.tname}
        </p>
        <Input
          wrapperClasses="mb-5 w-full"
          type="text"
          placeholder={nameText[language]}
          label={`${nameText[language]}:`}
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
        />
        <Input
          wrapperClasses="mb-5 w-full"
          type="text"
          placeholder={surnameText[language]}
          label={`${surnameText[language]}:`}
          value={userInfo.sname}
          onChange={(e) => setUserInfo({ ...userInfo, sname: e.target.value })}
        />
        <Input
          wrapperClasses="mb-5 w-full"
          type="text"
          placeholder={fatherNameText[language]}
          label={`${fatherNameText[language]}:`}
          value={userInfo.tname}
          onChange={(e) => setUserInfo({ ...userInfo, tname: e.target.value })}
        />

        <p className="text-left self-start dark:text-white">
          {roleText[language]}:
        </p>
        <select
          onChange={(e) => setRole(e.target.value as UserRoles)}
          className="border-2 border-black mb-5 w-full"
          value={role}
        >
          {isUserDirector(user.role, true) && (
            <>
              <option
                value={UserRoles.DIRECTOR}
              >
                {directorText[language]}
              </option>
              <option
                value={UserRoles.ZDIRECTOR}
              >
                {zDirectorText[language]}
              </option>
              <option
                value={UserRoles.ADMIN}
              >
                {adminText[language]}
              </option>
              <option
                value={UserRoles.TRANER}
              >
                {trainerText[language]}
              </option>
              <option
                value={UserRoles.TRANERMETODIST}
              >
                {trainerMedhodistText[language]}
              </option>
              <option
                value={UserRoles.PROGRAMMER}
              >
                {programmerText[language]}
              </option>
            </>
          )}
          <option
            value={UserRoles.STUDENT}
          >
            {studentText[language]}
          </option>
          <option
            value={UserRoles.NEWUSER}
          >
            {newUserText[language]}
          </option>
        </select>
        {role === UserRoles.STUDENT && (
          <select
            disabled={user.role === UserRoles.ADMIN}
            onChange={(e) => setRequizits(+e.target.value)}
            className="border-2 border-black mb-5 w-full"
            value={requizits}
          >
            {requisitesData.map(
              ({ cardType, ownerEn, users, _id, requisiteID }) => (
                <option
                  key={_id}
                  value={requisiteID}
                >
                  {cardType} ({ownerEn}
                  {user.role !== UserRoles.ADMIN ? ` | ${users} исп.` : ''})
                </option>
              ),
            )}
          </select>
        )}
        {userdata.role === 'TRANER' && role === 'TRANER' && (
          <>
            <p className="text-left self-start dark:text-white">
              {levelsText[language]}
            </p>
            <div className="w-full flex gap-1 mb-4">
              {levels.map((item) => (
                <div
                  key={item.id}
                  className={[
                    'text-center size-8 md:size-10 rounded-full  border-2 p-1 cursor-pointer',
                    selectedLevels.includes(item.level)
                      ? 'border-green-500'
                      : 'border-red-500',
                  ].join(' ')}
                  onClick={() => toggleLevel(item.level)}
                >
                  {item.level}
                </div>
              ))}
            </div>
          </>
        )}
        <div className="w-full">
          {filteredGroupChats.map(({ key, text }) => (
            <CheckBox
              key={key}
              labelClass={'max-w-full overflow-hidden text-ellipsis'}
              checked={userInfo[key]}
              onChange={() =>
                setUserInfo({ ...userInfo, [key]: !userInfo[key] })
              }
              wrapperClass="mb-3"
              label={typeof text === 'string' ? text : text[language]}
            />
          ))}
        </div>
        <Button onClick={submit}>{submitText[language]}</Button>
      </Modal>
      <AuthErrorModal modal={eModal} setModal={setEModal} error={modalError} />
      <SuccessModal
        modal={sModal}
        setModal={setSModal}
        message={dataChangedText[language]}
      />
    </>
  );
};

export default PermissionsModal;
