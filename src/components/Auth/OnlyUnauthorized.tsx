import { FC, PropsWithChildren } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { useQuery } from '../../hooks/useQuery';

const OnlyUnauthorized: FC<PropsWithChildren> = ({ children }) => {
  const { isAuth } = useAppSelector((state) => state.UserSlice);
  const location = useLocation();
  const query = useQuery();

  const querySessionId = query.get('sessionId');

  if (isAuth && !querySessionId) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default OnlyUnauthorized;
