// Libraries
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom';

// PUBLIC
import HomePage from './pages/common/Homepage/Homepage';
import Register from './pages/common/Register/Register';
import Login from './pages/common/Login/Login';
import NotFound from './pages/404/NotFound';

// ADMINISTRATOR
import AdminDashboard from './pages/admin/Dashboard/AdminDashboard'; // Main Administrator Dashboard
import AdminHome from './pages/admin/Dashboard/Home/AdminHome'; // Administrator child route
import AdminSettings from './pages/admin/Dashboard/Setting/AdminSettings'; // Child route
import AdminUserList from './pages/admin/Dashboard/UsersList/UsersList';
import AdminApplicationsList from './pages/admin/Dashboard/Applications/AdminApplications';
import AdminAddCommissioner from './pages/admin/Dashboard/addcommissioner/AddCommissioner';

// USER
import UserDashboard from './pages/user/Dashboard/UserDashboard'; // Main Parent route
import UserHomepage from './pages/user/Dashboard/Home/UserHome'; // Child route
import UserDocuments from './pages/user/Dashboard/Document/UserDocuments'; // Child route
import UserSettings from './pages/user/Dashboard/Settings/UserSettings'; // Child route
import UserDocumentsUpload from './pages/user/Dashboard/Upload/UserUpload'; // Child route
import PaymentPage from './pages/user/Dashboard/Payment/UserPayment'; // Payment route
import ApplicationStatus from './pages/user/Dashboard/Status/UserApplicationStatus'; // Application Status route

// Layout Components
const UserLayout = () => (
  <div className="user-layout h-screen overflow-hidden">
    <UserDashboard /> {/* Sidebar or other common component for User Dashboard */}
    <main className="overflow-auto flex-1">
      <Outlet /> {/* Renders child routes */}
    </main>
  </div>
);

const AdminLayout = () => (
  <div className="admin-layout h-screen overflow-hidden">
    <AdminDashboard /> {/* Sidebar or other common component for Admin Dashboard */}
    <main className="overflow-auto flex-1">
      <Outlet /> {/* Renders child routes */}
    </main>
  </div>
);

// Builds a router to route pages
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/user-dashboard',
    element: <UserLayout />, // Wrap with User Layout
    children: [
      {
        index: true,
        element: <UserHomepage />,
      },
      {
        path: 'userdocuments',
        element: <UserDocuments />,
      },
      {
        path: 'userdocumentsupload',
        element: <UserDocumentsUpload />,
      },
      {
        path: 'usersettings',
        element: <UserSettings />,
      },
      {
        path: 'payment',
        element: <PaymentPage />,
      },
      {
        path: 'application-status',
        element: <ApplicationStatus />,
      },
      // Add more user-dashboard child routes here
    ],
  },
  {
    path: '/admin-dashboard',
    element: <AdminLayout />, // Wrap with Admin Layout
    children: [
      {
        index: true, // This will render at /admin-dashboard
        path: 'adminhome',
        element: <AdminHome />,
      },
      {
        path: 'adminuserlist',
        element: <AdminUserList />,
      },
      {
        path: 'applicationslist',
        element: <AdminApplicationsList />,
      },
      {
        path: 'add-commissioner',
        element: <AdminAddCommissioner />,
      },
      {
        path: 'settings',
        element: <AdminSettings />,
      },
      // Add more admin-dashboard child routes here
    ],
  },
  {
    path: '*',
    element: <NotFound />, // 404 handling
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
