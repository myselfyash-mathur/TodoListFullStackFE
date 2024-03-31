import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
export default function HeaderComponent(){
    const authContext = useAuth();
    console.log(authContext);
    const logout =()=>{
        authContext.logout();
    }
    return (
    <header className="border-bottom border-light border-5 mb-5 p-2">
    <div className="container">
        <div className="row">
        <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="#">
            TodoApp
            </a>
            <div className="collapse navbar-collapse">
            { authContext.isAuthenticated ? (<ul className="navbar-nav">
            
                <li>
                <Link className="nav-link" to="/welcome/Yash">
                    Home
                </Link>
                </li>
                <li>
                <Link className="nav-link" to="/todos">
                    Todos
                </Link>
                </li>
                
            </ul> ) : null}
            </div>
            <ul className="navbar-nav">
            { authContext.isAuthenticated ? (<li>
                <Link className="nav-link" to="/logout" onClick={logout}>
                Logout
                </Link>
            </li>) : (<Link className="nav-link" to="/login">
                Login
                </Link>) } 
            <li>
                
            </li>
            </ul>
        </nav>
        </div>
    </div>
    </header>
    );
}