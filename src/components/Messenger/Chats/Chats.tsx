import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus';
import { BiArchiveIn } from '@react-icons/all-files/bi/BiArchiveIn';
import { BsSearch } from '@react-icons/all-files/bs/BsSearch';
import { RxCross2 } from '@react-icons/all-files/rx/RxCross2';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import groupAvatarImg from '../../../assets/icons/group-avatar.svg';
import Logo2 from '../../../assets/logo2.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useDebounce } from '../../../hooks/useDebounce.ts';
import { useEndScroll } from '../../../hooks/useEndScroll.ts';
import { IChat } from '../../../models/IChat';
import { IContextChat } from '../../../models/IContext';
import {
  clearDialogs,
  getDialogs,
  getDialogsArchived,
} from '../../../store/reducers/MessengerSlice';
import { basicChats } from '../../../utils/basicChats.ts';
import { translations } from '../../../utils/translations.tsx';
import { UserRoles, isUserDirector } from '../../../utils/userRoles.ts';
import CreateGroupModal from '../../Modals/CreateGroupModal';
import IcoButton from '../../UI/IcoButton';
import Input from '../../UI/Input';
import ChatMenu from '../Chat/Menus/MessageMenu/ChatMenu';
import Chat from './Chat';

const {
  archivedText,
  groupsText,
  allChatsText,
  searchText,
  myGroupsText,
  allGroupsText,
  basicsText,
} = translations.messenger;

enum ELabelIds {
  basic = 'basic',
  archive = 'archive',
  groupsArchive = 'groupsArchive',
  groups = 'groups',
  all = 'all',
}

const getChatsUnreadsCount = (arr: IChat[]) => {
  const filtered = arr.filter((item) => item.unreaded);

  const msgsCount = filtered.reduce((acc, cur) => acc + +cur.unreaded, 0);
  return { msgsCount, chatsCount: filtered.length };
};

