import React from 'react';

function Create()
{
    function button(){
        alert("abc");
    }
    return(
        <div className='createcard'>
            <input className='Createinput'  type="text" placeholder='Title' name='title' />
            <input className='Createinput' type="text" placeholder='share with users' name='users' />
            <button onClick={button} className='Createbutton'>Create List</button>
        </div>
    )
}

export default Create;