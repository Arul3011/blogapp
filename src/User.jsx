import React, { useEffect } from 'react'
import './user.css'
import { Link } from 'react-router-dom'
function User({data,setData}) {
  function deleatpost(id){
      const delarray = data.filter((val)=> val.id != id)
      setData(delarray)
      console.log(delarray);
  }
  return (
    <div>
      <div className="user-detiles">
        <img src="src\assets\react.svg" alt="userlogo" />
        <h2>usernmae</h2>
      </div>
   
    <ul>
   
      <h2>postes</h2>
      
    {data.length >0 ? data.map((val)=>(
           <li key={val.id}>
             <Link  to={`/uplode/${val.id}`} >
           <div className="edit">
           <h2>{val.title}</h2>
           <p>{val.blog.slice(0,200)}.....<span style={{color:'blue'}}>read more</span></p>
           </div>
            </Link>
            <button className='button' onClick={() => deleatpost(val.id)}>delt</button>
          </li>
          )) : <p>no post  you posted!</p>}

    </ul>
   
    </div>
  )
}

export default User
