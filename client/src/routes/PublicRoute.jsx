import React, { useEffect, useLayoutEffect } from 'react'
import Header from '../components/layout/Header'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"



const PublicRoute = () => {

    const location = useLocation();
    const navigate = useNavigate();






    useEffect(() => {

        const getResponse = async () => {
            try {
                const { data } = await axios.get("http://localhost:8000/api/user/checkLogged", { withCredentials: true })

                if (data.message === "ok") {
                    const role = data.data.role
                    if (role === "Worker") {
                        navigate("/dayil-report-update")
                    }
                    else if (role === "User") {
                        navigate("/user/reports")
                    }
                    else if (role === "Manager") {
                        navigate("/admin/dashboard")
                    }
                    else if (role === "Admin") {
                        navigate("/admin/dashboard")
                    }

                }
                console.log(res.data.message)
            }
            catch (err) {
                console.log("not helo")
            }

        }

        getResponse()
        // console.log(data)



    }, [])

    return (
        <main className='mx-auto max-w-[1200px]'>
            <Header />
            <Outlet />
        </main>
    )
}

export default PublicRoute
