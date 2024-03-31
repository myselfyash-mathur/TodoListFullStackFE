import './WelcomeComponent.css';
import { callHelloWorldAPI,callHelloWorldPathVariableAPI } from "./api/HelloWorldAPIService";
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
export default function Welcome(){
    // const params = useParams();
    const { username } = useParams();
    const [message,setMessage] = useState(null);
    const [usernameMessage,setUsernameMessage] = useState(null);
    const handleClick=async ()=>{
        const data = await callHelloWorldAPI();
        setMessage(data);
    }
    const handlePathVariableClick=async()=>{
        const data = await callHelloWorldPathVariableAPI(username);
        setUsernameMessage(data);
    }
    return (
        <div className="Welcome">
            <h1>Welcome {username}</h1>
            <div>
                Your Todos. <Link to="/todos">Go Here...</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={handleClick}>Call Hello World REST API</button>
            </div>
            <div className='text-info'>{message}</div>
            <div>
                <button className="btn btn-success m-5" onClick={handlePathVariableClick}>Call Hello World By Name</button>
            </div>
            <div className='text-info'>{usernameMessage}</div>
        </div>
    )
}