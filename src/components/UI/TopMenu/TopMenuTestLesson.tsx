import { FC, useState } from 'react'
import { ITopMenuOnlineLesson } from '../../../models/ITopMenu';
import MenuItem from './MenuItem';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import SuccessModal from '../../Modals/SuccessModal';
import MainButton from '../MainButton';
import ProgramModal from '../../Modals/ProgramModal';
import { GroupEndLessonSocket } from '../../../sockets/GroupSockets.ts';
import copy from 'copy-to-clipboard';
import {ITranslateItemArray, ITranslateItemElement, ITranslateItemString, translations} from "../../../utils/translations.tsx";
import EndTestLessonModal from '../../Modals/EndTestLessonModal.tsx';
import { IMaterial } from '../../../models/Program/IMaterial.ts';
import IJitsiMeetExternalApi from '@jitsi/react-sdk/lib/types/IJitsiMeetExternalApi';
import Recorder from './Recorder.tsx';
import ScreenPermissionErrorModal from '../../Modals/ScreenPermissionErrorModal.tsx';
import JitsiMeeting from '@jitsi/react-sdk/lib/components/JitsiMeeting';

interface TopMenuTestLessonProps {
    menu?: ITopMenuOnlineLesson[];
    className?: string;
    program: IMaterial[];
    api?: IJitsiMeetExternalApi | null;
    setApi?: (api: IJitsiMeetExternalApi) => void;
    lessonStarted: boolean;
    setLessonStarted: (lessonStarted: boolean) => void;
}

