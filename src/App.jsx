import { Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import DashboardLayout from './components/DashboardLayout';
import DashboardTimetable from './pages/DashboardTimetable';
import AttendanceSelection from './pages/AttendanceSelection';
import ManualAttendanceSheet from './pages/ManualAttendanceSheet';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import AssignmentOverview from './pages/AssignmentOverview';
import AssignmentCreator from './pages/AssignmentCreator';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardTimetable />} />
        <Route path="attendance" element={<AttendanceSelection />} />
        <Route path="attendance/manual" element={<ManualAttendanceSheet />} />
        <Route path="analytics" element={<AnalyticsDashboard />} />
        <Route path="assignments" element={<AssignmentOverview />} />
        <Route path="assignments/new" element={<AssignmentCreator />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
