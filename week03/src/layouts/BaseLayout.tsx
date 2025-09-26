import { Navigate, Outlet } from 'react-router-dom';
import MovieNavbar from '../components/MovieNavbar';

interface BaseLayoutProps {
  protectedRoutes: boolean;
}

const BaseLayout = ({ protectedRoutes }: BaseLayoutProps) => {
  if (protectedRoutes) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <MovieNavbar />
      <Outlet />
    </>
  );
};

export default BaseLayout;
