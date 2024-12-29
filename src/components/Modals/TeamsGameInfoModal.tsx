import { FC, useState, useEffect } from "react";
import Modal from "../UI/Modal";
import ChangeLanguageBtns from "../UI/ChangeLanguageBtns";
import { Elanguages } from "../../store/reducers/TranslateSlice";
import { FaPencilAlt } from "@react-icons/all-files/fa/FaPencilAlt";
import EditTeamsGameInfoModal from "./EditTeamsGameInfoModal";
import { EInfoTextFields, IInfoText } from "../../models/IInfoTexts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getInfoText, editInfoText } from "../../store/reducers/InfoTextsSlice";
import { UserRoles } from "../../utils/userRoles";

interface TeamsGameInfoModalProps {
    active: boolean;
    setActive: (active: boolean) => void;
}

const TeamsGameInfoModal:FC<TeamsGameInfoModalProps> = ({ active, setActive }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.UserSlice.user);
  const teamsGameInfoText = useAppSelector(state => state.InfoTextsSlice[EInfoTextFields.teamsGameInfo]);
  const [editTeamsGameInfoModal, setEditTeamsGameInfoModal] = useState<boolean>(false);
  const [modalLanguage, setModalLanguage] = useState<Elanguages>(Elanguages.RU);
  const [text, setText] = useState<IInfoText>({
    ru: '',
    en: '',
    am: ''
  });

  const onLangChange = (lang: Elanguages) => {
    setModalLanguage(lang);
  }

  useEffect(() => {
    if (teamsGameInfoText) {
      setText(teamsGameInfoText);
    }
  }, [teamsGameInfoText]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getInfoText({ field: EInfoTextFields.teamsGameInfo }));
    }
    void fetchData();
  }, [dispatch]);

  const onEditText = async (newText: IInfoText) => {
    await dispatch(editInfoText({ text: newText, field: EInfoTextFields.teamsGameInfo }));
    setEditTeamsGameInfoModal(false);
  }

  return (
    <>
      <Modal 
          active={active}
          setActive={setActive}
          closeBtnStyle={'!text-black'}
          className={`max-w-[700px] p-8`}
      >
        <div className="flex gap-4 items-center mb-4">
          <ChangeLanguageBtns language={modalLanguage} onLangChange={onLangChange}/>
          {
            [UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(user.role) &&
            <button onClick={() => setEditTeamsGameInfoModal(true)}><FaPencilAlt /></button>
          }
        </div>
        <div dangerouslySetInnerHTML={{__html: text[modalLanguage] || ''}}></div>
      </Modal>
      <EditTeamsGameInfoModal 
        active={editTeamsGameInfoModal}
        setActive={setEditTeamsGameInfoModal}
        text={text}
        setText={setText}
        onEditText={onEditText}
      />
    </>
  );
}

export default TeamsGameInfoModal;