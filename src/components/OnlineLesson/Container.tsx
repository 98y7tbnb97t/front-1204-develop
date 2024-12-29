import { JitsiMeeting } from '@jitsi/react-sdk';
import { Chess } from 'chess.js';
import { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Chat from '../../components/OnlineLesson/Chat/Chat';
import ChessBoard from '../../components/OnlineLesson/ChessBoard/ChessBoard';
import Game from '../../components/OnlineLesson/Game/Game';
import Program from '../../components/OnlineLesson/Program/Program';
import Theory from '../../components/OnlineLesson/Theory/Theory';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IMove } from '../../models/MyGroups/IMove';
import { IMaterial } from '../../models/Program/IMaterial';
import GroupService from '../../services/GroupService';
import {
  GroupChangeMaterialSocket,
  GroupEntryModeSocket,
  GroupFullCleanSocket,
  GroupGlobalModeSocket,
  GroupTeamsGameMoveSocket,
  GroupTeamsGameSocket,
  GroupUpdateSocket,
} from '../../sockets/GroupSockets';
import { socket } from '../../sockets/socket';
import {
  editGroup,
  getGroup,
  initOnlineLesson,
  setMovesState,
  updatePassedMaterials,
} from '../../store/reducers/GroupSlice';
import EditChessBoardModal from '../Modals/EditChessBoardModal';

import {
  ITranslateItemElement,
  ITranslateItemString,
  translations,
} from '../../utils/translations.tsx';
import './Container.css';
import { ITeam, ITeamsGame } from '../../models/ITeam.ts';
import { useDebounce } from '../../hooks/useDebounce.ts';
import { UserRoles } from '../../utils/userRoles.ts';
import IJitsiMeetExternalApi from '@jitsi/react-sdk/lib/types/IJitsiMeetExternalApi';
import { IUpdatePassedMaterials } from '../../models/response/IGroup.ts';

