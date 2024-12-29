/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { AxiosResponse } from 'axios';
import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IMaterial } from '../../../models/Program/IMaterial';
// import { IComment } from '../../../models/response/IComment.ts';
// import CommentsService from '../../../services/CommentsService.ts';
import { GroupChangeMaterialSocket } from '../../../sockets/GroupSockets';
import { updatePassedMaterials } from '../../../store/reducers/GroupSlice.ts';
import {
  ITranslateItemString,
  translations,
} from '../../../utils/translations.tsx';
import Title from '../../UI/Title';
import Item from './Item';
import { UserRoles } from '../../../utils/userRoles.ts';
import CheckBox from '../../UI/Main/Checkbox/CheckBox.tsx';
import { getAllThemes } from '../../../store/reducers/ProgramSlice.ts';
import { IUpdatePassedMaterials } from '../../../models/response/IGroup.ts';
import { AiFillQuestionCircle } from '@react-icons/all-files/ai/AiFillQuestionCircle';
import PassedThemesHelpModal from '../../Modals/PassedThemesHelpModal.tsx';
import classNames from 'classnames';

interface ProgramProps {
  program: IMaterial[];
  setMaterial: (material: IMaterial) => void;
  setMaterialName?: (name: string) => void;
  active?: string;
  homework?: boolean;
  commentCount?: number;
  setCommentCount?: (count: number) => void;
}

