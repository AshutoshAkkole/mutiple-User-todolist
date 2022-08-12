import React from 'react';

function Add()
{
    return(
        <div className='add'>
        <input type="text" placeholder='Enter Task'/>
        <div>
        <button>+</button>
        </div>
        </div>
    )
}

export default Add;