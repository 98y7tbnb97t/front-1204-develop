import { FC, useState } from "react";
import classNames from "classnames";
import Modal from "../UI/Modal";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { translations } from "../../utils/translations";
import { MuteDurations } from "../../models/IChat";
import { muteChat, unMuteChat } from "../../store/reducers/MessengerSlice";
import { UserRoles } from "../../utils/userRoles";

interface MuteChatModalProps {
  className?: string;
  active: boolean;
  setActive: (active: boolean) => void;
	chat_id: string;
	isMuted: boolean;
	chatName: string;
}

const muteDurationsTranslations = {
  [MuteDurations.EightHours]: {
    ru: '8 часов',
    am: '8 ժամ',
    en: '8 hours',
  },
  [MuteDurations.OneWeek]: {
    ru: '1 неделя',
    am: '1 շաբաթ',
    en: '1 week',
  },
  [MuteDurations.ThirtyDays]: {
    ru: '30 дней',
    am: '30 օր',
    en: '30 days',
  },
  [MuteDurations.NinetyDays]: {
    ru: '90 дней',
    am: '90 օր',
    en: '90 days',
  },
  [MuteDurations.Forever]: {
    ru: 'Навсегда',
    am: 'Հավերժ',
    en: 'Forever',
  },
};

const noMuteForeverChats = [
	'Уведомление',
	'♥️ ♾️ Ararat international',
	'(Administrator) Тех. поддержка для тренеров',
	'(Administrator) Тех. поддержка для родителей',
	'ВАЖНЫЕ НОВОСТИ'
]

const { muteText, unMuteText } = translations.messenger;

const MuteChatModal:FC<MuteChatModalProps> = ({ className, active, setActive, chat_id, isMuted, chatName }) => {
  const language = useAppSelector(state => state.TranslateSlice.language);
	const user = useAppSelector(state => state.UserSlice.user)
  const [muteDuration, setMuteDuration] = useState<MuteDurations>(MuteDurations.EightHours);
	const dispatch = useAppDispatch();
	const changeMuteDurationsHandler = (duration: MuteDurations) => {
		setMuteDuration(duration);
	}
  const muteHandler = async () => {
		try {
			await dispatch(muteChat({ chatId: chat_id, duration: muteDuration}));
			setActive(false);
		} catch (e) {
			console.log(e);
		}
  }

  const unMuteHandler = async () => {
    try {
      await dispatch(unMuteChat({ chatId: chat_id }));
      setActive(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Modal active={active} setActive={setActive} className={classNames('p-4 !bg-white', {}, [className])}>
      <h2 className="text-center text-xl font-bold mb-2">
        {isMuted ? unMuteText[language] : muteText[language]}
      </h2>
      <div className="flex flex-col gap-4 pl-4">
        {!isMuted && Object.values(MuteDurations)
					.filter(duration => !noMuteForeverChats.includes(chatName) || duration !== MuteDurations.Forever || user.role === UserRoles.DIRECTOR)
					.map((duration) => (
          <label key={duration} className="flex items-center gap-2">
            <input type="radio" name="muteDuration" value={duration} checked={muteDuration === duration} onChange={() => changeMuteDurationsHandler(duration)}/>
            <span>{muteDurationsTranslations[duration][language]}</span>
          </label>
        ))}
        <div className="flex justify-end gap-2 mt-4">
          <button 
						className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" 
						onClick={() => setActive(false)}
					>
            Отмена
          </button>
          <button 
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
						onClick={() => isMuted ? void unMuteHandler() : void muteHandler()}
					>
            {isMuted ? unMuteText[language] : muteText[language]}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default MuteChatModal;