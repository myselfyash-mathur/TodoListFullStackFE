import { apiClient } from "./ApiClient";

export const executeJWTAuthService=(username,password)=>{
    return apiClient.post('/authenticate',
    {username,password}
    )
}