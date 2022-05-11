import React,{useEffect, useState} from 'react';
import axios from "axios";
function UserData(props) {
    console.log(props.data.username)
    const [loading,setLoading]=useState(true)
    const callAPi=()=>{
        if(props.data.username){
            axios.get(`https://api.github.com/users/${props.data.username}/repos`).then((res)=>{
                console.log(res)
            });
        }
        else{
            console.log("hello");
        }
      
    }
    useEffect(()=>{
        callAPi()
    })
  return (
    <div>

    </div>
  )
}

export default UserData