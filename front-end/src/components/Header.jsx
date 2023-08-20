import React, { useState } from 'react';
import {SiEthiopianairlines} from 'react-icons/si';
import {AiOutlineClose} from 'react-icons/ai';
import {GiHamburgerMenu} from 'react-icons/gi';
import '../styles/header.css'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({isLogOut, setIsLogOut}) => {

  const [active, setActive]= useState('navBar');
  const showNav = ()=> {
    setActive('navBar activeNavbar')
  }

  const closeNav = ()=> {
    setActive('navBar')
  }
  const handleLogout = () =>{
    localStorage.removeItem('userProfile')
    registered()
    setIsLogOut(true)
  }
  const registered = () =>
  toast.success("Successfully Logged Out !!", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });




  return (
    <>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <section className="navBarSection">
      <header id='header' className="header flex">
        <div className="logoDiv">
          <Link to='/' className="logo flex">
            <h1><SiEthiopianairlines className='icon1'/> SilverArrow</h1>
          </Link>
        </div>

        <div className={active}>
          <ul className="navList flex">
            <li className="navItem">
              <Link to='/' className="navLink">Home</Link>
            </li>
            <li className="navItem">
              <Link to='/about' className="navLink last">About</Link>
            </li>

            <li className="navItem">
              <Link to='/myflights' className="navLink">My Flights</Link>
            </li>

            {/* <li className="navItem">
              <Link to='/admin' className="navLink last">Admin</Link>
            </li> */}

            <li className="navItem">
              <Link to='/contact' className="navLink">Contact Us</Link>
            </li>

            {isLogOut ? (

              <button className="bttn">
                <Link to='/signin'>Sign In</Link>
              </button>
             ) : (
              <button className="bttn" onClick={handleLogout}>
                Logout
              </button>
             )
            }

              {/* <button className="bttn">
                <Link to='/signin'>Sign In</Link>
              </button>

              <button className="bttn" onClick={handleLogout}>
                Logout
              </button> */}

          </ul>

          <div className="closeNavBar" onClick={closeNav}>
          <AiOutlineClose className='icon'/>
          </div>
        </div>

        <div className="toggleNavBar" onClick={showNav}>
        <GiHamburgerMenu className='icon'/>
        </div>
      </header>
    </section>
    </>
  )
}

window.addEventListener('scroll', function() {
  var navbar = document.getElementById('header');
  if (window.scrollY > 450) {
    navbar.classList.add('solid');
  } else {
    navbar.classList.remove('solid');
  }
});


export default Header
