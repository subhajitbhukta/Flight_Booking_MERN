import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { clearUser } from '../../Features/flightSlice';
import axios from 'axios';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.flights.user);

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:3000/api/auth/logout', { withCredentials: true }); // JWT: use POST if required
            dispatch(clearUser()); // Clear user in Redux state
            setShowNotification(true); // Show logout success notification
            setTimeout(() => {
                setShowNotification(false);
                window.location.href = '/login'; // Redirect to login after logout
            }, 3000);
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Something  wrong');
        }
    };

    return (
        <>
            <header className="bg-white bg-opacity-90 shadow">
                <nav className="container mx-auto flex justify-between items-center p-4">
                    <div className="text-2xl font-bold text-blue-700">
                        <Link to="/">JetQuest</Link>
                    </div>

                    {/* Hamburger Menu Icon */}
                    <div className="lg:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <ul className="hidden lg:flex lg:space-x-6 gap-6">
                        <li><NavLink to="/" className={({ isActive }) => (`${isActive ? 'text-blue-700' : ' text-gray-800'} hover:text-blue-600 block`)}>Home</NavLink></li>
                        <li><NavLink to="/about" className={({ isActive }) => (`${isActive ? 'text-blue-700' : ' text-gray-800'} hover:text-blue-600 block`)}>About</NavLink></li>
                        <li><NavLink to="/support" className={({ isActive }) => (`${isActive ? 'text-blue-700' : ' text-gray-800'} hover:text-blue-600 block`)}>Support</NavLink></li>
                        {user && (
                            <li><NavLink to="/profile" className={({ isActive }) => (`${isActive ? 'text-blue-700' : ' text-gray-800'} hover:text-blue-600 block`)}>Show Tickets</NavLink></li>
                        )}
                    </ul>

                    {/* User Options */}
                    <div className="hidden lg:flex space-x-4">
                        {user ? (
                            <>
                                <span className=' flex items-center text-teal-500 font-semibold text-xl'>Hello, {user.name}</span>
                                <button onClick={handleLogout} className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="px-4 py-2 text-white bg-blue-700 hover:bg-blue-900 rounded block lg:inline-block">
                                    Login
                                </Link>
                                <Link to="/signup" className="px-4 py-2 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white rounded block lg:inline-block">
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Sliding Menu for Mobile */}
                <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 lg:hidden ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transform transition-transform duration-300 ease-in-out`}>
                    <div className="bg-white w-52 h-full shadow-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-2xl font-bold text-blue-700">
                                <Link to="/">JetQuest</Link>
                            </div>
                            <button onClick={() => setMenuOpen(false)} className="text-gray-700 focus:outline-none">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <ul className="space-y-2">
                            <li><NavLink to="/" className={({ isActive }) => (`${isActive ? 'text-blue-700' : ' text-gray-800'} hover:text-blue-600 block`)}>Home</NavLink></li>
                            <li><NavLink to="/about" className={({ isActive }) => (`${isActive ? 'text-blue-700' : ' text-gray-800'} hover:text-blue-600 block`)}>About</NavLink></li>
                            <li><NavLink to="/support" className={({ isActive }) => (`${isActive ? 'text-blue-700' : ' text-gray-800'} hover:text-blue-600 block`)}>Support</NavLink></li>
                            {user && (
                                <li><NavLink to="/profile" className={({ isActive }) => (`${isActive ? 'text-blue-700' : ' text-gray-800'} hover:text-blue-600 block`)}>Tickets</NavLink></li>
                            )}
                        </ul>
                        <div className="mt-4">
                            {user ? (
                                <button onClick={handleLogout} className="block px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded mb-2">
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link to="/login" className="block px-4 py-2 text-white bg-blue-700 hover:bg-blue-900 rounded mb-2">
                                        Login
                                    </Link>
                                    <Link to="/signup" className="block px-4 py-2 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white rounded">
                                        Signup
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Notification */}
                {showNotification && (
                    <div className=" bg-red-500 text-center text-white px-4 py-2 rounded shadow-lg">
                        Logged out successfully!
                    </div>
                )}
            </header>
        </>
    );
}

export default Header;
