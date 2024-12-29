import { Menu } from '@headlessui/react';
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown';
import { MouseEventHandler, forwardRef, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ITheme } from '../../models/Program/ITheme';
import ProgramService from '../../services/ProgramService';
import {
  getThemes,
  setTheme,
} from '../../store/reducers/ProgramSlice';
import { FaComment } from '@react-icons/all-files/fa/FaComment';
import ThemeHistoryModal from '../Modals/ThemeHistoryModal';
import classNames from 'classnames';
import { AiFillQuestionCircle } from '@react-icons/all-files/ai/AiFillQuestionCircle';
import Modal from '../UI/Modal';
import AddProgramMaterialModal from '../Modals/AddProgramMaterialModal';

interface ThemeProps {
  firstUnfinishedThemeIdRef: React.MutableRefObject<string | null>;
  lineNumber: number;
  theme: ITheme;
  active: string;
  setActive: (value: string) => void;
  editHandler: (theme: ITheme) => void;
  removeHandler: (theme: ITheme) => void;
  commentHandler: (theme: ITheme) => void;
  selectedIds: string[];
  selectedIdsTemp: string[];
  setSelectedIdsTemp: (value: string[]) => void;
  postponedThemes: string[];
  passedThemes: string[];
  selectTheme?: (themeId: string) => void;
  // selectableRef: RefObject<HTMLDivElement>;
}

