import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Add from "./Add";
import Task from "./Task";
import Title from "./Title";

function Card(object)
{
    const url = "http://localhost:3001/getOneCard"
    const [cardData,setCardData] = useState({
        tasks:[],
    });

    function getCardId()
    {
        return object.id;
    }

    function updateCard()
    {
        axios({method:"post",
        data:{id:object.id},
        url:url,
        withCredentials:true})
        .then(function(res){
            if(res.data==false)
            {
                object.setlogin(false)
            }
            else{
                setCardData(res.data)
                console.log("card data:",cardData)
            }
        })
        .catch(function(err){
            console.log("Error in getting A card\n",err);
        })
    }

    useEffect(updateCard,[])

    return(
        <div className="card">
            <Title Title={cardData.title} whoCreated={cardData.whoCreated} />
            {cardData.tasks.map(function(task,index){
                return (
            <Task key={index} updateCard={updateCard} getCardId={getCardId} taskId={task._id} setlogin={object.setlogin} data={task.data} doneStatus={task.doneStatus} whoUpdatedLast={task.whoUpdatedLast} whoCreated={task.whoCreated}/>
                )
            })}
            <Add setlogin={object.setlogin} id={object.id} updateCard={updateCard} />
        </div>
    )
}

export default Card;