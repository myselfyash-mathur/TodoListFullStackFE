import { useContext, useState } from "react";
import { createContext } from "react";
import { basicAuthenticationServiceAPI } from "../welcome/api/HelloWorldAPIService";
import { apiClient } from "./ApiClient";
import { executeJWTAuthService } from "./AuthAPIService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }){
    
    const [isAuthenticated, setAuthenticated ] = useState(false);
    const [username, setUsername] = useState(null);
    const [token,setToken] = useState(null);
    // function login(username,password){
    //     if(username==='Yash' && password==='Yash@123'){
    //         setAuthenticated(true);
    //         setUsername(username);
    //         return true;
    //     }
    //     else{
    //         setAuthenticated(false)
    //         setUsername(username);
    //         return false;
    //     }
    // }
    
//     async function login(username,password){
//         const basicAuthToken = 'Basic ' + window.btoa(username+":"+password);
//         try{
//             const response = await basicAuthenticationServiceAPI(basicAuthToken)
//         if(response.status==200){
//             setAuthenticated(true);
//             setUsername(username);
//             setToken(basicAuthToken);
//             apiClient.interceptors.request.use(
//                 (config)=>{
//                     console.log('Interceptor of Token');
//                     config.headers.Authorization=basicAuthToken
//                     return config;
//                 }
//             )
//             return true;
//         }
//         else{
//             logout();
//             return false;
//         }
//     } catch(error) {
//         logout()
//         return false;
//     }
// }
async function login(username,password){
    try{
        const response = await executeJWTAuthService(username,password)
    console.log("REsponse",response);
        if(response.status==200){
        const jwtToken = 'Bearer '+ response.data.token;
        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);
        apiClient.interceptors.request.use(
            (config)=>{
                console.log('Interceptor of Token');
                config.headers.Authorization=jwtToken
                return config;
            }
        )
        return true;
    }
    else{
        logout();
        return false;
    }
} catch(error) {
    logout()
    return false;
}
}


    function logout(){
        setAuthenticated(false);
        setToken(null);
        setUsername(null);
    }
    return (
        <AuthContext.Provider value={{isAuthenticated,login,logout,username,token}}>
            {children}
        </AuthContext.Provider>
    )
}