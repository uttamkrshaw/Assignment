import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div style={{ justifyContent: 'space-evenly', border:'1px solid red' }}>
            <Link to={'/'}>Home</Link>
            <Link to={'/list'}>List</Link>
        </div>
    )
}

export default Navbar