import React from 'react'
import { useEffect } from 'react'
import Card from './Card'
import axios from "axios";
import { useState } from 'react';

function Cards(object)
{
    const url = "http://localhost:3001/getCardIds"

    const [data,setData] = useState([]);

    function getCards(){
        axios({method:"get",url:url,withCredentials:true})
        .then(function(res){
            console.log(res.data)
            if(res.data===false)
            {
                object.setlogin(false)
            }
            else(

                setData(res.data)
            )
        })
        .catch(function(err)
        {
            console.log("oops! some error\n",err)
        })
    }

    useEffect(function(){
        getCards();
    },[])

    return(
        <>
        <div className='cards'>
        {data.map(function(id,index){
            return <Card setlogin={object.setlogin} key={index} id={id} />
        })}
            
        </div>
        </>
    )
}

export default Cards;