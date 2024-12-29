import { Reorder } from 'framer-motion';
import { FC, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ITheme } from '../../models/Program/ITheme';
import { setThemes } from '../../store/reducers/ProgramSlice';
import {
  ITranslateItemString,
  translations,
} from '../../utils/translations.tsx';
import AddProgramThemeModal from '../Modals/AddProgramThemeModal';
import RemoveThemeModal from '../Modals/RemoveThemeModal';
import OutlineButton from '../UI/OutlineButton';
import Theme from './Theme';

import './Themes.css';

interface ThemesProps {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string | undefined>>;
  changeOrder?: boolean;
}

const Themes: FC<ThemesProps> = ({ changeOrder, active, setActive }) => {
  const { groupId } = useParams();
  const [modal, setModal] = useState<boolean>(false);
  const [modal2, setModal2] = useState<boolean>(false);
  const [modal3, setModal3] = useState<boolean>(false);
  const [theme, setTheme] = useState<ITheme | undefined>();
  const { themes } = useAppSelector((state) => state.ProgramSlice);
  const { user } = useAppSelector((state) => state.UserSlice);
  const [edit, setEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const language = useAppSelector((state) => state.TranslateSlice.language);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    addThemeText,
  }: {
    addThemeText: ITranslateItemString;
  } = translations.schoolProgram;

  const setThemesHandler = (themes: ITheme[]) => {
    dispatch(setThemes(themes));
  };

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

  const isMainPage =
    (user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') && !groupId;

  return (
    <div className={'w-full h-full'}>
      {isMainPage && (
        <OutlineButton
          className="py-1 mb-4 !w-[400px] !text-base mx-auto"
          onClick={createThemeHandler}
        >
          {addThemeText[language]}
        </OutlineButton>
      )}
      <div
        className="flex theme-container flex-col w-full items-center max-2xl:items-start  mr-2 xl:mr-28 2xl:mr-16 overflow-auto  h-full"
        ref={containerRef}
      >
        <Reorder.Group
          axis="y"
          values={themes}
          onReorder={setThemesHandler}
          layoutScroll
          className={'w-full theme-container'}
        >
          {themes.map((theme: ITheme) => (
            <Theme
              editHandler={editHandler}
              removeHandler={removeHandler}
              active={active || ''}
              setActive={setActive}
              key={theme._id}
              theme={theme}
              changeOrder={changeOrder}
              ref={containerRef}
            />
          ))}
        </Reorder.Group>

        {!edit && (
          <AddProgramThemeModal modal={modal} setModal={setModal} edit={edit} />
        )}
        {edit && theme && (
          <AddProgramThemeModal
            modal={modal2}
            setModal={setModal2}
            theme={theme}
            edit={edit}
            changeOrder={changeOrder}
          />
        )}
        {theme && (
          <RemoveThemeModal modal={modal3} setModal={setModal3} theme={theme} />
        )}
      </div>
    </div>
  );
};

export default Themes;
