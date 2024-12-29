import { useParams } from 'react-router-dom';
import Tournament from '../../assets/icons/TournamentBlack.png';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';


const CreateTournament = () => {
    const { groupId } = useParams();
    const { user } = useAppSelector(
      (state) => state.UserSlice,
    );
    
  return (
    <div className="w-full h-full flex items-center justify-center">
    <div className="border-[#B7975A] w-11/12 min-h-4/6 border place-self-center  flex rad rounded-3xl flex-col items-center justify-center">
        <img src={Tournament} className='h-20  -mt-10' />
        <h1 className='text-5xl text-red-500 mt-2 min-h-20 text-center'>Создать новый турнир</h1>
        <hr className='w-full  border border-gray-400'/>
        <Link to={`/Tournament/${groupId}/area`}><h2 className='underline-offset-2 underline text-3xl text-gray-600 mt-10 min-h-20 text-center'>Турнир Арена</h2></Link>
        <hr className='w-full  border border-gray-400'/>
        <Link to={`/Tournament/${groupId}/Swiss`}><h2 className='underline-offset-2 underline text-3xl text-gray-600 mt-10 min-h-20 text-center'>Турнир по Швейцарской системе</h2></Link>
        {user.role == 'TRANER' && <><hr className='w-full  border border-gray-400'/>
        <h2 className='underline-offset-2 underline text-3xl text-gray-600 mt-10 min-h-20 text-center'>Викторина</h2>
        </>}
        {user.role == 'DIRECTOR'  && <><hr className='w-full  border border-gray-400'/>
          <Link to={`/Tournament/${groupId}/intergroup`}><h2 className='underline-offset-2 underline text-3xl text-gray-600 mt-10 min-h-20 text-center'>Межгрупповой Турнир</h2></Link>
        <hr className='w-full  border border-gray-400'/>
        <Link to={`/Tournament/${groupId}/interschool`}><h2 className='underline-offset-2 underline text-3xl text-gray-600 mt-10 min-h-20 text-center'>Межшкольный турнир</h2></Link>
        </>}
    </div></div>
  )
}

export default CreateTournament