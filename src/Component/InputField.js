import React,{useState} from 'react'
import {Formik, useFormik} from "formik";
import axios from "axios";
import *  as Yup from "yup";
import UserData from './UserData';

function InputField() {
    const [user,setUser]=useState({})
    const [error,setError]=useState(false)
    const [data,setData]=useState({})
    const [loading,setLoading]=useState(true)

    const callAPi=async()=>{
        
        await axios.get(`https://api.github.com/users/${user}/repos`).then((res)=>{
             console.log(res)
             setLoading(false)
             setData(res)
         }).catch(()=>{
             setError(true)
         })
     
 }
    const form=useFormik({
        initialValues:{
            username:""

        },
        validationSchema:Yup.object({
            username:Yup.string()
            .required("Username is required")
        }),
        onSubmit:(values)=>{
           setUser(values)
           callAPi() 
            
        }
    })
  
  return (
    <div>
        <form onSubmit={form.handleSubmit}>
            <input id="username" type="text" placeholder='Enter username'
            {...form.getFieldProps("username")}></input>
            {form.touched.username && form.errors.username ? <div>{form.errors.username}</div> : null}
            <button type='submit'>submit</button>
            {loading && <div>loading...</div>}
            {error ? <div>404 not found</div>:
                <div>{data.map((values)=>{
                   return <><div>{values.name}</div>
                   <div>{values.full_name}</div>
                   <div>{values.description}</div>
                   <div>{values.created_At}</div>
                   <a href={values.html_url}>URL</a></>
                })
                }</div>
            }
        </form>
    </div>
  )
}

export default InputField