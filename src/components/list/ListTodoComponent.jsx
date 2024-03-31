import { useEffect, useState } from 'react';
import './ListTodoComponent.css';
import { deleteTodoItem, retrieveAllTodosForUsername } from '../todo/api/TodoAPIService';
import { useAuth } from '../security/AuthContext';
import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
export default function ListTodoComponent(){
    const authContext = useAuth();
    const username = authContext.username;
    // const today = new Date();
    // const targetDate = new Date(today.getFullYear()+12,today.getMonth(),today.getDay());
    const navigate = useNavigate();
    const [todos,setTodos] = useState([]);
    const [message,setMessage] = useState(null);
    const token = authContext.token;
    useEffect(() => {
        refreshTodos()
    },[])
    const refreshTodos=async ()=>{
        const data = await retrieveAllTodosForUsername(username,token);
        setTodos(data);
    }
    const deleteTodo=async(id)=>{
        await deleteTodoItem(username,id,token);
        setMessage(`Deleted todo with ${id} successfully !!`)
        refreshTodos();
    }   
    const updateTodo=async(id)=>{
        navigate(`/todo/${id}`);
    }
    const addNewTodo=async()=>{
        navigate(`/todo/-1`);
    }
    return (
        <div className="container">
            <h1>Things You Want To Do !</h1>
            { message ? <div className='alert alert-warning'>{message}</div>
            :null }
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((todo)=>(
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    {/* <td>{todo.targetDate.toDateString()}</td> */}
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className='btn btn-warning' onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                                    <td><button className='btn btn-success' onClick={()=>updateTodo(todo.id)}>Update</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
        </div>
    )
}