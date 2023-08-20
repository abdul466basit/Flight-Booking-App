import React, { useEffect, useState } from 'react'
import '../styles/signin.css'
import { MdAlternateEmail } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import BreadCrumb from "../components/Breadcrumb";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SignIn = ({setIsLogOut}) => {
  const navigate = useNavigate();

  useEffect(()=>{
    window.scrollTo(0,0)
  },[]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registered = () =>
  toast.success("Successfully Logged In", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

const failed = (msg) =>
  toast.error(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });


  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:4200/signin", {email, password})
    .then((res) => {
      // console.log(res);
      console.log("DATA SENT");
      if (res.data.message === "Data Added") {
        registered();
        // console.log(res.data.user)
        localStorage.setItem('userProfile', JSON.stringify(res.data.user));
        setTimeout(() => {
          navigate('/');
        }, 2000);
        setIsLogOut(false)

      } 
      else if(res.data.message === 'Password Incorrect'){
        failed('Incorrect Password! Try Again')
        setPassword('')

      }
       else {
        failed("Account doesn't exist");
        setEmail('')
        setPassword('')
      }

    })
    .catch((err) => {
      failed('Incorrect Password! Try Again')
      setPassword('')
    });
  }
  
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
      <div style={{paddingTop:'65px'}}>
        <BreadCrumb title={"Sign In"} />
      </div>

      <div className="sign-container">
          <form className="signin-form" onSubmit={handleSubmit}>
            <h2 className='myh2'>Sign In</h2>
            <div className="sign-input-container">
              <label className='inp-label' htmlFor="email"><MdAlternateEmail/>Email</label>
              <input
                className='sign-inp'
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmail}
                required
              />
            </div>
            <div className="sign-input-container">
              <label className='inp-label' htmlFor="password"><HiLockClosed/>Password</label>
              <input
              className='sign-inp'
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePassword}
                required
              />
            </div>
            <button className='sign-btn' type="submit">Sign In</button>
            <div className="bottom-text">
              <span>Don't have an account?</span>
              <Link to='/signup'>Sign Up</Link>
            </div>
          </form>
      </div>

    </>
  )
}

export default SignIn

