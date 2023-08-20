import React, { useState } from "react";
import "../styles/signin.css";
import { HiLockClosed } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMan } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import { FaPassport } from "react-icons/fa";
import { GiAges } from "react-icons/gi";
import { FaAddressCard } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BreadCrumb from "../components/Breadcrumb";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneOne, setPhoneOne] = useState("");
  const [phoneTwo, setPhoneTwo] = useState("");
  const [password, setPassword] = useState("");
  const [nationality, setNationality] = useState("");
  const [passportno, setPassportno] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  const navigateToSignIn = () => navigate('/signin')


  const registered = () =>
    toast.success("Successfully Registered", {
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
  

  const handleFirstName = (event) => {
    setFirstname(event.target.value);
  };
  const handleLastName = (event) => {
    setLastname(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneOne = (event) => {
    setPhoneOne(event.target.value);
  };
  const handlePhoneTwo = (event) => {
    setPhoneTwo(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleNationality = (event) => {
    setNationality(event.target.value);
  };
  const handlePassport = (event) => {
    setPassportno(event.target.value);
  };
  const handleGender = (event) => {
    setGender(event.target.value);
  };
  const handleAge = (event) => {
    setAge(event.target.value);
  };
  const handleAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4200/signup", {
        firstname,
        lastname,
        email,
        phoneOne,
        phoneTwo,
        password,
        nationality,
        passportno,
        gender,
        age,
        address
      })
      .then((res) => {
        // console.log(res.data.message);
        console.log("DATA SENT");

        if (res.data.message === "Data Added") {
          registered();
          setTimeout(() => {
            navigateToSignIn();
          }, 1500);
        }
        else if(res.data.message === 'already exists'){
          failed('Registration Failed! User already exists')
        }
         else {
          failed('Registration Failed! Try Again');
        }
      })
      .catch((err) => console.log(err));
      
    setFirstname("");
    setLastname("");
    setEmail("");
    setPhoneOne("");
    setPhoneTwo("");
    setPassword("");
    setNationality("");
    setPassportno("");
    setGender("");
    setAge("");
    setAddress("");

  };

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
        <BreadCrumb title={"Sign Up"} />
      </div>

      <div className="sign-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="myh2">Sign Up</h2>

          <div className="sign-input-container">
            <label className="inp-label" htmlFor="email">
              <MdAlternateEmail />
              Email
            </label>
            <input
              className="sign-inp"
              type="email"
              id="email"
              placeholder="Enter your email"
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

          <div className="mycontainer gap-5 pt-2">
            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="firstName">
                <AiOutlineUser />
                First Name
              </label>
              <input
                className="sign-inp"
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                value={firstname}
                onChange={handleFirstName}
                required
              />
            </div>
            <div className="sign-input-container2 ">
              <label className="inp-label" htmlFor="lastName">
                <AiOutlineUser />
                Last Name
              </label>
              <input
                className="sign-inp"
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                value={lastname}
                onChange={handleLastName}
                required
              />
            </div>
          </div>

          <div className="mycontainer gap-5 pt-2">
            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="mobile1">
                <BsFillTelephoneFill />
                Mobile No 1
              </label>
              <input
                className="sign-inp"
                type="tel"
                id="mobile1"
                pattern="[0-9]+"
                placeholder="Enter your mobile number"
                value={phoneOne}
                onChange={handlePhoneOne}
                required
              />
            </div>
            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="mobile2">
                <BsFillTelephoneFill />
                Mobile No 2 (optional)
              </label>
              <input
                className="sign-inp"
                type="tel"
                pattern="[0-9]+"
                id="mobile2"
                placeholder="Enter your mobile number"
                value={phoneTwo}
                onChange={handlePhoneTwo}
              />
            </div>
          </div>

          <div className="mycontainer gap-5 pt-2">
            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="nationality">
                <BiWorld />
                Nationality
              </label>
              <input
                className="sign-inp"
                type="text"
                id="nationality"
                placeholder="Enter your nationality"
                value={nationality}
                onChange={handleNationality}
                required
              />
            </div>
            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="passportNo">
                <FaPassport />
                Passport No
              </label>
              <input
                className="sign-inp"
                type="text"
                id="passportNo"
                placeholder="Enter your passport number"
                value={passportno}
                onChange={handlePassport}
                required
              />
            </div>
          </div>

          <div className="mycontainer gap-5 pt-2">
            <div className="sign-input-container2 ">
              <label className="inp-label" htmlFor="gender">
                <AiOutlineMan />
                Gender
              </label>
              <select
                className="sign-inp"
                id="gender"
                value={gender}
                onChange={handleGender}
                required
              >
                <option value="new">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="age">
                <GiAges />
                Age
              </label>
              <input
                className="sign-inp"
                type="number"
                id="age"
                placeholder="Enter your age"
                max="99"
                min="1"
                value={age}
                onChange={handleAge}
                required
              />
            </div>
          </div>

          <div className="sign-input-container">
            <label className="inp-label" htmlFor="address">
              <FaAddressCard />
              Address
            </label>
            <textarea
              className="sign-inp"
              id="address"
              placeholder="Enter your address"
              value={address}
              onChange={handleAddress}
              required
            ></textarea>
          </div>
          <button className="sign-btn" type="submit">
            Sign Up
          </button>

          <div className="bottom-text">
            <span>Already have an account?</span>
            <Link to="/signin">Sign In</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
