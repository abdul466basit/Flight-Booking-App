import React from 'react'
import logo_01 from '../images/icon.png'
import {HiOutlineMail} from 'react-icons/hi'
import {FiArrowRight} from 'react-icons/fi'
import {FaFacebookF, FaInstagram} from 'react-icons/fa'
import {BsPinterest} from 'react-icons/bs'
import {SiWhatsapp} from 'react-icons/si'
import {Link} from 'react-router-dom'
import '../styles/footer.css'

const Footer = () => {
  return (
      
    <div className="main-footer">
    <div className='row'>

      <div className="column-01 ">
        <div className="d-flex">
          <img src={logo_01} alt="ICon" className='footer-icon' />
          <h1>SilverArrow</h1>
        </div>
        <p>Welcome to our airline booking website, where you can effortlessly explore, compare, and book flights to your dream destinations. Enjoy a seamless and user-friendly experience as you browse through a wide range of airlines, flight options, and competitive prices. Let us be your travel companion in turning your travel aspirations into reality.</p>
      </div>

      <div className="column-02 col ">
        <h3>Office </h3>
        <p>ITPL Road</p>
        <p>WhiteField, San Fransisco</p>
        <p>PIN 560066, USA</p>
        <p className='email-id'>airline@outlook.com</p>
        <h4>+92- 0214533871</h4>
      </div>

      <div className="column-03 col">
        <h3>Links </h3>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/myflights">Flights</Link></li>
          <li><Link to="/signin">Sign In</Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>
      </div>

      <div className="column-04 col">
        <h3>Newsletter</h3>
        <form>
          <HiOutlineMail className='email-ricon' />
          <input type="email" placeholder='Enter Your Email Id'/>
          <button onClick={e=> e.preventDefault()}><FiArrowRight className='email-arrow'/></button>
        </form>
        <div className="social-icon">
          <FaFacebookF className='footer-sm' />
          <FaInstagram className='footer-sm' />
          <SiWhatsapp  className='footer-sm' />
          <BsPinterest className='footer-sm' />
        </div>
      </div>

    </div>
    <hr />
    <p className='copyright'>The Airlines Group © 2023 - All Rights Reserved</p>
    </div>
  )
}

export default Footer

