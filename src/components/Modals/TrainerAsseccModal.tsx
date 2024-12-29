import { FC, useEffect, useState } from 'react'
import Modal from '../UI/Modal';
import { editlevel, getUsers } from '../../store/reducers/UserSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { User } from '../../models/User';

interface TrainerAsseccModal {
    modal: boolean,
    setModal: (bool: boolean) => void,
}

const TrainerAsseccModal: FC<TrainerAsseccModal> = ({ modal, setModal }) => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(state=> state.UserSlice);
    const [levelUp, setLevelUp]  = useState([])

    
    useEffect( () => {
        const fetchData = async() => {
            await dispatch(getUsers())
        }
        void fetchData();

    },[dispatch, levelUp])


    const getId = (e: string) => {
        
        // editLevel(id);
    
    }

    const levels = [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10];

    const searchActive  =  (e: User, index: number)  =>  {
        const level = e.open_level
        const arr = level?.filter(lev => lev === index + 1);
         return arr.length
    }

    const editsLevel = async (e) => {
        
        const num = +e.e.target.innerHTML;
        const level = e.user.open_level
        const id = e.user._id
        const index = e.index;

        const newArr = level.includes(num) ? level.filter(item => item !== num) : [...level, num];
        
        dispatch(editlevel({_id: id, open_level: newArr}))
        searchActive(e.user, index)
        setLevelUp(newArr)
            
        
    };



    return (
        <Modal active={modal} setActive={setModal} className=' max-w-[800px] w-full flex  flex-col lg:overflow-y-auto h-full'>
  
                <div className='flex justify-between border border-gray-500 rounded-md p-2 overflow-y-auto'>
                    <ul className='mx-auto'>
                        
                        {!users?.length ? <p>Загрузка</p> : users.map(user => <li className='border w-1/8 border-gray-300 rounded-md p-2 mb-2 flex justify-between  flex-row'  key={user._id}>{
                        <div className='flex mr-4' onClick={() => getId(user._id)}>
                            <h3 className='mr-2 uppercase '>{user.name}</h3> {}
                            <span>{user.email}</span>
                        </div>}
                        <ul className='flex flex-row mr-4'>
                            {levels.map((item, index) => <li key={index}>
                                <button className={['border border-gray-300 rounded-md p-2 hover:bg-gray-300 hover:text-gray-800', searchActive(user, index) ? 'border-4, border-red-400' : null].join(' ')}
                                 onClick={(e) => editsLevel({user, e, index})}>{item}</button>
                                
                                </li>)}
                        </ul>
                        </li>)}
                    </ul>
                </div>
            
        </Modal>
    )
}

export default TrainerAsseccModal;