const Theme = 
  forwardRef<HTMLDivElement, ThemeProps>(
    (
      {
        theme,
        active,
        setActive,
        editHandler,
        removeHandler,
        commentHandler,
        selectedIds,
        postponedThemes,
        passedThemes,
        // selectableRef,
        firstUnfinishedThemeIdRef,
        selectTheme,
        lineNumber,
        selectedIdsTemp,
        setSelectedIdsTemp
      },
      ref,
    ) => {
      const [themeHistoryModal, setThemeHistoryModal] = useState(false);
      const isSelected = selectedIds.includes(theme._id);
      const isPostponed = postponedThemes.includes(theme._id);
      const isPassed = passedThemes.includes(theme._id);
      const dispatch = useAppDispatch();
      const { user } = useAppSelector((state) => state.UserSlice);
      const { themes } = useAppSelector((state) => state.ProgramSlice);
      const { group, materialLesson } = useAppSelector((state) => state.GroupSlice);
      const themeIndex = themes.findIndex(t => t._id === theme._id);
      const numberList = +`${themes[0]?.level}00` + themeIndex + 1;
      const [isPressed, setIsPressed] = useState<boolean>(false);
      const param = useParams();
      const { groupId } = useParams();
      const isParams = !param.groupId;
      const isMaterialAddedToLesson = Object.values(materialLesson).flat().some((mat) => mat.theme_id === theme._id);
      const themeRef = useRef<HTMLDivElement>(null);
      const [helpModal, setHelpModal] = useState<boolean>(false);
      const [addProgramMaterialModal, setAddProgramMaterialModal] = useState(false);
      let percentage = 0;
      
      if (group.passed) {
        const passedTheme = group.passed.find((t) => t.theme === theme._id);
        if (passedTheme && theme.count > 0) {
          const passedMaterials = passedTheme.materials.length;
          percentage = (passedMaterials / theme.count) * 100;
        } else if (passedTheme && theme.count === 0){
          percentage = 100;
        }
      }

      const fetchMaterials = () => {
        setActive(theme._id);
        dispatch(setTheme(theme._id));
        setSelectedIdsTemp([]);
      };

      const toggleLine = async (type: string, button: number) => {
        if (!isParams) {
          return;
        }

        if (type === 'click' && button === 0) {
          if (!isPressed) {
            setIsPressed(true);
            setTimeout(() => {
              setIsPressed(false);
            }, 300);
          } else {
            const line = theme.line === 'yas' ? 'no' : 'yas';
            await ProgramService.editTheme(theme._id, line);
            await dispatch(getThemes({ level: theme.level }));
          }
        }
      };

      const passedHistory = group.passedHistory?.find(h => h.theme === theme._id);
      const homeworkHistory = group.homeworkHistory?.find(h => h.theme === theme._id);

      const themeHistoryHandler: MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
        setThemeHistoryModal(true);
      }

      return (
        <div key={theme._id} className='theme-item' data-id={theme._id}>
          <div
            className={[
              'flex items-center w-full  mb-2 relative [&>.arr-menu]:hover:block [&>.passed-history]:hover:block',
              (user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') &&
              !groupId
                ? 'cursor-grab'
                : 'cursor-pointer',
            ].join(' ')}
            ref={themeRef}
          >
            <span
              onClick={(e) => void toggleLine(e.type, e.button)}
              className="rounded-full bg-red-400 p-2 mr-2 text-white"
            >
              {numberList}
            </span>
            <div
              onClick={() => void fetchMaterials()}
              className={[
                'overflow-hidden w-full rounded-full border-2 relative',
                active === theme._id
                  ? '!bg-[#1EA413] text-white'
                  : 'border-[#C4C4C4] text-[#353535]',
                isSelected && groupId ? 'border-4 border-red-500' : '',
                selectedIdsTemp.includes(theme._id) ? 'border-4 border-red-500' : '',
                isSelected && active === theme._id && groupId ? 'border-4 border-red-500' : '',
                isPassed ? 'border-2 border-green-500' : '',
                isPostponed ? 'bg-blue-400/25' : '',
                isMaterialAddedToLesson ? 'bg-red-100' : '',
              ].join(' ')}
              title={theme.name}
            >
              <div className="flex justify-between relative z-20">
                <div
                  className="py-2 w-full text-center relative font-bold text-sm"
                >
                  {active !== theme._id && percentage > 0 && groupId && (
                    <div 
                      className="flex z-10 justify-between absolute top-0 left-0 right-0 bottom-0"
                      style={{
                        right: `${Math.max(100 - percentage, 0)}%`,
                      }}
                    >
                      <div
                        className="w-full h-full absolute top-0 left-0 bottom-0 bg-green-200"
                      ></div>
                    </div>
                  )}
                  <div 
                    className={classNames('z-20  relative overflow-hidden text-ellipsis whitespace-nowrap', {
                      'w-[428px]': !isParams,
                      'w-[500px]': isParams,
                    })}
                  >
                    {theme.name}
                  </div>
                </div>
                {!isParams && <div className="flex w-[210px] py-2 gap-2 pl-3 shrink-0 border-l-2 border-slate-600">
                  {selectTheme && 
                    <button onClick={() => selectTheme(theme._id)} className='text-sm hover:text-red-500'>
                      {selectedIds.includes(theme._id) ? 'Отменить' : 'Выделить'}
                    </button>
                  }
                  <div 
                    className={`
                      w-6 h-6
                      rounded-full bg-blue-700 text-center text-white passed-history
                    `}
                    title='Задач в теме'
                  >
                    {theme.count}
                  </div>
                  <div 
                    className={classNames(`w-6 h-6 rounded-full text-center text-white passed-history`, {
                      'bg-blue-700': (passedHistory?.history?.length || 0) < 2,
                      'bg-red-500': (passedHistory?.history?.length || 0) > 1,
                    })}
                    title='Пройдено'
                    onClick={(e) => (passedHistory?.history?.length || 0) > 1 && themeHistoryHandler(e)}
                  >
                    {passedHistory?.history?.length || 0}
                  </div>
                  <div
                    className={classNames(`w-6 h-6 rounded-full text-center text-white passed-history`, {
                      'bg-blue-700': (homeworkHistory?.history?.length || 0) < 2,
                      'bg-red-500': (homeworkHistory?.history?.length || 0) > 1,
                    })}
                    title='Дз отправлено'
                    onClick={(e) => (homeworkHistory?.history?.length || 0) > 1 && themeHistoryHandler(e)}
                  >
                    {homeworkHistory?.history?.length || 0}
                  </div>
                </div>}
              </div>
            </div>
            {user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR' ? (
              <Menu
                as="div"
                style={
                  isParams
                    ? { right: '10px' }
                    : { right: '45px' }
                }
                className={
                  `absolute z-50 top-1/2 -translate-y-1/2 arr-menu h-5 hidden `
                }
              >
                <Menu.Button className="text-gray-800 text-xl">
                  <IoIosArrowDown />
                </Menu.Button>
                <Menu.Items
                  as="div"
                  className={classNames(`absolute -right-6 border bg-white w-[180px] rounded-2xl flex flex-col border-[#B7975A] overflow-hidden`, {
                    'top-full': themeIndex < 2,
                    '-top-full -translate-y-28': themeIndex > 1
                  })}
                >
                  <Menu.Item
                    as="button"
                    onClick={() => theme && setAddProgramMaterialModal(true)}
                    className="border-b border-[#B7975A] py-1 font-medium hover:bg-[#B7975A] hover:text-white"
                  >
                    Add material
                  </Menu.Item>
                  <Menu.Item
                    as="button"
                    onClick={() => theme && editHandler(theme)}
                    className="border-b border-[#B7975A] py-1 font-medium hover:bg-[#B7975A] hover:text-white"
                  >
                    Change studio
                  </Menu.Item>
                  <Menu.Item
                    as="button"
                    onClick={() => theme !== undefined && removeHandler(theme)}
                    className="border-b border-[#B7975A] py-1 font-medium hover:bg-[#B7975A] hover:text-white"
                  >
                    Delete studio
                  </Menu.Item>
                  <Menu.Item
                    as="button"
                    className="py-1 font-medium hover:bg-[#B7975A] hover:text-white"
                    onClick={() => commentHandler(theme)}
                  >
                    Comments
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <div className="absolute right-12 top-1/2 z-50 -translate-y-1/2 arr-menu hidden">
                <button onClick={() => commentHandler(theme)}>
              <FaComment />
            </button>
              </div>
            )}
            {!isParams && <p className="text-sm text-black w-10 ml-1">{`${percentage.toFixed()}%`}</p>}
          </div>
          <ThemeHistoryModal
            active={themeHistoryModal}
            setActive={setThemeHistoryModal}
            passedHistory={passedHistory}
            homeworkHistory={homeworkHistory}
            materialsCount={theme.count}
          />
          {!isParams && firstUnfinishedThemeIdRef.current === theme._id && (
            <div className="flex gap-2 items-center">
              <div className="wave max-w-[685px] ml-4"></div>
              <AiFillQuestionCircle size={24} className="cursor-pointer mb-1 text-red-500" onClick={() => setHelpModal(true)} />
            </div>
          )}
          {'yas' === theme.line && (
            <div className='max-w-[730px] flex items-center'>
              <div className="w-full bg-green-500 mb-2 font-medium text-center text-white">{theme.level}.{lineNumber}</div>
            </div>
          )}
          <Modal className='!bg-white p-5' active={helpModal} setActive={setHelpModal}>
            <p className='text-md'>
              Эта линия помогает вам понять что вы проходите в программе.
              Если студии выше не нужно проходить, так как ученик знает эту тему, просто отметьте эту студию как пройденную.
              Если нужно пройти эту студию, но не сейчас, отложите эту студию на потом.
            </p>
          </Modal>
          <AddProgramMaterialModal
            theme_id={theme._id}
            modal={addProgramMaterialModal}
            setModal={setAddProgramMaterialModal}
          />
        </div>
      );
    },
  )


export default Theme;