const TopMenuTestLesson: FC<TopMenuTestLessonProps> = ({menu, className, program, api, setApi, lessonStarted, setLessonStarted}) => {
    const [modal, setModal] = useState<boolean>(false);
    const [modal3, setModal3] = useState<boolean>(false);
    const [modal5, setModal5] = useState<boolean>(false);
    const [message, ] = useState<string>('');
    const [close, ] = useState<boolean>(false);
    const {groupId} = useParams();
    const {user} = useAppSelector(state=> state.UserSlice);
    const {testUser} = useAppSelector(state=> state.UserSlice);
    const [endTestLessonModal, setEndTestLessonModal] = useState<boolean>(false);
    const navigate = useNavigate();
    const [record, setRecord] = useState<string>('');
  const [showRecorder, setShowRecorder] = useState<boolean>(false);
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const [smodal, setSModal] = useState<boolean>(false);
  const [permissionBack, setPermissionBack] = useState<boolean>(false);
  const [screenRecordingAllowed, setScreenRecordingAllowed] = useState<
    boolean | null
  >(null);

    const {
        sendHomeworkText,
        finishLessonText,
        startLessonText,
        permissionGetBack,
        firstPermission,
    }: {
        sendHomeworkText: ITranslateItemString,
        finishLessonText: ITranslateItemString,
        startLessonText: ITranslateItemString,
        permissionGetBack: ITranslateItemArray,
        firstPermission: ITranslateItemArray,
        forStartConferenceText: ITranslateItemElement
    } = translations.lessons
    const {
        copyLinkText
    }: {
        copyLinkText: ITranslateItemString
    } = translations.testLesson

    const startLessonHandler = () => {
        setLessonStarted(true);
        setShowRecorder(true);
        function sRecording(api: any) {
        let recordingAttempts = 0;
            if (api) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                api.executeCommand('setTileView', true);
                setRecord('startRecording');
            } else if (recordingAttempts < 10) {
                recordingAttempts++;
                setTimeout(() => {
                    sRecording(api);
                }, 1000);
            } else {
                console.error('Failed to start recording after', 10, 'attempts');
            }
        }
        if (groupId) {
            sRecording(api);
            GroupEndLessonSocket({ room: groupId });
        }
      };

    const endLessonHandler = async (): Promise<void> => {
        setLessonStarted(false);
        if (groupId) {
          try {
            GroupEndLessonSocket({ room: groupId });
            setEndTestLessonModal(true);
            setRecord('stopRecording');
          } catch (error) {
            console.log(error);
          }
        }
      };
      const isStudent = user.role === 'STUDENT' || !!testUser._id;

      const handlePermissionBack: () => void = () => {
        setPermissionBack(true);
        setSModal(true);
      };
      const handleApiReady = (externalApi: IJitsiMeetExternalApi) => {
        if (externalApi && isStudent) {
          setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            externalApi.executeCommand('setTileView', true);
          }, 15000);
        }
    
        if (setApi && user.role !== 'STUDENT' && !testUser._id) {
          setApi(externalApi);
        }
      };
    
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
          default: true,
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
        displayName: user.name || testUser.name,
        email: user.email || '',
      };
      
    return (
        <>
            <div className={['w-full flex flex-col sm:flex-row px-5 py-1 xl:py-5 gap-2 relative justify-between', className].join(' ')}>
                {menu &&
                    <>
                        {!testUser._id && <div className="flex flex-col bg-white p-2 max-2xl:p-0 rounded-xl">
                            {menu.map(item=>
                                !item.dropdown &&
                                <MenuItem {...(item.openProgram && { onClick: ()=> void setModal(true) })}  {...(item.openHistory && { onClick: ()=> void setModal5(true) })} className='cursor-pointer mb-2 h-[61px] max-2xl:text-base max-2xl:!py-0 max-2xl:h-[43px]' key={item.id} item={item}/>
                            )}
                        </div>}
                        {groupId && (testUser._id || user._id) && (
                            <JitsiMeeting
                            domain={'videojitsi.araratchess.com'}
                            roomName={groupId}
                            configOverwrite={configOverwrite}
                            interfaceConfigOverwrite={interfaceConfigOverwrite}
                            userInfo={userInfo}
                            onApiReady={(externalApi: IJitsiMeetExternalApi) => {
                                if (externalApi) {
                                handleApiReady(externalApi);
                                }
                            }}
                            getIFrameRef={(iframeRef) => {
                                iframeRef.style.height = '220px';
                                iframeRef.style.width = '100%';
                            }}
                            />
                        )}
                        {!testUser._id && <div className="flex flex-col bg-whitep-2  rounded-xl">
                            <MenuItem 
                                onClick={() => copy(`https://puzzle.araratchess.com/testlesson/${groupId}`)}
                                className='cursor-pointer mb-2 h-[61px] max-2xl:text-base max-2xl:!py-0 max-2xl:h-[43px]' 
                                item={{name: copyLinkText[language], id: 5}}
                            />
                            {showRecorder &&
                            (user?.role === 'DIRECTOR' ||
                            user?.role === 'ZDIRECTOR' ||
                            user?.role === 'TRANER') && (
                            <Recorder
                                record={record}
                                groupId={groupId}
                                setScreenRecordingAllowed={setScreenRecordingAllowed}
                                setSModal={setSModal}
                                permission={handlePermissionBack}
                                recordingsAllowed={screenRecordingAllowed}
                                api={api as IJitsiMeetExternalApi}
                            />
                            )}
                            {!testUser._id && <MenuItem 
                                onClick={!lessonStarted ? startLessonHandler : endLessonHandler}
                                className='cursor-pointer mb-2 h-[61px] max-2xl:text-base max-2xl:!py-0 max-2xl:h-[43px]'
                                item={{name: lessonStarted ? finishLessonText[language] : startLessonText[language], id: 5}}
                            />}
                        </div>}
                    </>
                }     
            </div>
            <SuccessModal modal={modal3} setModal={setModal3} message={message}>
                {close &&
                    <MainButton className='mt-5' onClick={()=> groupId && navigate('/group/'+groupId+'/homework/add')}>{sendHomeworkText[language]}</MainButton>
                }
            </SuccessModal>
            <ProgramModal modal={modal} setModal={setModal} testlesson={true}/>
            <EndTestLessonModal active={endTestLessonModal} setActive={setEndTestLessonModal} program={program}/>
            {false && (
                <ScreenPermissionErrorModal
                    modal={smodal}
                    setModal={setSModal}
                    textModal={
                        permissionBack
                        ? permissionGetBack[language]
                        : firstPermission[language]
                    }
                    permission={permissionBack}
                    endLesson={endLessonHandler}
                />
            )}
        </>
        
    )
}

export default TopMenuTestLesson;