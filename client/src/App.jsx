import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'

import { AdminRoute, UserRoute, WorkerRoute, PublicRoute } from './routes/index'
// import { AdminDashboard, Reports, Users } from './pages/admin'


const Home = lazy(() => import('./pages/Home'))
const DailyReportUpdate = lazy(() => import('./pages/worker/DailyReportUpdate'))
const Reports = lazy(() => import('./pages/user/Reports'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const Users = lazy(() => import('./pages/admin/Users'))


const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<PublicRoute />}>
          <Route index element={<Home />} />
        </Route>

        <Route element={<WorkerRoute />}>
          <Route path='/dayil-report-update' element={<DailyReportUpdate />} />
        </Route>

        <Route element={<UserRoute />}>
          <Route path='/user/reports' element={Reports} />
        </Route>


        <Route element={<AdminRoute />}>
          <Route path='/admin/dashboard' element={<AdminDashboard role="admin" />} />
          <Route path='/admin/users' element={Users} />
          <Route path='/admin/reports' />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path='/boss/dashboard' element={<AdminDashboard role="boss" />} />
          <Route path='/boss/reports' />
        </Route>
      </Routes>
    </Suspense>

  )
}

export default App
