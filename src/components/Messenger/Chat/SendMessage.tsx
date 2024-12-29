import { FC, useState, useRef, useEffect, useMemo } from 'react';
import Textarea from './Textarea';
import AudioRecord from './AudioRecord';
import IcoButton from '../../UI/IcoButton';
import { BsMic } from '@react-icons/all-files/bs/BsMic';
import { VscSend } from '@react-icons/all-files/vsc/VscSend';
import { BsEmojiSmile } from '@react-icons/all-files/bs/BsEmojiSmile';
import { BsStopFill } from '@react-icons/all-files/bs/BsStopFill';
import EmojiPicker from '../../UI/EmojiPicker';
import { ServerError } from '../../../models/response/ServerError';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  sendMessage,
  editMessage,
} from '../../../store/reducers/MessengerSlice';
import { toggleRecording } from '../../../services/MediaRecord';
import { recorder } from '../../../services/MediaRecord';
import UploadFile from './UploadFile';
import FileList from './FileList/FileList';
import { IMessage } from '../../../models/IMessage';
import ReplyMessage from './ReplyMessage';
import {
  setReplyMessage,
  setEditMessage,
} from '../../../store/reducers/MessengerSlice';
import DialogService from '../../../services/DialogService';
import { EmojiClickData } from 'emoji-picker-react';

interface SendMessageProps {
  indUserEmail: string | null;
  clearIndUserChatId: () => void;
  onSendMessage?: () => void;
  onReplyClick: (msg: IMessage) => void
}

