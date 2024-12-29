import React, { FC, useState, useEffect } from 'react';
import CommentsService from '../../services/CommentsService';
import { useAppSelector } from '../../hooks/redux';
import { IComment } from '../../models/response/IComment';
import { AxiosResponse } from 'axios';

const MyComments: FC = () => {
  const { user } = useAppSelector((state) => state.UserSlice);
  const [comments, setComments] = useState<IComment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(); // Идентификатор редактируемого комментария
  const [editedText, setEditedText] = useState(''); // Текст редактируемого комментария
  const [totalBonus, setTotalBonus] = useState(0); // Общее количество бонусов за комментарии

  useEffect(() => {
    // Получение комментариев пользователя при монтировании компонента
    const fetchComments = async () => {
      try {
        const response: AxiosResponse<IComment[]> =
          await CommentsService.getCommentBySender(user._id);
        setComments(response.data); // Установка полученных комментариев в состояние
        // Вычисление общего количества бонусов
        const total = response.data.reduce(
          (accumulator: number, currentValue: IComment) =>
            accumulator + currentValue.bonusForComment,
          0,
        );
        setTotalBonus(total);
      } catch (error) {
        console.error('Не удалось получить комментарии:', error);
      }
    };

    fetchComments(); // Вызов функции получения комментариев
  }, [user._id]);

  // Функция для форматирования даты в виде "День Месяц Год, Часы:Минуты"
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

  // Функция для открытия поля ввода текста редактирования
  const startEditing = (commentId: string, initialText: string) => {
    setEditingCommentId(commentId);
    setEditedText(initialText);
  };

  // Функция для сохранения отредактированного комментария
  const saveEditedComment = async (commentId: string) => {
    try {
      await CommentsService.editComment(commentId, editedText);
      // Обновление списка комментариев после успешного редактирования
      const updatedComments = comments.map((comment) =>
        comment._id === commentId ? { ...comment, msg: editedText } : comment,
      );
      setComments(updatedComments);
      setEditingCommentId(null); // Закрытие поля ввода после сохранения
    } catch (error) {
      console.error(
        'Не удалось сохранить отредактированный комментарий:',
        error,
      );
    }
  };
  // const deleteComment = async (commentId: string) => {
  //   try {
  //     await CommentsService.deleteComments(commentId);
  //     // Удаление комментария из списка после успешного удаления
  //     const updatedComments = comments.filter(
  //       (comment) => comment._id !== commentId,
  //     );
  //     setComments(updatedComments);
  //   } catch (error) {
  //     console.error('Не удалось удалить комментарий:', error);
  //   }
  // };

  // Функция для отмены редактирования
  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditedText('');
  };

  return (
    <div className="w-full h-full bg-gray-100 p-4">
      <p className=" text-2xl font-semibold text-right mb-3">
        Всего {totalBonus} бонусов за комментарии
      </p>
      {comments?.map((comment: IComment) => (
        <div
          key={comment._id}
          className="bg-white rounded-lg shadow-md p-4 mb-4"
        >
          {editingCommentId === comment._id ? ( // Отображение поля ввода при редактировании
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
                  onClick={cancelEditing} // Отмена редактирования
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Отменить
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-lg font-semibold">{comment.msg}</p>
              <div className="flex justify-between mt-2">
              {comment.msg !== '' ? (
  <p className="text-sm text-gray-500">
    Дата написания: {formatDate(comment.createdAt)}
  </p>
): (<p>Отложенный комментарий</p>)}
                <p>
                  Статус:{' '}
                  {comment.status === 'PAID'
                    ? 'Оплачено'
                    : comment.status === 'UNAPPROVED'
                    ? 'Не одобрено'
                    : comment.status === 'APPROVED'
                    ? 'Одобрено'
                    : comment.status === 'ONVERIFICATION'
                    ? 'На верификации'
                    : ''}
                </p>
                {comment.bonusForComment !== 0 ? (
                  <p>
                    Начислено {comment.bonusForComment} бонусов за комментарий
                  </p>
                ) : (
                  <div></div>
                )}
                <div>
                  {comment.msg === '' && (
                    <button
                      onClick={() => startEditing(comment._id, comment.msg)}
                      className="text-xl text-gray-500 hover:underline"
                    >
                      Написать отложенный комментарий комментарий
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyComments;
