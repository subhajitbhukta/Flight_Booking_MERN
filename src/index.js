import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from "./Root";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from './components/Home/Home';
import About from './components/About/About';
import Support from './components/Support/Support';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Tickets from './components/Tickets/Tickets';
import Booking from './components/Booking/Booking';
import Profile from './components/UserProfile/Profile';
import AdminLogin from './components/AdminLogin/AdminLogin'; 
import AdminDashboard from './components/AdminDashboard/AdminDashboard'; 
import { Provider } from 'react-redux';
import store from './Store/Store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root/>}>
      <Route path="" element={<Home />}/>
      <Route path="about" element={<About />} />
      <Route path="support" element={<Support />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="tickets" element={<Tickets />} />
      <Route path="booking" element={<Booking/>} />
      <Route path="profile" element={<Profile/>} />
      <Route path="admin-login" element={<AdminLogin />} /> 
      <Route path="admin-dashboard" element={<AdminDashboard />} /> 
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