const SendMessage: FC<SendMessageProps> = ({
  indUserEmail,
  clearIndUserChatId,
  onSendMessage,
  onReplyClick
}) => {
  const [replyMsg, setReplyMsg] = useState<IMessage | null>();
  const [edMessage, setEditMsg] = useState<IMessage | null>();
  const [src, setSrc] = useState<Blob>();
  const [audioRecord, setAudioRecord] = useState<boolean>(false);
  const { userid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef<HTMLButtonElement>(null);
  const [msg, setMsg] = useState<string>('');
  const [pickerActive, setPickerActive] = useState<boolean>(false);
  const queryMessageSendedRef = useRef<boolean>(false);
  const dispatch = useAppDispatch();
  const { reply, editMsg, chat, archived } = useAppSelector(
    (state) => state.MessengerSlice,
  );
  const [fileList, setfileList] = useState<Array<File>>([]);
  const [tagState, setTagState] = useState<boolean>(false);
  const [replyUserEmail, setReplyUserEmail] = useState<string>('');
  const { user } = useAppSelector((state) => state.UserSlice);

  const replyTo = indUserEmail || replyUserEmail;
  const fullMsgText = `${replyTo ? '@' + replyTo : ''} ${msg}`;

  const initForm = () => {
    setMsg('');
    setSrc(undefined);
    setfileList([]);
    setReplyUserEmail('');
  };
  const isChatArchived = useMemo(
    () => archived.some((c) => c._id === chat._id),
    [archived, chat],
  );
  const msgHandler = async () => {
    if (userid && !isChatArchived) {
      if (!edMessage) {
        if (msg.length > 0 || src || fileList.length > 0) {
          const response = await dispatch(
            sendMessage({
              msg: fullMsgText,
              userid,
              audio: src,
              fileList: fileList,
              reply: reply,
            }),
          );
          onSendMessage?.();
          const res = response.payload as ServerError;
          if (!res?.error) {
            initForm();
            dispatch(setReplyMessage(null));
          }
        }
        const isPushed = await DialogService.sendPush(
          fullMsgText,
          chat._id,
          user._id,
        );
      } else {
        if (msg.length > 0 || fileList.length > 0) {
          if (editMsg) {
            const response = await dispatch(
              editMessage({
                msg_id: editMsg,
                msg: fullMsgText,
                fileList: fileList,
              }),
            );
            const res = response.payload as ServerError;
            if (!res?.error) {
              initForm();

              dispatch(setEditMessage(null));
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const fetch = async () => {
      if (!queryParams.has('msg')) {
        await msgHandler();
      }
    };
    if (src) {
      void fetch();
    }
  }, [src]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const sendMsg = () => {
      const queryParams = new URLSearchParams(location.search);
      queryMessageSendedRef.current = true;
      if (queryParams.has('msg') && userid) {
        const msgText = queryParams.get('msg') || '';
        void dispatch(sendMessage({
          msg: msgText,
          userid,
          audio: undefined,
          fileList: [],
          reply: null
        }));
        void DialogService.sendPush(
          msgText,
          chat._id,
          user._id,
        );
        queryParams.delete('msg');
        navigate({ search: queryParams.toString() }, { replace: true });
  
      }
    }
    if (!queryMessageSendedRef.current) {
      setTimeout(sendMsg, 500);
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (reply) {
      const msg = chat.messages.filter((message) => message._id === reply)[0];
      if (msg) {
        setReplyMsg(msg);
      }
    } else {
      setReplyMsg(null);
    }
  }, [reply]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (editMsg) {
      const msg = chat.messages.filter((message) => message._id === editMsg)[0];
      if (msg) {
        setEditMsg(msg);
      }
    } else {
      setEditMsg(null);
    }
  }, [editMsg]); // eslint-disable-line react-hooks/exhaustive-deps

  const onCancelReplyMessage = (): void => {
    setReplyMsg(null);
    dispatch(setReplyMessage(null));
  };
  const onCancelEditMessage = (): void => {
    setEditMsg(null);
    dispatch(setEditMessage(null));
  };

  const recorderHandler = (bool = true as boolean) => {
    audioRecord ? setAudioRecord(false) : setAudioRecord(true);
    toggleRecording();
    if (bool) {
      if (recorder?.state) {
        recorder.ondataavailable = function (e) {
          //const url = URL.createObjectURL(e.data);
          setSrc(e.data);
        };
      }
    }
  };
  const stopRecordHandler = () => {
    recorderHandler(false);
    setSrc(undefined);
  };

  const audioMessageHandler = () => {
    recorderHandler();
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
  const removeFileHandler = (id: number) => {
    setfileList((oldFileList) => oldFileList.filter((_, i) => i !== id));
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void msgHandler();
    }
  };

  const textareaHandler = (value: string) => {
    setMsg(value);
    if (chat.isGroup) {
      if (value[value.length - 1] === '@') {
        setTagState(true);
      } else {
        if (tagState) {
          setTagState(false);
        }
      }
    }
  };

  const tagHandler = (value: string) => {
    setTagState(false);
    setMsg(msg + value);
  };

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setMsg(msg + emojiObject.emoji)
}

  return (
    <div className="bg-[#f0f2f5] flex relative items-center h-auto justify-between px-1 xl:px-12 p-2">
      <div className="flex items-center">
        <IcoButton
          ref={ref}
          onClick={() => {
            pickerActive ? setPickerActive(false) : setPickerActive(true);
          }}
          icon={<BsEmojiSmile />}
          className="!px-3 !py-2 !text-gray-800 hover:!text-white"
        />
        <EmojiPicker
          button={ref.current}
          onEmojiClick={onEmojiClick}
          active={pickerActive}
          setActive={setPickerActive}
          className='bottom-16'
        />
        <UploadFile
          labelClass="!text-gray-800 hover:!text-white"
          accept="*"
          id="files-upload"
          multiple
          setFilesHandler={setFilesHandler}
        />
      </div>
      {audioRecord ? (
        <AudioRecord />
      ) : (
        <div className="w-full">
          {replyMsg && (
            <div>
              <ReplyMessage
                msg={replyMsg}
                isInInput={true}
                onCancel={onCancelReplyMessage}
                onReplyClick={onReplyClick}
              />
            </div>
          )}
          {edMessage && (
            <ReplyMessage
              msg={edMessage}
              isInInput={true}
              onCancel={onCancelEditMessage}
              onReplyClick={onReplyClick}
            />
          )}
          {fileList.length > 0 && (
            <FileList
              removeFileHandler={removeFileHandler}
              fileList={fileList}
            />
          )}
          {tagState && (
            <div className="flex flex-col items-start absolute top-0 -translate-y-full bg-gray-800 text-white">
              {chat.isGroup && (
                <>
                  {chat.users?.map((user) => (
                    <button
                      onClick={() => tagHandler(user.name)}
                      className="px-3 py-2 hover:bg-gray-600"
                    >
                      {user.name}
                    </button>
                  ))}
                </>
              )}
            </div>
          )}

          <Textarea
            setFilesHandler={setFilesHandler}
            onKeyDownHandler={onKeyDownHandler}
            msg={msg}
            setMsg={textareaHandler}
            replyUserEmail={replyTo}
            setReplyUserEmail={setReplyUserEmail}
            clearIndUserChatId={clearIndUserChatId}
          />
        </div>
      )}
      <div>
        {audioRecord && (
          <>
            <IcoButton
              className="!text-gray-800 hover:!text-white"
              onClick={() => void stopRecordHandler()}
              icon={<BsStopFill />}
            />
            <IcoButton
              className="!text-gray-800 hover:!text-white"
              onClick={() => {
                audioMessageHandler();
              }}
              icon={<VscSend />}
            />
          </>
        )}
        {!audioRecord && (
          <>
            {msg || fileList.length > 0 ? (
              <IcoButton
                className="!text-gray-800 hover:!text-white"
                onClick={() => void msgHandler()}
                icon={<VscSend />}
              />
            ) : (
              <IcoButton
                className="!text-gray-800 hover:!text-white"
                onClick={() => void recorderHandler()}
                icon={<BsMic />}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SendMessage;
