import React from 'react'
import { useNavigate } from 'react-router'
import API from '../services/api';
import { useState } from 'react';
import '../style/login.css';


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

            alert('Login successfully')
            navigate('/');
            window.location.reload()

        } catch (err) {

            if(err.response && err.response.status === 403){
                alert(err.response.data.message);
            }else if(err.response.data.message){
                alert(err.response.data.message);
            }else{
                alert('Something went wrong. Please try again.');
            }
            console.error(err);
            setError('Login failed');
        }
    }
    return (
        <>
            <div className="login-page">

                <form className="login-card" onSubmit={handleSubmit}>

                    <h2>Login</h2>

                    {error && <p className="error">{error}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Login</button>

                    <p className="signup-text">
                        Don't have an account?
                        <span onClick={() => navigate('/signup')}>
                            Sign Up
                        </span>
                    </p>

                </form>

            </div>

        </>
    )
}

export default Login
