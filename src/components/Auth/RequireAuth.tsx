import { FC, PropsWithChildren } from 'react'
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import {UserRoles} from "../../utils/userRoles.ts";

const RequireAuth: FC<PropsWithChildren> = ({children}) => {

    const {user, isAuth} = useAppSelector(state => state.UserSlice);
    const location = useLocation();
    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if(location.pathname !== '/profile' && user.role !== UserRoles.PROGRAMMER && ((!user?.born || !user?.country || !user?.name || !user?.sname || !user?.sex) && !user?.editRequest?.length )) {
        return <Navigate to="/profile?req=true" state={{ from: location }} replace />;
    }

    if(location.pathname !== '/profile' && user.role === 'NEWUSER') {
        const query = user.editRequest
        return <Navigate to="/profile?role=true" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;