import { FC } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { ITheme } from '../../models/Program/ITheme';
import './Themes.css';
import { BsFillTrashFill } from '@react-icons/all-files/bs/BsFillTrashFill';

interface SelectedThemesProps {
  selectedThemes: string[];
  setSelectedThemes: (themes: string[]) => void;
}

const SelectedThemes: FC<SelectedThemesProps> = ({
  selectedThemes,
  setSelectedThemes,
}) => {
  const themesCount = selectedThemes.length;
  const {allThemes, themes} = useAppSelector(state => state.ProgramSlice);
  const removeThemeHandler = (id: string) => {
    setSelectedThemes(selectedThemes.filter((themeId) => themeId !== id));
  };

  const renderTheme = (theme: ITheme) => {
    const truncatedThemeName: string | undefined =
    theme?.name.length > 60 ? theme?.name.slice(0, 60) + '...' : theme?.name;
    return (
      <div
        className="flex justify-between cursor-pointer"
      >
        <p
          className={'text-sm whitespace-nowrap pr-2'}
          title={theme?.name}
        >
          {truncatedThemeName}
        </p>
        <div className="flex gap-4 justify-between">
          <button
            className="hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              void removeThemeHandler(theme?._id);
            }}
          >
            Убрать выделение
            <BsFillTrashFill
              className="inline-block ml-1 text-red-500"
            />
          </button>
        </div>
      </div>
    )
  }

  const selThemes = allThemes.filter(theme => selectedThemes.includes(theme._id));

  return (
    <div className="flex flex-col mt-1 w-full max-h-40 py-1 xl:pr-5">
      <p className="font-bold mb-1 border-b-2 border-black text-right">{`Всего выделено тем: ${themesCount} / ${themes.length}`}</p>
      <div className="theme-container w-full max-h-50 overflow-y-auto pb-2">
        {selThemes.map(renderTheme)}
      </div>
      <button
        className="border-t-2 border-black text-right hover:text-red-500"
        onClick={() => setSelectedThemes([])}
      > 
        Убрать выделение у всех тем
        <BsFillTrashFill
          className="inline-block ml-1 text-red-500"
        />
      </button>
    </div>
  );
}

export default SelectedThemes;
