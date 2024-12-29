import { MdOutlineDeleteOutline } from '@react-icons/all-files/md/MdOutlineDeleteOutline';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import GroupService from '../../../services/GroupService';
import { GroupUpdateSocket } from '../../../sockets/GroupSockets';
import {
  getGroup,
  setGroup,
  updateMaterialForLesson,
  updatePassedMaterials,
} from '../../../store/reducers/GroupSlice';
import {
  ITranslateItemString,
  translations,
} from '../../../utils/translations.tsx';
import CheckBox from '../../UI/Main/Checkbox/CheckBox.tsx';
import { IUpdatePassedMaterials } from '../../../models/response/IGroup.ts';
import { IMaterial } from '../../../models/Program/IMaterial.ts';

interface ItemProps {
  id: string;
  themeId: string;
  number: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  active?: string;
  taskName?: string;
  passedMaterials?: string[];
  setMaterial?: (material: IMaterial) => void;
}

const Item: FC<ItemProps> = ({ id, themeId, number, onClick, active, taskName, passedMaterials, setMaterial }) => {
  const { groupId } = useParams();
  const dispatch = useAppDispatch();
  const { group } = useAppSelector((state) => state.GroupSlice);
  const { materialLesson } = useAppSelector((state) => state.GroupSlice);
  const { user } = useAppSelector((state) => state.UserSlice);
  const language = useAppSelector((state) => state.TranslateSlice.language);

  const {
    taskText,
  }: {
    taskText: ITranslateItemString;
  } = translations.homework;

  const removeHandler = async () => {
    if (active === id) {
      setMaterial?.(undefined as unknown as IMaterial);
    }
    if (groupId) {
      const tmp = [] as string[];
      if (group) {
        if (group.program.length > 0) {
          group.program.map((material) => {
            tmp.push(material._id);
          });
          const res = await GroupService.editGroup(groupId, {
            program: tmp.filter((item) => item !== id),
            deletedProgram: [...group.deletedProgram.map((item) => item._id), id]
          });
          dispatch(setGroup(res.data.group));
          GroupUpdateSocket({ room: groupId });

          const updatedMaterialLesson = { ...materialLesson };
          for (const themeId in updatedMaterialLesson) {
            if (
              updatedMaterialLesson[themeId].some(
                (material) => material._id === id,
              )
            ) {
              updatedMaterialLesson[themeId] = updatedMaterialLesson[
                themeId
              ].filter((material) => material._id !== id);

              if (updatedMaterialLesson[themeId].length === 0) {
                delete updatedMaterialLesson[themeId];
              }
            }
          }
          dispatch(updateMaterialForLesson(updatedMaterialLesson));
        }
      }
    }
  };

  const materialPassedHandler = (add: boolean) => {
    if (themeId && groupId) {
      const payload: IUpdatePassedMaterials = {
        groupId,
        payload: {
          themeId: themeId,
          materialId: id,
          type: add ? 'add' : 'restore',
          addToHistory: false,
          section: 'program',
        }
      }
      void dispatch(updatePassedMaterials(payload)).unwrap();
    }
  }
  
  return (
    <div className="flex items-center px-4 font-medium text-lg max-2xl:text-base border-b-2 border-b-[#CCC] last:border-b-0 py-1">
      <button
        onClick={onClick}
        className={[
          'w-full flex justify-start',
          active === id && 'text-apricot',
          passedMaterials?.includes(id) && 'text-green-700',
          passedMaterials?.includes(id) && active === id && '!text-green-500',
        ].join(' ')}
      >
        <span className="mr-5 text-red-500 font-semibold">{number}</span>
        <span className='whitespace-nowrap overflow-hidden text-ellipsis max-w-[250px]'>{taskName ? taskName : `${taskText[language]} ${number}`}</span>
      </button>
      {user.role !== 'STUDENT' && (
        <div className="flex align-center mt-1 ml-3 gap-1">
          <CheckBox
            checked={passedMaterials?.includes(id)}
            onChange={(e) => materialPassedHandler(e.target.checked)}
            width='24px'
            height='24px'
          />
          <button
            onClick={() => void removeHandler()}
            title="Удалить задачу"
            className="bg-red-500 cursor-pointer w-6 h-6 p-1 rounded-md flex justify-center items-center text-white"
          >
            <MdOutlineDeleteOutline />
          </button>
        </div>
      )}
    </div>
  );
};

export default Item;
