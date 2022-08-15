import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function Task(object){

    const url = "http://localhost:3001/updateTaskStatus"
    const [ischecked,setcheck]= useState(object.doneStatus);
    const style = {
        textDecoration:"line-through"
    }

    function change()
    {
        const state=ischecked==0?1:0;
        axios({method:"post",
        url:url,
        data:{doneStatus:state,taskId:object.taskId,cardId:object.getCardId()},
        withCredentials:true,
        })
        .then(function(res){
            if(res.data==false)
            {
                object.setlogin(false)
            }
            else if(res.data=="done")
            {
                object.updateCard()
                setcheck(state)
                console.log("done status changed")
            }
        })
        .catch(function(err){
            console.log("some error in changing the doneStatus\n",err);
        })
    }
    return(
        <div className="task">
                <input onChange={change} className="checkbox" type="checkbox" checked={ischecked}/>
                <p style={ischecked?style:null} className="taskdata">{object.data}</p>
                <div className="floating-window">
                <p>TaskCreated:{object.whoCreated}</p>
                <p>LastUpdated:{object.whoUpdatedLast}</p>
                </div>
  
        </div>
    )
}

export default Task;