import React from 'react'
import "./root.css"
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { Outlet, useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import API from '../services/api';
import { RxHamburgerMenu } from "react-icons/rx";


function Root() {
    // navigate ----
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false)
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await API.get('/auth/me', {
                    withCredentials: true
                })
                if (res.data) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                setIsLoggedIn(false)
            }
        };
        checkUser();
    }, []);



    // close when clicking outside ----
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        await API.post('/auth/logout', {}, {
            withCredentials: true
        });
        alert('Logout successfully')
        setIsLoggedIn(false)
        navigate('/login');
    }



    return (
        <div>

            {/* Header */}
            <header>
                <nav className='nav'>
                    <div className='left-side'>
                        <h1>Badminton Pro</h1>
                    </div>

                    <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                        <RxHamburgerMenu/>
                    </div>



                    <div className={`right-side ${menuOpen ? "active" : ""}`}>
                        <ul>
                            <li onClick={() => navigate('/')}>
                                Home
                            </li>
                            <li onClick={() => navigate('/about')}>
                                About Us
                            </li>
                            <li onClick={() => navigate('/contactus')}>
                                Contact Us
                            </li>
                            <li className="user-section" ref={dropdownRef}>
                                <FaUserCircle
                                    className="user-icon"
                                    onClick={() => setOpen(!open)}
                                />

                                {open && (
                                    <div className="dropdown">
                                        {isLoggedIn ? (<p onClick={handleLogout}>Logout</p>) :
                                            <p onClick={() => navigate('/login')}>Login</p>}

                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <Outlet />
        </div>
    )
}

export default Root
