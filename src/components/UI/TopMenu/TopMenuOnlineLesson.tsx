import { AxiosError } from 'axios';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { ITopMenuOnlineLesson } from '../../../models/ITopMenu';
import { GroupEndLessonSocket } from '../../../sockets/GroupSockets';
import {
  editGroup,
  endLessonReducer,
  resetMaterialLesson,
} from '../../../store/reducers/GroupSlice';
import {
  ITranslateItemString,
  ITranslateItemArray,
  translations,
} from '../../../utils/translations.tsx';
import DescriptionModal from '../../Modals/DescriptionModal';
import HistoryModal from '../../Modals/HistoryModal';
import HomeworksModal from '../../Modals/HomeworksModal';
import ProgramModal from '../../Modals/ProgramModal';
import ScreenPermissionErrorModal from '../../Modals/ScreenPermissionErrorModal';
import SuccessModal from '../../Modals/SuccessModal';
import MainButton from '../MainButton';
import MenuItem from './MenuItem';
import Recorder from './Recorder.tsx';
import Timer from '../Timer.tsx';
import IJitsiMeetExternalApi from '@jitsi/react-sdk/lib/types/IJitsiMeetExternalApi';
import Modal from '../Modal.tsx';
import Button from '../Button.tsx';

interface TopMenuOnlineLessonProps {
  menu?: ITopMenuOnlineLesson[];
  className?: string;
  api?: IJitsiMeetExternalApi | null;
  active?: string;
  setActive: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const TopMenuOnlineLesson: FC<TopMenuOnlineLessonProps> = ({
  menu,
  className,
  api,
  active,
  setActive
}) => {
  const [modal, setModal] = useState<boolean>(false);
  const [modal2, setModal2] = useState<boolean>(false);
  const [modal3, setModal3] = useState<boolean>(false);
  const [modal4, setModal4] = useState<boolean>(false);
  const [modal5, setModal5] = useState<boolean>(false);
  const [smodal, setSModal] = useState<boolean>(false);
  const [homeworkMaterialsModal, setHomoworkMaterialsModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [close, setClose] = useState<boolean>(false);
  const [record, setRecord] = useState<string>('');
  const [showRecorder, setShowRecorder] = useState<boolean>(false);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [screenRecordingAllowed, setScreenRecordingAllowed] = useState<
    boolean | null
  >(null);
  const [permissionBack, setPermissionBack] = useState<boolean>(false);
  const { groupId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { group } = useAppSelector((state) => state.GroupSlice);
  const { user } = useAppSelector((state) => state.UserSlice);

  const {
    startLessonText,
    finishLessonText,
    lessonSuccessfullyFinishedText,
    sendHomeworkText,
    firstPermission,
    permissionGetBack,
  }: {
    startLessonText: ITranslateItemString;
    finishLessonText: ITranslateItemString;
    lessonSuccessfullyFinishedText: ITranslateItemString;
    sendHomeworkText: ITranslateItemString;
    firstPermission: ITranslateItemArray;
    permissionGetBack: ITranslateItemArray;
  } = translations.lessons;

  const startLessonHandler = async () => {
    setShowRecorder(true);
    setIsTimerRunning(true);
    if (groupId) {
      await dispatch(
        editGroup({ groupId: groupId, payload: { open: true } }),
      ).then(() => {
        GroupEndLessonSocket({ room: groupId });
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
        sRecording(api);
      });
    }
  };

  const endLessonHandler = async () => {
    setIsTimerRunning(false);
    if (groupId) {
      await dispatch(
        editGroup({ groupId: groupId, payload: { open: false } }),
      ).then(async () => {
        GroupEndLessonSocket({ room: groupId });
        // if (screenRecordingAllowed === false || permissionBack === false) { //TODO: вернуть запрет
          // return;
        // }
        setMessage(lessonSuccessfullyFinishedText[language]);
        setClose(true);
        dispatch(endLessonReducer());
        dispatch(resetMaterialLesson());
        const prevmaterials = [] as string[];
        group.program.map((item) => {
          prevmaterials.push(item._id);
        });
        await dispatch(editGroup({ 
          groupId: groupId,
          payload: {
            prevprogram: prevmaterials,
            program: [] 
          }
        })).then(() => {
          navigate('/group/' + groupId + '/homework/add')
        }).catch((e: AxiosError) => {
          console.log(e);
        });
        setRecord('stopRecording');
      });
    }
  };

  const handlePermissionBack: () => void = () => {
    setPermissionBack(true);
    setSModal(true);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsReady(true);
    }, 10000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [api]);

  return (
    <>
      <div
        className={[
          `w-full flex py-2  px-3  relative justify-between z-2 h-[205px] `,
          className,
        ].join(' ')}
      >
        {menu && (
          <>
            <div className="z-[5] flex flex-col  bg-white  py-2 -translate-x-2 rounded-xl">
              {menu.map(
                (item) =>
                  !item.dropdown && (
                    <MenuItem
                      {...(item.openProgram && {
                        onClick: () => void setModal(true),
                      })}
                      {...(item.openHistory && {
                        onClick: () => void setModal5(true),
                      })}
                      className="cursor-pointer mb-2 h-[61px] max-2xl:text-base max-2xl:!py-0 max-2xl:h-[43px]"
                      key={item.id}
                      item={item}
                    />
                  ),
              )}
            </div>
            <div className="z-[5] flex flex-col bg-white p-2 rounded-xl translate-x-2">
              {menu.map(
                (item) =>
                  item.dropdown && (
                    <MenuItem
                      {...(item.openHomework && {
                        onClick: () => void setModal4(true),
                      })}
                      {...(item.openDescription && {
                        onClick: () => void setModal2(true),
                      })}
                      className="cursor-pointer mb-2 h-[61px] max-2xl:text-base max-2xl:!py-0 max-2xl:h-[43px]"
                      key={item.id}
                      item={item}
                    />
                  ),
              )}
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
              {isReady ? (
                <div className='flex flex-col items-center'>
                  <MenuItem
                    onClick={() => {
                      group?.open
                        ? void setHomoworkMaterialsModal(true)
                        : void startLessonHandler();
                    }}
                    className={`mb-2 h-[61px] max-2xl:text-base max-2xl:!py-0 max-2xl:h-[43px] ${
                      !isReady ? 'text-[#a7a7a7]' : 'cursor-pointer'
                    }`}
                    item={{
                      name: group?.open
                        ? finishLessonText[language]
                        : startLessonText[language],
                      id: 5,
                    }}
                  />
                  <Timer isRunning={isTimerRunning} />
                </div>
              ) : (
                <MenuItem
                  className="cursor-pointer mb-2 h-[61px] max-2xl:text-base max-2xl:!py-0 max-2xl:h-[43px] text-[#a7a7a7]"
                  item={{
                    name: 'Preparing lesson...',
                    id: 5,
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>
      <SuccessModal modal={modal3} setModal={setModal3} message={message}>
        {close && (
          <MainButton
            className="mt-5"
            onClick={() =>
              groupId && navigate('/group/' + groupId + '/homework/add')
            }
          >
            {sendHomeworkText[language]}
          </MainButton>
        )}
      </SuccessModal>
      <ProgramModal modal={modal} setModal={setModal} active={active} setActive={setActive} />
      <DescriptionModal modal={modal2} setModal={setModal2} />
      {modal4 && <HomeworksModal modal={modal4} setModal={setModal4} />}
      {modal5 && <HistoryModal modal={modal5} setModal={setModal5} />}
      {false && ( // TODO: вернуть модалку
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
      <Modal className='p-5 !bg-white' active={homeworkMaterialsModal} setActive={setHomoworkMaterialsModal}>
        <h3 className='text-xl text-center font-medium mb-8'>{lessonSuccessfullyFinishedText[language]}</h3>
        <Button
          onClick={() => {
            setHomoworkMaterialsModal(false);
            void endLessonHandler();
          }}
        >
          {sendHomeworkText[language]}
        </Button>
      </Modal>
    </>
  );
};

export default TopMenuOnlineLesson;
