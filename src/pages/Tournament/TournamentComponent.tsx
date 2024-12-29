
import { Link } from 'react-router-dom';
import groupYellow from '../../assets/icons/groubYellow.png';
import rabbit from '../../assets/icons/rabbit.png';
import person from '../../assets/person.png';

const TournamentComponent = ({data}:any) => {
    const amiibo = (
      <Link to={`5452523564/intergroup/tostart`}>
<div className="h-[80px] border-t flex items-center">
            <img src={rabbit} className="h-[60px] ml-10" />
            <div className="ml-4">
              <h1 className='text-lg font-medium'>Турнир №5 Арена</h1>
              <p className='text-gray-500 text-nowrap'>7+3 • Рапид • Рейтинговый • 45m</p>
            </div>
            <div className="ml-auto mr-[140px] text-center"><h1 className='text-lg font-medium'>{data.place}</h1><p className='text-red-500 font-medium'>{data.time}</p></div>
            <div className="flex items-center mr-[100px]">
              <img src={person} className='' />
              <p className='text-2xl font-medium '>{data.count}</p>
            </div>
            <img src={groupYellow} className='mr-10 mt-1' />
          </div></Link>
    )

    
  return (
    <div>{amiibo}</div>
  )
}

export default TournamentComponent