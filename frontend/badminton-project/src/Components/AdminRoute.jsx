import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router";
import { useRef } from "react";

function AdminRoute({ children }) {

    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const alertShown = useRef(false);

    useEffect(() => {

        const checkUser = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }


            try {

                const res = await API.get("/auth/me");

                if (res.data.role === "admin") {
                    setIsAdmin(true);
                } else {

                    if (!alertShown.current) {
                        alert("Admin access only");
                        navigate('/')
                        alertShown.current = true
                    }
                }

            } catch (error) {

                if (!alertShown.current) {
                    alert('Please login first')
                    alertShown.current = true
                }
                navigate('/login')
            }

        };

        checkUser();

    }, [])


    if (!isAdmin) return null;

    return children;
}

export default AdminRoute;