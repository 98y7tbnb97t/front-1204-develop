import {FC, useEffect, useState} from 'react'
import Modal from '../UI/Modal';
import Input from '../UI/Main/Input';
import Select from '../UI/Main/Select';
import MainButton from '../UI/MainButton';
import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {ServerError} from '../../models/response/ServerError';
import AuthErrorModal from './AuthError';
import parse from 'date-fns/parse';
import formatISO from 'date-fns/formatISO';
import InputMask from 'react-input-mask';
import {ISelect} from '../../models/ISelect';
import PermissionsService from '../../services/PermissionsService';
import GroupService from '../../services/GroupService';
import {createGroup, editGroup} from '../../store/reducers/GroupSlice';
import DatePicker, {registerLocale} from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import {useParams} from 'react-router-dom';
import ComboSelect from '../UI/Main/ComboSelect';
import 'react-datepicker/dist/react-datepicker.css';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";
import {groupCountries} from "../../utils/countries.ts";
import { IDate, IGroup } from '../../models/response/IGroup.ts';
import UsersAddSearch from '../Widgets/UsersAddSearch.tsx';
import { User } from '../../models/User.ts';
import { UserRoles } from '../../utils/userRoles.ts';
import { IAutoSMSTemplate, Units } from '../../models/IAutoSMS.ts';
import { EInfoTextFields } from '../../models/IInfoTexts.ts';
import { createAutoSMS } from '../../store/reducers/AutoSMSSlice.ts';
import { getInfoText } from '../../store/reducers/InfoTextsSlice.ts';
import { Listbox } from '@headlessui/react';
import { FaEdit } from '@react-icons/all-files/fa/FaEdit';
import { ISubject } from '../../models/ISubject.ts';
import SubjectService from '../../services/SubjectService.ts';
import SubjectModal from './SubjectModal.tsx';

registerLocale('enGB', enGB);

interface CreateFullGroupModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
    edit?: boolean,
    group_id?: string,
    callback?: (d: string) => void;
}

type Form = {
    name: string,
    graphics: [{ graphic: ISelect[], starttime: string, endtime: string, time: number }],
    traners: ISelect[],
    level: ISelect,
    country: ISelect,
    pupils: ISelect,
    time: number,
    starts: Date,
    startpos: string,
    format: ISelect,
    status: ISelect
};

