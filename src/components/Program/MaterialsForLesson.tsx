import { AxiosError } from 'axios';
import { Dispatch, FC, SetStateAction, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IMaterialResponse } from '../../models/Program/IMaterial';
import { ITheme } from '../../models/Program/ITheme';
import GroupService from '../../services/GroupService';
import { updateMaterialForLesson } from '../../store/reducers/GroupSlice';
import './Themes.css';
import { getMaterials } from '../../store/reducers/ProgramSlice';

interface ThemeForLessonProps {
  materialLesson: Record<string, IMaterialResponse[]>;
  theme: ITheme;
  active: string | undefined;
  setActive: Dispatch<SetStateAction<string | undefined>>;
  selMaterials: string[];
  setSelMaterials: (materials: string[]) => void;
}

interface MaterialsForLessonProps {
  active: string | undefined;
  setActive: Dispatch<SetStateAction<string | undefined>>;
  selMaterials: string[];
  setSelMaterials: (materials: string[]) => void;
}

const MaterialsForLesson: FC<MaterialsForLessonProps> = ({
  active,
  setActive,
  selMaterials,
  setSelMaterials,
}) => {
  const materialLesson = useAppSelector(
    (state) => state.GroupSlice.materialLesson,
  );
  const allThemes = useAppSelector((state) => state.ProgramSlice.allThemes);

  const themeMap = useMemo(() => {
    return new Map(allThemes.map((theme) => [theme._id, theme]));
  }, [allThemes]);

  const themesForLesson = Object.keys(materialLesson).map((key) =>
    themeMap.get(key),
  );
  const totalMaterialsArray = Object.values(materialLesson).flat();

  return (
    <>
      {totalMaterialsArray.length > 0 && (
        <div className="flex flex-col mt-1 w-full max-h-32 py-1 xl:pr-5">
          <p className="font-bold mb-1 border-b-2 border-black text-right">{`Всего задач на урок: ${totalMaterialsArray.length}`}</p>
          <div className="theme-container w-full max-h-32 overflow-y-auto">
            {themesForLesson.map((theme) =>
              theme ? (
                <ThemeForLesson
                  key={theme._id}
                  materialLesson={materialLesson}
                  theme={theme}
                  active={active}
                  setActive={setActive}
                  selMaterials={selMaterials}
                  setSelMaterials={setSelMaterials}
                />
              ) : null,
            )}
          </div>
        </div>
      )}
    </>
  );
};

function ThemeForLesson({
  materialLesson,
  theme,
  active,
  setActive,
  selMaterials,
  setSelMaterials,
}: ThemeForLessonProps) {
  const { groupId } = useParams();
  const dispatch = useAppDispatch();
  const { group } = useAppSelector(state => state.GroupSlice);
  const materialCount = materialLesson[theme._id]?.length;
  const truncatedThemeName: string | undefined =
    theme?.name.length > 120 ? theme?.name.slice(0, 120) + '...' : theme?.name;
  const isActive = theme?._id === active;

  const activeThemeHandler = (id: string) => {
    setActive(id);
    void dispatch(getMaterials(theme._id));
  };
  const removeThemeHandler = async (id: string) => {
    const updatedMaterialLesson: Record<string, IMaterialResponse[]> =
      Object.fromEntries(
        Object.entries(materialLesson).filter(([key]) => key !== id),
      );
    const deletedMaterialLesson: Record<string, IMaterialResponse[]> =
      Object.fromEntries(
        Object.entries(materialLesson).filter(([key]) => key === id),
      );
    const deletedMaterials = Object.values(deletedMaterialLesson)
      .flat()
      .map((mat) => mat._id);
    dispatch(updateMaterialForLesson(updatedMaterialLesson));
    const updatedSelMaterials = selMaterials
      ? Object.values(updatedMaterialLesson)
          .flat()
          .map((mat) => mat._id)
      : [];
    setSelMaterials(updatedSelMaterials);
    if (groupId) {
      await GroupService.editGroup(groupId, {
        program: updatedSelMaterials,
        deletedProgram: [...group.deletedProgram.map(m => m._id), ...deletedMaterials],
      }).catch((e: AxiosError) => {
        console.log(e);
      });
    }
  };

  return (
    <div
      className="flex justify-between cursor-pointer"
      onClick={() => void activeThemeHandler(theme?._id)}
    >
      <p
        className={['text-sm whitespace-nowrap pr-2', isActive ? 'font-bold text-green-500' : ''].join(
          ' ',
        )}
        title={theme?.name}
      >
        {truncatedThemeName}
      </p>
      <div className="flex gap-4 justify-between">
        <p>{materialCount}</p>
        <button
          className="hover:text-red-500"
          onClick={(e) => {
            e.stopPropagation();
            void removeThemeHandler(theme?._id);
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

export default MaterialsForLesson;
