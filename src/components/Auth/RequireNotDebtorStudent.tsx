import { FC, PropsWithChildren } from 'react'
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { UserRoles } from '../../utils/userRoles';


const RequireNotDebtorStudent: FC<PropsWithChildren>= ({children}) => {
    const {user} = useAppSelector(state => state.UserSlice);
    const location = useLocation();
    if (user.role == UserRoles.STUDENT && user.access === false) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireNotDebtorStudent;