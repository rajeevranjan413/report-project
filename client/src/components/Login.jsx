import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        if (data.get("role") === "admin") {
            navigate("/admin/dashboard")

        }
        if (data.get("role") === "user") {
            navigate("/reports")

        }
        if (data.get("role") === "worker") {
            navigate("/dayil-report-update")

        }

    }
    return (
        <div className='mt-3 sm:mt-4 md:mt-5'>
            <div className=' bg-white w-full p-8 mx-auto max-w-[480px] rounded-lg'>
                <h1 className='mb-8 text-center text-lg font-bold border-b border-black pb-4'>Welcome !</h1>
                <form onSubmit={handleLogin} className='grid gap-4'>

                    <div className='flex flex-col gap-1'>
                        <label className=' font-semibold text-sm' htmlFor="name">Name</label>
                        <input onChange={ev => setName(ev.target.value)} value={name} className='px-1 py-3 outline-none border border-[#b9bec4] rounded text-sm name' id='name' type="text" name='name' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className=' font-semibold text-sm' htmlFor="password">Passowrd</label>
                        <input onChange={ev => setPassword(ev.target.value)} value={password} className='px-1 py-3 outline-none border border-[#b9bec4] rounded text-sm' id='password' type="password" name='password' />
                    </div>

                    <div className=' flex flex-col gap-1 border-[#b9bec4] '>
                        <label className=' font-semibold text-sm' htmlFor="role">Select role</label>
                        <select onChange={ev => setRole(ev.target.value)} value={role} className=' border border-[#b9bec4] px-1 py-3 text-sm outline-none rounded' name="role" id="role">
                            <option value="worker">Worker</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    <div className='flex flex-col mt-8'>
                        <button className='py-3 bg-black text-white font-bold rounded'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
