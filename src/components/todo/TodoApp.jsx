import LoginComponent from "../login/LoginComponent";
import Welcome from "../welcome/WelcomeComponent";
import { Routes,Route,Navigate } from 'react-router-dom';
import "./TodoApp.css";
import ErrorComponent from "../error/ErrorComponent";
import ListTodoComponent from "../list/ListTodoComponent";
import HeaderComponent from "../header/HeaderComponent";
import FooterComponent from "../footer/FooterComponent";
import LogoutComponent from "../logout/LogoutComponent";
import AuthProvider, { useAuth } from "../security/AuthContext";
import TodoComponent from "../list/TodoComponent";
function AuthenticatedRoute({children}){
    const authContext = useAuth();
    if(authContext.isAuthenticated){   
        return children
    }
    return <Navigate to="/"/>
}
function TodoApp(){
    return (
        <div className="TodoApp">
            <AuthProvider>
                <HeaderComponent/>
                        <Routes>
                            <Route path='/' element={<LoginComponent />} />
                            <Route path='/login' element={<LoginComponent />} /> 
                            
                            <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <Welcome />
                            </AuthenticatedRoute>
                            }/>
                            <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <ListTodoComponent />
                            </AuthenticatedRoute>
                            }/>
                            <Route path='/todo/:id' element={
                            <AuthenticatedRoute>
                                <TodoComponent />
                            </AuthenticatedRoute>
                            }/> 
                            <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>
                            
                            }/> 
                            <Route path='*' element={<ErrorComponent />}/>        
                    </Routes>
                <FooterComponent/>
            </AuthProvider>
        </div>
    )
}
export default TodoApp;

