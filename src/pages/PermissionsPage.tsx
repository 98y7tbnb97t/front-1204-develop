import {FC, useCallback, useEffect, useMemo, useState} from 'react'
import TopMenuPermissions from '../components/UI/TopMenu/TopMenuPermissions';
import Table from '../components/Permissions/Table';
import PermissionsService from '../services/PermissionsService';
import {User} from '../models/User';
import {ITopMenu} from '../models/ITopMenu';
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import { translations} from "../utils/translations.tsx";
import {UserRoles} from "../utils/userRoles.ts";
import {getCounters} from "../store/reducers/PermissionsSlice.ts";
import { useLocation } from 'react-router-dom';
import { TestUser } from '../models/TestUser.ts';

const PermissionsPage: FC = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.UserSlice.user)
    const language = useAppSelector(state => state.TranslateSlice.language)
    const [roleFilter,setRoleFilter] = useState<string>("")
    const counter = useAppSelector((state) => state.PermissionsSlice.counter);
    const [selectedRole, setSelectedRole] = useState<string>('');
    const location = useLocation();
    const {
        allText,
        newUsersShortText,
        studentsText,
        trainersText,
        adminsText,
        programmersText,
        archiveText,
        debtorsText,
        testUsersText,
        archivedTestUsersText,
        directorText,
        zDirectorText
    }= translations.access

    const enum EMenuItems {
        ALL = '0',
        NEWUSERS = '1',
        STUDENTS = '2',
        TRAINER = '3',
        ADMIN = '4',
        ARCHIVE = '6',
        PROGRAMMER = '5',
        DEBTORS = '7',
        TESTUSERS = '8',
        ARCHIVEDTESTUSERS = '9',
        DIRECTOR = '10',
        ZDIRECTOR = '11',
    }

    const menuTranslations = useMemo(() => ({
        [EMenuItems.ALL]: allText,
        [EMenuItems.NEWUSERS]: newUsersShortText,
        [EMenuItems.STUDENTS]: studentsText,
        [EMenuItems.TRAINER]: trainersText,
        [EMenuItems.ADMIN]: adminsText,
        [EMenuItems.ARCHIVE]: archiveText,
        [EMenuItems.PROGRAMMER]: programmersText,
        [EMenuItems.DEBTORS]: debtorsText,
        [EMenuItems.TESTUSERS]: testUsersText,
        [EMenuItems.ARCHIVEDTESTUSERS]: archivedTestUsersText,
        [EMenuItems.DIRECTOR]: directorText,
        [EMenuItems.ZDIRECTOR]: zDirectorText,
    }) as const, [
        EMenuItems.ADMIN, adminsText,
        EMenuItems.ALL, allText,
        EMenuItems.ARCHIVE, archiveText,
        EMenuItems.NEWUSERS, newUsersShortText,
        EMenuItems.PROGRAMMER, programmersText,
        EMenuItems.STUDENTS, studentsText,
        EMenuItems.TRAINER, trainersText,
        EMenuItems.DEBTORS, debtorsText,
        EMenuItems.TESTUSERS, testUsersText,
        EMenuItems.ARCHIVEDTESTUSERS, archivedTestUsersText,
        EMenuItems.DIRECTOR, directorText,
        EMenuItems.ZDIRECTOR, zDirectorText,
    ])


    const [users, setUsers] = useState<User[]>([]);
    const [testUsers, setTestUsers] = useState<TestUser[]>([]);
    const [menu, setMenu] = useState<ITopMenu[]>([
        {id: 0, name: allText[language], path: '', counter: 0, editedCount: 0}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {id: 8, name: testUsersText[language], path: '', counter: 0, editedCount: 0}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {
            id: 1,
            name: newUsersShortText[language],
            path: 'NEWUSER',
            counter: 0,
            editedCount: 0
        }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {id: 2, name: studentsText[language], path: 'STUDENT', counter: 0, editedCount: 0},
        {
            id: 3,
            name: trainersText[language],
            path: 'TRANER',
            scope: ['DIRECTOR', 'ZDIRECTOR'],
            counter: 0,
            editedCount: 0
        }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {
            id: 4,
            name: adminsText[language],
            path: 'ADMIN',
            scope: ['DIRECTOR', 'ZDIRECTOR'],
            counter: 0,
            editedCount: 0
        },
        {
            id: 10,
            name: directorText[language],
            path: 'DIRECTOR',
            scope: ['DIRECTOR', 'ZDIRECTOR'],
            counter: 0,
            editedCount: 0
        },
        {
            id: 11,
            name: zDirectorText[language],
            path: 'ZDIRECTOR',
            scope: ['DIRECTOR', 'ZDIRECTOR'],
            counter: 0,
            editedCount: 0
        },
        {
            id: 5,
            name: programmersText[language],
            path: UserRoles.PROGRAMMER,
            scope: ['DIRECTOR', 'ZDIRECTOR'],
            counter: 0,
            editedCount: 0
        }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {id: 6, name: archiveText[language], path: '', counter: 0, editedCount: 0}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {id: 9, name: archiveText[language], path: '', counter: 0, editedCount: 0}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        {id: 7, name: debtorsText[language], path: '', counter: 0, editedCount: 0}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
    ])

    useEffect(() => {
        const {
            all,
            newTrainers,
            newStudents,
            students,
            trainers,
            admins,
            programmers,
            archive: archiveCount,
            newTrainersEdited,
            newStudentsEdited,
            studentsEdited,
            studentsRequisiteEdited,
            trainersEdited,
            adminsEdited,
            debtors,
            allStudents,
            archiveStudents,
            testUsers,
            archivedTestUsers,
            directors,
            zDirectors
        } = counter
        setMenu([
            {id: 0, name: allText[language], path: '', counter: user.role === UserRoles.ADMIN ? allStudents : all}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
            {
                id: 8,
                name: testUsersText[language],
                path: '',
                counter: testUsers,
            }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
            {
                id: 1,
                name: newUsersShortText[language],
                path: 'NEWUSER',
                counter: user.role === UserRoles.ADMIN ? newStudents : newTrainers+newStudents,
                editedCount: user.role === UserRoles.ADMIN ? newStudentsEdited : [newTrainersEdited,newStudentsEdited]
            }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
            {id: 2, name: studentsText[language], path: 'STUDENT', counter: students, editedCount: [studentsRequisiteEdited,studentsEdited]},
            {
                id: 3,
                name: trainersText[language],
                path: 'TRANER',
                scope: ['DIRECTOR', 'ZDIRECTOR'],
                counter: trainers,
                editedCount: trainersEdited
            }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
            {
                id: 4,
                name: adminsText[language],
                path: 'ADMIN',
                scope: ['DIRECTOR', 'ZDIRECTOR'],
                counter: admins,
                editedCount: adminsEdited
            },
            {
                id: 10,
                name: directorText[language],
                path: 'DIRECTOR',
                scope: ['DIRECTOR', 'ZDIRECTOR'],
                counter: directors,
            },
            {
                id: 11,
                name: zDirectorText[language],
                path: 'ZDIRECTOR',
                scope: ['DIRECTOR', 'ZDIRECTOR'],
                counter: zDirectors,
            },
            {
                id: 5,
                name: programmersText[language],
                path: UserRoles.PROGRAMMER,
                scope: ['DIRECTOR', 'ZDIRECTOR'],
                counter: programmers,
            }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
            {id: 6, name: archiveText[language], path: '', counter: user.role === UserRoles.ADMIN ? archiveStudents : archiveCount}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
            {
                id: 9,
                name: archivedTestUsersText[language],
                path: '',
                counter: archivedTestUsers,
            }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
            {
                id: 7,
                name: debtorsText[language],
                path: '',
                counter: debtors,
            }, // eslint-disable-line @typescript-eslint/restrict-template-expressions
        ])
    }, [adminsText, allText, archiveText, counter, language, newUsersShortText, programmersText, studentsText, debtorsText, trainersText, user.role, testUsersText, archivedTestUsersText, directorText, zDirectorText]);


    const setSortedUsers = (replace: boolean, users: User[]) => {
        const dataWithEditRequests = users
            .filter(item => item.editRequest && item.editRequest.filter(req => !req.acceptedAt)?.length)
        const dataWithoutEditRequests = users.filter(item => !dataWithEditRequests.find(user => user._id === item._id))

        const sortFunc = (a: User, b: User) => `${a.name.trim()} ${a.sname.trim()}`.localeCompare(`${b.name.trim()} ${b.sname.trim()}`, 'en', { sensitivity: 'base' })

        const data = [...dataWithEditRequests,...dataWithoutEditRequests]
        if (replace) {
            setUsers(data.sort(sortFunc));
        } else {
            setUsers((prevUsers) => [...prevUsers, ...data].sort(sortFunc))
        }
    }
    const fetchData = useCallback(async (replace: boolean, {
            role = '',
            search,
            archive,
            access,
            trustLesson,
            testUser
        }: {
            role?: string,
            search?: string,
            archive?: boolean,
            access?: boolean,
            trustLesson?: boolean,
            testUser?: boolean,
        }) => {
        setSelectedRole(role);
        const queryParams = new URLSearchParams(location.search);
        const archiveParam = queryParams.get('archived');
        const response = await PermissionsService.getUsers(role, search, undefined, archiveParam === 'all' ? undefined : archive, undefined, undefined, undefined, access, trustLesson, testUser);
        if (search) {
            setUsers(response.data.users);
            setTestUsers(response.data.testUsers);
        } else {
            setSortedUsers(replace, response.data.users)
            setTestUsers(response.data.testUsers);
        }
        setRoleFilter(role)
    }, [location.search])

    const updateMenu = () => {
        void dispatch(getCounters())
    }

        const onArchive = (id: string): void => {
            setUsers(prevState => prevState?.filter(item => item._id !== id))
            setTestUsers(prevState => prevState?.filter(item => item._id !== id))
        }

        const onAcceptUserEdits = async (id: string, data: { [key in string]: boolean }) => {
            const response = await PermissionsService.acceptEdit(id, data)
            if (response.data.user && users) {
                const usersCopy = [...users]
                const updatingItemIndex = usersCopy.findIndex(item => item._id === id)
                if (updatingItemIndex === -1) return;
                updateMenu()
                usersCopy[updatingItemIndex] = response.data.user
                setSortedUsers(true, usersCopy)
                return response.data.user
            }
        }
        const onEditData = (user: User) => {
            const usersCopy = [...users]
            const curIndex = usersCopy.findIndex(item => item._id === user._id)
            if(curIndex !== -1) {
                if(roleFilter && user.role !== roleFilter) {
                    setSortedUsers(true, usersCopy.filter(item => item._id !== user._id))
                } else {
                    usersCopy[curIndex] = user
                    setSortedUsers(true, usersCopy)
                }

            }
            updateMenu()
        }

        useEffect(() => {
            void fetchData(true, {});
        }, [fetchData])

        useEffect(() => {
            setMenu(prevState => prevState.map(item => ({
                ...item,
                name: menuTranslations[item.id.toString() as EMenuItems][language]
            })))
        }, [language, menuTranslations]);

        const onToggleAccess = () => {
            updateMenu()
            void fetchData(true, { 
                role: '',
                access: false
            }).then(() => {
                void fetchData(false, { 
                    role: '',
                    trustLesson: true
                })
            })
        }
        
        return (
            <div className='overflow-y-scroll lg:overflow-y-auto lg:h-auto w-full'>
                <TopMenuPermissions menu={menu} fetchData={fetchData}/>
                {users &&
                    <Table
                        table={users as any}
                        setTable={setUsers}
                        testUsers={testUsers}
                        onArchive={onArchive}
                        onAcceptUserEdits={onAcceptUserEdits}
                        onEditData={onEditData}
                        onToggleAccess={onToggleAccess}
                        selectedRole={selectedRole}
                    />
                }
            </div>
        )
    }

    export default PermissionsPage;



