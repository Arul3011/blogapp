import React, { useState } from 'react'


const Editpage = ({data,  editid,setData}) => {
  const ddttdd=data.filter(val => val.id == editid)
  const [title,setTitle]=useState(ddttdd[0].title)
  const [blog,setBlog]=useState(ddttdd[0].blog)
  const arrayobj = {
    id: ddttdd[0].id,
    title : title,
    blog: blog
  }
  const indexval= data.findIndex((val)=> val.id == ddttdd[0].id)
  function addnewblog(){
    data[indexval]=arrayobj;   
  }
  return (
    <div>
      <div className='div'>
     <div className="addcointainer">
      <p>TITLE</p>
     <input 
     type="text"
      name="" 
      value={title}
      onChange={(e)=> setTitle(e.target.value)}
     id="one" />
     <p>BLOG</p>
    <textarea name="" id="two" 
      value={blog}
      onChange={(e)=> setBlog(e.target.value)}
    ></textarea>
    <br />
    <button onClick={addnewblog} >UBDATE</button>
     </div>
    </div>
    </div>
  )
}

export default Editpage
