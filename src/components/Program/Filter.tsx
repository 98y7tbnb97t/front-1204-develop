import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllThemes, setMaterials, setThemes } from '../../store/reducers/ProgramSlice';
import {
  ITranslateItemString,
  translations,
} from '../../utils/translations.tsx';
import OutlineButton from '../UI/OutlineButton';
import Popover from '../UI/Popover.tsx';
import './Filter.css';
import { useDebounce } from '../../hooks/useDebounce.ts';
import AddProgramThemeModal from '../Modals/AddProgramThemeModal.tsx';
import { useParams } from 'react-router-dom';

interface FilterProps {
  setChangeOrder?: (value: boolean) => void;
  activeTheme?: string;
  setActiveTheme?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedThemes: (ids: string[]) => void;
}

const Filter: FC<FilterProps> = ({ setChangeOrder, activeTheme, setActiveTheme, setSelectedThemes }) => {
  const { groupId } = useParams();
  const dispatch = useAppDispatch();
  const [levels] = useState<Array<{ id: number; level: number }>>([
    { id: 0, level: 1 },
    { id: 1, level: 2 },
    { id: 2, level: 3 },
    { id: 3, level: 4 },
    { id: 4, level: 5 },
    { id: 5, level: 6 },
    { id: 6, level: 7 },
    { id: 7, level: 8 },
    { id: 8, level: 9 },
    { id: 9, level: 10 },
  ]);
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const role = useAppSelector((state) => state.UserSlice.user.role);
  const { user } = useAppSelector((state) => state.UserSlice);
  const getDefaultOpenLevels = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [addProgramThemeModal, setAddProgramThemeModal] = useState(false);
  const openLevel =
    role === 'DIRECTOR' || role === 'ZDIRECTOR'
      ? getDefaultOpenLevels()
      : user.open_level && user.open_level.length > 0
      ? user.open_level
      : getDefaultOpenLevels();

  const {
    endgameText,
    middleGameText,
    strategyText,
    oppeningText,
    tacticsText,
    resetFiltersText,
  }: {
    endgameText: ITranslateItemString;
    middleGameText: ITranslateItemString;
    strategyText: ITranslateItemString;
    oppeningText: ITranslateItemString;
    tacticsText: ITranslateItemString;
    resetFiltersText: ITranslateItemString;
  } = translations.lessons;

  const {
    addThemeText,
  }: {
    addThemeText: ITranslateItemString;
  } = translations.schoolProgram;

  const [strategies] = useState<
    Array<{ id: number; name: string; slug: string; dark?: boolean }>
  >([
    { id: 0, name: endgameText[language], slug: 'endshpil' },
    { id: 1, name: middleGameText[language], slug: 'mittelshpil' },
    { id: 2, name: strategyText[language], slug: 'strategy' },
    { id: 3, name: oppeningText[language], slug: 'debut' },
    { id: 4, name: tacticsText[language], slug: 'tactic' },
    { id: 5, name: resetFiltersText[language], slug: '', dark: true },
  ]);

  const arrLevels = [...openLevel];
  const startLevel: number = openLevel.length
    ? arrLevels.sort((a, b) => a - b)[0]
    : 1;
  type DataType = { strategy: string; level: number | null };
  const [data, setData] = useState<DataType>({
    strategy: '',
    level: startLevel,
  });
  const [countEndshpil, setCountEndshpil] = useState<number>(0);
  const [countMittelshpil, setCountMittelshpil] = useState<number>(0);
  const [countStrategy, setCountStrategy] = useState<number>(0);
  const [countDebut, setCountDebut] = useState<number>(0);
  const [countTactic, setCountTactic] = useState<number>(0);
  const allThemes = useAppSelector((state) => state.ProgramSlice.allThemes);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllThemes());
    };
    void fetchData();
  }, [dispatch]);

  const filterThemes = useCallback(
    (data: DataType, search: string, allFilters = false) => {
      let filtered = allThemes;
      if (data.level && data.level > 0) {
        filtered = filtered.filter((theme) => theme.level === data.level);
      }

      if (data.strategy && !allFilters) {
        filtered = filtered.filter((theme) => theme.filter === data.strategy);
      }

      if (search) {
        const searchValue = search.toLowerCase();
        filtered = filtered.filter((theme) =>
          theme.name.toLowerCase().includes(searchValue),
        );
      }

      filtered = [...filtered].sort((a, b) => a.order - b.order);

      return filtered;
    },
    [allThemes],
  );

  const applyFilter = useDebounce(({data, search}: {data: DataType, search: string}) => {
    if (data.level === 0 && data.strategy === '') {
      dispatch(setThemes(allThemes));
    } else {
      const filteredThemes = filterThemes(data, search);
      dispatch(setThemes(filteredThemes));
    }
  }, 1000);

  useEffect(() => {
    if (activeTheme) {
      const t = allThemes.find(t => t._id === activeTheme);
      if (t) {
        setData((prev) => {
          const newData = { ...prev, level: t.level };
          applyFilter({ data: newData, search });
          return newData;
        })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTheme, search]);

  useEffect(() => {
    if (allThemes) {
      setCountEndshpil(
        filterThemes(data, search, true).filter((theme) => theme.filter === 'endshpil').length,
      );
      setCountMittelshpil(
        filterThemes(data, search, true).filter((theme) => theme.filter === 'mittelshpil').length,
      );
      setCountStrategy(
        filterThemes(data, search, true).filter((theme) => theme.filter === 'strategy').length,
      );
      setCountDebut(filterThemes(data, search, true).filter((theme) => theme.filter === 'debut').length);
      setCountTactic(
        filterThemes(data, search, true).filter((theme) => theme.filter === 'tactic').length,
      );
    }
    applyFilter({ data, search });
  }, [data, search, allThemes, filterThemes]);

  useEffect(() => {
    if (setChangeOrder) {
      if (data.level) {
        setChangeOrder(
          data.level >= 1 &&
            data.level <= 10 &&
            data.strategy === '' &&
            search === '',
        );
      }
    }
  }, [data, search, setChangeOrder]);


  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    applyFilter({data, search: value});
    dispatch(setMaterials([]));
    setActiveTheme?.('');
  };

  const handleStrategyFilter = (id: number, slug: string) => {
    let newData: DataType;
    if (id === 5) {
      setSearch('');
      newData = { level: 0, strategy: slug };
    } else {
      newData = { ...data, strategy: slug };
    }
    setData(newData);
    applyFilter({ data: newData, search})
    dispatch(setMaterials([]));
    setActiveTheme?.('');
  };

  const handleLevelFilter = (newData: DataType) => {
    setData(newData);
    applyFilter({ data: newData, search });
    dispatch(setMaterials([]));
    setActiveTheme?.('');
    setSelectedThemes([]);
  }

  const isMainPage =
    (user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') && !groupId;

  return (
    <div className="bg-gradient-button flex rounded-3xl justify-between items-center px-3 py-2">
      <div className="flex flex-wrap w-[320px] max-2xl:w-[220px]">
        {levels.map((level) => {
          const isDisabled = !openLevel.includes(level.level);
          return (
            <div key={level.id} className="relative inline-block">
              {isDisabled ? (
                <Popover
                  content={
                    <div className="text-center rounded-full whitespace-nowrap">
                      Доступ запрещен
                    </div>
                  }
                  trigger="hover"
                  className="translate-x-16 translate-y-14"
                >
                  <OutlineButton
                    disabled={isDisabled}
                    onClick={() => handleLevelFilter({ ...data, level: level.level })}
                    className={[
                      'mb-2 mr-2 max-2xl:mr-1 max-2xl:mb-1 !h-12 !w-12 max-2xl:!w-10 max-2xl:!h-10 max-2xl:text-base !p-0 !rounded-full',
                      data.level === level.level
                        ? 'border-red-500 border-2'
                        : null,
                    ].join(' ')}
                  >
                    {level.level}
                  </OutlineButton>
                </Popover>
              ) : (
                <OutlineButton
                  disabled={isDisabled}
                  onClick={() => handleLevelFilter({ ...data, level: level.level })}
                  className={[
                    'mb-2 mr-2 max-2xl:mr-1 max-2xl:mb-1 !h-12 !w-12 max-2xl:!w-10 max-2xl:!h-10 max-2xl:text-base !p-0 !rounded-full',
                    data.level === level.level
                      ? 'border-red-500 border-2'
                      : null,
                  ].join(' ')}
                >
                  {level.level}
                </OutlineButton>
              )}
            </div>
          );
        })}
      </div>
        <div>
          <input
            className="border-solid p-1 rounded-full outline-none"
            type="text"
            placeholder="Поиск тем"
            value={search}
            onChange={handleOnChange}
          />
          {isMainPage && (
            <OutlineButton
              className="!py-1 mt-1 !w-[200px] !text-base mx-auto"
              onClick={() => setAddProgramThemeModal(true)}
            >
              {addThemeText[language]}
            </OutlineButton>
          )}
        </div>

      <div className="flex flex-wrap justify-end max-w-[760px] max-2xl:max-w-[630px]">
        {strategies.map((strategie) => (
          <OutlineButton
            dark={strategie.dark}
            onClick={() => handleStrategyFilter(strategie.id, strategie.slug)}
            key={strategie.id}
            className={[
              'mb-2 gap-x-2 flex-wrap !rounded-full mr-3 max-w-[240px] max-2xl:text-base max-2xl:max-w-[190px] !py-2',
              data.strategy === strategie.slug
                ? 'border-red-500 border-2'
                : null,
            ].join(' ')}
          >
            {strategie.name}
            {strategie.slug === 'endshpil' && (
              <p className="text-red-500 font-bold ">{countEndshpil}</p>
            )}
            {strategie.slug === 'mittelshpil' && (
              <p className="text-red-500 font-bold ">{countMittelshpil}</p>
            )}
            {strategie.slug === 'strategy' && (
              <p className="text-red-500 font-bold ">{countStrategy}</p>
            )}
            {strategie.slug === 'debut' && (
              <p className="text-red-500 font-bold ">{countDebut}</p>
            )}
            {strategie.slug === 'tactic' && (
              <p className="text-red-500 font-bold ">{countTactic}</p>
            )}
          </OutlineButton>
        ))}
      </div>
      <AddProgramThemeModal modal={addProgramThemeModal} setModal={setAddProgramThemeModal} edit={false} />
    </div>
  );
};

export default Filter;
