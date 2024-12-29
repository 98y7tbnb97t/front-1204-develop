import { Outlet } from 'react-router-dom';

const SessionPage = () => {
  return (
    <div className='w-full' >
      <Outlet />
    </div>
  )
}

export default SessionPage