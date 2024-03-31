import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "../todo/api/TodoAPIService";
import { useAuth } from "../security/AuthContext";
import { useEffect, useState } from "react";
import { Formik,Field,Form,ErrorMessage } from 'formik';
import { moment } from 'moment';
export default function TodoComponent(){
    const {id} = useParams();
    const [description,setDescription] = useState('');
    const [targetDate,setTargetDate] = useState('');
    const authContext = useAuth();
    const navigate = useNavigate();
    const username = authContext.username;
    const token = authContext.token;
    const retrieveTodoById=async()=>{
        if(id!=-1){
            const data = await retrieveTodoApi(username,id,token)
            setDescription(data.description);
            setTargetDate(data.targetDate);
        }
    } 
    useEffect(()=>{
        retrieveTodoById();
    },[id]);
    const onSubmit=(values)=>{
        const todo={
            id:id,
            username:username,
            description:values.description,
            targetDate:values.targetDate,
            done:false
        }
    if(id==-1){
        createTodoApi(username,todo,token).then(response=>{
            navigate('/todos'); 
            console.log("Response",response)
            });
    } else {
        updateTodoApi(username,id,todo,token).then(response=>{
            navigate('/todos'); 
            });
        }
    }
    const validate=(values)=>{
        console.log("Values Validate",values);
        let errors={};
        if(values.description.length<5){
            errors.description='Enter atleast 5 characters'
        }
        if(values.targetDate==null || values.targetDate==''){
            errors.targetDate='Enter a target date'
        }
        return errors;
    }
    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={{description,targetDate}} enableReinitialize={true}
                onSubmit={onSubmit}
                validate={validate}
                >
                    {
                        (props)=>(
                            <Form>
                                <ErrorMessage name="description" component="div" className="warning"/>
                                <ErrorMessage name="targetDate" component="div" className="warning"/>
                                
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" name="description" className="form-control" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" name="targetDate" className="form-control" />
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}