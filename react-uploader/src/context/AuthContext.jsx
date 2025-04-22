import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const USERNAME = "admin";
const PASSWORD = "admin";

export function AuthProvider ({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    
    const login = (username, password) => {
        if (username === USERNAME && password === PASSWORD) {
        setIsAuthenticated(true);
        navigate("/upload");
        } else {
        alert("Invalid credentials");
        }
    };
    
    const logout = () => {
        setIsAuthenticated(false);
        navigate("/");
    };
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

    export function useAuth() {
        return useContext(AuthContext);
    }