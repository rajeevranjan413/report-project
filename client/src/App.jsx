import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'

import { AdminRouter, BossRouter, UserRouter, WorkerRouter } from './routers/index'
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
        <Route path='/' element={<PublicRouter />}>
          <Route index element={<Home />} />
        </Route>

        <Route element={<WorkerRouter />}>
          <Route path='/dayil-report-update' element={<DailyReportUpdate />} />
        </Route>

        <Route element={<UserRouter />}>
          <Route path='/user/reports' element={Reports} />
        </Route>


        <Route element={<AdminRouter />}>
          <Route path='/admin/dashboard' element={<AdminDashboard role="admin" />} />
          <Route path='/admin/users' element={Users} />
          <Route path='/admin/reports' />
        </Route>

        <Route element={<BossRouter />}>
          <Route path='/boss/dashboard' element={<AdminDashboard role="boss" />} />
          <Route path='/boss/reports' />
        </Route>
      </Routes>
    </Suspense>

  )
}

export default App
