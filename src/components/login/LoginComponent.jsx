import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.css';
import { useAuth } from '../security/AuthContext';
export default function LoginComponent(){
    const [username,setUsername] = useState('username');
    const [password,setPassword] = useState('password');
    const [errorFlag,setLoginError] = useState(false);
    const navigate = useNavigate();
    const authContext = useAuth();
    const handleChangeUsername=(event)=>{
        setUsername(event.target.value);
    }
    const handleChangePassword=(event)=>{
        setPassword(event.target.value);
    }
    const handleLogin=async ()=>{
        if(await authContext.login(username,password)){
            navigate(`/welcome/${username}`);
        }
        else{
            setLoginError(true);
        }   
    }
    return (
        <div className="Login">
            <h1>Time to Login:</h1>
            {errorFlag ? (
            <div className="errorMessage">
                Authenticated Failed. Please check your credentials
            </div>
            ) : null}
            <div className="loginForm">
            <div>
                <label>Username</label>
                <input
                type="text"
                name="username"
                value={username}
                onChange={handleChangeUsername}
                />
            </div>
            <div>
                <label>Password</label>
                <input
                type="password"
                name="password"
                value={password}
                onChange={handleChangePassword}
                />
            </div>
            <div>
                <button type="button" name="login" onClick={handleLogin}>
                Login
                </button>
            </div>
            </div>
        </div>
        );
}