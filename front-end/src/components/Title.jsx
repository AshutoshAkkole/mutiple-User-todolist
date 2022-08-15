import React from 'react';

function Title(object)
{
    return(
        <div className='title'>
        <div style={{width:"80%",margin:"0 auto"}}>
        <h2>{object.Title}</h2>
        <div className="floating-window2">
                <p>todolistCreated:{object.whoCreated}</p>
        </div>
        </div>
        </div>
    )
}

export default Title;