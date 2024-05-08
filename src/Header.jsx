import React from 'react'
import { Routes,Route,Link } from 'react-router-dom'

const Header = () => {
  return (
    <header >
<Link to="/" className="link">HOME</Link>
<Link to="/add" className="link">ADD POST</Link>
<Link to="/uplode" className="link">USER</Link>
</header>
  )
}

export default Header
