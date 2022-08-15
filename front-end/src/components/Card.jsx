import React from "react";
import Add from "./Add";
import Task from "./Task";
import Title from "./Title";

function Card(object)
{
    return(
        <div className="card">
            <Title />
            <Task task="front-end" doneStatus={0}/>
            <Task task="a kmk,adfhkjsfhdkjhfksjadfhkfkasbfsdk" doneStatus={0}/>
            <Task task="front-end" doneStatus={0}/>
            <Task task="front-end" doneStatus={0}/>
            <Add/>
        </div>
    )
}

export default Card;