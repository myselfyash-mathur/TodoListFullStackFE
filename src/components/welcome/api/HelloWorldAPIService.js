import { apiClient } from "../../security/ApiClient";
export async function callHelloWorldAPI(){
    return await apiClient.get('hello-world-bean')
        .then((response) => {
            const data = successfullResponse(response)
            return data;
        })
        .catch((error) =>{
            const err = errorResponse(error)
            return err;
        })
        .finally(()=>console.log("Clean Up!!"))
    }

export async function callHelloWorldPathVariableAPI(username){
        return await apiClient.get(`hello-world/path-variable/${username}`)
            .then((response) => {
                const data = successfullResponse(response)
                return data;
            })
            .catch((error) =>{
                const err = errorResponse(error)
                return err;
            })
            .finally(()=>console.log("Clean Up!!"))
        }
export async function basicAuthenticationServiceAPI(token){
            return await apiClient.get(`/basicauth`,{
                headers:{
                    Authorization:token
                }
            })
                .then((response) => {
                    return response;
                })
                .catch((error) =>{
                    const err = errorResponse(error)
                    return err;
                })
                .finally(()=>console.log("Clean Up!!"))
            }
    

    function successfullResponse(response){
    return response.data.message;
}
function errorResponse(error){
    console.log(error);
}