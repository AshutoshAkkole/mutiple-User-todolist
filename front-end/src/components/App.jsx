import React, { useEffect, useState } from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import Create from "./Create"
import {Route,Routes} from "react-router-dom"
import SignIn from "./SignIn";
import Login from "./Login";
import Register from './Register'
import axios from "axios";


function App() {

  const url = "http://localhost:3001/";

  const [loggedIn,setLoggedIn]=useState(false);

  useEffect(function(){
    axios({
      method:"get",
      withCredentials:true,
      url:url
    })
    .then(function(res){
      setLoggedIn(res.data);
      console.log("data is ",res.data);
    })
    .catch(function(err){
      console.log("opps! error\n",err)
    })
  },[])

  if(!loggedIn)
  {
    return(
      <>
      <SignIn/>
      <Routes>
        <Route path="/" element={<Login setlogin={setLoggedIn}/>}/>
        <Route path="/Register" setlogin={setLoggedIn} element={<Register/>}/>
      </Routes>
      </>
    )
  }
  return (
    <>
    <Navbar setlogin={setLoggedIn} />
    <Routes>
    <Route path="/Home" element={<Home/>}/>
    <Route path="/Create" element={<Create/>}/>
    </Routes>
    </>
  );

}

export default App;
