import { FC, PropsWithChildren } from 'react'
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { UserRoles } from '../../utils/userRoles';


const RequireNotArchivedStudent: FC<PropsWithChildren>= ({children}) => {
    const {user} = useAppSelector(state => state.UserSlice);
    const location = useLocation();

    if (user.role == UserRoles.STUDENT && user.archive) {
        return <Navigate to="/forbidden" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireNotArchivedStudent;