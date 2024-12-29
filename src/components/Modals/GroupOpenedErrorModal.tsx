import { FC, useState } from 'react';
import Modal from '../UI/Modal';
import { BiErrorCircle } from '@react-icons/all-files/bi/BiErrorCircle';
import { translations } from '../../utils/translations.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import Button from '../UI/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { UserRoles } from '../../utils/userRoles.ts';
import CloseOnlineLessonModal from './CloseOnlineLessonModal.tsx';
import { GroupEndLessonSocket } from '../../sockets/GroupSockets.ts';
import { endLessonReducer } from '../../store/reducers/GroupSlice.ts';
import GroupService from '../../services/GroupService.ts';

interface GroupOpenedErrorModalProps {
  modal: boolean;
  setModal: (bool: boolean) => void;
  error: string;
}

const { forOpenCloseLessonText, goTօOnlineLessonText } = translations.groups;
const { finishLessonText, lessonSuccessfullyFinishedText } =
  translations.lessons;

const GroupOpenedErrorModal: FC<GroupOpenedErrorModalProps> = ({
  modal,
  setModal,
}) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const group = useAppSelector((state) => state.GroupSlice.group);
  const user = useAppSelector((state) => state.UserSlice.user);

  const [modal3, setModal3] = useState<boolean>(false);

  const isStudent = user.role === UserRoles.STUDENT;

  const onGoLesson = () => {
    if (group._id) {
      const path = isStudent
        ? `/lesson/${group._id}/`
        : `/group/${group._id}/online-lesson`;
      navigate(path);
    }
    setModal(false);
  };

  const endLessonHandler = async (): Promise<void> => {
    if (group._id) {
      try {
        GroupEndLessonSocket({ room: group._id });
        setModal3(true);
        dispatch(endLessonReducer());

        const prevmaterials = group.program.map((item) => item._id);

        await GroupService.editGroup(group._id, {
          program: [],
          prevprogram: prevmaterials,
          userIdInLesson: user._id,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Modal active={modal} setActive={setModal} className="items-center">
        <BiErrorCircle className="text-red-500 text-8xl mb-3" />
        <h2 className="text-4xl dark:text-white font-medium mb-3">Error!</h2>
        <p className="text-lg dark:text-[#c7c7c7] text-center">
          {forOpenCloseLessonText[language]}
        </p>
        <div className={'flex gap-2 mt-2'}>
          <Button onClick={onGoLesson}>{goTօOnlineLessonText[language]}</Button>
          {isStudent && (
            <Button onClick={endLessonHandler}>
              {finishLessonText[language]}
            </Button>
          )}
        </div>
      </Modal>
      <CloseOnlineLessonModal
        modal={modal3}
        setModal={setModal3}
        message={lessonSuccessfullyFinishedText[language]}
      />
    </>
  );
};

export default GroupOpenedErrorModal;
