import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import {
  PublicRoute,
  WorkerRoute,
  AdminRoute,
  UserRoute,
  CheckFirstLoginRoute,
} from "./routes/index";
import ChangePassword from "./pages/ChangePassword";

const Home = lazy(() => import("./pages/Home"));

/* ------------ Workers Pages ------------*/
const DailyReportUpdate = lazy(() =>
  import("./pages/worker/DailyReportUpdate")
);

/* ------------ Admin Pages ------------*/
const AdminReports = lazy(() => import("./pages/admin/AdminReports"));
// const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminFactory = lazy(() => import("./pages/admin/AdminFactory"));
const AdminWorkReport = lazy(() => import("./pages/admin/AdminWorkReport"));

/* ------------ Users Pages ------------*/

const UserReport = lazy(() => import("./pages/user/UsersReport"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* ------------ Public Routes ------------*/}{" "}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Home />} />
        </Route>
        {/* ------------ Public Routes ------------*/}{" "}
        <Route element={<CheckFirstLoginRoute />}>
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
        {/* ------------ Workers Routes ------------*/}{" "}
        <Route element={<WorkerRoute />}>
          <Route path="/daily-report-update" element={<DailyReportUpdate />} />
        </Route>
        {/* ------------ Users Routes ------------*/}{" "}
        <Route element={<UserRoute />}>
          <Route path="/user/reports" element={<UserReport />} />
        </Route>
        {/* ------------ Admin Routes ------------*/}{" "}
        <Route element={<AdminRoute />}>
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/factory" element={<AdminFactory />} />
          <Route path="/admin/work-report" element={<AdminWorkReport />} />
        </Route>
        {/* ------------ Boss Routes ------------*/}{" "}
        {/* 
        <Route element={<AdminRoute />}>
          <Route path='/boss/dashboard' element={<AdminDashboard role="boss" />} />
          <Route path='/boss/reports' />
        </Route> */}
      </Routes>
    </Suspense>
  );
};

export default App;
