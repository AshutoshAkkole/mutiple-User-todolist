import React from 'react';
import { Link } from 'react-router-dom';

function SignIn()
{
    return(
        <div className='signIn'>
        <Link to="/">Login</Link>
        <Link to="/Register">Register</Link>
        </div>
    )
}

export default SignIn;