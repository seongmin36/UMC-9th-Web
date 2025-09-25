import { Navigate, Outlet } from 'react-router-dom';

interface BaseLayoutProps {
  protectedRoutes: boolean;
}

const BaseLayout = ({ protectedRoutes }: BaseLayoutProps) => {
  if (protectedRoutes) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default BaseLayout;
