import axios from "axios";
import React from "react";
import { useState } from "react";
import {Link} from "react-router-dom";

function Navbar(object) {

    const url="http://localhost:3001/logout"

    const[show,setShow] = useState(false);
    const style = {display: "none"};

    function logout()
    {
        axios({url:url,method:"get",withCredentials:true})
        .then(function(res){
            object.setlogin(res.data);
        })
        .catch(function(err){
            console.log("some error\n",err)
        })
    }



    function toggle()
    {
        setShow(!show);
    }

    return (
        <nav className="nav dropdown-parent">
                <img src="logo.png" alt="logo-img" />
            <ul>
                <li><Link to="/Home">Home</Link></li>
                <li><Link to="/Create">Create</Link></li>
            </ul>
            <div>
                <img onClick={toggle}  src="logo.png" alt="profile-img" className="circle-img" />
            </div>
            <div style={show?null:style} className="dropdown-child">
            <p><Link to="/profile">Profile</Link></p>
            <p><Link to="/logout" onClick={logout}>Logout</Link></p>
            </div>
        </nav>
    )
}

export default Navbar;