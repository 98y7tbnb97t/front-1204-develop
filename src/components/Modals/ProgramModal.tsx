import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { GroupUpdateSocket } from '../../sockets/GroupSockets';
import { getGroup, getTestGroup, resetMaterialLesson } from '../../store/reducers/GroupSlice';
import { getMaterials, getThemes } from '../../store/reducers/ProgramSlice';
import Filter from '../Program/Filter';
import Materials from '../Program/Materials';
import Themes from '../Program/Themes';
import Modal from '../UI/Modal';

import './ProgramModal.css';
import { IProgramActionsHistory } from '../../models/response/IGroup.ts';

interface ProgramModalProps {
  modal: boolean;
  setModal: (bool: boolean) => void;
  testlesson?: boolean;
  active?: string;
  setActive: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ProgramModal: FC<ProgramModalProps> = ({
  modal,
  setModal,
  testlesson,
  active,
  setActive
}) => {
  const dispatch = useAppDispatch();
  const { groupId } = useParams();
  const [changeOrder, setChangeOrder] = useState<boolean>(true);
  const [selMaterials, setSelMaterials] = useState<string[]>([]);
  const [history, setHistory] = useState<IProgramActionsHistory>();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getThemes({}));
    };
    void fetchData();
    setSelMaterials([]);
    dispatch(resetMaterialLesson());
  }, [dispatch]);

  useEffect(() => {
    if (active) {
      void dispatch(getMaterials(active));
    }
  }, [active, dispatch]);

  const closeHandler = async () => {
    setModal(false);
    if (groupId) {
      if (testlesson) {
        await dispatch(getTestGroup(groupId));
      } else {
        await dispatch(getGroup(groupId));
      }
      GroupUpdateSocket({ room: groupId });
    }
  };
  return (
    <Modal
      onClose={() => void closeHandler()}
      active={modal}
      setActive={setModal}
      className="!max-w-[1500px] max-2xl:!max-w-[1300px] p-0 items-center h-full programModal"
    >
      <div className="flex flex-col bg-[#F0F0F0] rounded-3xl w-full h-full overflow-auto">
        <Filter
          setChangeOrder={setChangeOrder}
          activeTheme={active}
          setActiveTheme={setActive}
          setSelectedThemes={setSelectedIds}
        />
        <div className="flex justify-between px-5 py-3 h-full gap-5 overflow-auto min-h-[400px]">
          <Themes
            active={active || ''}
            setActive={setActive}
            changeOrder={changeOrder}
            history={history}
            setHistory={setHistory}
            closeHandler={closeHandler}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
          <Materials
            testlesson={testlesson}
            active={active}
            setActive={setModal}
            setActiveTheme={setActive}
            selMaterials={selMaterials}
            setSelMaterials={setSelMaterials}
            setHistory={setHistory}
            selectedThemes={selectedIds}
            setSelectedThemes={setSelectedIds}
            closeHandler={closeHandler}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ProgramModal;
