import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserAuth } from '../../redux/slices/systemSlices';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await axios.post('http://localhost:8000/api/user/login', {
        name,
        password,
      }, { withCredentials: true });

      if (data?.data) {
        localStorage.setItem('userInfo', JSON.stringify(data.data));
        dispatch(setUserAuth(data.data));

        if (data.data.firstLogin) {
          navigate('/change-password');
        } else {
          switch (data.data.role) {
            case 'Worker':
              navigate('/daily-report-update');
              break;
            case 'Admin':
              navigate('/admin/reports');
              break;
            case 'User':
              navigate('/user/reports');
              break;
            default:
              navigate('/');
          }
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='mt-3 sm:mt-4 md:mt-5 h-screen'>
      <div className='bg-white w-full px-8 py-16 mx-auto max-w-[480px] h-full rounded-lg'>
        <h1 className='mb-8 text-center text-lg font-bold border-b border-black pb-4'>Welcome!</h1>
        <form onSubmit={handleLogin} className='grid gap-4'>
          <div className='flex flex-col gap-1'>
            <label className='font-semibold text-sm' htmlFor='name'>Name</label>
            <input
              onChange={(ev) => setName(ev.target.value)}
              value={name}
              className='px-1 py-3 outline-none border border-[#b9bec4] rounded text-sm'
              id='name'
              type='text'
              name='name'
              required
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='font-semibold text-sm' htmlFor='password'>Password</label>
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
          <div className='flex flex-col mt-8'>
            <button className='py-3 bg-black text-white font-bold rounded'>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
