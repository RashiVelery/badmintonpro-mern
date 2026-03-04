import React from 'react'
import "./root.css"
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { Outlet, useNavigate } from 'react-router';
import Cookies from 'js-cookie';

function Root() {
    // navigate ----
    const navigate = useNavigate();


    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

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





    return (
        <div>

            {/* Header */}
            <header>
                <nav className='nav'>
                    <div className='left-side'>
                        <h1>Badminton Pro</h1>
                    </div>
                    <div className='right-side'>
                        <ul>
                            <li onClick={() => navigate('/')}>
                                Home
                            </li>
                            <li onClick={() => navigate('/about')}>
                                About Us
                            </li>
                            <li>
                                Contact Us
                            </li>
                            <li className="user-section" ref={dropdownRef}>
                                <FaUserCircle
                                    className="user-icon"
                                    onClick={() => setOpen(!open)}
                                />

                                {open && (
                                    <div className="dropdown">
                                        <p onClick={() => navigate('/login')}>Login</p>
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
