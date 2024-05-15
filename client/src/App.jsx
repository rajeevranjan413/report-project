import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PublicRoute, WorkerRoute, AdminRoute, UserRoute } from './routes/index'

const Home = lazy(() => import('./pages/Home'))

/* ------------ Workers Pages ------------*/
const DailyReportUpdate = lazy(() => import('./pages/worker/DailyReportUpdate'))

/* ------------ Admin Pages ------------*/
const Reports = lazy(() => import('./pages/admin/Reports'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const Users = lazy(() => import('./pages/admin/Users'))

/* ------------ Users Pages ------------*/

const UserReport = lazy(() => import('./pages/user/UsersReport'))


const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
/* ------------ Public Routes ------------*/

        <Route element={<PublicRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Home />} />
        </Route>

/* ------------ Workers Routes ------------*/


        <Route element={<WorkerRoute />}>
          <Route path='/dayil-report-update' element={<DailyReportUpdate />} />
        </Route>


/* ------------ Users Routes ------------*/
        <Route element={<UserRoute />}>
          <Route path='/user/reports' element={<UserReport />} />
        </Route>


/* ------------ Admin Routes ------------*/

        <Route element={<AdminRoute />}>
          <Route path='/admin/dashboard' element={<AdminDashboard role="admin" />} />
          <Route path='/admin/users' element={<Users />} />
          <Route path='/admin/reports' element={<Reports />} />
        </Route>

/* ------------ Boss Routes ------------*/

        {/* 
        <Route element={<AdminRoute />}>
          <Route path='/boss/dashboard' element={<AdminDashboard role="boss" />} />
          <Route path='/boss/reports' />
        </Route> */}
      </Routes>
    </Suspense>

  )
}

export default App
