import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import { useSelector } from 'react-redux';

const WorkerRoute = () => {
  const { userAuth } = useSelector((store) => store?.system);

  if (userAuth?.role !== 'Worker') {
    return <Navigate to="/login" />;
  }

  return (
    <main className='mx-auto max-w-[1200px]'>
      <Header />
      <Outlet />
    </main>
  );
};

export default WorkerRoute;
