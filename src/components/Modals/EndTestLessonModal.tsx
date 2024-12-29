import React, { useEffect, useState } from 'react';
import Modal from '../UI/Modal';
import { ITranslateItemString, translations } from '../../utils/translations';
import { useAppSelector } from '../../hooks/redux';
import { MdOutlineDeleteOutline } from '@react-icons/all-files/md/MdOutlineDeleteOutline';
import { AxiosError } from 'axios';
import { Chessboard } from 'react-chessboard';
import { useParams } from 'react-router-dom';
import { ServerError } from '../../models/response/ServerError';
import HomeworkService from '../../services/HomeworkService';
import Input from '../UI/Input';
import InputMask from 'react-input-mask';
import MainButton from '../UI/MainButton';
import AuthErrorModal from './AuthError';
import SelectHomeWorkModal from './SelectHomeWorkModal';
import SuccessModal from './SuccessModal';
import Switch from '../UI/Switch';
import enGB from 'date-fns/locale/en-GB';
import DatePicker, { registerLocale } from 'react-datepicker';
registerLocale('enGB', enGB);
import 'react-datepicker/dist/react-datepicker.css';
import Star from '../../assets/pawns/star.png';
import { IMaterial } from '../../models/Program/IMaterial';

export interface EndTestLessonModalProps {
  active: boolean;
  setActive: (active: boolean) => void;
  program: IMaterial[];
}

const EndTestLessonModal: React.FC<EndTestLessonModalProps> = ({ active, setActive, program }) => {
    const language = useAppSelector(state=> state.TranslateSlice.language);
    const { groupId } = useParams();
    const [position, setPosition] = useState<{_id: string, position: string, type: string}>({_id: '', position: '', type: 'string'});
    const [positions, setPositions] = useState<{_id: string, position: string, seq: number}[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [modal2, setModal2] = useState<boolean>(false);
    const [emodal, setEModal] = useState<boolean>(false);
    const [modalError, setModalError] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const [autoCheck, setAutoCheck] = useState<boolean>(true);
    const { game } = useAppSelector(state=> state.GroupSlice);
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

    useEffect(() => {
        setSelectedStudents(game.map(student => student.user_id));
    }, [game]);

    const {
        sendHomeworkText,
        lessonPositionsText,
        homeworkDeadlineText,
        autocheckText,
        homeworkSentText,
        addHomeworkFromProgramText
    }: {
        sendHomeworkText: ITranslateItemString,
        lessonPositionsText: ITranslateItemString,
        homeworkDeadlineText: ITranslateItemString,
        autocheckText: ITranslateItemString,
        addHomeworkFromProgramText: ITranslateItemString,
        homeworkSentText: ITranslateItemString,
        returnToGroupText: ITranslateItemString
    } = translations.lessons
    const { selectStudentsText } = translations.testLesson;
    
    useEffect(() => {
        const temp = [] as {_id: string, position: string, seq: number, type: string}[];
        if(program) {
            program.map(material=>{
                temp.push({_id: material._id, position: material.data.tags.FEN, seq: material.seq, type: material.type});
            })
        }
        console.log(temp);
        setPositions(temp);
    }, [program])
    
    const removeHandler = (item: {_id: string, position: string}) => {
        const tmp = positions;
        setPositions(tmp.filter(material=> material._id !== item._id));
    }

    const selectHomeWork = (data: {_id: string, position: string, seq: number, type: string}) => {
        const cond = positions.findIndex(pos=> pos._id === data._id);
        const tmp = positions;
        if(cond > -1) {
            tmp.splice(cond, 1);
        }
        else {
            tmp.push(data);
        }
        setPositions(tmp);
    }

    const handleStudentCheckboxChange = (studentId: string) => {
        setSelectedStudents(prevSelectedStudents => {
            if (prevSelectedStudents.includes(studentId)) {
                return prevSelectedStudents.filter(id => id !== studentId);
            } else {
                return [...prevSelectedStudents, studentId];
            }
        });
    };

    const sendHomework = async () => {
        if(groupId) {
            const programIds = [] as string[];
            positions.map(pos=>{
                programIds.push(pos._id);
            })
            await HomeworkService.createTestHomework(selectedStudents, date, programIds, autoCheck).then(()=> setModal2(true)).catch((e: AxiosError)=> {
                const event = e.response?.data as ServerError;
                setModalError(event.error)
                setEModal(true);
            });
        }
    }
    return <Modal maxWidth={1000} className='w-full' active={active} setActive={setActive}>
        <div className="">
            <div className='w-full py-5 px-20 bg-[#f0f0f0] overflow-hidden justify-between border-collapse flex'>
                <div className="w-[500px] mr-20">
                    <Chessboard
                        position={position.position}
                        customPieces={position.type === "customtask" ? {
                            "bP": () => <img style={{margin: "10% auto"}} width='80%' height='80%' src={Star}/>,
                        } : {}}
                        isDraggablePiece={() => false}
                    />
                </div>
                <div className="flex flex-col mb-3 w-[650px]">
                    <p className='font-semibold text-2xl mb-5'>{lessonPositionsText[language]}</p>
                    <div className="flex flex-wrap">
                        {positions &&
                            positions.map((item)=> 
                                <div key={item._id}>
                                    <div className="flex items-center mr-3 mb-2">
                                        <p onClick={()=> setPosition({_id: item._id, position: item.position, type: item.type})} className={['hover:bg-gradient-appricot cursor-pointer hover:text-white py-1 font-semibold px-5 rounded-lg shadow-xl', position._id === item._id ? 'bg-gradient-appricot text-white' : 'bg-gradient-button'].join(' ')}>{item.seq}</p>
                                        <button onClick={()=> removeHandler(item)}><MdOutlineDeleteOutline /></button>
                                    </div>
                                </div>
                            )
                            
                        }
                    </div>
                    <div className="mt-5 flex items-end">
                        <div>
                            <p className='font-semibold text-lg mb-2' >{homeworkDeadlineText[language]}</p>
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
                            />
                        </div>
                        <Switch
                            label={autocheckText[language]}
                            value={autoCheck}
                            onChange={setAutoCheck}
                            className='border-none font-bold text-lg mb-3 ml-5 whitespace-nowrap'
                        />
                    </div>
                    <div className="mt-5">
                        <p className='font-semibold text-lg mb-2'>{selectStudentsText[language]}</p>
                        {game.map(student => (
                            <div key={student.user_id} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id={student.user_id}
                                    checked={selectedStudents.includes(student.user_id)}
                                    onChange={() => handleStudentCheckboxChange(student.user_id)}
                                />
                                <label htmlFor={student.user_id} className="ml-2">{student.name} {student.sname}</label>
                            </div>
                        ))}
                    </div>
                    <div className="flex mt-10">
                        <MainButton className='mr-5' onClick={()=>setModal(true)}>{addHomeworkFromProgramText[language]}</MainButton>
                        <MainButton className='!bg-gradient-button-green' onClick={()=> void sendHomework()}>{sendHomeworkText[language]}</MainButton>
                    </div>
                </div>
                <SelectHomeWorkModal modal={modal} setModal={setModal} selectHomeWork={selectHomeWork}/>
                <SuccessModal modal={modal2} setModal={setModal2} message={homeworkSentText[language]}/>
                <AuthErrorModal modal={emodal} setModal={setEModal} error={modalError} />
            </div>
        </div>
    </Modal>;
};

export default EndTestLessonModal;
