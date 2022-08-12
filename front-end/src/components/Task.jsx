import React from "react";
import { useState } from "react";

function Task(object){

    const [ischecked,setcheck]= useState(object.doneStatus);
    const style = {
        textDecoration:"line-through"
    }

    function change()
    {
        setcheck(!ischecked)
    }

    return(
        <div className="task">
                {
                ischecked?<input onChange={change} className="checkbox" type="checkbox" checked/>:<input className="checkbox" onChange={change} type="checkbox"/>
                }
            <p style={ischecked?style:null} className="taskdata">{object.task}</p>
  
        </div>
    )
}

export default Task;