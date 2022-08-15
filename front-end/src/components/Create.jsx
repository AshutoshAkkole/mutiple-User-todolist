import axios from 'axios';
import React from 'react';
import { useState } from 'react';

function Create(object)
{
    const url = "http://localhost:3001/creatCard";

    const [cardMetadata,setCard] = useState({
        title:"",
        userShare:""
    })
    function update(event)
    {
        const{value,name}=event.target;
        setCard(function(prev){
            if(name==="title")
            {
                return {...prev,title:value}
            }
            else{
                return {...prev,userShare:value}
            }
        })
    }

    function create(){
        axios({method:"post",data:cardMetadata,withCredentials:true,url:url})
        .then(function(res){
            if(res.data==="done")
            {
                setCard({title:"",userShare:""});
                alert("card created successfully")
            }
            else if(res.data===false){
                object.setlogin(res.data)
            }
        })
        .catch(function(err){
            console.log("oops error in creating\n",err);
        })
    }
    return(
        <div className='createcard'>
            <input className='Createinput' onChange={update} value={cardMetadata.title}  type="text" placeholder='Title' name='title' />
            <input className='Createinput' onChange={update} value={cardMetadata.userShare} type="text" placeholder='share with users' name='users' />
            <button onClick={create} className='Createbutton'>Create List</button>
        </div>
    )
}

export default Create;