import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'

import { PublicRoute, WorkerRoute, AdminRoute } from './routes/index'
// import { AdminDashboard, Users } from './pages/admin'


const Home = lazy(() => import('./pages/Home'))
// const PublicRoute = lazy(() => import('./routes/index'))
const DailyReportUpdate = lazy(() => import('./pages/worker/DailyReportUpdate'))
const Reports = lazy(() => import('./pages/admin/Reports'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
// const Users = lazy(() => import('./pages/admin/Users'))


const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Home />} />
        </Route>

        {/* <Route element={<WorkerRoute />}>
          <Route path='/dayil-report-update' element={<DailyReportUpdate />} />
        </Route> */}

        {/* <Route element={<UserRoute />}>
          <Route path='/user/reports' element={Reports} />
        </Route> */}


        <Route element={<AdminRoute />}>
          <Route path='/admin/dashboard' element={<AdminDashboard role="admin" />} />
          <Route path='/admin/users' element={<Users />} />
          <Route path='/admin/reports' element={<Reports />} />
        </Route>
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
