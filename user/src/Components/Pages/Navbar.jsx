import React from 'react'
import { Link } from 'react-router-dom'
import { Text } from '@chakra-ui/react'

const Navbar = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', border: '1px solid black', padding:'10px', marginBottom:'10px', backgroundColor:'teal' }}>
            <Link to={'/'}><Text fontSize={'2xl'}>Home</Text></Link>
            <Link to={'/list'}><Text fontSize={'2xl'}>List</Text></Link>
        </div>
    )
}

export default Navbar