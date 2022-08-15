import React, { useState } from 'react';
import axios from "axios";

function Login(object)
{
    const url="http://localhost:3001/";

    const [credits,setCredits] = useState({
        username:"",
        password:""
    })

    function setCredit(event)
    {
        const{name,value}= event.target;
        setCredits(function(pervious){
            if(name==="username")
            {
                return{
                    ...pervious,
                    username:value
                }
            }
            else{
                return{
                    ...pervious,
                    password:value
                }
            }
        })
    }

    function login()
    {
        axios({method:"post",
        data:
        {
            username:credits.username,
            password:credits.password
        },
        withCredentials:true,
        url:url

        })
        .then(function(res){
            object.setlogin(res.data)
        })
        .catch(function(err)
        {
            console.log("some error in auth\n",err);
        })
    }
    
    return(
        <div className='Login'>
        <input onChange={setCredit} value={credits.username} type="text" placeholder='Username' name='username'/>
        <input onChange={setCredit} value={credits.password} type="password" placeholder='Password'name='password'/>
        <button onClick={login}>Login</button>
        </div>
    )
}

export default Login;