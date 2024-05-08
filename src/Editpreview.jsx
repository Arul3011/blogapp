import React from 'react'
import { Link } from 'react-router-dom'
function Editpreview({filterdata}) {
  return (
    <div>
      
      <h2>{filterdata[0].title}</h2>
     
     <h3>{filterdata[0].content}</h3>
   <p className='p'>{filterdata[0].blog}</p>
   
    </div>
  )
}

export default Editpreview