const Container: FC<{
  lesson: boolean;
  setApi?: (api: IJitsiMeetExternalApi) => void;
  setActive?: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = ({ lesson, setApi, setActive }) => {
  const dispatch = useAppDispatch();
  const [rightPanelMode, setRightPanelMode] = useState<string>('none');
  const { groupId } = useParams();
  const [game, setGame] = useState(new Chess());
  const [editor, setEditor] = useState<boolean>(false);
  const [moveMode, setmoveMode] = useState<boolean>(false);
  const [globalMode, setGlobalMode] = useState<boolean>(false);
  const [program, setProgram] = useState<IMaterial[]>([]);
  const [material, setMaterial] = useState<IMaterial>();
  const { user } = useAppSelector((state) => state.UserSlice);
  const { group } = useAppSelector((state) => state.GroupSlice);
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const [moves, setMoves] = useState<IMove[]>([]);
  const [clear, setClear] = useState<boolean>(false);
  const [commentCount, setCommentCount] = useState(0);
  const [teamsGame, setTeamsGame] = useState<ITeamsGame | null>(null);

  const startTeamGameHandler = (teams: ITeam[]) => {
    if (groupId) {
      setGlobalMode(false);
      const teamsGame = {
        teams,
        movesCount: 0
      };
      setTeamsGame(teamsGame);
      GroupTeamsGameSocket({ room: groupId, game: teamsGame});
      if (!moveMode) {
        void moveModeHandler();
      }
    }
  }

  const endTeamGameHandler = () => {
    setGlobalMode(true);
    setTeamsGame(null);
    if (groupId) {
      GroupTeamsGameSocket({ room: groupId, game: null});
    }
  }

  useEffect(() => {
    if (teamsGame && groupId) {
      const curMove = teamsGame.movesCount % teamsGame.teams.length;
      const curTeam = teamsGame.teams[curMove];
      if (curTeam.id === user._id) {
        setGlobalMode(true);
      } else {
        setGlobalMode(false);
      }
    } else if (teamsGame) {
      if (user.role !== UserRoles.TRANER) {
        setGlobalMode(false);
      }
    }
  }, [groupId, teamsGame, user._id, game, user.role])

  const onMoveHandler = useDebounce(() => {
    if (teamsGame && groupId) {
      const curMove = teamsGame.movesCount % teamsGame.teams.length;
      const curTeam = teamsGame.teams[curMove];
      if (curTeam.id === user._id) {
        const move = ++teamsGame.movesCount;
        setTeamsGame({ ...teamsGame, movesCount: move })
        GroupTeamsGameMoveSocket({ room: groupId, move })
        setGlobalMode(false);
      }
    }
  }, 100);

  const configOverwrite = {
    apiLogLevels: ['warn'],
    prejoinPageEnabled: false,
    disableThirdPartyRequests: true,
    // disableLocalVideoFlip: true,
    // doNotFlipLocalVideo: true,
    backgroundAlpha: 0.5,
    localRecording: {
      disable: false,
    },
    disableModeratorIndicator: true,
    disableTileView: false,
    disableTileEnlargement: false,
    startScreenSharing: true,
    enableEmailInStats: false,
    enableLobbyChat: false,
    hideAddRoomButton: true,
    // startWithAudioMuted: group.open ? false : true,
    startWithAudioMuted: false,
    startWithVideoMuted: false,
    // -1 for unlimited
    maxFullResolutionParticipants: 4,
    toolbarButtons: [
      'camera',
      'closedcaptions',
      'desktop',
      'download',
      'embedmeeting',
      'etherpad',
      'feedback',
      'filmstrip',
      'fullscreen',
      'help',
      'linktosalesforce',
      'livestreaming',
      'microphone',
      'noisesuppression',
      'participants-pane',
      'security',
      'select-background',
      'settings',
      'shareaudio',
      'sharedvideo',
      'shortcuts',
      'stats',
      'tileview',
      'toggle-camera',
      'videoquality',
    ],

    tileView: {
      // default: false,
      //     // Whether tileview should be disabled.
      disabled: false,
      //     // The optimal number of tiles that are going to be shown in tile view. Depending on the screen size it may
      //     // not be possible to show the exact number of participants specified here.
      numberOfVisibleTiles: 25,
    },
  };

  const interfaceConfigOverwrite = {
    GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
    DEFAULT_WELCOME_PAGE_LOGO_URL: false,
    SHOW_JITSI_WATERMARK: false,
    VIDEO_LAYOUT_FIT: 'nocrop',
    MOBILE_APP_PROMO: false,
    TILE_VIEW_MAX_COLUMNS: 4,
    VERTICAL_FILMSTRIP: false,
    FILM_STRIP_MAX_HEIGHT: 120,
    filmstrip: {
      // Disable the vertical/horizonal filmstrip.
      disabled: true,
      // Disables user resizable filmstrip. Also, allows configuration of the filmstrip
      // (width, tiles aspect ratios) through the interfaceConfig options.
      disableResizable: true,

      // Disables the stage filmstrip
      // (displaying multiple participants on stage besides the vertical filmstrip)
      disableStageFilmstrip: false,

      // Default number of participants that can be displayed on stage.
      // The user can change this in settings. Number must be between 1 and 6.
      stageFilmstripParticipants: 4,

      // Disables the top panel (only shown when a user is sharing their screen).
      //     disableTopPanel: false,
    },
  };
  const userInfo = {
    displayName: user.name,
    email: user.email,
  };

  const endLesson = async () => {
    if (
      groupId &&
      (user.role === 'DIRECTOR' ||
        user.role === 'ZDIRECTOR' ||
        user.role === 'TRANER')
    ) {
      await GroupService.editGroup(groupId, { open: false });
    }
  };

  useEffect(() => {
    const handleTabClose = (event) => {
      endLesson().catch((e) => console.log('Error end lesson', e));
      alert('beforeunload event triggered');

      return (event.returnValue = 'Are you sure you want to exit?');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  useEffect(() => {
    if (user.role !== 'STUDENT') {
      setGlobalMode(true);
    }
    const fetchData = async () => {
      if (groupId) {
        await dispatch(getGroup(groupId));
      }
    };
    void fetchData();
  }, [groupId]);

  useEffect(() => {
    if (group && typeof group?.moveMode === 'boolean') {
      setmoveMode(group?.moveMode);
    }
  }, [group]);

  useEffect(() => {
    if (group?.program && group.current) {
      setProgram(group.program);
      const cond = group.program.findIndex((e) => e._id === group.current);
      if (cond !== -1) {
        setMaterial(group.program[cond]);
      } else {
        setMaterial(group.program[0]);
      }
    }
  }, []);

  useEffect(() => {
    if (group?.program) {
      setProgram(group.program);
    }
  }, [group.program]);

  useEffect(() => {
    socket.on('group:recive_change_material', (data: IMaterial) => {
      setMaterial(data);
    });
    
    socket.on('group:recive_entry_mode', (data: boolean) => {
      setmoveMode(data);
    });
    socket.on('group:recive_update', async (data: string) => {
      await dispatch(getGroup(data));
    });
    socket.on(
      'group:recive_global_mode',
      (data: { user_id: string; bool: boolean }) => {
        if (user._id === data.user_id) {
          setGlobalMode(data.bool);
        }
      },
    );
    socket.on('group:recive_end_lesson', async () => {
      if (groupId) {
        await dispatch(getGroup(groupId));
      }
    });
    socket.on('group:recive_teams_game', (game: ITeamsGame) => {
      setTeamsGame(game);
    })
    socket.on('group:recive_teams_game_move', (move: number) => {
      setTeamsGame(prev => prev ? {...prev, movesCount: move} : prev);
    })
   
  }, []);

  useEffect(() => {
    const reciveMoveHandler = (data: {
      user_id: string;
      color: string;
      move: string;
      role: UserRoles
    }) => {
      dispatch(setMovesState(data));
      if (data.role === UserRoles.STUDENT && material && groupId) {
        const payload: IUpdatePassedMaterials = {
          groupId,
          payload: {
            themeId: (material.theme_id as unknown as string),
            materialId: material._id,
            type: 'add',
            addToHistory: true,
            section: 'program',
          }
        }
        void dispatch(updatePassedMaterials(payload)).unwrap();
      }
    };
    socket.on('group:recive_make_move', reciveMoveHandler);
    return () => {
      socket.off('group:recive_make_move', reciveMoveHandler);
    };
  }, [material, groupId, dispatch]);

  const moveModeHandler = async () => {
    setmoveMode(!moveMode);
    groupId && GroupEntryModeSocket({ room: groupId, bool: !moveMode });
    groupId &&
      (await GroupService.editGroup(groupId, {
        moveMode: !moveMode,
      }));
  };

  const PrevBackTheme = (bool: boolean) => {
    const index = program.findIndex((item) => item._id === material?._id);
    if (groupId) {
      if (bool) {
        if (program[index + 1]) {
          setMaterial(program[index + 1]);
          GroupChangeMaterialSocket({
            room: groupId,
            material: program[index + 1],
          });
        }
      } else {
        if (program[index - 1]) {
          setMaterial(program[index - 1]);
          GroupChangeMaterialSocket({
            room: groupId,
            material: program[index - 1],
          });
        }
      }
    }
  };

  const clearProgramHandler = async () => {
    if (groupId) {
      await GroupService.editGroup(groupId, { program: [] });
      await dispatch(getGroup(groupId));
      GroupUpdateSocket({ room: groupId });
    }
  };

  const {
    forStartConferenceText,
    clearChaptersText,
    boardEditorText,
    turnOnMoveModeText,
    turnOffMoveModeText,
    clearStudentOptionsText,
  }: {
    forStartConferenceText: ITranslateItemElement;
    clearChaptersText: ITranslateItemString;
    boardEditorText: ITranslateItemString;
    turnOnMoveModeText: ITranslateItemString;
    turnOffMoveModeText: ITranslateItemString;
    clearStudentOptionsText: ITranslateItemString;
  } = translations.lessons;

  const isStudent = user.role === 'STUDENT';

  const handleApiReady = (externalApi: IJitsiMeetExternalApi) => {
    if (externalApi && isStudent) {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        externalApi.executeCommand('setTileView', true);
      }, 15000);
    }

    if (setApi && user.role !== 'STUDENT') {
      setApi(externalApi);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(initOnlineLesson());
    };
  }, []);

  useEffect(() => {
    const seUserOnlineInLesson = async () => {
      if (groupId && group.open) {
        await dispatch(
          editGroup({
            groupId: groupId,
            payload: { userIdInLesson: user._id },
          }),
        );
      }
    };
    void seUserOnlineInLesson();
  }, [groupId, group?.open, user?._id, dispatch]);

  useEffect(() => {
    if (material && setActive) {
      setActive(material.theme_id);
    }
  }, [material, setActive]);

  return (
    <div
      className={[
        isStudent ? '-mt-8 h-full' : 'h-full',
        'border-2 border-white',
      ].join(' ')}
    >
      <div
        className={`${
          isStudent
            ? 'desk--mob-block'
            : 'absolute left-[50%] top-0 translate-x-[-50%] w-full'
        }  flex justify-center mb-2 max-2xl:m-0 rounded-full z-0`}
      >
        <div
          className={[
            ` ${
              isStudent
                ? 'meeting-container w-full'
                : 'w-[calc(100%-20px-220px)] md:w-[calc(100%-20px-330px)] lg:w-[calc(100%-20px-390px)] -translate-x-12'
            } h-[205px] mx-auto`,
          ].join(' ')}
        >
          {!group.open && (
            <div
              className={[
                'z-20 flex justify-center items-center w-full ',
                lesson ? 'w-full right-0' : 'w-[calc(100%-100px)] ',
              ].join(' ')}
            >
              <p className="text-red-500 font-medium text-4xl text-center justify">
                {forStartConferenceText[language]}
              </p>
            </div>
          )}
          <div
            className={[
              'bg-black -z-50 max-2xl:scale-y-75 max-2xl:-top-8 -top-4',
              lesson ? 'w-full right-0' : 'w-[calc(100%)]',
              !group?.open && 'hidden',
            ].join(' ')}
          >
            {groupId && (
              <JitsiMeeting
                domain={'videojitsi.araratchess.com'}
                roomName={groupId}
                configOverwrite={configOverwrite}
                interfaceConfigOverwrite={interfaceConfigOverwrite}
                userInfo={userInfo}
                onApiReady={(externalApi: IJitsiMeetExternalApi) => {
                  if (externalApi) {
                    handleApiReady(externalApi);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                    externalApi.addListener('readyToClose', () => {
                      void endLesson();
                    });
                  }
                }}
                getIFrameRef={(iframeRef) => {
                  iframeRef.style.height = '200px';
                  iframeRef.style.width = isStudent ? '100%' : '105%';
                  iframeRef.style.transform = 'translateX(-20px)';
                  iframeRef.style.zIndex = '-50';
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={`${
          isStudent
            ? 'lesson-container -mt-[20px] 2xl:mt-0 h-[calc(100vh-165px)] 2xl:h-[calc(100vh-165px)]'
            : '-mt-[10px] 2xl:mt-0 h-[calc(100vh-200px)] 2xl:h-[calc(100vh-230px)]'
        } flex grow items-stretch overflow-x-auto gap-[10px]  justify-between xl:mx-5 Pt-3 `}
      >
        <div
          className={`${
            isStudent ? 'desk-block' : ''
          } h-full flex flex-col gap-1 justify-between  w-[70%] `}
        >
          <div className={'flex-1 overflow-auto'}>
            <Program
              active={material?._id}
              setMaterial={setMaterial}
              program={program}
              commentCount={commentCount}
              setCommentCount={setCommentCount}
            />
          </div>
          {(user.role === 'DIRECTOR' ||
            user.role === 'ZDIRECTOR' ||
            user.role === 'TRANER') && (
            <div className="w-full flex justify-between">
              <button
                className="basis-[50%] mr-3 w-full bg-gradient-button rounded-full my-1.5 2xl:my-4  text-lg font-semibold py-2 max-2xl:text-sm"
                onClick={() => void clearProgramHandler()}
              >
                {clearChaptersText[language]}
              </button>
              <button
                className="basis-[50%] w-full bg-gradient-button rounded-full my-1.5 2xl:my-4  text-lg font-semibold py-2 max-2xl:text-sm"
                onClick={() => void setEditor(true)}
              >
                {boardEditorText[language]}
              </button>
            </div>
          )}
          <div
            className={`${isStudent ? 'desk-block' : ''} flex-1 overflow-auto`}
          >
            <Chat />
          </div>
        </div>
        <div
          className={`w-full lg:w-fit mx-0 flex flex-col items-center text-center h-full  `}
        >
          {material?.data.tags.FEN ? (
            <ChessBoard
              game={game}
              setGame={setGame}
              custom={material?.custom}
              type={material?.type}
              moveMode={moveMode}
              globalMode={globalMode}
              clear={clear}
              setClear={setClear}
              movesM={moves}
              setMoves={setMoves}
              PrevBackTheme={PrevBackTheme}
              materialId={material?._id}
              position={material?.data.tags.FEN}
              onMove={onMoveHandler}
            />
          ) : (
            <ChessBoard
              game={game}
              setGame={setGame}
              custom={material?.custom}
              type={material?.type}
              moveMode={moveMode}
              globalMode={globalMode}
              clear={clear}
              setClear={setClear}
              movesM={moves}
              setMoves={setMoves}
              PrevBackTheme={PrevBackTheme}
              materialId={material?._id}
              position={
                'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
              }
              onMove={onMoveHandler}
            />
          )}
        </div>
        <div className="flex flex-col h-full w-full justify-between">
          {material && user.role !== 'STUDENT' && (
            <Theory
              position={
                material?.data.tags.FEN
                  ? material?.data.tags.FEN
                  : 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
              }
              game={game}
              setGame={setGame}
              rightPanelMode={rightPanelMode}
              setRightPanelMode={setRightPanelMode}
              theory={material}
              commentCount={commentCount}
            />
          )}
          {(user.role === 'DIRECTOR' ||
            user.role === 'ZDIRECTOR' ||
            user.role === 'TRANER') && (
            <div className="w-full flex justify-between">
              <button
                className="2xl:basis-[45%] mr-3 bg-gradient-button rounded-full my-1 text-lg font-semibold py-2 max-2xl:text-sm"
                onClick={() => moveModeHandler()}
              >
                {moveMode
                  ? turnOffMoveModeText[language]
                  : turnOnMoveModeText[language]}
              </button>
              <button
                className="2xl:basis-[55%] w-full bg-gradient-button rounded-full my-1 text-lg font-semibold py-2 max-2xl:text-sm"
                onClick={() => {
                  setClear(true),
                    groupId && GroupFullCleanSocket({ room: groupId });
                }}
              >
                {clearStudentOptionsText[language]}
              </button>
            </div>
          )}
          <div
            className={`${
              rightPanelMode === 'game' || rightPanelMode === 'none'
                ? 'flex-1'
                : ''
            } flex flex-col h-full overflow-auto transition-all`}
          >
            <Game
              materialId={material?._id || ''}
              cgame={game}
              setGame={setGame}
              position={material?.data.tags.FEN || new Chess().fen()}
              moveMode={moveMode}
              rightPanelMode={rightPanelMode}
              setRightPanelMode={setRightPanelMode}
              moves={moves}
              startTeamGameHandler={startTeamGameHandler}
              teamsGame={teamsGame}
              endTeamGameHandler={endTeamGameHandler}
            />
          </div>
        </div>
      </div>
      {editor && (
        <EditChessBoardModal
          cgame={game}
          setCGame={setGame}
          setModal={setEditor}
          modal={editor}
        />
      )}
    </div>
  );
};

export default Container;