const Chats: FC = () => {
  const [value, setValue] = useState<string>('');
  const [tags, setTags] = useState<Array<string>>([]);
  const [allChats, setAllChats] = useState<IChat[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const { chats, archived, hasMoreChats, isChatsLoading } = useAppSelector(
    (state) => state.MessengerSlice,
  );
  const [page, setPage] = useState(0);
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const { group } = useAppSelector((state) => state.GroupSlice);
  const { user } = useAppSelector((state) => state.UserSlice);
  const dispatch = useAppDispatch();
  const archive = useRef<number>(0);
  const archiveAll = useRef<number>(0);
  const count = useRef<number>(0);
  const countAll = useRef<number>(0);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const searchbarRef = useRef<HTMLInputElement | null>(null);

  // TODO!: Delete userAgent && isIosMobApp after comfirm app in AppStore + string 537!
  const ua = navigator.userAgent;
  const isIosMobApp = ua === 'ios-mob-app';
  const hiddenChatIdsForIos: string[] = [
    '65b90294f2f3b1282198f1b3',
    '65b902b8f2f3b12821990235',
    '6689485f94f195e115f10b50',
    '65057bf0a6adf7baad4245ce',
  ];

  const initContext = {
    active: false,
    isBasic: false,
    x: 0,
    y: 0,
    chat_id: '',
    tags: [],
  };

  const getChats = useCallback(
    async (page: number) => {
      await dispatch(getDialogs({ id: user._id, page }));
      if (user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') {
        await dispatch(getDialogsArchived());
      }
    },
    [dispatch, user._id, user.role],
  );

  useEffect(() => {
    dispatch(clearDialogs());
    void getChats(0);
    () => {
      dispatch(clearDialogs());
    };
  }, [getChats, dispatch]);

  const onEndScroll = useCallback(() => {
    if (hasMoreChats && !isChatsLoading && !isSearching) {
      setPage(page + 1);
      void getChats(page + 1);
    }
  }, [hasMoreChats, isChatsLoading, page, getChats, isSearching]);

  useEndScroll({
    targetRef,
    rootRef: undefined,
    onIntersect: onEndScroll,
  });

  const [context, setContext] = useState<IContextChat>(initContext);
  const curRoleBasicChats = basicChats.filter(
    (item) => !item?.forRoles || item?.forRoles.includes(user.role),
  );
  const getFilteredBasicChats = (onlyFixed?: boolean) =>
    curRoleBasicChats
      .filter((basicChat) =>
        chats.find(
          (item) =>
            item?.tagId &&
            item.tagId === basicChat.key &&
            (!onlyFixed ||
              (basicChat.fixedIndex && basicChat.fixedIndex[user.role])),
        ),
      )
      .sort(
        (a, b) =>
          (a?.fixedIndex?.[user.role] || 99) -
          (b?.fixedIndex?.[user.role] || 99),
      )
      .map(
        (basicChat) =>
          chats.find(
            (item) => item?.tagId && item.tagId === basicChat.key,
          ) as IChat,
      );
  const sortChats = (arr: IChat[]) => {
    const fixedBasicChats = getFilteredBasicChats(true);
    const otherChats = arr
      .filter(
        (item) =>
          !basicChats.find(
            (basicChat) =>
              basicChat.key === item?.tagId &&
              basicChat.fixedIndex?.[user.role],
          ),
      )
      .sort((a, b) => {
        // Check if last message exists
        if (!a.lastmsg && !b.lastmsg) return 0;
        if (!a.lastmsg) return 1;
        if (!b.lastmsg) return -1;

        const timeA = new Date(a.lastmsg.time).getTime();
        const timeB = new Date(b.lastmsg.time).getTime();
        return timeB - timeA;
      });

    return [...fixedBasicChats, ...otherChats];
  };

  const filteredBasicChats = getFilteredBasicChats();
  const allLabelChats = user.dialog_types ? allChats : chats;
  const groups = chats.filter((item) => item.anonim === false && !item.tagId);
  let groupsCondText = groupsText[language];

  if (user.role === UserRoles.TRANER) {
    groupsCondText = myGroupsText[language];
  }
  if (isUserDirector(user.role, true)) {
    groupsCondText = allGroupsText[language];
  }

  const userLabels = tags
    .filter((tag) => tag !== 'archive')
    .map((tag) => {
      const chat = user.dialog_types
        ? user.dialog_types
            .filter(
              (dialog) =>
                dialog.name === tag &&
                chats.find((chat) => chat._id === dialog.dialog),
            )
            .map(
              (dialog) =>
                chats.find((chat) => chat._id === dialog.dialog) as IChat,
            )
        : [];

      return {
        id: tag as ELabelIds,
        title: tag,
        chat,
      };
    });

  const groupArchives = user.dialog_types
    ? user.dialog_types
        .filter(
          (dialog) =>
            dialog.name === 'archive' &&
            chats.find((chat) => chat._id === dialog.dialog),
        )
        .map(
          (dialog) => chats.find((chat) => chat._id === dialog.dialog) as IChat,
        )
    : [];

  const labels: {
    id: ELabelIds;
    title: string;
    chat: IChat[];
    individual?: boolean;
  }[] = [
    {
      title: allChatsText[language],
      chat: allLabelChats,
      id: ELabelIds.all,
    },
    {
      title: basicsText[language],
      chat: filteredBasicChats,
      id: ELabelIds.basic,
    },
    {
      title: archivedText[language],
      chat: archived,
      id: ELabelIds.archive,
      individual: true,
    },

    {
      title: groupsText[language],
      chat: groupArchives,
      id: ELabelIds.groupsArchive,
      individual: true,
    },
    {
      title: groupsCondText,
      chat: groups,
      id: ELabelIds.groups,
    },
    ...userLabels,
  ];
  const [curLabel, setCurLabel] = useState<ELabelIds>(ELabelIds.all);

  useEffect(() => {
    archive.current = 0;
    archiveAll.current = 0;
    count.current = 0;
    countAll.current = 0;
    const allTagsTemp = [] as Array<string>;
    const allArchiveTemp = [] as Array<string>;
    const allChatsTemp = [] as IChat[];
    if (user.dialog_types) {
      user.dialog_types.map((type) => {
        if (!allTagsTemp.includes(type.name)) {
          allTagsTemp.push(type.name);
        }
        chats.map((chat) => {
          if (type.dialog === chat._id) {
            if (type.name === 'archive') {
              if (!allArchiveTemp.includes(chat._id)) {
                allArchiveTemp.push(chat._id);
                if (chat.unreaded >= 1) {
                  archive.current++;
                }
                archiveAll.current += chat.unreaded;
              }
            }
          }
        });
      });
    }
    chats.map((chat) => {
      const curChatDialog = user?.dialog_types?.find(
        (item) => item.dialog === chat._id,
      );
      if (!allArchiveTemp.includes(chat._id)) {
        if (!allChatsTemp.includes(chat) && !curChatDialog) {
          allChatsTemp.push(chat);
          if (chat.unreaded >= 1) {
            count.current++;
          }
          countAll.current += chat.unreaded;
        }
      }
    });
    setTags(allTagsTemp);
    setAllChats(allChatsTemp);
  }, [user.dialog_types, chats]);

  useEffect(() => {
    setContext({ ...context, tags: tags });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  const onClearSearch = async () => {
    if (!isSearching) {
      searchbarRef.current?.focus();
    } else {
      setIsSearching(false);
      setValue('');
      dispatch(clearDialogs());
      await dispatch(getDialogs({ id: user._id, page: 0 }));
    }
  };

  const searchHandler = useDebounce(async (e: InputEvent) => {
    const val = (e.target as HTMLInputElement).value;
    if (val === '') {
      await onClearSearch();
      return;
    }
    setPage(0);
    dispatch(clearDialogs());
    await dispatch(
      getDialogs({
        id: user._id,
        page: 0,
        searchQuery: (e.target as HTMLInputElement).value,
      }),
    );
  }, 1000);

  const curLabelObj = labels.find((item) => item.id === curLabel);
  let curLabelChat = curLabelObj?.chat ? curLabelObj.chat : [];
  if (!curLabelObj?.individual) {
    curLabelChat = sortChats(curLabelChat);
  }

  const focusedClass = `transition-all sm:transition-none ${
    isSearching ? '!w-0 !min-w-0 scale-0' : ''
  }`;

  const isNotStudentOrProgrammer =
    user.role !== 'STUDENT' && user.role !== UserRoles.PROGRAMMER;

  return (
    <div className="h-full w-full md:w-auto">
      <div
        className={[
          'lg:w-[440px] sm:w-[280px] w-full h-full bg-white border-r-2 border-gray-400  flex flex-col',
        ].join(' ')}
      >
        <div
          className={[
            ' rounded-t-[10px] md:rounded-t-[50px] pb-2',
            'border-b-[1px]',
            !isNotStudentOrProgrammer ? 'sm:hidden' : '',
          ].join(' ')}
        >
          <div
            className={`h-14  bg-gradient-menu  sm:h-[64px] sm:border-b sm:bg-none sm:bg-[#f0f2f5] border-[#ccc]`}
          >
            <div className="h-full relative flex justify-between items-center p-2 gap-1">
              {!isNotStudentOrProgrammer && <div className={'flex-1'}></div>}
              <Link
                to={!group?.open || user.role === 'ADMIN' ? '/' : null}
                {...(group?.open && { onClick: () => void setModal(true) })}
                className={`min-w-[95px] sm:hidden flex h-full  align-middle justify-center ${focusedClass}`}
              >
                <img
                  className=" max-h-full overflow-hidden"
                  src={Logo2}
                  alt="logo"
                />
              </Link>
              <div
                className={'flex justify-end items-center h-full gap-2 w-full'}
              >
                {isNotStudentOrProgrammer && (
                  <Input
                    ref={searchbarRef}
                    iconClass={`font-bold text-[26px] ${
                      !isSearching ? 'text-white sm:text-black' : ''
                    }`}
                    value={value}
                    icon={isSearching ? <RxCross2 /> : <BsSearch />}
                    type="text"
                    className={`pl-[43px] py-[4px] md:!py-2 rounded-[10px] md:rounded-[50px] xl:rounded-[5px]  ${
                      !isSearching
                        ? 'px-[0px] sm:py-[4px] !bg-transparent sm:!bg-white border-transparent'
                        : ''
                    }`}
                    onFocus={() => setIsSearching(true)}
                    onBlur={() => {
                      if (!value) setIsSearching(false);
                    }}
                    onClickIcon={onClearSearch}
                    wrapperClasses={`w-full transition-[width] ${
                      !isSearching
                        ? '!w-[46px] sm:!w-full order-2 sm:order-none'
                        : ''
                    }`}
                    onInput={(e) => setValue(e.target.value)}
                    placeholder={searchText[language]}
                    onChange={(e) => searchHandler(e)}
                  />
                )}
                {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') && (
                  <IcoButton
                    className={`!px-1 !py-1 order-1 sm:order-none sm:text-black text-white !text-[36px] !mr-0 ${focusedClass}`}
                    onClick={() => void setModal(true)}
                    icon={<AiOutlinePlus />}
                  />
                )}
                <div
                  className={`sm:hidden order-3 flex h-full justify-end min-w-[40px] ${focusedClass}`}
                >
                  <Link to="/profile" className="flex items-center h-full">
                    <img src={user.avatar} className="h-full" alt="avatar" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {isNotStudentOrProgrammer && (
            <div className={'px-1 md:px-3'}>
              {isUserDirector(user.role, true) && (
                <>
                  <button
                    onClick={() => setCurLabel(ELabelIds.archive)}
                    className={` w-full bg-transparent flex items-center hover:bg-gray-700 hover:text-white py-[3px] sm:py-[8px] px-2 xl:px-5 rounded-sm transition-all text-black text-xl ${
                      curLabel === ELabelIds.archive
                        ? 'text-white !bg-gray-700'
                        : ''
                    }`}
                  >
                    <span className="mr-4">
                      <BiArchiveIn />
                    </span>
                    <p className="text-sm text-inherit md:text-lg flex items-center justify-between w-full">
                      {archivedText[language]}
                      <span className="bg-green-500 text-white  text-base   rounded-full px-1">
                        {archived.length}
                      </span>
                    </p>
                  </button>
                  <button
                    onClick={() => setCurLabel(ELabelIds.groupsArchive)}
                    className={`w-full  flex items-center hover:bg-gray-700 py-[3px] sm:py-[8px] px-2 xl:px-5 rounded-sm transition-all text-black hover:text-white text-xl ${
                      curLabel === ELabelIds.groupsArchive
                        ? 'text-white !bg-gray-700'
                        : ''
                    }`}
                  >
                    <span className="mr-4">
                      <BiArchiveIn />
                    </span>
                    <p className="text-lg flex items-center justify-between w-full">
                      {groupsText[language]}
                      <span className="bg-green-500 text-sm md:text-base text-white rounded-full px-1">
                        {archive.current}/{archiveAll.current}
                      </span>
                    </p>
                  </button>
                </>
              )}
              <div
                className={
                  'flex flex-wrap  sm:grid grid-cols-[repeat(4,1fr)] gap-[4px] mt-[4px]'
                }
              >
                {labels
                  .filter((item) => !item.individual)
                  .map(({ title, chat, id }) => {
                    const { msgsCount, chatsCount } =
                      getChatsUnreadsCount(chat);

                    return (
                      <button
                        key={id}
                        title={title}
                        onClick={() => setCurLabel(id)}
                        className={`min-w-[50px] relative hover:bg-[#eee] p-[3px] sm:p-[6px] flex sm:flex-col items-center justify-start sm:justify-center gap-[4px] sm:gap-[6px] overflow-hidden border-gray-400 border-[1px] rounded-[10px] ${
                          curLabel === id ? 'bg-blue-300' : ''
                        }`}
                      >
                        <img
                          src={groupAvatarImg}
                          alt=""
                          className={
                            'sm:w-[30px] w-[24px] aspect-square sm:block hidden'
                          }
                        />
                        <span
                          className={
                            'w-full text-[12px] sm:text-[14px] font-bold overflow-hidden text-ellipsis whitespace-nowrap'
                          }
                        >
                          {title}
                        </span>
                        {chatsCount ? (
                          <span
                            className={
                              'sm:absolute top-[2px] right-[2px] p-[4px] sm:p-[2px] bg-green-500 font-medium leading-[1] text-white rounded-full text-[12px] sm:text-[14px]'
                            }
                          >
                            {msgsCount}/{chatsCount}
                          </span>
                        ) : (
                          ''
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
        <div
          className="flex  flex-col overflow-y-auto custom-scroll bg-inherit "
          onScroll={() => {
            setContext(initContext);
          }}
          ref={rootRef}
        >
          {curLabelChat &&
            curLabelChat
              .filter(
                (chat) =>
                  !isIosMobApp || !hiddenChatIdsForIos.includes(chat._id),
              )
              .map((chat) => (
                <Chat
                  context={context}
                  setContext={setContext}
                  key={chat._id}
                  data={chat}
                />
              ))}
          <div className="h-5 w-5" ref={targetRef}></div>
        </div>
      </div>
      {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') && (
        <CreateGroupModal modal={modal} setModal={setModal} />
      )}

      <div>
        <ChatMenu context={context} setContext={setContext} />
      </div>
    </div>
  );
};

export default Chats;
