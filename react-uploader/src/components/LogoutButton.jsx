import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    
    return (
        <button className="logout-button" onClick={handleLogout} >
            Logout
        </button>
    );
};

export default LogoutButton;