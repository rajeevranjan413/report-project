import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import DailyReportUpdate from './pages/DailyReportUpdate'
import Reports from './pages/Reports'
import AdminDashboard from './pages/AdminDashboard'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/dayil-report-update' element={<DailyReportUpdate />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
      </Route>
    </Routes>
  )
}

export default App
