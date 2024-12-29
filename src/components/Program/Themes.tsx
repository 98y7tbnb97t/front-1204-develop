import { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactMouseSelect, TFinishSelectionCallback } from 'react-mouse-select';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ITheme } from '../../models/Program/ITheme';
import { IProgramActionsHistory, IUpdatePassedMaterials } from '../../models/response/IGroup.ts';
import { setMaterials, updateThemeOrders } from '../../store/reducers/ProgramSlice';
import AddProgramThemeModal from '../Modals/AddProgramThemeModal';
import RemoveThemeModal from '../Modals/RemoveThemeModal';
import OutlineButton from '../UI/OutlineButton';
import Theme from './Theme';

import { updatePassedMaterials } from '../../store/reducers/GroupSlice.ts';
import './Themes.css';
import CommentFirstModal from '../OnlineLesson/Program/Modals/CommentFirstModal.tsx';
import classNames from 'classnames';
import PutOffModal from '../Modals/PutOffModal.tsx';
import ProgramActionsHistoryModal from '../Modals/ProgramActionsHistoryModal.tsx';
import { ReactSortable } from 'react-sortablejs';
import ConfirmUpdatePassedThemesModal from '../Modals/ConfirmUpdatePassedThemesModal.tsx';
import { AiFillQuestionCircle } from '@react-icons/all-files/ai/AiFillQuestionCircle';
import Modal from '../UI/Modal.tsx';

