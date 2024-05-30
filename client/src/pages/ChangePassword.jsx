import  { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'antd';
import { HiOutlineLogout } from 'react-icons/hi';
// import { logoutAction } from '../../redux/slices/systemSlices';

const ChangePassword = () => {
  const navigate = useNavigate();
//   const dispatch = useDispatch();
  const { userAuth } = useSelector((store) => store?.system);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userAuth?.firstLogin) {
      navigate('/');
    }
  }, [userAuth, navigate]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.post('http://localhost:8000/api/user/change-password', {
        password,
      }, { withCredentials: true });
      if (data.success) {
        navigate('/');
      } else {
        setError('Failed to change password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleLogout = async () => {
    const { data } = await axios.get('http://localhost:8000/api/user/logout', {
      withCredentials: true,
    });
    if (data.message === 'User logged Out') {
    //   dispatch(logoutAction());
      navigate('/');
    }
  };

  return (
    <div className='mt-3 sm:mt-4 md:mt-5 h-screen'>
      <div className='bg-white w-full px-8 py-16 mx-auto max-w-[480px] h-full rounded-lg'>
        <h1 className='mb-8 text-center text-lg font-bold border-b border-black pb-4'>Change Password</h1>
        <form onSubmit={handlePasswordChange} className='grid gap-4'>
          <div className='flex flex-col gap-1'>
            <label className='font-semibold text-sm' htmlFor='password'>New Password</label>
            <input
              onChange={(ev) => setPassword(ev.target.value)}
              value={password}
              className='px-1 py-3 outline-none border border-[#b9bec4] rounded text-sm'
              id='password'
              type='password'
              name='password'
              required
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='font-semibold text-sm' htmlFor='confirmPassword'>Confirm Password</label>
            <input
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              value={confirmPassword}
              className='px-1 py-3 outline-none border border-[#b9bec4] rounded text-sm'
              id='confirmPassword'
              type='password'
              name='confirmPassword'
              required
            />
          </div>
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          <div className='flex flex-col mt-8'>
            <button className='py-3 bg-black text-white font-bold rounded'>Change Password</button>
          </div>
        </form>
        <div className='flex flex-col mt-4'>
          <Button
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            type='primary'
          >
            <HiOutlineLogout />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