const Program: FC<ProgramProps> = ({
  program,
  setMaterial,
  setMaterialName,
  active,
  // setCommentCount,
  homework,
}) => {
  const { groupId } = useParams();
  const { user } = useAppSelector((state) => state.UserSlice);
  const { allThemes } = useAppSelector((state) => state.ProgramSlice);
  const { group } = useAppSelector((state) => state.GroupSlice);
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const { materialLesson } = useAppSelector((state) => state.GroupSlice);
  // const [firstCommentModal, setFirstCommentModal] = useState(false);
  const [currentChapter, setCurrentChapter] = useState<IMaterial>();
  const {
    chapterText,
  }: {
    chapterText: ITranslateItemString;
  } = translations.lessons;
  const dispatch = useAppDispatch();
  // const openModalWindow = (): void => setFirstCommentModal(true);
  const [passedThemesHelpModal, setPassedThemesHelpModal] = useState(false);

  const setMaterialHandler = (item: IMaterial) => {
    setCurrentChapter(item);
    if (!homework) {
      if (
        (user.role === 'DIRECTOR' ||
          user.role === 'ZDIRECTOR' ||
          user.role === 'TRANER') &&
        groupId
      ) {
        setMaterial(item);
        GroupChangeMaterialSocket({ room: groupId, material: item });
      }
    } else {
      setMaterial(item);
      if (setMaterialName) {
        setMaterialName(item.theme_id.name);
      }
    }
  };

  useEffect(() => {
    if (!allThemes || allThemes.length === 0) {
      void dispatch(getAllThemes());
    }
  }, [allThemes, dispatch]);

  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       const response: AxiosResponse<IComment[]> =
  //         await CommentsService.getCommentByGroup(currentChapter?._id || '');
  //       if (Array.isArray(response.data)) {
  //         const filteredComments: IComment[] = response.data.filter(
  //           (comment) =>
  //             comment.status === 'APPROVED' || comment.status === 'PAID',
  //         );
  //         setCommentCount?.(filteredComments.length);
  //       } else {
  //         console.error('Ответ не является массивом комментариев:', response);
  //       }
  //     } catch (error) {
  //       console.error('Не удалось получить комментарии:', error);
  //     }
  //   };

  //   if (currentChapter) {
  //     void fetchComments();
  //   }
  // }, [currentChapter, setCommentCount]);


  // useEffect(() => {
  //   const updatePassedMaterial = async () => {
  //     if (!groupId || !active) {
  //       // console.error('groupId or active material is not available');
  //       return;
  //     }

  //     let foundThemeId = '';
  //     const type = 'add' as const;
  //     for (const themeId in materialLesson) {
  //       if (
  //         materialLesson[themeId].some((material) => material._id === active)
  //       ) {
  //         foundThemeId = themeId;
  //         break;
  //       }
  //     }

  //     if (foundThemeId) {
  //       const payload = {
  //         groupId,
  //         payload: {
  //           themeId: foundThemeId,
  //           materialId: active,
  //           type,
  //           addToHistory: true,
  //         },
  //       };

  //       try {
  //         if (group.inLessonOnline?.some(u => u.role === UserRoles.STUDENT)) {
  //           await dispatch(updatePassedMaterials(payload)).unwrap();
  //         }
  //       } catch (error) {
  //         console.error('Failed to update passed materials', error);
  //       }
  //     }
  //   };
  //   void updatePassedMaterial();
  // }, [active, groupId]);

  // useEffect(() => {
  //   if (group?.program && group.current) {
  //     console.log('group.current: ', group.current);
  //     const cond = group.program.findIndex((e) => e._id === group.current);
  //     if (cond !== -1) {
  //       setMaterialHandler(group.program[cond]);
  //       console.log('group.program[cond]: ', group.program[cond]);
  //     } else {
  //       setMaterialHandler(group.program[0]);
  //       console.log('group.program[0]: ', group.program[0]);
  //     }
  //   }
  // }, []);

  const themePassedHandler = (themeId: string, add: boolean) => {
    if (themeId && groupId) {
      const payload: IUpdatePassedMaterials = {
        groupId,
        payload: {
          themeId: themeId,
          type: add ? 'add' : 'restore',
          addToHistory: false,
          materialId: program.filter(item => (item.theme_id as unknown as string) === themeId).map(item => item._id),
          section: 'program'
        }
      }
      void dispatch(updatePassedMaterials(payload)).unwrap();
    }
  }

  const themes = useMemo(() => {
    return Array.from(new Set(program.map((item) => (item.theme_id as unknown as string)))).map(themeId => allThemes.find(theme => theme._id === themeId));
  }, [program, allThemes]);

  const passedThemes = useMemo(() => {
    return themes
      .filter(theme => 
        group.program
          ?.every(item => 
            group.passed
              ?.some(m => m.materials.some(m => m.material === item._id)) || (item.theme_id as unknown as string) !== theme?._id))
                .map(theme => theme?._id);
  }, [group.passed, group.program, themes]);

  const passedMaterials = useMemo(() => {
    return group.passed?.map((item) => item.materials.map((m) => m.material)).flat() || [];
  }, [group.passed]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex mt-1  pb-3">
        <Title
          name={chapterText[language]}
          className={'py-[10px] w-full'}
          questionMark={true}
          onQuestionClick={() => setPassedThemesHelpModal(true)}
        />
        {/* <MainButton
          className="bg-gray-100 border rounded-2xl text-gray-800 px-3 py-2 flex"
          onClick={openModalWindow}
          disabled={!currentChapter} // Отключить кнопку, если currentChapter пустой
        >
          <p className="mr-2"> Комментировать </p>
          <p>{commentCount}</p>
        </MainButton> */}
        
      </div>

      <div className="border-2 border-[#CCC] -mt-6 pt-6 rounded-b-2xl border-t-0 h-[calc(100%-30px)]">
        <div className={['flex flex-col overflow-auto h-full'].join(' ')}>
          {themes.length > 0 && themes.map((theme) => (
            <div key={theme?._id} className='mt-2'>
              <div className="flex items-center gap-1 justify-between px-4">
                <p 
                  className={classNames("text-lg max-2xl:text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-[300px] text-red-500", {
                    '!text-green-700': passedThemes.includes(theme?._id || ''),
                  })}
                >
                  {theme?.name}
                </p>
                {user.role !== UserRoles.STUDENT && <CheckBox
                  checked={passedThemes.includes(theme?._id || '')}
                  onChange={(e) => themePassedHandler(theme?._id || '', e.target.checked)}
                />}
              </div>
              {program.filter((item) => (item.theme_id as unknown as string) === theme?._id).map((item, id) => (
                <Item
                  active={active}
                  onClick={() => setMaterialHandler(item)}
                  setMaterial={setMaterial}
                  key={item._id}
                  id={item._id}
                  number={id + 1}
                  taskName={item.data.tags.Event}
                  passedMaterials={passedMaterials}
                  themeId={theme?._id || ''}
                />
              ))}
            </div>
          ))}

        </div>
      </div>
      <PassedThemesHelpModal active={passedThemesHelpModal} setActive={setPassedThemesHelpModal} />
    </div>
  );
};

export default Program;
