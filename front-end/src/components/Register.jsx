import axios from 'axios';
import React, { useState } from 'react';

function Register(object)
{
    const url = "http://localhost:3001/register"
    const [register,setRegister] = useState({
        username:"",
        password:""
    });

    function update(event){
        const{name,value} = event.target;

        setRegister(function(previous){
            if(name==="username")
            {
                return {
                    ...previous,
                    username:value
                }
            }
            else{
                return{
                    ...previous,
                    password:value

                }
            }
        })
    }

    function signup()
    {
        axios({method:"post",data:{
            username:register.username,
            password:register.password
        },
        url:url,
        withCredentials:true
    })
        .then(function(res){
            object.setlogin(res.data)
            console.log(res.data)
        })
        .catch(function(err){
            console.log("There is an error\n",err);
        })
    }

    return(
        <div className='Login'>

        <input onChange={update} value={register.username} type="text" placeholder='Username' name='username'/>
        <input onChange={update} value={register.Password} type="text" placeholder='Password'name='password'/>
        <input type="file" id="img" name="img" accept="image/*" style={{display:"none"}}/>
        <img src='defaultdp.jfif' alt="default-img" className='circle-img dp'/>
        <button onClick={signup}>Register</button>
        </div>
    )
}

export default Register;