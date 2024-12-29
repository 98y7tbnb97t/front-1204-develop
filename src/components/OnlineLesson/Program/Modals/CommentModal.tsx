import { FC, useState } from 'react';
import Modal from '../../../UI/Modal.tsx';
import { Form, useForm } from 'react-hook-form';
import CommentsService from '../../../../services/CommentsService.ts';
import { useParams } from 'react-router-dom';
import UploadFile from '../../../Messenger/Chat/UploadFile.tsx';
import { IComment } from '../../../../models/response/IComment.ts';

import FileList from '../../../Messenger/Chat/FileList/FileList.tsx';
import Textarea from '../../../Messenger/Chat/Textarea.tsx';
import MainButton from '../../../UI/MainButton.tsx';
interface ICommentModalInterface {
  openSecondCommentModal: boolean;
  setOpenSecondCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
  senderId: string;
  onCommentSubmit: (comment: IComment) => void;
  groupId: string;
  type: string;
}

interface IFormValue {
  msg: string;
  file: string;
}

const CommentModal: FC<ICommentModalInterface> = ({
  openSecondCommentModal,
  setOpenSecondCommentModal,
  senderId,
  onCommentSubmit,
  groupId,
  type,
}) => {
  const [commentSent, setCommentSent] = useState(false);
  const [fileList, setfileList] = useState<Array<File>>([]);
  const [msg, setMsg] = useState<string>('');

  const msgHandler = async () => {
    if (msg.length > 0 || fileList.length > 0) {
      try {
       
        const response = await CommentsService.createComments(
           msg,
           groupId,
          senderId,
          fileList,
    );
        onCommentSubmit(response.data.comment);

        setMsg('');
        setfileList([]);
        setCommentSent(true);

        setTimeout(() => {
          setCommentSent(false);
        }, 2000); // 2000 milliseconds = 2 seconds
      } catch (error) {
        console.log(error)
       }
    }
  };
  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void msgHandler();
    }
  };

  const setFilesHandler = (files: FileList) => {
    const fileLingth = fileList.length;
    for (let i = 0; i < files.length; i++) {
      if (i < 6 - fileLingth) {
        const fileExt = files[i].name.split('.').pop();
        if (fileExt !== 'exe') {
          setfileList((oldFileList) => [...oldFileList, files[i]]);
        }
      }
    }
  };
  const textareaHandler = (value: string) => {
    setMsg(value);
   
}
  const removeFileHandler = (id: number) => {
    setfileList((oldFileList) => oldFileList.filter((_, i) => i !== id));
  };
  return (
    <Modal
      active={openSecondCommentModal}
      setActive={setOpenSecondCommentModal}
      className="max-w-[520px] pt-[35px]"
      backdropClassName='z-[100000]'
    >
      <div className='flex'>
      <Textarea
        setFilesHandler={setFilesHandler}
        onKeyDownHandler={onKeyDownHandler}
        msg={msg}
        setMsg={textareaHandler}
        replyUserEmail={''}
        setReplyUserEmail={() => {
          ('');
        }}
        clearIndUserChatId={() => {
          ('');
        }}
      />
      <UploadFile
        labelClass="!text-gray-800 hover:!text-white"
        accept="*"
        id="files-upload"
        multiple
        setFilesHandler={setFilesHandler}
      />
</div>
      {commentSent && (
        <p className="text-green-500 mb-2">Комментарий отправлен на проверку</p>
      )}
      {fileList.length > 0 && (
        <FileList removeFileHandler={removeFileHandler} fileList={fileList} />
      )}
      <MainButton 
      className='mt-3'
        onClick={() => void msgHandler()}
      >
        Отправить
      </MainButton>
    </Modal>
  );
};

export default CommentModal;
