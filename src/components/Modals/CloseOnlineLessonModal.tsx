import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { editGroup } from '../../store/reducers/GroupSlice';
import {
  ITranslateItemString,
  translations,
} from '../../utils/translations.tsx';
import Button from '../UI/Button';
import MainButton from '../UI/MainButton';
import Modal from '../UI/Modal';
import SuccessModal from './SuccessModal';

interface CloseOnlineLessonModalProps {
  modal: boolean;
  setModal: (bool: boolean) => void;
  message: string;
}

const CloseOnlineLessonModal: FC<CloseOnlineLessonModalProps> = ({
  modal,
  setModal,
  message,
}) => {
  const group = useAppSelector((state) => state.GroupSlice.group);

  const [successModal, setSuccessModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const { user } = useAppSelector((state) => state.UserSlice);

  const {
    closeLessonText,
    sureCloseLessonText,
    goToHomeText,
  }: {
    closeLessonText: ITranslateItemString;
    sureCloseLessonText: ITranslateItemString;
    goToHomeText: ITranslateItemString;
  } = translations.lessons;
  const {
    yesText,
    noText,
  }: {
    yesText: ITranslateItemString;
    noText: ITranslateItemString;
  } = translations.profile;

  const Submit = () => {
    setSuccessModal(true);
  };

  const handleClick = () => {
    group._id && navigate('/group/' + group._id + '/homework/add');
    group._id &&
      setTimeout(() => {
        dispatch(
          editGroup({
            groupId: group._id,
            payload: { open: false },
          }),
        ).catch((error) => console.error(error));
      }, 0);
    setModal(false);
  };

  return (
    <>
      <Modal active={modal} setActive={setModal} className="items-center">
        <h1 className="text-2xl mb-5 font-semibold tracking-wider text-gray-800 capitalize ">
          {closeLessonText[language]}
        </h1>
        <p className="mb-5 text-center">{sureCloseLessonText[language]}</p>
        <div className="flex items-center">
          <Button className="mr-5" onClick={() => Submit()}>
            {yesText[language]}
          </Button>
          <Button onClick={() => setModal(false)}>{noText[language]}</Button>
        </div>
      </Modal>
      {successModal && (
        <SuccessModal
          modal={successModal}
          setModal={setSuccessModal}
          message={message}
        >
          <MainButton className="mt-5" onClick={() => handleClick()}>
            {goToHomeText[language]}
          </MainButton>
        </SuccessModal>
      )}
    </>
  );
};

export default CloseOnlineLessonModal;
