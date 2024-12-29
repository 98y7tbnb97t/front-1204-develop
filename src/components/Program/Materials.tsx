import { AiOutlineCheckSquare } from '@react-icons/all-files/ai/AiOutlineCheckSquare';
import { AiOutlineClockCircle } from '@react-icons/all-files/ai/AiOutlineClockCircle';
import { AiOutlineEdit } from '@react-icons/all-files/ai/AiOutlineEdit';
import { AiOutlineExport } from '@react-icons/all-files/ai/AiOutlineExport';
import { BsFillTrashFill } from '@react-icons/all-files/bs/BsFillTrashFill';
import { AxiosError } from 'axios';
import { FC, useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Link, useParams } from 'react-router-dom';
import Star from '../../assets/pawns/star.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IMaterialResponse } from '../../models/Program/IMaterial';
import { ServerError } from '../../models/response/ServerError';
import GroupService from '../../services/GroupService';
import TestLessonService from '../../services/TestLessonService';
import {
  ITranslateItemString,
  translations,
} from '../../utils/translations.tsx';
import AddProgramMaterialModal from '../Modals/AddProgramMaterialModal';
import AuthErrorModal from '../Modals/AuthError';
import RemoveMaterialModal from '../Modals/RemoveMaterialModal';
import OutlineButton from '../UI/OutlineButton';

import debounce from 'lodash.debounce';
import { themesForLessonRestriction } from '../../constants.ts';
import { IProgramActionsHistory, IUpdatePassedMaterials } from '../../models/response/IGroup.ts';
import {
  setGroup,
  updateMaterialForLesson,
  updatePassedMaterials,
} from '../../store/reducers/GroupSlice.ts';
import './Themes.css';
import PutOffModal from '../Modals/PutOffModal.tsx';
import PostponedMaterialsModal from '../Modals/PostponedMaterialsModal.tsx';
import Switch from '../UI/Switch.tsx';
import MaterialsForLesson from './MaterialsForLesson.tsx';
import SelectedThemes from './SelectedThemes.tsx';
import getBoardOrientation from '../../utils/getBoardOrientation.ts';

interface MaterialsProps {
  active?: string;
  homework?: boolean;
  selectHomeWork?: (value: {
    _id: string;
    position: string;
    seq: number;
    theme_id: string;
    type: string;
  }) => void;
  setActive?: (bool: boolean) => void;
  setActiveTheme?: React.Dispatch<React.SetStateAction<string | undefined>>;
  testlesson?: boolean;
  selMaterials?: string[];
  setSelMaterials?: React.Dispatch<React.SetStateAction<string[]>>;
  setHistory?: (history: IProgramActionsHistory) => void;
  selectedThemes: string[];
  setSelectedThemes: (ids: string[]) => void;
  closeHandler?: () => Promise<void>;
}

