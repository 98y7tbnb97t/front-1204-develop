import { FaLock } from '@react-icons/all-files/fa/FaLock';
import { CiCreditCardOff } from "@react-icons/all-files/ci/CiCreditCardOff";
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IUserData } from '../../models/IUserData.ts';
import { User } from '../../models/User';
import { getRequisites } from '../../store/reducers/BalansSlice.ts';
import {
  ITranslateItemString,
  translations,
} from '../../utils/translations.tsx';
import { UserRoles } from '../../utils/userRoles.ts';
import EditRequestsModal from '../Modals/EditRequestsModal.tsx';
import OpenAccessModal from '../Modals/OpenAccessModal.tsx';
import PermissionsModal from '../Modals/PermissionsModal';
import RemoveUserModal from '../Modals/RemoveUserModal';
import RequisiteRequestModal from '../Modals/RequisiteRequestModal.tsx';
import ToggleAccessModal from '../Modals/ToggleAccessModal.tsx';
import { BlockHistory } from './BlockHistory.tsx';
import Button from '../UI/Button.tsx';
import { TestUser } from '../../models/TestUser.ts';
import Modal from '../UI/Modal.tsx';
import MergeUsersModal from '../Modals/MergeUsersModal.tsx';
import TestLessonService from '../../services/TestLessonService.ts';
import { formatDate } from '../../utils/formatDate.ts';
import PermissionsTableFieldsSettingsModal, { PermTableFieldType } from '../Modals/PermissionsTableFieldsSettingsModal.tsx';
import PermissionsTableSortModal, { IPermissionsTableSort } from '../Modals/PermissionsTableSortModal.tsx';

interface TableProps {
  table: UserwithData[];
  onEditData: (user: User) => void;
  onArchive: (id: string) => void;
  onAcceptUserEdits: (
    id: string,
    data: { [key in string]: boolean },
  ) => Promise<undefined | User>;
  setTable: React.Dispatch<React.SetStateAction<User[]>>;
  onToggleAccess: () => void;
  selectedRole: string;
  testUsers: TestUser[];
}

type UserwithData = IUserData & User;

const filterUserData = (item: UserwithData) => ({
  _id: item._id,
  name: item.name,
  sname: item.sname,
  tname: item.tname,
  role: item.role,
  email: item.email,
  requizits: item.requizits,
  archive: item.archive,
  seance: item.seance,
  online: item.online,
  offline: item.offline,
  allgroups: item.allgroups,
  access: item.access,
});

const {
  toArchiveText,
  unArchiveText,
  profileText,
  directorText,
  zDirectorText,
  adminText,
  trainerText,
  newUserText,
  studentText,
  trainerMedhodistText,
  programmerText,
  editText,
  newTrainerText,
  newStudentText,
  rejectedRequestsText,
  editRequestsText,
  requisiteRequestsText,
  closeAccess,
  openAccess,
  levelsText,
  fieldsSettingsText
} = translations.access;

const roles: {
  [key in UserRoles]: ITranslateItemString;
} = {
  [UserRoles.NEWUSER]: newUserText,
  [UserRoles.DIRECTOR]: directorText,
  [UserRoles.ZDIRECTOR]: zDirectorText,
  [UserRoles.ADMIN]: adminText,
  [UserRoles.TRANER]: trainerText,
  [UserRoles.STUDENT]: studentText,
  [UserRoles.TRANERMETODIST]: trainerMedhodistText,
  [UserRoles.PROGRAMMER]: programmerText,
};

const newUserRoles: {
  [UserRoles.TRANER]: ITranslateItemString;
  [UserRoles.STUDENT]: ITranslateItemString;
} = {
  [UserRoles.TRANER]: newTrainerText,
  [UserRoles.STUDENT]: newStudentText,
};

const {
  groupsText,
}: {
  groupsText: ITranslateItemString;
} = translations.profile;

