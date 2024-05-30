import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const CheckFirstLoginRoute = () => {
  const [loading, setLoading] = useState(true);
  const [firstLogin, setFirstLogin] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/user/checkLogged', { withCredentials: true });
        console.log(data);
        setFirstLogin(data?.data?.firstLogin);
      } catch (error) {
        console.error('Error checking user first login status', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return firstLogin ? <Outlet /> : <Navigate to="/" />;
};

export default CheckFirstLoginRoute;
