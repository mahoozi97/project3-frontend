import React from 'react'
import { Link } from 'react-router'
import bookNowImg from '../assets/Book-Now.png'
import readMoreImg from '../assets/Read More.png'

function Homepage() { 
  return (
    <div>
      <br />
      <h1 className='homepage'>Welcome to KhalijiGo</h1>
      <h2>استمتع بتجربة مميزة مع خدماتنا</h2>

      <br /> <br />
      <img src={bookNowImg} alt="Book Now" />
      <br /> <br />
      <Link to="/book-now"><button className='btn'>Book Now</button></Link>
      <br /> <br /> <br /> <br /> <br />
      <img src={readMoreImg} alt="Read More" />
      <br /> <br />
      <Link to="/blogs"><button className='btn'>Read more</button></Link>
      <br /> <br /> <br /> <br /> <br />
    </div>  
  )
}
export default Homepage