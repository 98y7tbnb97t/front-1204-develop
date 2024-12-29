import React, { FC, useState, useEffect } from 'react';
import CommentsService from '../../services/CommentsService';
import { useAppSelector } from '../../hooks/redux';
import { IComment } from '../../models/response/IComment';
import Attachments from '../../components/Messenger/Chat/Attachments/Attachments';

const Comments: FC = () => {
  const { user } = useAppSelector((state) => state.UserSlice);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [bonusAmount, setBonusAmount] = useState<number>(); // Состояние для количества бонусов
  const [filterStatus, setFilterStatus] = useState<string | null>(null); // Состояние для фильтрации комментариев по статусу
  const [searchText, setSearchText] = useState<string>(''); // Состояние для текста поиска

  const bonuses = [100, 200, 300, 400, 500];

  useEffect(() => {
    CommentsService.getComments()
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Не удалось получить комментарии:', error);
      });
  }, [user._id]);

  const formatDate = (dateString: Date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  const startEditing = (
    commentId: React.SetStateAction<null>,
    initialText: React.SetStateAction<string>,
  ) => {
    setEditingCommentId(commentId);
    setEditedText(initialText);
  };
  const changeCommentStatus = async (
    commentId: string,
    status: string,
  ): Promise<void> => {
    try {
      await CommentsService.changeStatusComment(commentId, status);
      const updatedComments = comments.map((comment) =>
        comment._id === commentId ? { ...comment, status } : comment,
      );
      setComments(updatedComments);
    } catch (error) {
      console.error('Ошибка при изменении статуса комментария:', error);
      throw error;
    }
  };
  const saveEditedComment = async (commentId: string) => {
    try {
      await CommentsService.editComment(commentId, editedText);
      const updatedComments = comments.map((comment) =>
        comment._id === commentId ? { ...comment, msg: editedText } : comment,
      );
      setComments(updatedComments);
      setEditingCommentId(null);
    } catch (error) {
      console.error(
        'Не удалось сохранить отредактированный комментарий:',
        error,
      );
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await CommentsService.deleteComments(commentId);
      const updatedComments = comments.filter(
        (comment) => comment._id !== commentId,
      );
      setComments(updatedComments);
    } catch (error) {
      console.error('Не удалось удалить комментарий:', error);
    }
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditedText('');
  };

  const handleAddBonus = async (
    userId: string,
    commentId: string,
    amount: number,
  ) => {
    try {
      const response = await CommentsService.addBonusToUser(
        userId,
        commentId,
        amount,
      );
      const { user, comment } = response.data;

      // Обновляем комментарий в списке комментариев
      setComments((prevComments) => {
        return prevComments.map((prevComment) => {
          if (prevComment._id === comment._id) {
            return { ...prevComment, status: comment.status };
          }
          return prevComment;
        });
      });

      // Возможно, вам также нужно обновить состояние для отображения сообщения об успешном начислении бонусов
    } catch (error) {
      console.error('Не удалось начислить бонусы:', error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  const filterComments = (status: string | null) => {
    setFilterStatus(status);
  };

  return (
    <div className="w-full h-full bg-gray-100 p-4">
      <div id="buttons" className="flex text-2xl font-semibold gap-3">
        <input
          type="text"
          placeholder="Поиск по имени и фамилии"
          value={searchText}
          onChange={handleSearch}
          className="border border-gray-300 rounded-md p-1 w-1/4 mr-2"
        />
        <button
          className={`px-4 py-2 rounded-lg ${
            filterStatus === 'ONVERIFICATION'
              ? 'bg-gray-200 text-gray-700'
              : 'bg-white text-gray-500'
          }`}
          onClick={() => filterComments('ONVERIFICATION')}
        >
          Новые
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            filterStatus === 'APPROVED'
              ? 'bg-gray-200 text-gray-700'
              : 'bg-white text-gray-500'
          }`}
          onClick={() => filterComments('APPROVED')}
        >
          Одобрено
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            filterStatus === 'UNAPPROVED'
              ? 'bg-gray-200 text-gray-700'
              : 'bg-white text-gray-500'
          }`}
          onClick={() => filterComments('UNAPPROVED')}
        >
          Не одобрено
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            filterStatus === 'DENIED'
              ? 'bg-gray-200 text-gray-700'
              : 'bg-white text-gray-500'
          }`}
          onClick={() => filterComments('DENIED')}
        >
          Отказано
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            filterStatus === 'PAID'
              ? 'bg-gray-200 text-gray-700'
              : 'bg-white text-gray-500'
          }`}
          onClick={() => filterComments('PAID')}
        >
          Оплачено
        </button>
      </div>

      {comments.length > 0 &&
        comments
          .filter((comment) => {
            const fullName = `${comment.from.name} ${comment.from.sname}`;
            return (
              (!filterStatus || comment.status === filterStatus) &&
              fullName.toLowerCase().includes(searchText.toLowerCase())
            );
          })
          .map((comment: IComment) => (
            <div
              key={comment._id}
              className="bg-white rounded-lg shadow-md p-4 mb-4"
            >
              {editingCommentId === comment._id ? (
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="border border-gray-300 rounded-md p-1 w-full mr-2"
                  />
                  <div className="flex">
                    <button
                      onClick={() => saveEditedComment(comment._id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
                    >
                      Сохранить
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Отменить
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-lg font-semibold">{comment.msg}</p>
                  {comment.attachments.length > 0 && (
                    <Attachments attachments={comment.attachments} />
                  )}
                  <p>
                    Автор: {comment.from.name} {comment.from.sname}
                  </p>
                  <p>Бонусы: {comment.from.countOfBonus}</p>
                  <div className="flex justify-between mb-4">
                    {comment.status === 'APPROVED' && (
                      <div>
                        <input
                          value={bonusAmount}
                          onChange={(e) =>
                            setBonusAmount(Number(e.target.value))
                          }
                          className="border border-gray-300 rounded-md p-1 w-1/4 mr-2"
                        />
                        <button
                          onClick={() =>
                            handleAddBonus(comment.from._id, comment._id, bonusAmount)
                          }
                          className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                          Начислить бонусы
                        </button>
                        <div className="flex">
                          {bonuses.map((bonus, index) => (
                            <button
                              key={index}
                              className="mr-2 mb-2 bg-gray-100 hover:bg-gray-300 rounded-full  font-bold p-2  focus:outline-none focus:shadow-outline"
                              onClick={() =>
                                handleAddBonus(
                                  comment.from._id,
                                  comment._id,
                                  bonus,
                                )
                              }
                            >
                              {bonus}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {comment.approved ? (
                      <div>Статус: одобрено</div>
                    ) : (
                      <div className="flex items-center ">
                        <div className="flex items-center">
                          <p className="mr-3 font-semibold">Изменить статус:</p>
                          <button
                            className="border rounded-2xl px-3 py-2 font-semibold mr-2"
                            onClick={() =>
                              changeCommentStatus(
                                String(comment._id),
                                'APPROVED',
                              )
                            }
                          >
                            Одобрено
                          </button>
                          <button
                            className="border rounded-2xl px-3 py-2 font-semibold mr-2"
                            onClick={() =>
                              changeCommentStatus(
                                String(comment._id),
                                'UNAPPROVED',
                              )
                            }
                          >
                            Не одобрено
                          </button>
                          <button
                            className="border rounded-2xl px-3 py-2 font-semibold"
                            onClick={() =>
                              changeCommentStatus(String(comment._id), 'DENIED')
                            }
                          >
                            Отказано
                          </button>
                        </div>
                      </div>
                    )}
                    {comment.bonusForComment !== 0 && (
                      <p>
                        Начислено {comment.bonusForComment} бонусов за
                        комментарий
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-500">
                      Дата написания: {formatDate(comment.createdAt)}
                    </p>
                    {comment.timeOfPayed && (<p>Время оплаты: {formatDate(comment.timeOfPayed)}</p>)}
                    <button
                      onClick={() => deleteComment(comment._id)}
                      className="text-xl text-red-500 hover:underline"
                    >
                      Удалить
                    </button>
                    <button
                      onClick={() => startEditing(comment._id, comment.msg)}
                      className="text-xl text-gray-500 hover:underline"
                    >
                      Редактировать
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
    </div>
  );
};

export default Comments;