interface ThemesProps {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string | undefined>>;
  changeOrder?: boolean;
  history?: IProgramActionsHistory;
  setHistory?: (history: IProgramActionsHistory) => void;
  closeHandler?: () => Promise<void>;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

type FilterTypes = 'all' | 'passed' | 'notPassed' | 'postponed';

const Themes: FC<ThemesProps> = ({ changeOrder, active, setActive, history, setHistory, closeHandler, selectedIds, setSelectedIds }) => {
  const { groupId } = useParams();
  const [modal, setModal] = useState<boolean>(false);
  const [modal2, setModal2] = useState<boolean>(false);
  const [modal3, setModal3] = useState<boolean>(false);
  const [putOffModal, setPutOffModal] = useState<boolean>(false);
  const [theme, setTheme] = useState<ITheme | undefined>();
  const { themes } = useAppSelector((state) => state.ProgramSlice);
  const { user } = useAppSelector((state) => state.UserSlice);
  const { group } = useAppSelector((state) => state.GroupSlice);
  const [edit, setEdit] = useState<boolean>(false);
  const [filteredThemes, setFilteredThemes] = useState<(ITheme & { id: string })[]>([]);
  const [selectedIdsTemp, setSelectedIdsTemp] = useState<string[]>([]);
  const [passedThemes, setPassedThemes] = useState<ITheme[]>([]);
  const [notPassedThemes, setNotPassedThemes] = useState<ITheme[]>([]);
  const [postponedThemes, setPostponedThemes] = useState<ITheme[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FilterTypes>('all');
  const [currentSelectionFilter, setCurrentSelectionFilter] = useState<FilterTypes | null>();
  const [programActionsHistoryModal, setProgramActionsHistoryModal] = useState<boolean>(false);
  const [confirmUpdatePassedThemesModal, setConfirmUpdatePassedThemesModal] = useState<boolean>(false);
  const [helpModal, setHelpModal] = useState<boolean>(false);
  const [updatePassedThemesType, setUpdatePassedThemesType] = useState<'add' | 'restore'>('add');
  const firstUnfinishedThemeIdRef = useRef<string | null>(null);
  let lineNumber = 0;
  const dispatch = useAppDispatch();
  
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const reorderedRef = useRef<boolean | null>(false);
  const isCtrlPressedRef = useRef<boolean | null>(false);

  const borderSelectionContainer = document.getElementById('portal') as HTMLElement;

  const [firstCommentModal, setFirstCommentModal] = useState(false);

  useEffect(() => {
    const DragEndHandler = async () => {
      if (!reorderedRef.current) {
        return;
      }
      reorderedRef.current = false;
      const updatedThemes = filteredThemes.map((t: ITheme, index: number) => ({
        ...t,
        order: index + 1,
      }));
  
      try {
        changeOrder &&
          (await dispatch(updateThemeOrders({ themes: updatedThemes })));
      } catch (error) {
        console.error('Error updating theme orders:', error);
      }
    };
    void DragEndHandler()
  }, [filteredThemes, changeOrder, dispatch])

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey) {
        isCtrlPressedRef.current = true;
      }
    });
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Control') {
        setTimeout(() => {
          isCtrlPressedRef.current = false;
        }, 500)
      }
    });
  }, [])

  const createThemeHandler = () => {
    setEdit(false);
    setModal(true);
  };

  const editHandler = (theme: ITheme) => {
    setTheme(theme);
    setModal2(true);
    setEdit(true);
  };
  const removeHandler = (theme: ITheme) => {
    setTheme(theme);
    setModal3(true);
  };

  const commentHandler = (theme: ITheme) => {
    setTheme(theme);
    setFirstCommentModal(true);
  };

  const isMainPage =
    (user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') && !groupId;

  const handleDeselectAll = () => {
    setCurrentSelectionFilter(null);
    setSelectedIds([]);
    setActive('');
    dispatch(setMaterials([]));
  };

  const handleSelectAll = () => {
    setSelectedIds(filteredThemes.map((t) => t._id));
    setCurrentSelectionFilter('all');
    setActive('');
    dispatch(setMaterials([]));
  };

  const classOutlineButton =
    '!py-2 !text-[12px] leading-[1] !px-[5px] !min-w-[150px] text-unwrap hover:border-red-500 hover:text-red-500';

  const updatePassedMaterial = async (type: 'add' | 'restore') => {
    if (!groupId) {
      console.error('groupId is not available');
      return;
    }
    let payload: IUpdatePassedMaterials | null = null;

    if (groupId && selectedIds.length > 0) {
      payload = {
        groupId,
        payload: {
          themeId: selectedIds,
          materialId: [],
          type,
          addToHistory: false,
          section: 'program'
        },
      };
    }
    if (payload) {
      try {
        const res = await dispatch(updatePassedMaterials(payload)).unwrap();
        setHistory?.(res.programActionsHistory);
        setActive('');
        setSelectedIds([]);
        setSelectedIdsTemp(selectedIds);
        setCurrentSelectionFilter(null);
        dispatch(setMaterials([]));
      } catch (error) {
        console.error('Error updating passed material:', error);
      }
    }
  };

  const confirmUpdatePassedThemes = (type: 'add' | 'restore') => {
    setConfirmUpdatePassedThemesModal(true);
    setUpdatePassedThemesType(type);    
  }

  const handleConfirmUpdatePassedThemes = (type: 'add' | 'restore') => {
    void updatePassedMaterial(type);
  }

  useEffect(() => {
    if (active && scrollRef.current) {
      const activeThemeIndex = filteredThemes.findIndex(
        (theme) => theme._id === active,
      );
      const themeElements = scrollRef.current.querySelectorAll('.theme-item');
      if (themeElements[activeThemeIndex]) {
        setTimeout(() => {
          themeElements[activeThemeIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          scrollRef.current = null
        }, 200)
      }
    }
  }, [active, scrollRef, filteredThemes]);

  useEffect(() => {
    switch (currentFilter) {
      case 'all':
        setFilteredThemes(themes.map(theme => ({...theme, id: theme._id})));
        break;
      case 'passed':
        setFilteredThemes(passedThemes.map(theme => ({...theme, id: theme._id})));
        break;
      case 'notPassed':
        setFilteredThemes(notPassedThemes.map(theme => ({...theme, id: theme._id})));
        break;
      case 'postponed':
        setFilteredThemes(postponedThemes.map(theme => ({...theme, id: theme._id})));
        break;
    }
    
  }, [themes, currentFilter, setFilteredThemes, passedThemes, notPassedThemes, postponedThemes]);
  useEffect(() => {
    setPassedThemes(themes.filter(t => group.passed?.some(p => p.theme === t._id)));
    setNotPassedThemes(themes.filter(t => group.passed?.every(p => p.theme !== t._id)));
    setPostponedThemes(themes.filter(theme => group.timer?.some(t => (t.theme as unknown as string) === theme._id)));
  }, [themes, group]);


  const handleFilterChange = (filter: FilterTypes) => {
    setSelectedIds([]);
    setCurrentSelectionFilter(null);
    setActive('');
    dispatch(setMaterials([]));
    if (currentFilter === filter) {
      setCurrentFilter('all');
    } else {
      setCurrentFilter(filter);
    }
  }

  const selectThemes = (filter: FilterTypes) => {
    setCurrentFilter('all');
    setActive('');
    setSelectedIdsTemp([]);
    dispatch(setMaterials([]));
    if (currentSelectionFilter === filter) {
      setCurrentSelectionFilter(null);
      setSelectedIds([]);
      return;
    }
    setCurrentSelectionFilter(filter);
    
    switch (filter) {
      case 'passed':
        setSelectedIds(passedThemes.map(t => t._id));
        break;
      case 'notPassed':
        setSelectedIds(notPassedThemes.map(t => t._id));
        break;
      case 'postponed':
        setSelectedIds(postponedThemes.map(t => t._id));
        break;
    }
  }
  if (group.passed?.length && firstUnfinishedThemeIdRef.current === null && themes.length > 0) {
    firstUnfinishedThemeIdRef.current = themes.find(t => !group.passed?.some(p => p.theme === t._id))?._id || null
  }

  useEffect(() => {
    if (firstUnfinishedThemeIdRef.current) setActive(firstUnfinishedThemeIdRef.current);
  }, [firstUnfinishedThemeIdRef.current]);

  useEffect(() => {
    firstUnfinishedThemeIdRef.current = null;
  }, [groupId]);

  const renderThemes = () => {
    return filteredThemes.map((t) => {
      if (t?.line === 'yas') {
        lineNumber++;
      }
      return {theme: t, lineNumber};
    }).map(({theme, lineNumber}) => (
      <Theme
        firstUnfinishedThemeIdRef={firstUnfinishedThemeIdRef}
        editHandler={editHandler}
        removeHandler={removeHandler}
        commentHandler={commentHandler}
        active={active || ''}
        setActive={setActive}
        key={theme._id}
        theme={theme}
        ref={containerRef}
        selectedIds={selectedIds}
        selectedIdsTemp={selectedIdsTemp}
        setSelectedIdsTemp={setSelectedIdsTemp}
        postponedThemes={postponedThemes.map(t => t._id)}
        passedThemes={passedThemes.map(t => t._id)}
        selectTheme={selectTheme}
        lineNumber={lineNumber}
      />
    ));
  };

  const selectTheme = (themeId: string) => {
    if (selectedIds.includes(themeId)) {
      setSelectedIds(selectedIds.filter(id => id !== themeId));
    } else {
      setSelectedIds([...selectedIds, themeId]);
    }
    setSelectedIdsTemp([]);
  }

  const handleMarkThemes = (type: 'add' | 'restore' | 'putoff') => {
    switch (type) {
      case 'add':
        confirmUpdatePassedThemes('add');
        break;
      case 'restore':
        confirmUpdatePassedThemes('restore');
        break;
      case 'putoff':
        setPutOffModal(true);
    } 
  }

  const handlePutOffSubmit = () => {
    setCurrentSelectionFilter(null);
    setSelectedIds([]);
    setSelectedIdsTemp(selectedIds);
    setActive('');
    dispatch(setMaterials([]));
  }

  const finishSelection: TFinishSelectionCallback = (items) => {
    const selectedIdsNow = items.map(item => item.getAttribute('data-id') || '');
    if (selectedIdsNow.length < 2) return;
    console.log(isCtrlPressedRef.current)
    if (isCtrlPressedRef.current) {
      setSelectedIds(prev => ([...prev, ...selectedIdsNow]));
    } else {
      setSelectedIds(selectedIdsNow);
    }
  }

  return (
    <div className={'w-full h-full flex flex-col'}>
      <div className="flex items-center"></div>
      {groupId && (
              <div className=''>
                <div className="z-50 flex gap-1 justify-center items-center pr-9 mb-1">
                  <div>
                    <div className="flex gap-1 items-center my-1">
                      <AiFillQuestionCircle size={24} className="cursor-pointer text-red-500" onClick={() => setHelpModal(true)}/>
                      <OutlineButton
                        className={[classOutlineButton, '!bg-green-100'].join(' ')}
                        onClick={() => void handleMarkThemes('add')}
                        disabled={selectedIds.length === 0}
                      >
                        Отметить как пройдено
                      </OutlineButton>
                    </div>
                    <div className="flex gap-1 items-center my-1">
                      <AiFillQuestionCircle size={24} className="cursor-pointer text-red-500" onClick={() => setHelpModal(true)}/>
                      <OutlineButton
                        className={classOutlineButton}
                        onClick={() => void handleMarkThemes('restore')}
                        disabled={selectedIds.length === 0}
                      >
                        Отметить как непройдено
                      </OutlineButton>
                    </div>
                    <div className="flex gap-1 items-center my-1">
                      <AiFillQuestionCircle size={24} className="cursor-pointer text-red-500" onClick={() => setHelpModal(true)}/>
                      <OutlineButton
                        className={[classOutlineButton, '!bg-blue-400/25'].join(' ')}
                        onClick={() => handleMarkThemes('putoff')}
                        disabled={selectedIds.length === 0}
                      >
                        Отложить на потом
                      </OutlineButton>
                    </div>
                    <div className="flex gap-1 items-center my-1">
                      <OutlineButton
                        className={[classOutlineButton, 'ml-6 !mt-0 !mb-0'].join(' ')}
                        onClick={() => setProgramActionsHistoryModal(true)}
                      >
                        История
                      </OutlineButton>
                    </div>
                  </div>
                  <div>
                    <OutlineButton
                      className={[classOutlineButton, '!bg-green-100 my-1 !mt-0'].join(' ')}
                      dark={currentFilter === 'passed'}
                      onClick={() => handleFilterChange('passed')}
                    >
                      Все пройденные {passedThemes.length}
                    </OutlineButton>
                    <OutlineButton
                      className={classOutlineButton}
                      dark={currentFilter === 'notPassed'}
                      onClick={() => handleFilterChange('notPassed')}
                    >
                      Все непройденные {notPassedThemes.length}
                    </OutlineButton>
                    <OutlineButton
                      className={[classOutlineButton, '!bg-blue-400/25 my-1'].join(' ')}
                      dark={currentFilter === 'postponed'}
                      onClick={() => handleFilterChange('postponed')}
                    >
                      Отложенные на потом {postponedThemes.length}
                    </OutlineButton>
                    <div className="text-center">
                      {selectedIds.length}/{themes.length}
                    </div>
                  </div>
                  <div>
                  <div>
                    <OutlineButton
                      className={classNames(classOutlineButton, {
                        'bg-slate-400': currentFilter === 'passed'
                      }, ['!bg-green-100 my-1 !mt-0'])}
                      onClick={() => void selectThemes('passed')}
                      dark={currentSelectionFilter === 'passed'}
                    >
                      {currentSelectionFilter === 'passed' ? 'Снять выделение у всех пройденных ' : 'Выделить все пройденные '}
                      {passedThemes.length}
                    </OutlineButton>
                    <OutlineButton
                      className={classOutlineButton}
                      onClick={() => void selectThemes('notPassed')}
                      dark={currentSelectionFilter === 'notPassed'}
                    >
                      {currentSelectionFilter === 'notPassed' ? 'Снять выделение у всех непройденных ' : 'Выделить все непройденные '}
                      {notPassedThemes.length}
                    </OutlineButton>
                    <OutlineButton
                      className={[classOutlineButton, '!bg-blue-400/25 my-1'].join(' ')}
                      onClick={() => void selectThemes('postponed')}
                      dark={currentSelectionFilter === 'postponed'}
                    >
                      {currentSelectionFilter === 'postponed' ? 'Снять выделение у всех отложенных ' : 'Выделить все отложенные '}
                      {postponedThemes.length}
                    </OutlineButton>
                    <div className='flex gap-1 mt-1'>
                      <OutlineButton
                        className={[classOutlineButton, 'w-max'].join(' ')}
                        onClick={() => handleDeselectAll()}
                        disabled={selectedIds.length === 0}
                      >
                        Снять выделение
                      </OutlineButton>
                      <OutlineButton
                        className={[classOutlineButton, 'w-max'].join(' ')}
                        onClick={handleSelectAll}
                        dark={currentSelectionFilter === 'all'}
                      >
                        Выделить все
                      </OutlineButton>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            )}
      <div
        className="flex theme-container flex-col w-full max-w-[770px] items-center max-2xl:items-start  mr-2 overflow-auto position-relative"
        ref={containerRef}
      >
      
        <div ref={scrollRef} className="w-full">
          {location.pathname === '/program' ? (
            <ReactSortable 
                list={filteredThemes} 
                setList={setFilteredThemes} 
                animation={200}
                onEnd={() => {reorderedRef.current = true}}
            >
              {renderThemes()}
            </ReactSortable>
          ) : (
            <>
              {renderThemes()}
            </>
          )}
        </div>
        {!isMainPage &&<ReactMouseSelect
          containerRef={scrollRef}
          portalContainer={borderSelectionContainer}
          itemClassName={'theme-item'}
          finishSelectionCallback={finishSelection}
        />}

        {!edit && (
          <AddProgramThemeModal modal={modal} setModal={setModal} edit={edit} />
        )}
        {edit && theme && (
          <AddProgramThemeModal
            modal={modal2}
            setActive={setActive}
            setModal={setModal2}
            theme={theme}
            edit={edit}
            changeOrder={changeOrder}
          />
        )}
        {theme && (
          <RemoveThemeModal modal={modal3} setModal={setModal3} theme={theme} />
        )}
        {theme && <CommentFirstModal
          openModal={firstCommentModal}
          setOpenModal={setFirstCommentModal}
          groupId={theme?._id}
          type={'STUDIO'}
        />}
        {setHistory && <PutOffModal
          active={putOffModal}
          setActive={setPutOffModal}
          materialIds={[]}
          themeIds={selectedIds}
          groupId={groupId}
          setHistory={setHistory}
          onSubmit={handlePutOffSubmit}
        />}
        {setHistory && groupId && <ProgramActionsHistoryModal
          active={programActionsHistoryModal}
          setActive={setProgramActionsHistoryModal}
          group_id={groupId}
          history={history}
          setHistory={setHistory}
          section='program'
        />}
      </div>
        <ConfirmUpdatePassedThemesModal
          active={confirmUpdatePassedThemesModal}
          setActive={setConfirmUpdatePassedThemesModal}
          selectedThemes={selectedIds}
          handleConfirm={handleConfirmUpdatePassedThemes}
          type={updatePassedThemesType}
        />
        <Modal className='!bg-white p-5' active={helpModal} setActive={setHelpModal}>
          <p className='text-md'>
            Для того чтобы отметить студию как пройденную, непройденную или отложенную на потом, сначала выделяйте ее в списке кнопкой "Выделить".
          </p>
        </Modal>
    </div>
  );
};

export default Themes;


