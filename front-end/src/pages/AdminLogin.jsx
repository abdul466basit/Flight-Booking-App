import React, { useEffect, useState } from "react";
import "../styles/signin.css";
import { MdAlternateEmail } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/Breadcrumb";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const navigateToDashBoard = () => navigate('/admindashboard', {state: email})

  const registered = () =>
  toast.success("Successfully Logged In", {
    position: "top-center",
    autoClose: 2000,
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
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:4200/admin", {email, password})
    .then((res) => {
      // console.log(res);
      console.log("DATA SENT");
      if (res.data.message === "Data Added") {
        registered();
        setTimeout(() => {
          navigateToDashBoard();
        }, 1500);
        
      } else if(res.data.message === 'Password Incorrect'){
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
      <div style={{ paddingTop: "65px" }}>
        <BreadCrumb title={"Admin Login"} />
      </div>

      <div className="sign-container">
        <form className="signin-form" onSubmit={handleSubmit}>
          <h2 className="myh2">Login as Admin</h2>
          <div className="sign-input-container">
            <label className="inp-label" htmlFor="text">
              <MdAlternateEmail />
              Email
            </label>
            <input
              className="sign-inp"
              type="email"
              id="text"
              placeholder="Enter your Email"
              value={email}
              onChange={handleEmail}
              required
            />
          </div>
          <div className="sign-input-container">
            <label className="inp-label" htmlFor="password">
              <HiLockClosed />
              Password
            </label>
            <input
              className="sign-inp"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePassword}
              required
            />
          </div>
          <button className="sign-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