const CreateFullGroupModal: FC<CreateFullGroupModalProps> = ({modal, setModal, edit, group_id, callback}) => {
    const language = useAppSelector(state => state.TranslateSlice.language)
    const [modalError, setModalError] = useState<string>('');
    const [eModal, setEModal] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [tranersOptions, setTranersOptions] = useState<ISelect[]>([]);
    const [editState, setEditState] = useState<boolean>(!!edit);
    const {user} = useAppSelector(state => state.UserSlice)
    const {groupId} = useParams();
    const [group, setGroup] = useState<IGroup>();
    const [timePoints, setTimePoints] = useState<{ starttime: string, endtime: string }>({
        starttime: '',
        endtime: ''
    });
    const [selectedSubject, setSelectedSubject] = useState<ISubject | null>(null);
    const {AutoSMSStartLesson30min, AutoSMSStartLesson120min, willBePresent, willNotBePresent} = useAppSelector(state => state.InfoTextsSlice);
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [subjectsModal, setSubjectsModal] = useState<boolean>(false);
    const [editSubjectsModal, setEditSubjectsModal] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
        const res = await SubjectService.getSubjects();
        setSubjects(res.data);
        }
        void fetchData();
    }, []);

    const {
        dayOfThwWeekText,
        beginningTimeText,
        minuteText,
        addText,
        deleteText,
        levelText,
        numberOfStudentsText,
        closeText,
        saveText,
        startDateText,
        editGroupText,
        autoNameText,
        trainersText,
        sundayText,
        mondayText,
        tuesdayText,
        wednesdayText,
        thursdayText,
        fridayText,
        saturdayText,
        sundaySlugText,
        mondaySlugText,
        tuesdaySlugText,
        wednesdaySlugText,
        thursdaySlugText,
        fridaySlugText,
        saturdaySlugText,
        recruitmentText,
        studyingText,
        groupText,
        individualText,
        trainingFormatText,
        trainingStatusText,
    }: {
        dayOfThwWeekText: ITranslateItemString,
        beginningTimeText: ITranslateItemString,
        minuteText: ITranslateItemString,
        addText: ITranslateItemString,
        deleteText: ITranslateItemString,
        levelText: ITranslateItemString,
        numberOfStudentsText: ITranslateItemString,
        closeText: ITranslateItemString,
        saveText: ITranslateItemString,
        startDateText: ITranslateItemString,
        editGroupText: ITranslateItemString,
        autoNameText: ITranslateItemString,
        trainersText: ITranslateItemString,
        sundayText: ITranslateItemString,
        mondayText: ITranslateItemString,
        tuesdayText: ITranslateItemString,
        wednesdayText: ITranslateItemString,
        thursdayText: ITranslateItemString,
        fridayText: ITranslateItemString,
        saturdayText: ITranslateItemString,
        sundaySlugText: ITranslateItemString,
        mondaySlugText: ITranslateItemString,
        tuesdaySlugText: ITranslateItemString,
        wednesdaySlugText: ITranslateItemString,
        thursdaySlugText: ITranslateItemString,
        fridaySlugText: ITranslateItemString,
        saturdaySlugText: ITranslateItemString,
        recruitmentText: ITranslateItemString,
        studyingText: ITranslateItemString,
        groupText: ITranslateItemString,
        individualText: ITranslateItemString,
        trainingFormatText: ITranslateItemString,
        trainingStatusText: ITranslateItemString,
    } = translations.groups

    const statusOptions: ISelect[] = [
        { id: 'recruitment', slug: 'recruitment', name: recruitmentText[language]},
        { id: 'studying', slug: 'studying', name: studyingText[language]},
    ];
    
    const formatOptions: ISelect[] = [
        { id: 'group', slug: 'group', name: groupText[language]},
        { id: 'ind', slug: 'ind', name: individualText[language]},
    ]

    const [dropdown, setDropDown] = useState<boolean>(false);
    const [users, setUsers] = useState<User[]>([]);
    const [statusOptionsState, setStatusOptionsState] = useState(statusOptions);

    const {
        createGroupText
    }: {
        createGroupText: ITranslateItemString
    } = translations.messenger

    const graphicOptions = [
        {id: '1', name: mondayText[language], slug: mondaySlugText[language]},
        {id: '2', name: tuesdayText[language], slug: tuesdaySlugText[language]},
        {id: '3', name: wednesdayText[language], slug: wednesdaySlugText[language]},
        {id: '4', name: thursdayText[language], slug: thursdaySlugText[language]},
        {id: '5', name: fridayText[language], slug: fridaySlugText[language]},
        {id: '6', name: saturdayText[language], slug: saturdaySlugText[language]},
        {id: '7', name: sundayText[language], slug: sundaySlugText[language]},
    ] as ISelect[];
    const levelsOptions = [
        {id: '1', name: `1 ${levelText[language]}`, slug: `1 ${levelText[language]}`},
        {id: '2', name: `2 ${levelText[language]}`, slug: `2 ${levelText[language]}`},
        {id: '3', name: `3 ${levelText[language]}`, slug: `3 ${levelText[language]}`},
        {id: '4', name: `4 ${levelText[language]}`, slug: `4 ${levelText[language]}`},
        {id: '5', name: `5 ${levelText[language]}`, slug: `5 ${levelText[language]}`},
        {id: '6', name: `6 ${levelText[language]}`, slug: `6 ${levelText[language]}`},
        {id: '7', name: `7 ${levelText[language]}`, slug: `7 ${levelText[language]}`},
        {id: '8', name: `8 ${levelText[language]}`, slug: `8 ${levelText[language]}`},
        {id: '9', name: `9 ${levelText[language]}`, slug: `9 ${levelText[language]}`},
        {id: '10', name: `10 ${levelText[language]}`, slug: `10 ${levelText[language]}`},
    ] as ISelect[];

    const countryOptions: ISelect[] = groupCountries.map(({text,slug,img},index) => ({
        id: (index+1).toString(),
        name: <span className='flex items-center gap-[4px] justify-center'>{text} <img src={img} alt="flag" className='w-[20px] aspect-square rounder-full' /></span>,
        slug
    } as ISelect))

    const pupilsOptions = [
        {id: '1', name: '1', slug: '1'},
        {id: '2', name: '2', slug: '2'},
        {id: '3', name: '3', slug: '3'},
        {id: '4', name: '4', slug: '4'},
        {id: '5', name: '5', slug: '5'},
        {id: '6', name: '6', slug: '6'},
        {id: '7', name: '7', slug: '7'},
        {id: '8', name: '8', slug: '8'},
        {id: '9', name: '9', slug: '9'},
        {id: '10', name: '10', slug: '10'},
        {id: '11', name: '11', slug: '11'},
        {id: '12', name: '12', slug: '12'},
    ] as ISelect[];

    useEffect(() => {
        void dispatch(getInfoText({ field: EInfoTextFields.AutoSMSStartLesson30min }));
        void dispatch(getInfoText({ field: EInfoTextFields.AutoSMSStartLesson120min }));
        void dispatch(getInfoText({ field: EInfoTextFields.willBePresent }));
        void dispatch(getInfoText({ field: EInfoTextFields.willNotBePresent }));
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            await PermissionsService.getUsers(
                    'TRANER',
                    undefined,
                    undefined,
                    undefined,
                    'name').then(users => {
                const tmp = [] as ISelect[];
                users.data.users.map(user => {
                    tmp.push({id: user._id, name: `${user.name} ${user.sname} ${user?.tname || ''}`, slug: user._id})
                })
                setTranersOptions(tmp);
                setValue('traners', []);
            });
        }
        void fetchData();
    }, [])

    const {
        control,
        watch,
        register,
        getValues,
        setValue,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<Form>({
        defaultValues: {
            graphics: edit ? [] : [{graphic: []}],
            level: levelsOptions[0],
            pupils: pupilsOptions[0],
            country: countryOptions[0],
            starts: new Date(),
            format: formatOptions[0],
            status: statusOptions[0]
        }
    });
    const {fields, append, remove} = useFieldArray({control, name: "graphics", rules: {minLength: 1}});
    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (!editState) {
                if (name !== 'name') {

                    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                    const dates: string[] = [];
                    value.graphics?.map(graphic => {
                        const date = graphic?.graphic?.length
                            ? graphic?.graphic
                                .sort((a, b) => Number(a?.id) - Number(b?.id))
                                .map(item => item?.slug)
                                .join('-')
                                .toLowerCase() + ' ' +
                            String(graphic?.starttime) || "" + ' ' +
                            String(graphic?.time) || "" +
                            minuteText[language]
                            : null
                        if(date) dates.push(date);
                    })

                    const trainersStr = getValues('traners')
                        ? getValues('traners')
                            .map(traner => (
                                `${String(traner.name).split(' ')[0]}. ${String(traner.name).split(' ')[1] || ""}`
                            )).join(' ')
                        : ""
                    if((dates.length || trainersStr)) {
                        setValue('name', `${dates.join(', ')} ${trainersStr}`)
                    }
                }

                if (name?.includes('time') && !name?.includes('endtime')) {
                    const split = name.split('.');
                    if (value.graphics[split[1]]?.starttime) {
                        if (value.graphics[split[1]].time) {
                            const time = new Date('01.01.2023 ' + value.graphics[split[1]]?.starttime);
                            time.setMinutes(time.getMinutes() + +value.graphics[split[1]].time)
                            setValue(`graphics.${split[1]}.endtime`, time.getHours().toString() + ":" + (time.getMinutes() < 10 ? '0' : '') + time.getMinutes().toString());
                        }
                    }
                }
                if (name === 'format') {
                    if (value.format?.id === 'ind') {
                        const studOpt = statusOptions.find(o => o.id === 'studying');
                        if (studOpt) {
                            setValue('status', studOpt);
                        }
                        setStatusOptionsState(statusOptions.filter(o => o.id === 'studying'));
                    } else {
                        setStatusOptionsState(statusOptions);
                    }
                }

                // if (name?.includes('endtime')) {
                //     const split = name.split('.');
                //     if (value.graphics[split[1]]?.starttime && value.graphics[split[1]]?.endtime) {
                //         const time = ((new Date('01.01.2023 ' + value.graphics[split[1]]?.endtime)).getTime() - (new Date('01.01.2023 ' + value.graphics[split[1]]?.starttime)).getTime()) / 60000;
                //         if (time) {
                //             setValue(`graphics.${split[1]}.time`, time);
                //         }
                //     }
                // }
            }
        })

        return () => subscription.unsubscribe()
    }, [watch, editState, group])

    useEffect(() => {
        if(!modal) reset()
    },[modal])

    useEffect(() => {
        if (group) {
            setUsers(group.users.filter(u => u.role !== 'TRANER'))
        }
    }, [group])

    const onChangeUsers = (users: User[]) => {
        setUsers(users);
    }

    const onSubmit: SubmitHandler<Form> = async (data, e) => {
        e?.preventDefault();
        try {
            const startsParse = parse(data.graphics[0].starttime, 'H:mm', new Date(data.starts));
            const startsISO = formatISO(new Date(startsParse));
            const tranersData = [] as Array<string>;
            data.traners.map(tran => tranersData.push(tran.id));
            const dates: IDate[] = [];
            data.graphics.map(graphic => {
                const days = [] as Array<number>;
                graphic.graphic.map(day => {
                    switch (day.slug) {
                        case 'Пн':
                            days.push(1);
                            break;
                        case 'Вт':
                            days.push(2);
                            break;
                        case 'Ср':
                            days.push(3);
                            break;
                        case 'Чт':
                            days.push(4);
                            break;
                        case 'Пт':
                            days.push(5);
                            break;
                        case 'Сб':
                            days.push(6);
                            break;
                        case 'Вс':
                            days.push(7);
                            break;
                        default:
                            break;
                    }
                })
                dates.push({days: days, time: graphic.starttime, current: String(graphic.time), endtime: graphic.endtime})
            })

            if (edit && (groupId || group_id)) {
                const response = await dispatch(editGroup({
                    groupId: groupId || group_id || '',
                    payload: {
                        name: getValues('name'),
                        traners: tranersData,
                        users: users.map(u => ({ _id: u._id, role: u.role })),
                        level: String(data.level.name),
                        country: data.country.slug,
                        format: getValues('format.id'),
                        status: getValues('status.id'),
                        start: startsISO,
                        dates: dates,
                        subject: selectedSubject?._id || undefined
                    }
                }));
                const newStudents = users.filter(u => !group?.users.some(us => us._id === u._id)).filter(u => u.role === UserRoles.STUDENT);
                const indStudents = newStudents.filter(u => u.format === 'ind');
                if (newStudents.length && group) {
                    void dispatch(createAutoSMS({ 
                        group_id: group._id,
                        notifications: [{
                            amount: 30,
                            unit: Units.MINUTES
                        }],
                        text: {
                            ru: AutoSMSStartLesson30min.ru || '',
                            en: AutoSMSStartLesson30min.en || '',
                            am: AutoSMSStartLesson30min.am || '',
                        }, 
                        sendToNotifications: true,
                        title: String(group?.name )+ ' - напоминание об уроке за 30 минут',
                        enabled: true,
                        usersToSend: newStudents.map(u => u._id),
                        additionalContent: `
                        <div class='flex gap-2 mt-2'>
                                <a
                                    class='px-4 py-2 rounded bg-blue-500 text-white'
                                    href='/messenger/chat/${group.dialog_id}?msg=${encodeURI(`${(willBePresent.ru || '')} \n ${(willBePresent.en || '')} \n ${(willBePresent.am || '')}`)}'
                                >
                                    {{willBeInLesson}}
                                </a>
                                <a
                                    class='px-4 py-2 rounded bg-red-500 text-white'}
                                    href='/messenger/chat/${group.dialog_id}?msg=${encodeURI(`${(willNotBePresent.ru || '')} \n ${(willNotBePresent.en || '')} \n ${(willNotBePresent.am || '')}`)}'
                                >
                                    {{willNotBeInLesson}}
                                </a>
                            </div>
                        `,
                        isPersonal: false
                    }));
                }
                if (indStudents.length && group) {
                    void dispatch(createAutoSMS({ 
                        group_id: group._id,
                        notifications: [{
                            amount: 2,
                            unit: Units.HOURS
                        }],
                        text: {
                            ru: (AutoSMSStartLesson120min.ru || '').replace('{{чате группы}}', `[чате группы](/messenger/chat/${group.dialog_id})`),
                            en: (AutoSMSStartLesson120min.en || '').replace('{{group chat}}', `[group chat](/messenger/chat/${group.dialog_id})`),
                            am: (AutoSMSStartLesson120min.am || '').replace('{{խմբի չաթ}}', `[խմբի չաթ](/messenger/chat/${group.dialog_id})`),
                        }, 
                        sendToNotifications: true,
                        title: group.name + ' - напоминание об уроке за 120 минут',
                        enabled: true,
                        usersToSend: indStudents.map(u => u._id),
                        additionalContent: `
                        <div class='flex gap-2 mt-2'>
                                <a
                                    class='px-4 py-2 rounded bg-blue-500 text-white'
                                    href='/messenger/chat/${group.dialog_id}?msg=${encodeURI(`${(willBePresent.ru || '')} \n ${(willBePresent.en || '')} \n ${(willBePresent.am || '')}`)}'
                                >
                                    {{willBeInLesson}}
                                </a>
                                <a
                                    class='px-4 py-2 rounded bg-red-500 text-white'}
                                    href='/messenger/chat/${group.dialog_id}?msg=${encodeURI(`${(willNotBePresent.ru || '')} \n ${(willNotBePresent.en || '')} \n ${(willNotBePresent.am || '')}`)}'
                                >
                                    {{willNotBeInLesson}}
                                </a>
                            </div>
                        `,
                        isPersonal: false
                    }));
                }
                const res = response.payload as ServerError;
                if (res?.error) {
                    setEModal(true);
                    setModalError(res.error)
                } else {
                    setModal(false);
                }
            } else {
                const response = await dispatch(createGroup({
                    name: getValues('name'),
                    traners: tranersData,
                    level: String(data.level.name),
                    country: data.country.slug,
                    starts: startsISO,
                    users,
                    format: getValues('format.id'),
                    status: getValues('status.id'),
                    subject: selectedSubject?._id,
                    dates: dates
                }));
                const res = response.payload as ServerError;
                if (res?.error) {
                    setEModal(true);
                    setModalError(res.error)
                } else {
                    setModal(false);
                }
                if (callback) {
                    callback(getValues('name'));
                }
            }

        } catch (error) {
            console.log(error);
            setEModal(true);
            setModalError('Ошибка при заполнении дат или времени')
        }
    }

    useEffect(() => {
        if (edit && (groupId || group_id)) {
            let group = '';
            if (groupId) {
                group = groupId
            } else if (group_id) {
                group = group_id;
            }
            const fetchData = async () => {
                await GroupService.getGroup(group)
                    .then((res) => {
                        const dates: IDate[] = [];
                        setGroup(res.data.group)
                        if (res.data.group.dates) {
                            res.data.group.dates.map(item => {
                                const graphic: ISelect[] = [];
                                item.days.map(day => {
                                    switch (day) {
                                        case 1:
                                            graphic.push({id: '1', name: mondayText[language], slug: mondaySlugText[language]})
                                            break;
                                        case 2:
                                            graphic.push({id: '2', name: tuesdayText[language], slug: tuesdaySlugText[language]});
                                            break;
                                        case 3:
                                            graphic.push({id: '3', name: wednesdayText[language], slug: wednesdaySlugText[language]});
                                            break;
                                        case 4:
                                            graphic.push({id: '4', name: thursdayText[language], slug: thursdaySlugText[language]});
                                            break;
                                        case 5:
                                            graphic.push({id: '5', name: fridayText[language], slug: fridaySlugText[language]});
                                            break;
                                        case 6:
                                            graphic.push({id: '6', name: saturdayText[language], slug: saturdaySlugText[language]});
                                            break;
                                        case 7:
                                            graphic.push({id: '7', name: sundayText[language], slug: sundaySlugText[language]});
                                            break;
                                        default:
                                            break;
                                    }
                                })
                                dates.push({
                                    graphic: graphic,
                                    starttime: item.time,
                                    endtime: item.endtime,
                                    time: item.current
                                });
                            })
                        }
                        setValue('graphics', dates)

                        if(res.data.group.country) {
                            const curCountryOption = countryOptions.find(item => item.slug === res.data.group.country)
                            if(curCountryOption) {
                                setValue('country',curCountryOption)
                            }

                        }

                        const tmpTraners = [] as ISelect[];
                        res.data.group.users.map(user => {
                            if (user.role === 'TRANER') {
                                tmpTraners.push({id: user._id, name: `${user.name} ${user.sname}`, slug: user._id});
                            }
                        })
                        setValue('traners', tmpTraners);
                        const nameSplit = res.data.group.name.split(' ');
                        const days = nameSplit[0].split(/\,|-/);
                        const tmpDays = [] as string[];
                        days.map(day => {
                            tmpDays.push(day.charAt(0).toUpperCase() + day.slice(1));
                        })
                        const tmpDays2 = [] as ISelect[];
                        tmpDays.map(day => {
                            const cond = graphicOptions.find(itm => itm.slug === day);
                            if (cond) {
                                tmpDays2.push(cond);
                            }
                        })
 
                        const statusOption = statusOptions.find(o => o.id === res.data.group.status);
                        if (statusOption) {
                            setValue('status', statusOption)
                        }

                        const formatOption = formatOptions.find(o => o.id === res.data.group.format);
                        if (formatOption) {
                            setValue('format', formatOption);
                            if (formatOption.id === 'ind') {
                                const studOpt = statusOptions.find(o => o.id === 'studying');
                                if (studOpt) {
                                    setValue('status', studOpt);
                                }
                                setStatusOptionsState(statusOptions.filter(o => o.id === 'studying'));
                            } else {
                                setStatusOptionsState(statusOptions);
                            }
                        }

                        setValue('startpos', nameSplit[1]);
                        setTimePoints({...timePoints, starttime: nameSplit[1]});
                        setValue('time', +nameSplit[2]);
                        const level = levelsOptions.find(itm => itm.slug === res.data.group.level);
                        if (level) {
                            setValue('level', level);
                        }
                        setValue('starts', new Date(res.data.group.start));
                        setValue('name', res.data.group.name);
                        setEditState(false);
                        if (res.data.group.subject) {
                            setSelectedSubject(res.data.group.subject);
                        }
                    });
            }
            void fetchData();
        }
    }, [tranersOptions, group_id])

    return (
        <>
            <Modal active={modal} setActive={setModal}
                   className='items-center !rounded-3xl max-w-[900px] border-2 border-[#8A6E3E]'>
                <h1 className='text-2xl font-bold tracking-wider text-gray-800 capitalize '>{edit ? editGroupText[language] : createGroupText[language]}</h1>
                <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}
                      className='bg-white container mx-auto flex flex-col px-1 md:px-10 py-1 md:py-5'>
                    <Input
                        read={!(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR')}
                        wrapperClass='mb-5'
                        type="text"
                        placeholder={autoNameText[language]}
                        error={errors.name?.message}
                        register={register('name', {required: "The field must be filled"})}
                    />
                    {fields.map((item, index) =>
                        <div className="flex mb-5" key={index}>
                            <div className={`relative w-full mr-1 md:mr-5`} style={{zIndex: 999 - index}}>
                                <Controller
                                    name={`graphics.${index}.graphic`}
                                    control={control}
                                    rules={{required: "The field must be filled"}}
                                    render={({field: {onChange}}) =>
                                        <Select className='absolute w-full' multiple={true} showMultipleValues={true}
                                                placeholder={dayOfThwWeekText[language]} options={graphicOptions}
                                                value={getValues(`graphics.${index}.graphic`)}
                                                onChange={(e) => {
                                                    onChange(e);
                                                }}/>
                                    }
                                />
                            </div>
                            <div className="flex border border-[#B7975A] rounded-full py-1 px-1 md:px-5">
                                {edit
                                    ?
                                    <Input className='border-[#ccc] !py-2'
                                           register={register(`graphics.${index}.starttime`, {required: "The field must be filled"})}
                                           wrapperClass='mr-2' type="text" placeholder={minuteText[language]}/>
                                    :
                                    <InputMask
                                        mask="99:99" {...register(`graphics.${index}.starttime`, {required: "The field must be filled"})}>
                                        {(inputProps) => <Input {...inputProps} children={'>>'}
                                                                className='border-[#ccc] !py-2 !pl-6'
                                                                error={errors.graphics?.[index]?.starttime?.message}
                                                                wrapperClass='mr-2' type="text"
                                                                placeholder={beginningTimeText[language]}/>}
                                    </InputMask>
                                }


                                <Input className='border-[#ccc] !py-2'
                                       register={register(`graphics.${index}.time`, {required: "The field must be filled"})}
                                       wrapperClass='mr-2' type="text" placeholder={minuteText[language]}/>

                                <Input className='border-[#ccc] !py-2'
                                       register={register(`graphics.${index}.endtime`, {required: "The field must be filled"})}
                                       wrapperClass='mr-2' type="text" placeholder={minuteText[language]}/>


                                {/* <InputMask mask="99:99" {...register(`graphics.${index}.endtime`, { required: "The field must be filled" })}>

                                </InputMask> */}

                            </div>
                        </div>
                    )}
                    <div className="flex w-full mb-2 md:mb-5">
                        <MainButton className='mr-5 w-full' type="button" onClick={() => {
                            append({graphic: []});
                        }}>{addText[language]}</MainButton>
                        <MainButton className='w-full' type="button"
                                    onClick={() => remove(fields.length - 1)}>{deleteText[language]}</MainButton>
                    </div>
                    {(tranersOptions && getValues('traners')) &&
                        <Controller
                            name="traners"
                            control={control}
                            rules={{required: "The field must be filled"}}
                            render={({field: {onChange}}) =>
                                <ComboSelect name={trainersText[language]} multiple={true} options={tranersOptions}
                                             value={getValues('traners')}
                                             onChange={(e) => {
                                                 onChange(e);
                                             }}/>
                            }
                        />
                    }
                    <UsersAddSearch 
                        chatUsers={users}
                        errors={errors}
                        dropdown={dropdown}
                        setDropDown={setDropDown}
                        onChangeUsers={onChangeUsers}
                    />
                    <p className='text-left text-gray-700'>Необязательное поле</p>
                    <div className="mt-2 flex w-full justify-between">
                        <Controller
                            name="level"
                            control={control}
                            rules={{required: "The field must be filled"}}
                            render={({field: {onChange}}) =>
                                <Select className='w-full mr-5' options={levelsOptions} value={getValues('level')}
                                        onChange={(e) => {
                                            onChange(e);
                                        }}/>
                            }
                        />
                        <Controller
                            name="pupils"
                            control={control}
                            rules={{required: "The field must be filled"}}
                            render={({field: {onChange}}) =>
                                <Select className='w-full' name={numberOfStudentsText[language]} options={pupilsOptions}
                                        value={getValues('pupils')}
                                        onChange={(e) => {
                                            onChange(e);
                                        }}/>
                            }
                        />
                    </div>
                    <div className="flex w-full justify-between">
                        <Controller
                            name={`format`}
                            control={control}
                            rules={{required: "The field must be filled"}}
                            render={({field: {onChange}}) =>
                                <Select 
                                    className='w-full'
                                    placeholder={trainingFormatText[language]} options={formatOptions}
                                    value={getValues(`format`)}
                                    onChange={(e) => {
                                        onChange(e);
                                    }}
                                />
                            }
                        />
                        <Controller
                            name={`status`}
                            control={control}
                            rules={{required: "The field must be filled"}}
                            render={({field: {onChange}}) =>
                                <Select 
                                    className='w-full'
                                    placeholder={trainingStatusText[language]} options={getValues(`format`)?.id === 'ind' ? statusOptionsState.filter(o => o.id !== 'recruitment') : statusOptionsState}
                                    value={getValues(`status`)}
                                    onChange={(e) => {
                                        onChange(e);
                                    }}
                                />
                            }
                        />
                    </div>
                    <div className='flex items-start gap-[6px] flex-col sm:flex-row'>
                        <div className='flex items-center gap-[3px] sm:mb-2 md:mb-5 h-[52px] justify-center w-full sm:w-auto'>
                            {
                                groupCountries.map(item => (
                                    <img
                                        src={item.img}
                                        alt="country"
                                        className='w-[30px] aspect-square rounded-full'
                                        key={item.slug}
                                    />
                                ))
                            }
                        </div>
                    <Controller
                        name="country"
                        control={control}
                        rules={{required: "The field must be filled"}}
                        render={({field: {onChange}}) =>
                            <Select
                                className='w-full mr-5'
                                wrapperClass={'flex-1'}
                                options={countryOptions}
                                value={getValues('country')}
                                    onChange={(e) => {
                                        onChange(e);
                                    }}
                            />
                        }
                    />
                    </div>
                    <div className="flex border items-center border-[#B7975A] rounded-full py-1 px-5 mb-5">
                        <p className='font-bold text-base w-full'>{startDateText[language]}</p>
                        <Controller
                            name="starts"
                            control={control}
                            rules={{required: "The field must be filled"}}
                            render={() =>
                                <DatePicker
                                    selected={getValues('starts')}
                                    dateFormat="dd.MM.yyyy"
                                    locale="enGB"
                                    onChange={(date: Date) => setValue('starts', date)}
                                    placeholderText="Weeks start on Monday"
                                    customInput={
                                        <InputMask mask="99.99.9999">
                                            {(inputProps) => <Input {...inputProps} type='text'
                                                                    className='border-[#ccc] !py-2 text-center'
                                                                    wrapperClass='w-full'
                                                                    error={errors.starts?.message}/>}
                                        </InputMask>

                                    }
                                />
                            }
                        />
                    </div>
                    <div className="flex gap-1">
                    <Listbox
                        className="w-full sm:mb-2 md:mb-5 text-gray-700 placeholder-gray-400  rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40"
                        as="div"
                        value={selectedSubject}
                        onChange={(e: ISubject | null) => {
                        setSelectedSubject(e);
                        }}
                    >
                        <Listbox.Button className="border border-[#B7975A] bg-white rounded-full py-0 md:py-2 px-2 md:px-5 w-full">
                        <p className="border rounded-full py-1 font-semibold">{selectedSubject?.name[language] || <span>Выбрать предмет</span>}</p>
                        </Listbox.Button>
                        <Listbox.Options className="z-10 bg-white w-full border border-t-0 pt-2 overflow-hidden border-[#B7975A] rounded-b-3xl">
                        <Listbox.Option
                            className="text-center cursor-pointer px-1 md:px-3 py-2 hover:bg-gradient-select border-b last:border-b-0 font-semibold"
                            value={null}
                        ><span className="text-transparent">null</span></Listbox.Option>
                        {subjects.map((type) => (
                            <Listbox.Option
                            className='text-center cursor-pointer px-1 md:px-3 py-2 hover:bg-gradient-select border-b last:border-b-0 font-semibold'
                            key={type._id}
                            value={type}
                            >
                            {type.name[language]}
                            </Listbox.Option>
                        ))}
                        <button type="button" onClick={() => setSubjectsModal(true)} className="bg-sky-500 block w-full text-white font-bold text-xl py-1">+</button>
                        </Listbox.Options>
                    </Listbox>
                    <button 
                        className="bg-sky-500 block text-white font-medium rounded-md shrink-0 p-4 self-start"
                        onClick={() => setEditSubjectsModal(true)}
                        disabled={!selectedSubject?._id}
                        >
                        <FaEdit />
                        </button>
                    </div>                  

                    <div className="flex justify-end">
                        <MainButton type='button' onClick={() => setModal(false)}
                                    className='mr-3 !px-10'>{closeText[language]}</MainButton>
                        <MainButton className='!px-10 bg-gradient-button-green'>{saveText[language]}</MainButton>
                    </div>
                </form>
            </Modal>
            <SubjectModal active={subjectsModal} setActive={setSubjectsModal} setSubjects={setSubjects}/>
            <SubjectModal
                active={editSubjectsModal}
                setActive={setEditSubjectsModal}
                setSubjects={setSubjects}
                subjects={subjects}
                subjectId={selectedSubject?._id}
            />
            <AuthErrorModal modal={eModal} setModal={setEModal} error={modalError}/>
        </>
    )
}

export default CreateFullGroupModal;