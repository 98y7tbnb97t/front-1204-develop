import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import GroupService from "../../services/GroupService";
import { IProgramActionsHistory, ITimer } from "../../models/response/IGroup";
import { IMaterial, IMaterialResponse } from "../../models/Program/IMaterial";
import { ITheme } from "../../models/Program/ITheme";
import PutOffModal from "./PutOffModal";
import { useAppDispatch } from "../../hooks/redux";
import { setGroup } from "../../store/reducers/GroupSlice";
import { getMaterials } from "../../store/reducers/ProgramSlice";

interface PostponedMaterialsModalProps {
  className?: string;
  groupId?: string;
  setActiveTheme: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectMaterialHandler: (material: IMaterialResponse) => void;
  setHistory: (history: IProgramActionsHistory) => void;
}

const PostponedMaterialsModal:FC<PostponedMaterialsModalProps> = ({ className, groupId, setActiveTheme, selectMaterialHandler, setHistory }) => {
    const [active, setActive] = useState(false);
    const [timer, setTimer] = useState<ITimer[]>([]);
    const [current, setCurrent] = useState<{materials: IMaterial[], theme: ITheme}>();
    const [putOffModal, setPutOffModal] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            if (groupId) {
                const response = await GroupService.getPostponedMaterials(groupId);
                const actualTimer = response.data.timer
                    .map(t => ({...t, materials: t.materials.filter(m => new Date(m.time).toDateString() === new Date().toDateString())}))
                    .filter(t => t.materials.length > 0);
                setTimer(actualTimer);
            }
        }
        void fetchData();
    }, [groupId]);

    useEffect(() => {
        if (timer.length) {
            setActive(true);
            setCurrent({
                materials: timer[0].materials.map(m => m.material),
                theme: timer[0].theme
            });
        } else {
            setActive(false);
        }
    }, [timer]);

    const submitHandler = async () => {
        if (current && groupId) {
            setActiveTheme(current.theme._id);
            for (const material of current.materials) {
                selectMaterialHandler(material as unknown as IMaterialResponse);
            }
            setTimer(timer
                .filter(t => t.theme._id !== current.theme._id)
            );
            await dispatch(getMaterials(current.theme._id));
            const res = await GroupService.removeFromPostponedMaterials(groupId, [current.theme._id], []);
            dispatch(setGroup(res.data.group));
        }
    }

    const onSetNewDate = () => {
        if (current && groupId) {
            setTimer(timer
                .filter(t => t.theme._id !== current.theme._id)
            );
        }
    }

    return (
        <>
            <Modal active={active} setActive={setActive} className={classNames('!bg-white p-5', {}, [className])}>
                <h3 className="text-center text-xl font-bold mb-5">{current?.theme.name}</h3>
                <div className="flex gap-2">
                    <Button onClick={submitHandler} className="mt-4">Пройти сейчас эту тему</Button>
                    <Button onClick={() => setPutOffModal(true)} className="mt-4">Назначить новую дату</Button>
                </div>
            </Modal>
            {current && 
            <PutOffModal
                groupId={groupId}
                materialIds={current.materials.map(m => m._id)}
                themeIds={[current.theme._id]}
                active={putOffModal}
                setActive={setPutOffModal}
                onSubmit={onSetNewDate}
                setHistory={setHistory}
            />}
        </>
    );
}

export default PostponedMaterialsModal;