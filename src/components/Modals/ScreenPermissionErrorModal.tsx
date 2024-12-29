import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainButton from '../UI/MainButton';
import Modal from '../UI/Modal';

interface ScreenPermissionErrorProps {
  modal: boolean;
  setModal: (bool: boolean) => void;
  textModal: string[];
  permission: boolean;
  endLesson: () => Promise<void>;
}

const ScreenPermissionErrorModal: FC<ScreenPermissionErrorProps> = ({
  modal,
  setModal,
  textModal,
  permission,
  endLesson,
}) => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [showImage, setShowImage] = useState<boolean>(false);

  const leftButtonHandler = async () => {
    setModal(false);
    await endLesson();
    setTimeout(() => {
      groupId && navigate('/group/' + groupId);
    }, 2000);
  };

  const rightButtonHandler = async () => {
    setModal(false);
    await endLesson();
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <Modal
      active={modal}
      setActive={setModal}
      noclosable={true}
      className="items-center max-w-[750px]"
    >
      <h2 className="text-3xl dark:text-white font-medium mb-3 text-center">
        {textModal[0]}
      </h2>
      <div className="flex mt-4 gap-6">
        <MainButton
          className="text-[12px] font-light  dark:text-[#c7c7c7] text-center"
          onClick={() => void leftButtonHandler()}
        >
          {textModal[1]}
        </MainButton>
        <MainButton
          className="text-[12px] font-light dark:text-[#c7c7c7] text-center"
          onClick={() => void rightButtonHandler()}
        >
          {textModal[2]}
        </MainButton>
      </div>
      {!permission && (
        <>
          <p className="mt-4">
            Если вы несколько раз обновили страницу и у вас не появляется окно
          </p>
          <div className="flex">
            <button
              onClick={() => void setShowImage(!showImage)}
              className={
                'w-fit bg-gradient-button rounded-full px-1 sm:px-5 font-semibold shadow-lg hover:bg-gradient-appricot hover:text-black text-blue-500 text-[12px] sm:text-[14px] xl:text-[18px] leading-normal'
              }
            >
              СКРИН
            </button>
            <p className="">
              , значит у вас проблема с аудио или видео на вашем компьютере.
            </p>
          </div>
          <p className="mt-3">
            Нужно проверить микрофон, наушники, камеру, далее обновить страницу
            и пробовать.
          </p>
          <p className="mt-3">
            Если снова проблема, записать видео и звонить Грачью.
          </p>
          <p className="mt-2">
            Возможно, если ждать 3-4 минуты, то проблема решиться сама. Если
            так, то все равно нужно сообщить Грачью.
          </p>
        </>
      )}
      {!permission && showImage && (
        <img src="/permission.jpg" className="h-full" alt="permission" />
      )}
      {permission && (
        <p className="text-lg font-light dark:text-[#c7c7c7] text-center mt-4">
          Предупредите учеников, что вы снова зайдете в урок, чтобы они просто
          ждали вас или что урок закончен!
        </p>
      )}
    </Modal>
  );
};

export default ScreenPermissionErrorModal;
