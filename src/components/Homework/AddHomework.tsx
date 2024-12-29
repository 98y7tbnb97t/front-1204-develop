import { FC, useState, useEffect, ChangeEvent, useMemo, useRef} from 'react'
import { Chessboard } from 'react-chessboard';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editGroup, getGroup, updateMaterialForLesson, updatePassedMaterials } from '../../store/reducers/GroupSlice';
import { getHomework } from '../../store/reducers/HomeworkSlice';
import {MdOutlineDeleteOutline} from '@react-icons/all-files/md/MdOutlineDeleteOutline'
import SelectHomeWorkModal from '../Modals/SelectHomeWorkModal';
import MainButton from '../UI/MainButton';
import DatePicker, { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
registerLocale('enGB', enGB);
import 'react-datepicker/dist/react-datepicker.css';
import Input from '../UI/Main/Input';
import HomeworkService from '../../services/HomeworkService';
import SuccessModal from '../Modals/SuccessModal';
import { AxiosError } from 'axios';
import { ServerError } from '../../models/response/ServerError';
import AuthErrorModal from '../Modals/AuthError';
import InputMask from 'react-input-mask';
import Switch from '../UI/Switch';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";
import Star from '../../assets/pawns/star.png';
import { shortestDate } from '../../utils/shortestDate.ts';
import { createAutoSMS } from '../../store/reducers/AutoSMSSlice.ts';
import { getInfoText } from '../../store/reducers/InfoTextsSlice.ts';
import { EInfoTextFields } from '../../models/IInfoTexts.ts';
import { formatDate } from '../../utils/formatDate.ts';
import { UserRoles } from '../../utils/userRoles.ts';
import { Units } from '../../models/IAutoSMS.ts';
import Modal from '../UI/Modal.tsx';
import { getAllThemes } from '../../store/reducers/ProgramSlice.ts';
import CheckBox from '../UI/Main/Checkbox/CheckBox.tsx';
import { IProgramActionsHistory, IUpdatePassedMaterials } from '../../models/response/IGroup.ts';
import { IMaterialResponse } from '../../models/Program/IMaterial.ts';
import { ITheme } from '../../models/Program/ITheme.ts';
import ProgramActionsHistoryModal from '../Modals/ProgramActionsHistoryModal.tsx';
import { AiFillQuestionCircle } from '@react-icons/all-files/ai/AiFillQuestionCircle';
import PassedThemesHelpModal from '../Modals/PassedThemesHelpModal.tsx';
import TextEditor from '../Widgets/TextEditor.tsx';

const daysOfWeek: Record<number, ITranslateItemString> = {
    1: translations.groups.mondaySlugText,
    2: translations.groups.tuesdaySlugText,
    3: translations.groups.wednesdaySlugText,
    4: translations.groups.thursdaySlugText,
    5: translations.groups.fridaySlugText,
    6: translations.groups.saturdaySlugText,
    0: translations.groups.sundaySlugText
}

const AddHomework: FC = () => {
    const { group } = useAppSelector(state => state.GroupSlice);
    const { homework } = useAppSelector(state => state.HomeworkSlice);
    const { homeworkReminder, homeworkDeadlineAdvice, homeworkReminderFiveHours } = useAppSelector(state => state.InfoTextsSlice);
    const { allThemes } = useAppSelector(state => state.ProgramSlice);
    const { groupId, homeworkId } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [position, setPosition] = useState<{_id: string, position: string, theme_id: string, type: string}>({_id: '', position: '', theme_id: '', type: 'string'});
    const [positions, setPositions] = useState<{_id: string, position: string, seq: number, theme_id: string, type: string}[]>([]);
    const [addedPositions, setAddedPositions] = useState<{_id: string, position: string, seq: number, theme_id: string, type: string}[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [modal2, setModal2] = useState<boolean>(false);
    const [emodal, setEModal] = useState<boolean>(false);
    const [modalError, setModalError] = useState<string>('');
    const [sureSendDZModal, setSureSendDZModal] = useState<boolean>(false);
    const [commentModal, setCommentModal] = useState<boolean>(false);
    const [comment, setComment] = useState<string>('');
    const [autoDate, setAutoDate] = useState<Date>(new Date());
    const [date, setDate] = useState<Date>(new Date());
    const [time, setTime] = useState<string>('21:00');
    const [nextLessonDate, setNextLessonDate] = useState<Date>(new Date());
    const [autoSMSMaxDate, setAutoSMSMaxDate] = useState<Date | null>(new Date());
    const [autoCheck, setAutoCheck] = useState<boolean>(true);
    const [isAutoDate, setIsAutoDate] = useState<boolean>(true);
    const language = useAppSelector(state => state.TranslateSlice.language);
    const [history, setHistory] = useState<IProgramActionsHistory>();
    const [programActionsHistoryModal, setProgramActionsHistoryModal] = useState<boolean>(false);
    const [passedThemesHelpModal, setPassedThemesHelpModal] = useState(false);
    const [historyTheme, setHistoryTheme] = useState<string>();
    const dateInputRef = useRef<HTMLInputElement>(null);
    const {
        sendHomeworkText,
        lessonPositionsText,
        autocheckText,
        addHomeworkFromProgramText,
        homeworkSentText,
        returnToGroupText,
    }: {
        sendHomeworkText: ITranslateItemString,
        lessonPositionsText: ITranslateItemString,
        homeworkDeadlineText: ITranslateItemString,
        autocheckText: ITranslateItemString,
        addHomeworkFromProgramText: ITranslateItemString,
        homeworkSentText: ITranslateItemString,
        returnToGroupText: ITranslateItemString,
    } = translations.lessons

    const { openGroupChatText } = translations.groups;



    useEffect(() => {
        const fetchData = async() => {
            await dispatch(getInfoText({ field: EInfoTextFields.homeworkReminder }));
            await dispatch(getInfoText({ field: EInfoTextFields.homeworkDeadlineAdvice }));
            await dispatch(getInfoText({ field: EInfoTextFields.homeworkReminderFiveHours }));
            await dispatch(getAllThemes());

            if(groupId) {
                await dispatch(getGroup(groupId));
            }
            if(homeworkId) {
                await dispatch(getHomework(homeworkId));
            }
        }
        void fetchData();
    }, [dispatch, groupId, homeworkId]);

    useEffect(() => {
        return () => {
            dispatch(updateMaterialForLesson({}));
        }
    }, [dispatch, groupId]);
    
    useEffect(() => {
        if(group) {
            if (!homeworkId) {
                let nextLesDays: number[] = [];
                const day = new Date().getDay();
    
                for (const lesDate of group.dates || []) {
                    const lesDays = lesDate.days;
                    nextLesDays = [...nextLesDays, ...lesDays];
                }
                if (nextLesDays.length) {
                    const nextLesDay = nextLesDays
                        .map(d => d <= day ? d + 7 : d)
                        .reduce((prev, cur) => prev - day > cur - day ? cur : prev, 100)
                        % 7;
                    const nextLesTime = group.dates?.find(d => d.days.includes(nextLesDay))?.time;
                    const nextLesDate = shortestDate(nextLesDay);
                    if (nextLesTime) {
                        const [nextLesHours, nextLesMinutes] = nextLesTime.split(':');
                        nextLesDate.setHours(Number(nextLesHours), Number(nextLesMinutes));
                        setNextLessonDate(nextLesDate);
                    }
                    const today = new Date();
                    const diffInTime = nextLesDate.getTime() - today.getTime();
                    const diffInDays = Math.min(Math.ceil(diffInTime / (1000 * 3600 * 24))-1, 3);
                    const autoSMSD = new Date(new Date(nextLesDate).setDate(nextLesDate.getDate() - diffInDays));
                    setDate(autoSMSD);
                    setAutoDate(autoSMSD);
                    setAutoSMSMaxDate(autoSMSD);
                }
            }
            const temp = [] as {_id: string, position: string, seq: number, type: string, theme_id: string}[];
            if(homeworkId && addedPositions.length === 0) {
                if (homework.end) {
                    setDate(new Date(homework.end));
                }
                if(homework?.program?.length > 0) {
                    homework.program.map(material=>{
                        temp.push({
                            _id: material._id,
                            position: material.data?.tags?.FEN,
                            seq: material.seq,
                            type: material.type,
                            theme_id: material.theme_id._id
                        });
                    })
                    setPosition({
                        _id: homework.program[0]._id,
                        position: homework.program[0].data?.tags?.FEN,
                        type: homework.program[0].type,
                        theme_id: homework.program[0].theme_id as unknown as string
                    });
                    setAddedPositions(temp);
                }
            } 
            else {
                if(group?.prevprogram) {
                    group.prevprogram.map(material=>{
                        temp.push({
                            _id: material._id,
                            position: material.data?.tags?.FEN,
                            seq: material.seq,
                            type: material.type,
                            theme_id: material.theme_id as unknown as string
                        });
                    })
                }
                if(group?.deletedProgram) {
                    group.deletedProgram.map(material=>{
                        temp.push({
                            _id: material._id,
                            position: material.data?.tags?.FEN,
                            seq: material.seq,
                            type: material.type,
                            theme_id: material.theme_id as unknown as string
                        });
                    })
                }
                setPositions(temp);
            }   
        }
    }, [group, homework, homeworkId])
    
    const removeHandler = async (item: {_id: string, position: string}) => {
        const tmp = positions;
        const tmpAdded = addedPositions;
        
        if (groupId) {
            await dispatch(editGroup({
                groupId, 
                payload: { 
                    deletedProgram: group.deletedProgram.filter(material=> material._id !== (item._id)).map(material=> material._id),
                    prevprogram: group.prevprogram.filter(material=> material._id !== item._id).map(material=> material._id),
                }
            }));
            setPositions(tmp.filter(material=> material._id !== item._id));
            setAddedPositions(tmpAdded.filter(material=> material._id !== item._id));
        }
    }

    const selectHomeWork = async (data: {_id: string, position: string, theme_id: string, seq: number, type: string}) => {
        const positionAdded = addedPositions.findIndex(pos=> pos._id === data._id);
        const position = positions.findIndex(pos=> pos._id === data._id);
        const tmpAdded = addedPositions;
        const tmp = positions;
        
        if (position > -1) {
            tmp.splice(position, 1);
            
            if (groupId) {
                await dispatch(editGroup({
                    groupId, 
                    payload: { 
                        deletedProgram: group.deletedProgram.filter(material=> material._id !== (data._id)).map(material=> material._id),
                        prevprogram: group.prevprogram.filter(material=> material._id !== data._id).map(material=> material._id),
                    }
                }));
                setPositions(tmp);
            }
            return;
        }
        if(positionAdded > -1) {
            tmpAdded.splice(positionAdded, 1);
        } else {
            tmpAdded.push(data);
        }
        setAddedPositions(tmpAdded);
    }
    const sendHomework = async () => {
        setSureSendDZModal(false);
        setCommentModal(false);
        if(groupId) {
            const programIds = [] as string[];
            positions.map(pos=>{
                programIds.push(pos._id);
            })
            addedPositions.map(pos=>{
                programIds.push(pos._id);
            })
            void dispatch(editGroup({
                groupId, 
                payload: {
                    deletedProgram: [],
                    prevprogram: []
                }
            }))
            if(homeworkId) {
                await HomeworkService.editHomework(homeworkId, {program: programIds, end: date}).then(()=> setModal2(true)).catch((e: AxiosError)=> {
                    const event = e.response?.data as ServerError;
                    setModalError(event.error)
                    setEModal(true);
                });
            } else {
                try {
                    const res = await HomeworkService.createHomework(groupId, date, programIds, autoCheck, comment, time);
                    setModal2(true);
                    const dayBeforLesson = new Date(nextLessonDate);
                    dayBeforLesson.setDate(dayBeforLesson.getDate() - 1);
                    const hmAutoSMSDate = `${formatDate(dayBeforLesson)}T19:00`;
                    const hmAutoSMSDateFiveHours = `${formatDate(date)}T23:00`;
                    await dispatch(createAutoSMS({
                        text: {
                            ru: `<strong>Дз? Напоминаем, что нужно выполнить домашнее задание!</strong> Срок домашнего задания: ${daysOfWeek[date.getDay()][language].toLocaleLowerCase()}. ${time}` + String(homeworkReminder.ru),
                            am: `<strong>Ձ? Հիշեցնենք, որ դուք պետք է կատարեք ձեր տնային աշխատանքը:</strong> Deadline for homework: ${daysOfWeek[date.getDay()][language].toLocaleLowerCase()}. ${time}` + String(homeworkReminder.am),
                            en: `<strong>Homework? We remind you that you need to do your homework!</strong> Տնային առաջադրանքի վերջնաժամկետը: ${daysOfWeek[date.getDay()][language].toLocaleLowerCase()}. ${time}` + String(homeworkReminder.en),
                        },
                        title: 'Напоминание о дз',
                        date: hmAutoSMSDate,
                        enabled: true,
                        usersToSend: group.users.filter(u => u.role === UserRoles.STUDENT).map(u => u._id),
                        sendToNotifications: true,
                        notifications: [
                            { amount: 100, unit: Units.HOURS },
                            { amount: 96, unit: Units.HOURS },
                            { amount: 76, unit: Units.HOURS },
                            { amount: 72, unit: Units.HOURS },
                            { amount: 52, unit: Units.HOURS },
                            { amount: 48, unit: Units.HOURS },
                            { amount: 28, unit: Units.HOURS },
                            { amount: 24, unit: Units.HOURS },
                            { amount: 4, unit: Units.HOURS },
                            { amount: 0, unit: Units.HOURS },
                        ],
                        isPersonal: false,
                        homework_id: res.data.homework._id,
                        additionalContent: `<div class='mt-2'>
                                <a
                                    class='px-4 py-2 rounded bg-blue-500 text-white'
                                    href='/homework/${res.data.homework._id}'
                                >
                                    Перейти к Выполнению дз
                                </a>
                            </div>`
                    }));
                    await dispatch(createAutoSMS({
                        text: {
                            ru: String(homeworkReminderFiveHours.ru),
                            am: String(homeworkReminderFiveHours.am),
                            en: String(homeworkReminderFiveHours.en),
                        },
                        title: String(homeworkReminderFiveHours.ru),
                        date: hmAutoSMSDateFiveHours,
                        enabled: true,
                        usersToSend: group.users.filter(u => u.role === UserRoles.STUDENT).map(u => u._id),
                        sendToNotifications: true,
                        notifications: [
                            { amount: 5, unit: Units.HOURS },
                        ],
                        isPersonal: false,
                        homework_id: res.data.homework._id,
                        additionalContent: `<div class='flex gap-2 mt-2'>
                                <a
                                    class='px-4 py-2 rounded bg-blue-500 text-white'
                                    href='/mynotifications'
                                >
                                    Добавить Уведомление/Напоминание
                                </a>
                                <a
                                    class='px-4 py-2 rounded bg-blue-500 text-white'
                                    href='/homework/${res.data.homework._id}'
                                >
                                    Перейти к Выполнению дз
                                </a>
                                
                            </div>`
                    }));
                    const twoHoursReminderDate = `${formatDate(nextLessonDate)}T${nextLessonDate.getHours()}:${nextLessonDate.getMinutes()}`;
                    await dispatch(createAutoSMS({
                        text: {
                            ru: `<strong>Шахматы через 2 часа! ДЗ не выполнено!</strong>
                                <p>Срок дз был до - ${daysOfWeek[date.getDay()][language].toLocaleLowerCase()}. ${time}. Вы не успели сделать дз, а урок через 2 часа. Попробуйте, пожалуйста успеть:</p>`,
                            en: `<strong>Chess in 2 hours! Homework not completed!</strong>  
                                <p>The homework deadline was until - ${daysOfWeek[date.getDay()][language].toLocaleLowerCase()}, ${time}. You didn’t complete the homework, and the lesson is in 2 hours. Please try to finish it:</p>`,
                            am: `<strong>Շախմատ՝ 2 ժամից! Տնային աշխատանքը կատարված չէ:</strong>  
                                <p>Տնային աշխատանքի վերջնաժամկետը եղել է՝ ${daysOfWeek[date.getDay()][language].toLocaleLowerCase()}, ${time}: Դուք չեք հասցրել կատարել տնային աշխատանքը, իսկ դասը սկսվելու է 2 ժամից: Խնդրում ենք փորձել ավարտել այն:</p>`,
                        },
                        title: 'Шахматы через 2 часа! ДЗ не выполнено!',
                        date: twoHoursReminderDate,
                        enabled: true,
                        usersToSend: group.users.filter(u => u.role === UserRoles.STUDENT).map(u => u._id),
                        sendToNotifications: true,
                        notifications: [
                            { amount: 2, unit: Units.HOURS },
                        ],
                        isPersonal: false,
                        homework_id: res.data.homework._id,
                        additionalContent: `<div class='mt-2'>
                                <a
                                    class='px-4 py-2 rounded bg-blue-500 text-white'
                                    href='/homework/${res.data.homework._id}'
                                >
                                    Перейти к Выполнению дз
                                </a>
                            </div>`
                    }));
                } catch (error) {
                    const event = (error as AxiosError).response?.data as ServerError;
                    setModalError(event.error)
                    setEModal(true);
                }
            }
        }
    }

    const programThemes = useMemo(() => {
        if (!group.prevprogram) return [];
        return allThemes.filter((item) => {
          return group.prevprogram.some(p => (p.theme_id as unknown as string) === item._id);
        })
        .map(
          (theme) => {
            return {
              theme,
              positions: positions.filter(p => group.prevprogram.some(prev => (prev._id === p._id  && (prev.theme_id as unknown as string) === theme._id))),
            };
          },
        )
        .filter(theme => theme.positions.length > 0)
        ;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [group.prevprogram, allThemes, positions, modal]);

    const deletedProgramThemes = useMemo(() => {
        if (!group.deletedProgram) return [];
        return allThemes.filter((item) => {
          return group.deletedProgram.some(p => (p.theme_id as unknown as string) === item._id);
        })
        .map(
          (theme) => {
            return {
              theme,
              positions: positions.filter(p => group.deletedProgram.some(prev => (prev._id === p._id && (prev.theme_id as unknown as string) === theme._id))),
            };
          },
        )
        .filter(theme => theme.positions.length > 0)
        ;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [group.deletedProgram, allThemes, positions, modal]);

    const addedThemes = useMemo(() => {
    return allThemes.filter((item) => {
        return addedPositions.some(p => (p.theme_id as unknown as string) === item._id);
        }).map(
        (theme) => {
            return {
            theme,
            positions: addedPositions.filter(p => p.theme_id === theme._id),
            };
        }).filter(theme => theme.positions.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allThemes, addedPositions, modal]);

    useEffect(() => {
        const updatedMaterialsForLesson = {} as Record<string, IMaterialResponse[]>;
        for (const programTheme of programThemes) {
            const materials = programTheme.positions.map(p => positions.find(prev => prev._id === p._id) || {} as IMaterialResponse);
            if (materials) {
                updatedMaterialsForLesson[programTheme.theme._id] = materials as IMaterialResponse[];
            
            }
        }
        for (const deletedProgramTheme of deletedProgramThemes) {
            const materials = deletedProgramTheme.positions.map(p => positions.find(prev => prev._id === p._id) || {} as IMaterialResponse);
            if (materials) {
                if (updatedMaterialsForLesson[deletedProgramTheme.theme._id]) {
                    updatedMaterialsForLesson[deletedProgramTheme.theme._id] = [...updatedMaterialsForLesson[deletedProgramTheme.theme._id], ...materials as IMaterialResponse[]];
                } else {
                    updatedMaterialsForLesson[deletedProgramTheme.theme._id] = materials as IMaterialResponse[];
                }
            }
        }
        for (const addedTheme of addedThemes) {
            const materials = addedTheme.positions.map(p => addedPositions.find(prev => prev._id === p._id) || {} as IMaterialResponse);
            if (materials) {
                if (updatedMaterialsForLesson[addedTheme.theme._id]) {
                    updatedMaterialsForLesson[addedTheme.theme._id] = [...updatedMaterialsForLesson[addedTheme.theme._id], ...materials as IMaterialResponse[]];
                } else {
                    updatedMaterialsForLesson[addedTheme.theme._id] = materials as IMaterialResponse[];
                }
            }
        }
        void dispatch(updateMaterialForLesson(updatedMaterialsForLesson));
    }, [deletedProgramThemes, programThemes, addedThemes, positions, addedPositions, dispatch, modal]);
   
      const materialPassedHandler = async (add: boolean, themeId: string, materialId?: string) => {
        if (themeId && groupId) {
          const payload: IUpdatePassedMaterials = {
            groupId,
            payload: {
              themeId: themeId,
              materialId: materialId,
              type: add ? 'add' : 'restore',
              addToHistory: false,
              section: 'homework',
            }
          }
          const res = await dispatch(updatePassedMaterials(payload)).unwrap();
          setHistory?.(res.programActionsHistory);
        }
      }

      const themePassedHandler = async (add: boolean, themeId: string, type?: 'program' | 'deleted' | 'added') => {
          if (themeId && groupId) {
            let materials: string[] = [];
            switch (type) {
                case 'program':
                    materials = group.prevprogram.filter(item => (item.theme_id as unknown as string) === themeId).map(item => item._id);
                    break;
                case 'deleted':
                    materials = group.deletedProgram.filter(item => (item.theme_id as unknown as string) === themeId).map(item => item._id);
                    break;
                case 'added':
                    materials = addedPositions.filter(item => (item.theme_id as unknown as string) === themeId).map(item => item._id);
                    break;
            }
          const payload: IUpdatePassedMaterials = {
            groupId,
            payload: {
              themeId: themeId,
              materialId: materials,
              type: add ? 'add' : 'restore',
              addToHistory: false,
              section: 'homework',
            }
          }
          const res = await dispatch(updatePassedMaterials(payload)).unwrap();
          setHistory?.(res.programActionsHistory);
        }
      }

    const renderMaterialItem = (item: {
        _id: string;
        position: string;
        seq: number;
        theme_id: string;
        type: string;
    }) => {
        return (
            <div key={item._id} className="flex items-center mr-3 mb-2">
                <p 
                    onClick={() => setPosition({_id: item._id, position: item.position, type: item.type, theme_id: item.theme_id})} 
                    className={[
                        'flex items-center justify-center gap-1 hover:bg-gradient-appricot cursor-pointer hover:text-white py-1 font-semibold px-4 rounded-lg shadow-xl',
                         group.passed?.some(passed => passed.materials.some(m => m.material === item._id)) ? 
                         'bg-gradient-button-green' : '',
                         position._id === item._id ? 'border-apricot border-2 bg-gradient-button' : 'bg-gradient-button',
                    ].join(' ')}
                >
                    {item.seq}
                    
                </p>
                <button onClick={() => void removeHandler(item)}><MdOutlineDeleteOutline /></button>
            </div>
        )
    }
    const passedProgramThemes = useMemo(() => {
        return programThemes
        .filter(theme => 
            theme.positions
            ?.every(item => 
                group.passed
                ?.some(m => m.materials.some(m => m.material === item._id))))
                    .map(theme => theme.theme._id);
    }, [group.passed, programThemes]);

    const passedDeletedThemes = useMemo(() => {
        return deletedProgramThemes
        .filter(theme => 
            theme.positions
            ?.every(item => 
                group.passed
                ?.some(m => m.materials.some(m => m.material === item._id))))
                    .map(theme => theme.theme._id);
    }, [group.passed, deletedProgramThemes]);

    const passedAddedThemes = useMemo(() => {
        return addedThemes
        .filter(theme => 
            theme.positions
            ?.every(item => 
                group.passed
                ?.some(m => m.materials.some(m => m.material === item._id))))
                    .map(theme => theme.theme._id);
    }, [group.passed, addedThemes]);

    const renderThemeItem = (theme: {
        theme: ITheme;
        positions: {
            _id: string;
            position: string;
            seq: number;
            theme_id: string;
            type: string;
        }[];
    }, type: 'program' | 'deleted' | 'added') => {
        let isChecked = false;
        if (type === 'added') {
            isChecked = passedAddedThemes.includes(theme.theme._id);
        } else if (type === 'deleted') {
            isChecked = passedDeletedThemes.includes(theme.theme._id);
        } else if (type === 'program') {
            isChecked = passedProgramThemes.includes(theme.theme._id);
        }
        return (
            <div key={theme.theme._id}>
                <p className='font-semibold text-lg mb-2'>{theme.theme.name}</p>
                <div className="flex gap-2 items-center mb-2">
                    <p className="text-md">Отметить все главы как пройденные</p>
                    <CheckBox
                        checked={isChecked}
                        onChange={(e) => void themePassedHandler(e.target.checked, theme.theme._id, type)}
                    />
                    <button
                        className='bg-gradient-button px-3 py-1 rounded-md'
                        onClick={() => {
                            setProgramActionsHistoryModal(true);
                            setHistoryTheme(theme.theme._id)
                        }}
                    >
                        История
                    </button>
                </div>
                <div className="flex flex-wrap">
                    {theme.positions.map(renderMaterialItem)}
                </div>
            </div>
        )
    }

    const toggleAutoDate = () => {
        if (isAutoDate) {
            setAutoSMSMaxDate(null);
            dateInputRef.current?.focus();
            setIsAutoDate(false);
        } else {
            setAutoSMSMaxDate(autoDate);
            setDate(autoDate);
            setIsAutoDate(true);
        }
    }

    const passedMaterials = useMemo(() => {
        return group.passed?.map((item) => item.materials.map((m) => m.material)).flat() || [];
    }, [group.passed]);

    const nowToAutoSMSDiff = useMemo(() => {
        const now = new Date();
        const [autoSMSHours, autoSMSMinutes] = time.split(':');
        const target = date.setHours(Number(autoSMSHours), Number(autoSMSMinutes), 0, 0);
        const diff = target - now.getTime();
        const days = Math.trunc(diff / (1000 * 60 * 60 * 24));
        const hours = Math.trunc((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.trunc((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${days} дн. ${hours} ч. ${minutes} мин.`;
    }, [time, date]);

    const autoSMSToNextLessonDiff = useMemo(() => {
        const [autoSMSHours, autoSMSMinutes] = time.split(':');
        const target = date.setHours(Number(autoSMSHours), Number(autoSMSMinutes), 0, 0);
        const diff = nextLessonDate.getTime() - target;
        const days = Math.trunc(diff / (1000 * 60 * 60 * 24));
        const hours = Math.trunc((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.trunc((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${days} дн. ${hours} ч. ${minutes} мин.`;
    }, [time, date, nextLessonDate]);

    return (
        <div className="px-2 py-2">
            <div className='w-full py-5 px-8 bg-[#f0f0f0] rounded-xl overflow-hidden border-collapse flex'>
                <div className="w-[500px] mr-20">
                    <div className="flex gap-2 items-center justify-center min-h-[440px]">
                        {position._id ? 
                            <>
                                <Chessboard
                                    position={position.position}
                                    customPieces={position.type === "customtask" ? {
                                        "bP": () => <img style={{margin: "10% auto"}} width='80%' height='80%' src={Star}/>,
                                    } : {}}
                                    isDraggablePiece={() => false}
                                />
                                <div className="flex gap-2 items-center mb-2">
                                    <CheckBox
                                        checked={passedMaterials.includes(position._id)}
                                        onChange={(e) => void materialPassedHandler(e.target.checked, position.theme_id, position._id)}
                                    />
                                    <button onClick={() => setPassedThemesHelpModal(true)}  className="shrink-0">
                                    <AiFillQuestionCircle className=" text-xl text-blue-500" />
                                    </button>
                                </div>
                            </>
                            : <p>Выберите задачу</p>
                        }
                        
                    </div>
                    <div className="mt-2 flex items-end">
                        <div>
                            {/* <p className='font-semibold text-lg mb-2' >{homeworkDeadlineText[language]}</p>
                            <DatePicker
                                selected={date}
                                dateFormat="dd.MM.yyyy"
                                locale="enGB"
                                onChange={(date: Date) => setDate(date)}
                                customInput={
                                    <InputMask mask="99.99.9999">
                                        {(inputProps) => <Input {...inputProps} type='text' className='border-[#ccc] !py-2 text-center' wrapperClass='w-full'/>}
                                    </InputMask>
                                    
                                }
                            /> */}
                            <p className='font-semibold text-lg mb-1 mr-2'>Срок автосмс до {daysOfWeek[date.getDay()][language].toLocaleLowerCase()}. {time}:</p>
                            <div className="flex items-center">
                                <DatePicker
                                    selected={date}
                                    maxDate={autoSMSMaxDate}
                                    dateFormat="dd.MM.yyyy"
                                    locale="enGB"
                                    id="datepicker"
                                    onChange={(date: Date) => setDate(date)}
                                    customInput={
                                        <InputMask mask="99.99.9999">
                                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                            {/*@ts-ignore*/}
                                            {(inputProps) => <Input ref={dateInputRef} {...inputProps} type='text' className='border-[#ccc] !py-2 text-center' wrapperClass='w-32'/>}
                                        </InputMask>
                                    }
                                    className='shrink-0'
                                />

                                <Input type='time' max={'21:00'} value={time} onChange={(e: ChangeEvent<HTMLInputElement>) => setTime(e.target.value)} className='border-[#ccc] !py-2 text-center max-w-24 !px-2 ml-2' wrapperClass='w-full'/>
                                <Switch
                                    label={autocheckText[language]}
                                    value={autoCheck}
                                    onChange={setAutoCheck}
                                    className='border-none font-bold text-lg  whitespace-nowrap'
                                />
                            </div>
                            <button onClick={toggleAutoDate} className={`text-sm underline font-medium ${isAutoDate ? 'text-red-500' : 'text-sky-500'}`}>{isAutoDate ? 'Выбрать другую дату вручную' : 'Установить дату автоматически'}</button>
                            <p className="mt-1 text-sm text-[#535353]">Время с этого момента до срока: {nowToAutoSMSDiff}</p>
                            <p className="mt-1 text-sm text-[#535353]">Время с этого срока до следующего урока: {autoSMSToNextLessonDiff}</p>
                        </div>
                            
                        
                        </div>
                    <div className="mt-2">
                    {!homeworkId &&
                        <>
                        
                        </>
                    }
                    </div>
                    <div className="flex mt-5 flex-wrap gap-2 justify-center pr-10">
                        <MainButton className='!text-[18px] !px-4 w-max text-nowrap' onClick={()=>setModal(true)}>{addHomeworkFromProgramText[language]}</MainButton>
                        {homeworkId
                        ?
                            <MainButton className='!bg-gradient-button-green !px-4 !text-[18px] w-max text-nowrap' onClick={() => void sendHomework()}>Отправить дз с новыми изминениями.</MainButton>
                        :
                        <MainButton className='!bg-gradient-button-green !px-4 !text-[18px] w-max text-nowrap' onClick={() => setSureSendDZModal(true)}>{sendHomeworkText[language]}</MainButton>
                        }
                        
                    </div>
                </div>
                <div className="flex flex-col mb-3 w-[650px] max-h-[740px] overflow-auto">
                    {(group || homework) &&
                        <>
                            {programThemes.length > 0 &&
                            <div className='mb-2'>
                                <p className='font-semibold text-2xl mb-2 text-red-500'>Добавленные задачи</p>
                                
                                {programThemes.map((theme) => renderThemeItem(theme, 'program'))}
                            </div>}
                            {deletedProgramThemes.length > 0 &&
                            <div className='mb-2'>
                                <p className='font-semibold text-2xl mb-2 text-red-500'>Удаленные на уроке:</p>
                                {deletedProgramThemes.map((theme) => renderThemeItem(theme, 'deleted'))}
                            </div>}
                            {addedThemes.length > 0 &&
                            <div className='mb-2'>
                                <p className='font-semibold text-2xl mb-2 text-red-500'>Добавленные{homeworkId ? '' : ' сейчас'}:</p>
                                {addedThemes.map((theme) => renderThemeItem(theme, 'added'))}
                            </div>}
                        </>
                    }
                    
                </div>
                <SelectHomeWorkModal modal={modal} setModal={setModal} selectHomeWork={(data) => void selectHomeWork(data)}/>
                <SuccessModal noclosable={true} modal={modal2} setModal={setModal2} message={homeworkSentText[language]}>
                    <MainButton className='mt-5' onClick={()=> groupId && navigate('/group/'+groupId)}>{returnToGroupText[language]}</MainButton>
                    <MainButton className='mt-2' onClick={()=> groupId && navigate('/messenger/chat/'+group.dialog_id)}>{openGroupChatText[language]}</MainButton>
                </SuccessModal>
                <AuthErrorModal modal={emodal} setModal={setEModal} error={modalError} />
                <Modal className='p-5' active={sureSendDZModal} setActive={setSureSendDZModal}>
                    <h3 className='text-center mb-4 text-xl font-medium'>Срок выполнение дз правильно поставлен?</h3>
                    <MainButton className='!bg-gradient-button-green mb-2' onClick={() => setCommentModal(true)}> Да, правильно, {sendHomeworkText[language]}</MainButton>
                    <MainButton onClick={() => setSureSendDZModal(false)}> Нет, вернуться редактировать срок дз </MainButton>
                    <div dangerouslySetInnerHTML={{__html: homeworkDeadlineAdvice[language] || ''}}></div>
                </Modal>
                <Modal maxWidth={1100} className='p-5' active={commentModal} setActive={setCommentModal}>
                    <h3 className='text-center mb-4 text-xl font-medium'>Оставить комментарий к задачам</h3>
                    <TextEditor
                        onChange={(value: string) => setComment(value)}
                        value={comment} 
                        minHeight={500}
                    />
                    <MainButton className='!bg-gradient-button-green my-2' onClick={() => void sendHomework()}>{sendHomeworkText[language]}</MainButton>
                    <MainButton disabled={comment.length > 0} onClick={() => void sendHomework()}>{sendHomeworkText[language]} без комментариев</MainButton>
                </Modal>
                <ProgramActionsHistoryModal
                    active={programActionsHistoryModal}
                    setActive={setProgramActionsHistoryModal}
                    group_id={groupId || ''}
                    history={history}
                    setHistory={setHistory}
                    section='homework'
                    themeId={historyTheme}
                />
                <PassedThemesHelpModal active={passedThemesHelpModal} setActive={setPassedThemesHelpModal} />
            </div> 
        </div>
    )
}

export default AddHomework;