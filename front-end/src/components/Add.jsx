import axios from 'axios';
import React from 'react';
import { useState } from 'react';

function Add(object)
{
    const url = "http://localhost:3001/addTask"
    const [task,setTask] = useState("");

    function update(event)
    {
        const{value}=event.target
        setTask(value);
    }

    function add(){
        axios({method:"post",data:{
            id:object.id,
            data:task
        },url:url,withCredentials:true})
        .then(function(res){
            if(res.data=="done")
            {
                object.updateCard();
                console.log("added task successfully");
                alert("added successfully");
                setTask("");
            }
            else if(res.data==false)
            {
                object.setlogin(false);
            }
        })
        .catch(function(err){
            console.log("err in adding task\n",err);
        })
    }

    return(
        <div className='add'>
        <input type="text" onChange={update} value={task} placeholder='Enter Task'/>
        <div>
        <button onClick={add}>+</button>
        </div>
        </div>
    )
}

export default Add;