import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import Modal from "../UI/Modal";
import DialogService from "../../services/DialogService";
import Message from "../Messenger/Chat/Message";
import { IMessage } from "../../models/IMessage";

interface UserNotificationsModalProps {
  className?: string;
  active: boolean;
  setActive: (active: boolean) => void;
  user_id: string;
}

const UserNotificationsModal:FC<UserNotificationsModalProps> = ({ className, active, setActive, user_id  }) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    useEffect(() => {
        const fetchData = async () => {
          if (active && user_id) {
            const res = await DialogService.getNotifications(user_id);
            setMessages(res.data.messages.reverse());
          }
        }
        void fetchData();
    }, [active, user_id])
  return (
    <Modal maxWidth={1000} active={active} setActive={setActive} className={classNames('!bg-white', {}, [className])}>
        { messages.map(m => (
            <div className="mb-2"><Message msg={m} isMe={false} setIndUserChatId={() => { return; }} isUnansvered={false} users={undefined}/></div>
        ))}
    </Modal>
  );
}

export default UserNotificationsModal;