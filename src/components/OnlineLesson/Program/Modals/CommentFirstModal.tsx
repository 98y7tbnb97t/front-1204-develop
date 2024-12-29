import { FC, useEffect, useState } from 'react';
import Modal from '../../../UI/Modal.tsx';
import MainButton from '../../../UI/MainButton.tsx';
import { useParams } from 'react-router-dom';
import CommentsService from '../../../../services/CommentsService.ts';
import { useAppSelector } from '../../../../hooks/redux.ts';
import CommentModal from './CommentModal.tsx';
import { IComment } from '../../../../models/response/IComment.ts';
import Attachments from '../../../Messenger/Chat/Attachments/Attachments.tsx';

interface IMainModalInterface {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  groupId: string;
  type: string;
}

const CommentFirstModal: FC<IMainModalInterface> = ({
  openModal,
  setOpenModal,
  groupId,
  type,
}) => {
  const [openSecondCommentModal, setOpenSecondCommentModal] =
    useState<boolean>(false);
  const openModalComment = (): void => setOpenSecondCommentModal(true);
  const { user } = useAppSelector((state) => state.UserSlice);

  const [comments, setComments] = useState<IComment[]>([]);

  const formatDate = (dateString: Date) => {
    const options: object = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await CommentsService.getCommentByGroup(groupId);
        setComments(response.data);
      } catch (error) {
        console.error('Не удалось получить комментарии:', error);
      }
    };

    if (openModal) {
      // Запрашиваем комментарии только при открытии модального окна
      void fetchComments();
    }
  }, [openModal, groupId]); // Добавлен groupId в зависимости, чтобы запросить комментарии только для определенного groupId

  const handleCommentSubmit = (commentData: IComment) => {
    // Обновляем список комментариев, добавляя новый комментарий
    setComments([commentData, ...comments]);
  };

  return (
    <>
      <Modal
        active={openModal}
        setActive={setOpenModal}
        className="max-w-[920px] pt-[35px]"
        backdropClassName='z-[10000]'
      >
        <MainButton onClick={openModalComment}>
          Комментировать{' '}
          {type === 'CHAPTER' ? <>эту главу сейчас</> : <>всю студию сейчас</>}
        </MainButton>
        <button
          className=" mt-4 bg-gradient-top-menu-item text-[#353535] flex items-center justify-center text-md text-[12px] sm:text-xl md:text-base py-2 lg:py-2 px-1 md:px-3  rounded-full font-bold xl:whitespace-pre-wrap text-center cursor-pointer mb-2 h-[61px] max-2xl:text-base max-2xl:!py-0 max-2xl:h-[43px]"
          onClick={() => setOpenModal(false)}
        >
          Комментировать{' '}
          {type === 'CHAPTER' ? <>эту главу позже</> : <>всю студию позже</>}
        </button>
        <div className="border-t border-gray-300 my-10 pt-6 overflow-y-auto max-h-[400px]">
          <h1 className="text-2xl mb-6">Комментарии</h1>
          {comments
            .filter((comment) =>
              comment && (comment.status === 'APPROVED' || comment.status === 'PAID')
            )
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((comment: IComment, index: number) => (
              <div
                key={comment._id}
                className={`mb-4 p-4 rounded-lg shadow-md ${
                  index % 2 === 0 ? 'bg-blue-50' : 'bg-gray-100'
                }`}
              >
                <p className="text-base mb-2">{comment.msg}</p>
                {comment.attachments.length > 0 && (
                  <Attachments attachments={comment.attachments} />
                )}
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">
                    Автор: {comment.from.name}
                  </p>
                  <p>{formatDate(comment.createdAt)}</p>
                </div>
              </div>
            ))}
        </div>
      </Modal>
      <CommentModal
        openSecondCommentModal={openSecondCommentModal}
        setOpenSecondCommentModal={setOpenSecondCommentModal}
        senderId={user._id}
        onCommentSubmit={handleCommentSubmit} // Передаем функцию обратного вызова
        type={type}
        groupId={groupId}
      />
    </>
  );
};

export default CommentFirstModal;
