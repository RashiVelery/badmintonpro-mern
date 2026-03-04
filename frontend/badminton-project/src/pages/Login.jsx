import React from 'react'
import { useNavigate } from 'react-router'
import API from '../services/api';
import { useState } from 'react';

function Login() {
    // navigate ----
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // handle submit ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post('/auth/login', {
                email,
                password,
            });

            console.log(response.data);

            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Login failed');
        }
    }
    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <input type="email" placeholder='Email'
                        value={email} onChange={(e) => setEmail(e.target.value)} />

                    <input type="password" placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    <button type='submit'>Login</button>

                    <p>You don't have an account? <span onClick={() => navigate('/signup')}>Sign Up</span></p>

                </form>
            </div>
        </>
    )
}

export default Login