const Table: FC<TableProps> = ({
  table,
  onEditData,
  onArchive,
  onAcceptUserEdits,
  setTable,
  onToggleAccess,
  selectedRole,
  testUsers,
}) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const requisites = useAppSelector((state) => state.BalanceSlice.requisites);
  const location = useLocation();
  const [filteredUsers, setFilteredUsers] = useState<User[]>(table);
  const [sort, setSort] = useState<IPermissionsTableSort | null>(null);
  const [sortModal, setSortModal] = useState(false);
  const [modal, setModal] = useState<boolean>(false);
  const [modal2, setModal2] = useState<boolean>(false);
  const [accessModal, setAccessModal] = useState<boolean>(false);
  const [openAccessModal, setOpenAccessModal] = useState<boolean>(false);
  const [commentModal, setCommentModal] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [requisiteRequestsOpenedId, setRequisiteRequestsOpenedId] =
    useState<string>('');
  const [editRequestsModalId, setEditRequestsModalId] = useState<string>('');
  const [onlyRejected, setOnlyRejected] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.UserSlice);
  const [userToMerge, setUserToMerge] = useState<string>('');
  const [mergeUsersModal, setMergeUsersModal] = useState<boolean>(false);
  const [userToUnMerge, setUserToUnMerge] = useState<string>('');
  const [unMergeUsersModal, setUnMergeUsersModal] = useState<boolean>(false);
  const [fieldsSettingsModal, setFieldsSettingsModal] = useState<boolean>(false);
  const [userdata, setUserdata] = useState<IUserData>({
    _id: '',
    name: '',
    sname: '',
    tname: '',
    role: UserRoles.NEWUSER,
    email: '',
    country: '',
    archive: false,
    access: true,
    parentName: '',
    actualMail: '',
    nationality: '',
    city: '',
    whatsappNumber: '',
  });

  const [fieldsSettings, setFieldsSettings] = useState<{[key in PermTableFieldType]: boolean;}>({
    name: true,
    avatar: true,
    groups: true,
    lastOnline: true,
    lastInLesson: true,
    debtorHistory: true,
    requests: true,
    levels: true,
    removedFromGroupBy: true
  });
 
  const { commentsText, mergeText, unMergeText, testStudentText, sureUnMergeText } = translations.testLesson;
  const { yesText, noText } = translations.profile
  const defaultLevels = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const getColoredLevels = (levels: number[], openLevels: number[]) => {
    return levels.map((level) => {
      const isOpen = openLevels.includes(level);
      const colorClass = isOpen ? 'text-green-500' : 'text-red-500';
      return (
        <span key={level} className={colorClass}>
          {level}
        </span>
      );
    });
  };

  useEffect(() => {
    if (!requisites.length) void dispatch(getRequisites());
  }, [dispatch, requisites.length]);

  useEffect(() => {
    const settingsJson = localStorage.getItem('permTableFieldsSettings');
    if (settingsJson) {
      const settings = JSON.parse(settingsJson) as {[key in PermTableFieldType]: boolean;};
      setFieldsSettings(settings);
    }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const reqId = params.get('req');
    const archived = params.get('archived');

    let filtered = table;
    if (reqId && reqId !== 'true') {
      filtered = filtered.filter(user => user.requizits?.toString() === reqId);
    } else if (params.get('req') === 'true') {
      filtered = filtered.filter(user => user.requizits !== undefined);
    }
    if (archived && archived !== 'all') {
      const isArchived = archived === '1';
      filtered = filtered.filter(user => user.archive === isArchived);
    }
    setFilteredUsers(filtered);
  }, [location.search, table]);

  const editHandler = (user: UserwithData) => {
    setUserdata(user);
    setModal(true);
  };
  const removeHandler = (user: IUserData) => {
    setUserdata(user);
    setModal2(true);
  };

  const accessHandler = (user: IUserData) => {
    setUserdata(user);
    setAccessModal(true);
  };

  const openAccessHandler = (user: IUserData) => {
    setUserdata(user);
    setOpenAccessModal(true);
  };

  const openEditRequests = (id: string, onlyRejected?: boolean) => {
    setOnlyRejected(!!onlyRejected);
    setEditRequestsModalId(id);
  };

  const openRequisitesRequests = (id: string) =>
    setRequisiteRequestsOpenedId(id);
  const closeRequisitesRequests = () => setRequisiteRequestsOpenedId('');

  const closeEditRequests = () => setEditRequestsModalId('');

  const curEditRequestUser =
    (editRequestsModalId &&
      filteredUsers.find((item) => item._id === editRequestsModalId)) ||
    null;
  const curRequisiteRequestUser =
    (requisiteRequestsOpenedId &&
      filteredUsers.find((item) => item._id === requisiteRequestsOpenedId)) ||
    null;

  const curRequisiteRequestId = curRequisiteRequestUser?.editRequest
    ? curRequisiteRequestUser?.editRequest?.find(
        (item) => item.field === 'requizits',
      )?.value
    : null;

  const curRequisiteRequest = requisites.find(
    (item) => item.requisiteID === (curRequisiteRequestId as number | null),
  );
  const handleAcceptEdits = (
    id: string,
    data: { [key in string]: boolean },
    newRole?: UserRoles,
  ) => {
    void onAcceptUserEdits(id, data).then((curUser) => {
      if (
        newRole &&
        curUser &&
        curEditRequestUser &&
        curEditRequestUser.role === UserRoles.NEWUSER
      )
        editHandler({
          ...curUser,
          role: newRole,
        } as UserwithData);
    });
  };

  const handleEditData = (user: User) => {
    onEditData(user);
  };

  const handleToggleAccess = (id: string) => {
    setTable(
      filteredUsers.map((user) => {
        if (user._id === id) {
          return {
            ...user,
            access: userdata.access === false ? true : false,
            trustLesson: undefined,
          };
        }
        return user;
      }),
    );
    onToggleAccess();
  };

  const handleOpenAccess = (id: string) => {
    setTable(
      filteredUsers.map((user) => {
        if (user._id === id) {
          return {
            ...user,
            access: true,
            trustLesson: undefined,
          };
        }
        return user;
      }),
    );
    onToggleAccess();
  };

  const unMergeUsers = () => {
    void TestLessonService.unMergeUsers(userToUnMerge).then(() => {
      setUnMergeUsersModal(false);
      onArchive(userToUnMerge);
    });
  }

  const filterNoRequizitsStudents = () => {
    setTable(filteredUsers.filter(item => !item.requizits));
  }

  useEffect(() => {
    console.log(sort)
    if (sort) {
      const sortedUsers = [...filteredUsers];
      sortedUsers.sort((_, b) => {
        return b[sort.field] ? (sort.order === 'desc' ? 1 : -1) : (sort.order === 'desc' ? -1 : 1);
      })
      sortedUsers.sort((a, b) => {
        if (sort.field === 'lastOnline' || sort.field === 'lastTimeInLesson') {
          return Number(new Date(a[sort.field] as unknown as string)) > Number(new Date(b[sort.field] as unknown as string)) ? 
            (sort.order === 'desc' ? -1 : 1) :
            (sort.order === 'desc' ? 1 : -1);
        }
        return 0;
      })
      setFilteredUsers(sortedUsers);
    }
  }, [sort])

  const renderTableItem = (item: UserwithData) => {
    let roleText = roles?.[item.role]?.[language] || '';
    let isTrainer = item.role === UserRoles.TRANER;
    const isAdmin = item.role === UserRoles.ADMIN;
    const openLevels =
      item.open_level && item.open_level.length > 0
        ? item.open_level
        : defaultLevels();

    if (item.role === UserRoles.NEWUSER && item?.editRequest?.length) {
      const reqRole = item.editRequest.find(
        (item) => item.field === 'role',
      )?.value;
      if (
        (reqRole && reqRole === UserRoles.STUDENT) ||
        reqRole === UserRoles.TRANER
      ) {
        isTrainer = reqRole === UserRoles.TRANER;
        roleText = newUserRoles[reqRole][language];
      }
    }
    let roleColor = 'red';
    if (isTrainer) roleColor = 'blue';
    if (isAdmin) roleColor = 'green';

    const mainEditRequests =
      item.editRequest &&
      item.editRequest.filter((item) => item.field !== 'requizits');
    const requisiteEditRequests =
      item.editRequest &&
      item.editRequest.filter(
        (item) =>
          item.field === 'requizits' &&
          !item.rejectedAt &&
          !item.acceptedAt,
      ).length;

    const rejectedrequestsCount = mainEditRequests
      ? mainEditRequests.filter((item) => item.rejectedAt).length
      : 0;

    const openRequestsCount = mainEditRequests
      ? mainEditRequests.filter(
          (item) => !item.rejectedAt && !item.acceptedAt,
        ).length
      : 0;
    return (
      <div key={item._id}>
        {(item.role === 'DIRECTOR' ||
          user.role === 'ZDIRECTOR' ||
          item.role === 'ADMIN' ||
          item.role === 'TRANER') &&
        user.role === 'ADMIN' ? null : (
          <div
            className={classNames(
              'w-full rounded-xl p-3 flex  flex-col lg:flex-row gap-3 lg:gap-0 justify-between mb-2 lg:mb-5',
              {
                'bg-[#f87168]': item.archive,
                'bg-[#c1ae23]':
                  item.trustLesson !== undefined && item.access === false,
                'bg-gradient-top-menu':
                  !item.archive &&
                  !(
                    item.trustLesson !== undefined &&
                    item.access === false
                  ),
              },
            )}
          >
            <div className="flex flex-col sm:flex-row items-center w-full">
              {fieldsSettings['avatar'] && <div className="w-12 mr-5">
                <img className="w-full" src={item.avatar} alt="avatar" />
              </div>}
              {fieldsSettings['name'] && <div className="flex flex-col sm:basis-[350px]">
                <p className="text-base sm:text-xl text-white">
                  {item.name} {item.sname} {item.tname}
                  <span
                    className={`ml-1 text-sm sm:text-base bg-white px-2 shadow-lg rounded-full text-${roleColor}-500 whitespace-nowrap`}
                  >
                    {roleText}
                  </span>
                </p>
                <p className="text-xl text-white">{item.email}</p>
                {!item.requizits && <CiCreditCardOff color='#9800f3' fontSize={28}/>}
              </div>}
              {fieldsSettings['requests'] && <div className={'flex flex-col gap-[8px]'}>
                {!!requisiteEditRequests && (
                  <button
                    onClick={() => openRequisitesRequests(item._id)}
                    className={
                      'bg-gradient-button whitespace-nowrap relative px-[6px] py-[4px] rounded-full flex justify-between items-center gap-[6px] disabled:cursor-default'
                    }
                  >
                    <span>{requisiteRequestsText[language]}</span>
                    <span
                      className={`text-white font-bold w-[24px] h-[24px] rounded-full bg-blue-600 flex justify-center items-center`}
                    >
                      {requisiteEditRequests}
                    </span>
                  </button>
                )}
                {!!rejectedrequestsCount && (
                  <button
                    onClick={() => openEditRequests(item._id, true)}
                    className={
                      'bg-gradient-button whitespace-nowrap relative px-[6px] py-[4px] rounded-full flex justify-between items-center gap-[6px] disabled:cursor-default'
                    }
                  >
                    <span>{rejectedRequestsText[language]}</span>
                    <span
                      className={`text-white font-bold w-[24px] h-[24px] rounded-full bg-green-600 flex justify-center items-center`}
                    >
                      {rejectedrequestsCount}
                    </span>
                  </button>
                )}
                {!!openRequestsCount && (
                  <button
                    onClick={() => openEditRequests(item._id)}
                    className={
                      'bg-gradient-button whitespace-nowrap relative px-[6px] py-[4px] rounded-full flex justify-between items-center gap-[6px] disabled:cursor-default'
                    }
                  >
                    <span>{editRequestsText[language]}</span>
                    <span
                      className={`text-white font-bold w-[24px] h-[24px] rounded-full bg-red-600 flex justify-center items-center`}
                    >
                      {openRequestsCount}
                    </span>
                  </button>
                )}
              </div>}
              {fieldsSettings['groups'] && <div className="text-white ml-5">
                <p className="font-medium text-lg">
                  {groupsText[language]}:
                </p>
                {item.groups?.map((group, index) => {
                  index++;
                  if (index <= 3) {
                    return <p key={group._id} className="text-lg">{group.name}</p>;
                  }
                })}
                {(item?.groups?.length || 0) > 3 && (
                  <p>Полный список груп в профиле ...</p>
                )}
              </div>}
              {item.lastOnline && fieldsSettings['lastOnline'] && <div className="text-white ml-5">
                  <>
                    <p className="font-medium text-lg">
                      Последний раз онлайн:
                    </p>
                    {formatDate(new Date(item.lastOnline), true)}
                  </>
              </div>}
              {item.lastTimeInLesson && fieldsSettings['lastInLesson'] && <div className="text-white ml-5">
                <>
                  <p className="font-medium text-lg">
                    Последний раз был на уроке:
                  </p>
                  {formatDate(new Date(item.lastTimeInLesson), true)}
                </>
              </div>}
            </div>
            {item?.role === 'TRANER' && fieldsSettings['levels'] && (
              <div className="text-white ml-5 flex flex-col">
                <p className="font-medium text-lg">
                  {levelsText[language]}
                </p>
                <p className="flex gap-1">
                  {getColoredLevels(defaultLevels(), openLevels)}
                </p>
              </div>
            )}
            {fieldsSettings['removedFromGroupBy'] && <div className="flex flex-col sm:basis-[350px]">
              <p className="text-base sm:text-xl text-white">
                {item.removedFromGroupBy?.name
                  ? item.removedFromGroupBy?.name
                  : ''}
              </p>
            </div>}
            {fieldsSettings['debtorHistory'] && (item.trustLesson === true ||
              item.trustLesson === false) && (
              <div className="flex flex-col sm:basis-[350px] justify-center pr-4">
                <p className="text-base sm:text-xl text-white">
                  Доверительный
                </p>
                <p className="text-base sm:text-s text-white">
                  {new Date(
                    item.trustLessonDates?.at(-1) || '',
                  ).toLocaleString()}
                </p>
              </div>
            )}
            {fieldsSettings['debtorHistory'] && (item.blockHistory?.length || item.access === false) && (
              <div className="flex flex-col sm:basis-[20px] justify-center items-center pr-4">
                <FaLock color={!item.access ? '#dd4c4c' : '#4c8bdd'} />
                {(item.blockHistory?.length && item.trustLessonDates) && (
                  <BlockHistory
                    blockHistory={item.blockHistory}
                    trustLessonsDates={item.trustLessonDates}
                  />
                ) || ''}
              </div>
            )}
            <div className="flex gap-3 sm:gap-0 flex-wrap sm:flex-nowrap justify-between items-center">
              <button
                disabled={
                  !!(openRequestsCount || item.role === UserRoles.NEWUSER)
                }
                className=" w-[47%] bg-gradient-button text-lg font-semibold rounded-full py-0.5 sm:py-2 px-1 sm:px-5 sm:mr-4"
                onClick={() => editHandler(item)}
              >
                {editText[language]}
              </button>
              <Link
                className=" w-[47%] text-center bg-gradient-button text-lg font-semibold rounded-full py-0.5 sm:py-2 px-1 sm:px-5 sm:mr-4"
                to={'/profile/' + item._id}
              >
                {profileText[language]}
              </Link>
              {item.role === UserRoles.STUDENT &&
                (user.role === UserRoles.ADMIN ||
                  user.role === UserRoles.DIRECTOR ||
                  user.role === UserRoles.ZDIRECTOR) && (
                  <>
                    {item.trustLesson === true &&
                      item.access === true && (
                        <button
                          className=" w-[47%] bg-gradient-button text-lg font-semibold rounded-full py-0.5 sm:py-2 px-1 sm:px-5 sm:mr-4"
                          onClick={() => openAccessHandler(item)}
                        >
                          {openAccess[language]}
                        </button>
                      )}
                    <button
                      className=" w-[47%] bg-gradient-button text-lg font-semibold rounded-full py-0.5 sm:py-2 px-1 sm:px-5 sm:mr-4"
                      onClick={() => accessHandler(filterUserData(item))}
                    >
                      {item.access === false
                        ? openAccess[language]
                        : closeAccess[language]}
                    </button>
                  </>
                )}
              <button
                className=" w-[47%] bg-gradient-button text-lg font-semibold rounded-full py-0.5 sm:py-2 px-1 sm:px-5"
                onClick={() => removeHandler(filterUserData(item))}
              >
                {item.archive
                  ? unArchiveText[language]
                  : toArchiveText[language]}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const renderTestUserItem = (item: TestUser) => {
    const onOpenComment = () => {
      setCommentModal(true)
      setComment(item.comment)
    }
    const onMerge = () => {
      setUserToMerge(item._id)
      setMergeUsersModal(true);
    }
    const onUnMerge = () => {
      setUserToUnMerge(item._id);
      setUnMergeUsersModal(true);
    }
    return (
      <div key={item._id}>
          <div
            className={classNames(
              'w-full rounded-xl p-3 flex  flex-col lg:flex-row gap-3 lg:gap-0 justify-between mb-2 lg:mb-5 bg-gradient-top-menu',
            )}
          >
            <div className="flex flex-col sm:flex-row items-center w-full">
              <div className="w-12 mr-5">
                <img className="w-full" src="/avatar.svg" alt="avatar"/>
              </div>
              <div className="flex flex-col sm:basis-[350px]">
                <p className="text-base sm:text-xl text-white">
                  {item.name} {item.sname}
                  <span
                    className={`ml-1 text-sm sm:text-base bg-white px-2 shadow-lg text-red-500 rounded-full whitespace-nowrap`}
                  >
                    {testStudentText[language]}
                  </span>
                </p>
              </div>
              <div className="flex gap-3 justify-end w-full">
              {item.comment && <button
                className=" w-[47%] bg-gradient-button text-lg font-semibold rounded-full py-0.5 sm:py-2 px-1 sm:px-5"
                onClick={onOpenComment}
              >
                {commentsText[language]}
              </button>}
              {!item.archived ? 
                <button
                  className=" w-[47%] bg-gradient-button text-lg font-semibold rounded-full py-0.5 sm:py-2 px-1 sm:px-5"
                  onClick={onMerge}
                >
                  {mergeText[language]}
                </button> : 
                <button
                  className=" w-[47%] bg-gradient-button text-lg font-semibold rounded-full py-0.5 sm:py-2 px-1 sm:px-5"
                  onClick={onUnMerge}
                >
                  {unMergeText[language]}
                </button>
              }
              </div>
            </div>
          </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between">
        <button 
          className='bg-transparent block ml-7 text-sky-500 underline decoration-1 underline-offset-2 decoration-dashed'
          onClick={() => setSortModal(true)}
        >
          Сортировка
        </button>
        <button 
          className='bg-transparent block mr-7 mt-2 text-sky-500 underline decoration-1 underline-offset-2 decoration-dashed'
          onClick={() => setFieldsSettingsModal(true)}
        >
          {fieldsSettingsText[language]}
        </button>
      </div>
      <div className="pb-0 px-2 xl:pb-5 p-5 h-full lg:h-[calc(100vh-217px)] xl:h-[calc(100vh-110px)] lg:overflow-auto">
        { selectedRole === UserRoles.STUDENT && <Button onClick={filterNoRequizitsStudents} className='mb-2'>Без реквизитов</Button> }
        {filteredUsers.map(renderTableItem)}
        {testUsers.map(renderTestUserItem)}
      </div>
      <ToggleAccessModal
        modal={accessModal}
        setModal={setAccessModal}
        _id={userdata._id}
        email={userdata.email}
        access={userdata.access === false ? false : true}
        onToggleAccess={handleToggleAccess}
      />
      <OpenAccessModal
        modal={openAccessModal}
        setModal={setOpenAccessModal}
        _id={userdata._id}
        onOpenAccess={handleOpenAccess}
      />
      <PermissionsModal
        modal={modal}
        setModal={setModal}
        userdata={userdata}
        onEditData={handleEditData}
        openEditRequests={openEditRequests}
      />
      <RemoveUserModal
        modal={modal2}
        setModal={setModal2}
        email={userdata.email}
        _id={userdata._id}
        archive={!!userdata.archive}
        onArchive={onArchive}
      />
      <EditRequestsModal
        modalOpenedId={editRequestsModalId}
        closeEditRequests={closeEditRequests}
        editRequests={curEditRequestUser?.editRequest || []}
        onAcceptUserEdits={handleAcceptEdits}
        onlyRejected={onlyRejected}
      />
      <RequisiteRequestModal
        requisiteRequestsOpenedId={requisiteRequestsOpenedId}
        closeRequisitesRequests={closeRequisitesRequests}
        curRequisiteRequest={curRequisiteRequest}
        onAcceptUserEdits={(id, data) => {
          void onAcceptUserEdits(id, data);
        }}
      />
      <Modal
        active={commentModal}
        setActive={setCommentModal}
      >
        <p className='text-xl p-5'>{comment}</p>
      </Modal>
      <MergeUsersModal
        modal={mergeUsersModal}
        setModal={setMergeUsersModal}
        userToMerge={userToMerge}
        onMerge={onArchive}
      />
      <Modal
        active={unMergeUsersModal}
        setActive={setUnMergeUsersModal}
      >
        <p className='text-xl p-5'>{sureUnMergeText[language]}</p>
        <div className='flex gap-3 justify-end'>
          <Button onClick={unMergeUsers}>{yesText[language]}</Button>
          <Button onClick={() => setUnMergeUsersModal(false)}>{noText[language]}</Button>
        </div>
      </Modal>
      <PermissionsTableFieldsSettingsModal
        active={fieldsSettingsModal}
        setActive={setFieldsSettingsModal}
        fieldsSettings={fieldsSettings}
        setFieldsSettings={setFieldsSettings}
      />
      <PermissionsTableSortModal
        active={sortModal}
        setActive={setSortModal}
        sort={sort}
        setSort={setSort}
      />
    </>
  );
};

export default Table;
