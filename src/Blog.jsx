import React from 'react'
import { useParams } from 'react-router'
import './blog.css'

const Blog = ({data}) => {
    const {id} = useParams()
    const blogdata = data.filter((val)=> val.id==id)

 
// console.log);

  
  return (
    <div className='blog'>
      <h2>{blogdata[0].title}</h2>
    
      {/* <h3>{blogdata[0].content}</h3> */}
    <p className='p'>{blogdata[0].blog}</p>
    </div>
  )
}

export default Blog
