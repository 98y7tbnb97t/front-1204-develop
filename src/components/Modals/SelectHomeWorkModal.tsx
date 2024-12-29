import { FC, useEffect, useState } from 'react'
import Modal from '../UI/Modal';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import { getMaterials, getThemes } from '../../store/reducers/ProgramSlice';
import Filter from '../Program/Filter';
import Themes from '../Program/Themes';
import Materials from '../Program/Materials';
import './ProgramModal.css';

interface SelectHomeWorkModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
    selectHomeWork: (data: {_id: string, position: string, theme_id:string, seq: number, type: string}) => void;
}

const SelectHomeWorkModal: FC<SelectHomeWorkModalProps> = ({ modal, setModal, selectHomeWork }) => {
    const dispatch = useAppDispatch();
    const language = useAppSelector(state => state.TranslateSlice.language)
    const [activeTheme, setActiveTheme] = useState<string>();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selMaterials, setSelMaterials] = useState<string[]>([]);

    useEffect(() => {
        if (activeTheme) {
          void dispatch(getMaterials(activeTheme));
        }
      }, [activeTheme, dispatch]);

    useEffect(() => {
        const fetchData = async() => {
            await dispatch(getThemes({}))
        }
        void fetchData();
    }, [dispatch])

    return (
        <Modal active={modal} setActive={setModal} className='!max-w-[1500px] max-2xl:!max-w-[1300px] p-0 items-center h-full programModal'>
            <div className="flex flex-col bg-[#F0F0F0] rounded-3xl w-full h-full">
                <Filter setSelectedThemes={setSelectedIds} />
                <div className="flex justify-between px-5 py-3 h-full gap-5 overflow-auto min-h-[400px]">
                    <Themes
                        active={activeTheme || ''}
                        setActive={setActiveTheme}
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                    />
                    <Materials
                        active={activeTheme}
                        setActive={setModal}
                        setActiveTheme={setActiveTheme}
                        selectHomeWork={selectHomeWork}
                        homework={true}
                        selectedThemes={selectedIds}
                        setSelectedThemes={setSelectedIds}
                    />
                </div>

            </div>
        </Modal>
    )
}

export default SelectHomeWorkModal;