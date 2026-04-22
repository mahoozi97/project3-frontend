import React from 'react'
import { Link } from 'react-router'

function Homepage() {
  return (
    <div>
      <h1 className='homepage'>Welcome to our website</h1>
      <p>Discover our amazing services</p>

      <br /> <br />
      <Link to="/dashboard/new"><button className='btn'>Book Now</button></Link>
      <br /> <br />
      <Link to="/blogs"><button className='btn'>Read more</button></Link>
    </div>  
  )
}

export default Homepage