const Materials: FC<MaterialsProps> = ({
  homework,
  selectHomeWork,
  testlesson,
  active,
  selMaterials,
  setSelMaterials,
  setActiveTheme,
  setHistory,
  selectedThemes,
  setSelectedThemes,
  closeHandler,
  setActive
}) => {
  const { groupId } = useParams();
  const { materialLesson } = useAppSelector((state) => state.GroupSlice);
  const { group } = useAppSelector((state) => state.GroupSlice);
  const { user } = useAppSelector((state) => state.UserSlice);
  const [modal2, setModal2] = useState<boolean>(false);
  const [modal3, setModal3] = useState<boolean>(false);
  const [materialId, setMaterialId] = useState<string>('');
  const [eModal, setEModal] = useState<boolean>(false);
  const [modalError, setModalError] = useState<string>('');
  const { materials, theme } = useAppSelector((state) => state.ProgramSlice);
  // const [selMaterials, setSelMaterials] = useState<Array<string>>([]);
  const [selAll, setSelAll] = useState<boolean>(false);
  const [selOnLoad, setSelOnLoad] = useState<boolean>(false);
  const [putOffModal, setPutOffModal] = useState<boolean>(false);
  const [material, setMaterial] = useState<IMaterialResponse>();
  const [materialForLesson, setMaterialForLesson] =
    useState<Record<string, IMaterialResponse[]>>(materialLesson);
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const dispatch = useAppDispatch();

  const {
    selectAllTasksOnClossingText,
    selectAllTasksText,
    removeSelectionText,
    goBackToLessonText,
    goBackToHomeworksText
  }: {
    selectAllTasksOnClossingText: ITranslateItemString;
    selectAllTasksText: ITranslateItemString;
    removeSelectionText: ITranslateItemString;
    goBackToLessonText: ITranslateItemString;
    goBackToHomeworksText: ITranslateItemString;
  } = translations.lessons;

  const {
    goTօOnlineLessonText,
  }: {
    goTօOnlineLessonText: ITranslateItemString;
  } = translations.groups;

  const selectMaterialHandler = (material: IMaterialResponse) => {
    if (active === undefined) return;
    const { _id: material_id, theme_id } = material;

    setMaterialForLesson((current: Record<string, IMaterialResponse[]>) => {
      const updatedMaterialForLesson = { ...current };
      const currentMaterials = updatedMaterialForLesson[theme_id] || [];
      const materialIndex = currentMaterials.findIndex(
        (m) => m._id === material_id,
      );
      const nArr = Object.values(updatedMaterialForLesson)
      .flat()
      .map((mat) => mat._id);
    if (nArr.includes(material_id)) {
      const tempArr = nArr.filter((item) => item !== material_id);
      if (setSelMaterials) {
        setSelMaterials(tempArr);
      }
      if (!homework) {
        void updateGroupHandler(tempArr, material_id);
      } else {
        selectHomeWorkHandler(material_id, material.type);
      }
    } else {
      nArr.push(material_id);
      if (setSelMaterials) {
        setSelMaterials((oldState) => [...oldState, material_id]);
      }
      if (!homework) {
        void updateGroupHandler(nArr);
      } else {
        selectHomeWorkHandler(material_id, material.type);
      }
    }
      const themesCount = Object.keys(updatedMaterialForLesson).length;
      if (materialIndex !== -1) {
        const newMaterials = currentMaterials.filter(
          (m) => m._id !== material_id,
        );
        if (newMaterials.length === 0) {
          const { [theme_id]: _, ...rest } = updatedMaterialForLesson;
          return rest;
        } else {
          return { ...updatedMaterialForLesson, [theme_id]: newMaterials };
        }
      } else {
        if (themesCount < themesForLessonRestriction || currentMaterials.length) {
          return {
            ...updatedMaterialForLesson,
            [theme_id]: [...currentMaterials, material],
          };
        } else {
          return updatedMaterialForLesson;
        }
      }
    });
  };
  const debouncedSelectMaterialHandler = debounce(selectMaterialHandler, 50);

  const selectHomeWorkHandler = (material_id: string, type: string) => {
    if (selectHomeWork) {
      const itm = materials.find((material) => material._id === material_id);
      if (itm) {
        selectHomeWork({
          _id: itm._id,
          position: itm.data.tags.FEN,
          seq: itm.seq,
          theme_id: itm.theme_id,
          type,
        });
      }
    }
  };

  const selectHandler = () => {
    for (const material of materials) {
      if (!selMaterials?.includes(material._id) && !selAll) {
        selectMaterialHandler(material);
      } else if (selMaterials?.includes(material._id) && selAll) {
        selectMaterialHandler(material);
      }
    }
  };

  const updateGroupHandler = async (data: Array<string>, material_id?: string) => {
    if (groupId) {
      if (testlesson) {
        await TestLessonService.editGroup(groupId, { program: data }).catch(
          (e: AxiosError) => {
            const event = e.response?.data as ServerError;
            setModalError(event.error);
            setEModal(true);
          },
        );
      } else {
        await GroupService.editGroup(groupId, { 
          program: data, 
          deletedProgram: material_id ? [...group.deletedProgram.map((item) => item._id), material_id].filter((item) => !data.includes(item)) : undefined })
        .then(res => {
          dispatch(setGroup(res.data.group));
        })
        .catch(
          (e: AxiosError) => {
            const event = e.response?.data as ServerError;
            setModalError(event.error);
            setEModal(true);
          },
        );
        
      }
    }
  };

  const selAllOnLoad = (e: boolean) => {
    setSelOnLoad(e);
    localStorage.setItem('selectMaterialsOnLoad', e.toString());
  };

  const countChoicedMaterials = () => {
    if (active === undefined) {
      return 0;
    }
    if (active && materialLesson[active]) {
      return materialLesson[active].length;
    }
    return 0;
  };

  const CustomPieceRenderer = (props, custom) => {
    const { square, squareWidth } = props;
    const tmp = [] as Array<string>;
    custom.map((item) => {
      tmp.push(item.square);
    });
    return (
      <>
        {tmp.includes(square) ? (
          <img
            style={{ margin: '10% auto' }}
            width="80%"
            height="80%"
            src={Star}
            alt=""
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width={squareWidth}
            height={squareWidth}
            viewBox={'1 1 43 43'}
          >
            <path d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z" />
          </svg>
        )}
      </>
    );
  };

  const updatePassedMaterial = async (
    material: IMaterialResponse | IMaterialResponse[],
    type: 'add' | 'restore',
  ) => {
    if (!groupId) {
      return;
    }

    let materials: IMaterialResponse[];
    let themeId: string;

    if (Array.isArray(material)) {
      materials = material;
      themeId = materials[0].theme_id;
    } else {
      materials = [material];
      themeId = material.theme_id;
    }

    const payload: IUpdatePassedMaterials = {
      groupId,
      payload: {
        themeId,
        materialId: materials.map((m) => m._id),
        type,
        addToHistory: false,
        section: 'program',
      },
    };

    if (type === 'add') {
      try {
        await dispatch(updatePassedMaterials(payload)).unwrap();
      } catch (error) {
        console.error('Error updating passed material:', error);
      }
    } else if (type === 'restore') {
      if (group.passed) {
        if (
          group.passed.some((theme) =>
            theme.materials.some((m) =>
              materials.some((mat) => mat._id === m.material),
            ),
          )
        ) {
          try {
            await dispatch(updatePassedMaterials(payload)).unwrap();
          } catch (error) {
            console.error('Error updating passed material:', error);
          }
        }
      }
    }
  };

  const isMaterialPassed = (materialId: string) => {
    if (!group.passed) return false;
    return group.passed.some((theme) =>
      theme.materials.some((m) => m.material === materialId),
    );
  };

  const isMaterialPostponed = (materialId: string) => {
    if (!group.timer) return false;
    return group.timer.some((theme) =>
      theme.materials.some((m) => (m.material as unknown as string) === materialId),
    );
  };

  useEffect(() => {
    if (setSelMaterials) {
      setSelMaterials(
        Object.values(materialForLesson)
          .flat()
          .map((mat) => mat._id),
      );
    }
    
  }, [theme, materialForLesson]);

  useEffect(() => {
    if (selMaterials && selMaterials.length === materials.length) {
      setSelAll(true);
    } else setSelAll(false);
  }, [materials.length, selMaterials])

  useEffect(() => {
    dispatch(updateMaterialForLesson(materialForLesson));
  }, [materialForLesson, dispatch]);

  useEffect(() => {
    setMaterialForLesson(materialLesson);
  }, [materialLesson]);

  useEffect(() => {
    if (groupId && materials) {
      if (localStorage.getItem('selectMaterialsOnLoad') === 'true') {
        setSelOnLoad(true);
      }
    }
  }, [groupId, materials, active]);

  useEffect(() => {
    void (function () {
      if (selOnLoad) {
        for (const material of materials) {
          if (!selMaterials?.includes(material._id)) {
            selectMaterialHandler(material);
          }
        }
      }
    })()
  }, [materials]);

  useEffect(() => {
    if (groupId) {
      const fetchData = async () => {
        if (testlesson) {
          await TestLessonService.getGroup(groupId).then((result) => {
            const tmp: Array<string> = [];
            result.data.group.program.map((item) => {
              tmp.push(item._id);
            });
            if (setSelMaterials) {
              setSelMaterials(tmp);
            }
          });
        } else {
          await GroupService.getGroup(groupId).then((result) => {
            const tmp: Array<string> = [];
            result.data.group.program.map((item) => {
              tmp.push(item._id);
            });
            if (setSelMaterials) {
              setSelMaterials(tmp);
            }
          });
        }
      };
      void fetchData();
    }
    return () => {
      setActiveTheme?.('');
    };
  }, [groupId]); // eslint-disable-line react-hooks/exhaustive-deps

  const isOnlineLesson = window.location.href.includes('online-lesson');
  return (
    <div className="h-full flex flex-col w-full items-center">
      {selectedThemes.length === 0 && setSelMaterials && setActiveTheme && groupId && <MaterialsForLesson
        active={active}
        setActive={setActiveTheme}
        selMaterials={selMaterials || []}
        setSelMaterials={setSelMaterials}
      />}
      {
        selectedThemes.length > 0 && <SelectedThemes selectedThemes={selectedThemes} setSelectedThemes={setSelectedThemes} />
      }
      {theme && groupId && (
        <>
        {groupId && !isOnlineLesson && !homework && (
          <Link
            to={groupId ? `/group/${groupId}/online-lesson` : ''}
            className='mr-auto'
          >
            <OutlineButton
              className={['w-1/2 bg-gradient-menu text-white !border-0'].join(' ')}
            >
              {goTօOnlineLessonText[language]}
            </OutlineButton>
          </Link>
        )}
        {closeHandler && isOnlineLesson && <OutlineButton
          onClick={() => {
            void closeHandler();
          }}
          className={['!w-1/2 bg-gradient-menu text-white !border-0 mr-auto'].join(' ')}
        >
          {goBackToLessonText[language]}
        </OutlineButton>}
        {homework && <OutlineButton
          onClick={() => {
            void setActive?.(false);
          }}
          className={['!w-1/2 bg-gradient-menu text-white !border-0 mr-auto !text-base'].join(' ')}
        >
          {goBackToHomeworksText[language]}
        </OutlineButton>}

        <div className='flex justify-between items-center w-full mb-3'>
          <Switch
            className="mr-2 border-none"
            label={selectAllTasksOnClossingText[language]}
            value={selOnLoad}
            onChange={selAllOnLoad}
          />
          <span className="px-2">{`${countChoicedMaterials()}/${
            materials.length
          }`}</span>
          <OutlineButton className='!py-2 my-2 max-2xl:my-1 !w-[250px] !text-base max-2xl:!text-sm' onClick={()=> void selectHandler()}>{selAll ? removeSelectionText[language] : selectAllTasksText[language]}</OutlineButton>
        </div>
        </>
      )}
      <div
        style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))' }}
        className="theme-container grid flex-wrap justify-start w-full overflow-auto"
      >
        {active !== undefined &&
          materials.map((material) => (
            <div
              key={material._id}
              onClick={() =>
                groupId ? (void debouncedSelectMaterialHandler(material)) : null
              }
              className={[
                'border-black mr-2 mb-2 max-w-[350px] relative before:absolute before:top-0 before:left-0 before:bg-transparent before:w-full before:h-full before:z-10 cursor-pointer',
                '[&>button]:hover:flex',
              ].join(' ')}
            >
              {theme && !groupId && (
                <>
                  <button
                    onClick={() => {
                      setMaterialId(material._id);
                      setMaterial(material);
                      setModal3(true);
                    }}
                    className="hidden absolute top-0 right-10 bg-white p-2 rounded-md shadow-lg text-blue-600 text-lg z-10 justify-center items-center"
                    title="Edit"
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    onClick={() => {
                      setMaterialId(material._id);
                      setModal2(true);
                    }}
                    className="hidden absolute top-0 right-0 bg-white p-2 rounded-md shadow-lg text-red-600 text-lg z-10 justify-center items-center"
                    title="Remove"
                  >
                    <BsFillTrashFill />
                  </button>
                </>
              )}
              {theme && groupId && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      void updatePassedMaterial(material, 'add');
                    }}
                    className="hidden absolute top-1 right-20 bg-white p-2 rounded-md shadow-lg text-blue-600 text-lg z-20 justify-center items-center"
                    title="Пройдено"
                  >
                    <AiOutlineCheckSquare />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMaterialId(material._id);
                      setPutOffModal(true);
                    }}
                    className="hidden absolute top-1 right-10 bg-white p-2 rounded-md shadow-lg text-red-600 text-lg z-20 justify-center items-center"
                    title="Отложить"
                  >
                    <AiOutlineClockCircle />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      void updatePassedMaterial(material, 'restore');
                    }}
                    className="hidden absolute top-1 right-0 bg-white p-2 rounded-md shadow-lg text-black text-lg z-20 justify-center items-center"
                    title="Не пройдено"
                  >
                    <AiOutlineExport />
                  </button>
                </>
              )}
              <div className={isMaterialPassed(material._id) ? 'border-4 border-green-500 relative' : 'relative'}>
                {groupId && !isMaterialPassed(material._id) && isMaterialPostponed(material._id) && (
                  <div className="text-white bg-blue-400/25 absolute w-full h-full z-10 flex justify-center items-center">
                    <span className=' drop-shadow-3xl'> Отложено на потом </span>
                  </div>
                )}
                {
                  isMaterialPassed(material._id) && (
                    <div className="text-white bg-green-500/15 absolute w-full h-full z-10 flex justify-center items-center">
                      <span className=' drop-shadow-3xl'> Пройдено </span>
                    </div>
                  )
                }
                {Object.values(materialLesson)
                .flat()
                .map((mat) => mat._id)
                .includes(material._id) &&
                groupId && (
                  <div className="bg-black bg-opacity-50 absolute w-full h-full z-10 text-white flex justify-center items-center">
                    Добавлено в урок
                  </div>
                )}
                <Chessboard
                  animationDuration={0}
                  position={material.data.tags.FEN}
                  boardOrientation={getBoardOrientation(material.data.tags.FEN)}
                  customPieces={
                    material.custom.length > 0 && {
                      bP: (props) => CustomPieceRenderer(props, material?.custom),
                    }
                  }
                />
              </div>
            </div>
          ))}
      </div>

      {theme && groupId && (
        <AuthErrorModal
          modal={eModal}
          setModal={setEModal}
          error={modalError}
        />
      )}
      {modal3 && (
        <AddProgramMaterialModal
          material={material}
          edit={true}
          theme_id={theme}
          modal={modal3}
          setModal={setModal3}
        />
      )}

      {theme && !groupId && modal2 && (
        <RemoveMaterialModal
          modal={modal2}
          setModal={setModal2}
          material_id={materialId}
        />
      )}
      {materialId && theme && setHistory && groupId && (
        <PutOffModal
          active={putOffModal}
          setActive={setPutOffModal}
          materialIds={[materialId]}
          themeIds={[theme]}
          groupId={groupId}
          setHistory={setHistory}
        />
      )}
      { groupId && setActiveTheme && setHistory && (
          <PostponedMaterialsModal
            groupId={groupId}
            setActiveTheme={setActiveTheme}
            selectMaterialHandler={selectMaterialHandler}
            setHistory={setHistory}
          />
        )}
    </div>
  );
};

export default Materials;
