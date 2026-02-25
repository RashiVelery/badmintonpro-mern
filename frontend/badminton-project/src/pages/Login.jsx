import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleLogin = async () => {
        setEmailError("");
        setPasswordError("");

        if (!email.trim()) {
            setEmailError("Please enter an email");
            return;
        }

        if (!password.trim()) {
            setPasswordError("Please enter a password");
            return;
        }
        try {
            setError("");

            const res = await API.post("/auth/login", {
                email,
                password,
            });

            console.log(res.data);

            // If login successful → go to tournaments page
            navigate("/tournaments");

        } catch (err) {
            const data = err.response?.data;

            if (data?.field === "email") {
                setEmailError(data.message);
            }

            if (data?.field === "password") {
                setPasswordError(data.message);
            }
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Login</h2>


            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p style={{ color: "red", fontSize:"10px" }}>{emailError}</p>}
            

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p style={{ color: "red", fontSize:"10px" }}>{passwordError}</p>}
            

            <button onClick={handleLogin}>Login</button>

            <p style={{ marginTop: "10px" }}>
                Don't have an account? <Link to="/signup">Signup</Link>
            </p>
        </div>
    );
}