import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import UserList from "./Components/UserList/UserList";
import Eventlist from "./Components/EventList/Eventlist";
import ProtectedRoute from "./Utils/Protectedroute";
import Notification from "./Components/Notifications/Notification";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-list"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/event-list"
            element={
              <ProtectedRoute>
                <Eventlist />
              </ProtectedRoute>
            }
          />
            <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notification/>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
