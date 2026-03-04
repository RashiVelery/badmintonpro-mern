import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import API from '../services/api';
function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name:"",
        email: "",
        password: ""
    });


    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit =async (e) =>{
        e.preventDefault();

        try {
            const res = await API.post("/auth/signup" , formData);
            alert("signup successfully");
            navigate('/login');

        } catch (err) {
            console.log(err);
            alert("Signup failed");
        }
    };

    

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <h2>Sign Up</h2>

                <input type="name" placeholder='Name' name='name' value={formData.name} onChange={handleChange} required />
                
                <input type="email" placeholder='Email' name='email' value={formData.email} onChange={handleChange} required />


                <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleChange} required />

                <button type='submit' >Sign Up</button>

                <p>You already have an account? <span onClick={()=>navigate('/login') }>Login</span></p>
            </form>
        </div>
    )
}

export default Signup
