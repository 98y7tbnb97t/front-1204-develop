import { FC, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Filter from '../components/Program/Filter';
import Materials from '../components/Program/Materials';
import Themes from '../components/Program/Themes';
import TopMenu from '../components/UI/TopMenu/TopMenu';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { ITopMenu } from '../models/ITopMenu';
import { getMaterials, getThemes, setThemes } from '../store/reducers/ProgramSlice.ts';
import { ITranslateItemString, translations } from '../utils/translations.tsx';
import { IProgramActionsHistory } from '../models/response/IGroup.ts';
import { getGroup, resetMaterialLesson, setGroup } from '../store/reducers/GroupSlice.ts';

const ProgramPage: FC = () => {
  const [selMaterials, setSelMaterials] = useState<string[]>([]);
  const { pathname } = useLocation();
  const { groupId } = useParams();
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const [history, setHistory] = useState<IProgramActionsHistory>();
  const dispatch = useAppDispatch();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const {
    programText,
    homeworkText,
    groupDescriptionText,
    historyText,
    onlineLessonText,
    participantsText,
  }: {
    programText: ITranslateItemString;
    homeworkText: ITranslateItemString;
    groupDescriptionText: ITranslateItemString;
    historyText: ITranslateItemString;
    onlineLessonText: ITranslateItemString;
    participantsText: ITranslateItemString;
    goTօOnlineLessonText: ITranslateItemString;
  } = translations.groups;
  const menu = useMemo(() => {
    return groupId
    ? [
        { id: 0, name: programText[language] },
        {
          id: 1,
          name: onlineLessonText[language],
          path: `/group/${groupId}/online-lesson`,
        }, // eslint-disable-line @typescript-eslint/restrict-template-expressions,
        {
          id: 2,
          name: homeworkText[language],
          path: `/group/${groupId}/homework`,
        }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        { id: 3, name: participantsText[language] },
        { id: 4, name: groupDescriptionText[language] },
        {
          id: 5,
          name: historyText[language],
          path: `/group/${groupId}/history`,
        }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
      ]
    : []
  }, [groupId]);

  const [changeOrder, setChangeOrder] = useState<boolean>(true);
  const [active, setActive] = useState<string | undefined>();
  const isGroupPage = pathname.includes('group');

  const containerHight = isGroupPage
    ? 'h-[calc(100vh-124px)]'
    : 'h-[calc(100vh-60px)]';

  useEffect(() => {
    if (active) {
      void dispatch(getMaterials(active));
    }
  }, [active, dispatch]);

  useEffect(() => {
    setSelMaterials([]);
    dispatch(resetMaterialLesson());
  }, [dispatch, groupId]);


  useEffect(() => {
    const fetchData = async () => {
      if (groupId) {
        await dispatch(getGroup(groupId));
      } else {
        dispatch(setGroup({}))
      }
    };
    void fetchData();
  }, [groupId]);

  return (
    <div className="w-full flex  flex-col lg:overflow-y-auto h-full">
      <TopMenu menu={menu} />
      <div
        className={`flex ${containerHight}  flex-col bg-[#F0F0F0] rounded-3xl mx-3 my-3`}
      >
        <Filter setSelectedThemes={setSelectedIds} setChangeOrder={setChangeOrder} activeTheme={active} setActiveTheme={setActive}/>
        <div className="flex h-full gap-3 justify-between px-2 xl:px-5 py-1 overflow-y-auto min-h-[500px]">
        
          <div
            className='w-full h-full'
          >
            <Themes
              changeOrder={changeOrder}
              active={active ?? ''}
              setActive={setActive}
              history={history}
              setHistory={setHistory}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          </div>
          <Materials
            active={active}
            setActiveTheme={setActive}
            selMaterials={selMaterials}
            setSelMaterials={setSelMaterials}
            setHistory={setHistory}
            selectedThemes={selectedIds}
            setSelectedThemes={setSelectedIds}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgramPage;
