import React, { useState } from 'react'
import './add.css'
function Add({data,setData}) {
  const [addtitle,setAddtitle]=useState("")
  const [addblog,setaddblog]=useState("")
  const date = new Date()
  const arrayobj = {
    id: data.length ===0 ? data.length :data.length+1,
    title : addtitle,
    time: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
    blog: addblog
  }
  function addnewblog(){
    setData([...data,arrayobj])
      console.log(data);
      setaddblog("")
      setAddtitle("")
  }
  return (
    <div className='div'>
     <div className="addcointainer">
      <p>TITLE</p>
     <input type="text"
      name=""
       id="one"
       value={addtitle}
       onChange={(e)=> setAddtitle(e.target.value)}
       />
     <p>BLOG</p>
    <textarea 
    name="" 
    id="two"
    value={addblog}
    onChange={(e)=> setaddblog(e.target.value)}
    ></textarea>
    <br />
    <button onClick={addnewblog} >add</button>
     </div>
    </div>
  )
}

export default Add
