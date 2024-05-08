import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Editpreview from './Editpreview'
import Editpage from './Editpage'

import { Routes,Route,Link } from 'react-router-dom'

const Editpost = ({data,setEditid,editid}) => {
  
  const {id} = useParams()
  const  filterdata=data.filter((val)=> val.id == id)
  
 
    
   
 
  return (
    <div>
      <Editpreview filterdata={filterdata}/>
       <Link to="/uplode/id/Editpage" 
       onClick={()=>{
        setEditid(id)
        
       }
      }
        style={{
            padding:"10px 30px",
            background:"blue",
            borderRadius:"5px",
            color:'white',
            fontWeight:'500',
            fontSize:'1em',
         
            
        }}>Edit</Link>
       
       
      
    </div>
  )
}

export default Editpost
