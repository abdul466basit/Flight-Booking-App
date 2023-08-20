import React, { useState } from "react";
import "../styles/signin.css";
import {MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { BiMoney, BiDollar } from "react-icons/bi";
import { Link} from "react-router-dom";
import { useEffect } from "react";
import BreadCrumb from "../components/Breadcrumb";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { DatePicker, Space } from 'antd';
import moment from "moment";
import '../styles/addflight.css'


const AddFlight = () => {

  const location = useLocation();
  const { state } = location;
  let adminid = state ? state : [];
  const [adminID, setAdminID] = useState(adminid)



  useEffect(() => {
    window.scrollTo(0, 0);
    setAdminID(adminid)
    console.log(adminID)
  }, []);

  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [economyfare, setEconomyFare] = useState('');
  const [firstclassfare, setFirstClassFare] = useState('');
  const [businessfare, setBusinessFare] = useState('');

  const handleDepartureCity = (event) => {
    setDepartureCity(event.target.value);
  };
  const handleDepartureDate = (value) => {
    setDepartureDate(value);
  };
  const handleDepartureTime = (event) => {
    setDepartureTime(event.target.value);
  };
  const handleArrivalCity = (event) => {
    setArrivalCity(event.target.value);
  };
  const handleArrivalDate = (value) => {
    setArrivalDate(value);
  };
  const handleArrivalTime = (event) => {
    setArrivalTime(event.target.value);
  };
  const handleEconomyFare = (event) => {
    setEconomyFare(event.target.value);
  };
  const handleFirstClassFare = (event) => {
    setFirstClassFare(event.target.value);
  };
  const handleBusinessFare = (event) => {
    setBusinessFare(event.target.value);
  };

  const registered = () =>
    toast.success("Flight Added Successfully", {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    let depart_date  = departureDate?.format("YYYY-MM-DD");
    let arr_date = arrivalDate?.format("YYYY-MM-DD");
    let depart_time = departureTime + ':00';
    let arr_time = arrivalTime + ':00'
    axios
      .post("http://localhost:4200/addflight", {
      departureCity,
      depart_date,
      arrivalCity,
      arr_date,
      arr_time,
      depart_time,
      economyfare,
      firstclassfare,
      businessfare,
      adminID
      })
      
      .then((res) => {
        console.log(res.data.message);
        console.log("DATA SENT");

        if (res.data.message === "Flight Added") {
          registered();
        }
        else if(res.data.message === 'Error Adding Flight'){
          failed('Error Flight Adding')
        }
         else {
          failed('Registration Failed! Try Again');
        }
      })
      .catch((err) => console.log(err));
      
    setDepartureCity("");
    setDepartureDate(null);
    setDepartureTime("");
    setArrivalCity("");
    setArrivalDate(null);
    setArrivalTime("");
    setEconomyFare("");
    setFirstClassFare("");
    setBusinessFare("");
  };

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
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

      <div style={{ paddingTop: "68px" }}>
        <BreadCrumb title={"Add Flight"} />
      </div>

      <div className="sign-container">

        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="myh2">Add New Flight</h2>

          <div className="mycontainer gap-4">

            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="firstName">
                <MdFlightTakeoff className="flight-icon" />
                Departure City
              </label>
              <input
                className="sign-inp"
                type="text"
                id="DepartureCity"
                placeholder="Enter Departure City"
                value={departureCity}
                onChange={handleDepartureCity}
                required
              />
            
            </div>

            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="mobile1">
              <MdFlightTakeoff className="flight-icon" />
              Departure Date
              </label>
              <Space direction="vertical">
                  <DatePicker 
                    onChange={handleDepartureDate} 
                    value={departureDate}
                    disabledDate={disabledDate}
                  />
              </Space>
            </div>


            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="lastName">
                <MdFlightTakeoff className="flight-icon" />
                Departure Time
              </label>

              <div className="time-picker">
                <div className="time-input">
                    <i className="fas fa-clock"></i>
                    <input
                    type="time"
                    value={departureTime}
                    onChange={handleDepartureTime}
                    />
                </div>
              </div>

            </div>

          </div>

          <div className="mycontainer gap-4">

            <div className="sign-input-container2">
                <label className="inp-label" htmlFor="mobile1">
                <MdFlightLand className="flight-icon" />
                Arrival City
                </label>
                <input
                  className="sign-inp"
                  type="text"
                  placeholder="Enter Arrival City"
                  id="ArrivalCity"
                  value={arrivalCity}
                  onChange={handleArrivalCity}
                  required
                />
            </div>

            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="mobile1">
              <MdFlightLand className="flight-icon" />
              Arrival Date
              </label>
              <Space direction="vertical">
                  <DatePicker
                    value={arrivalDate} 
                    onChange={handleArrivalDate} 
                    disabledDate={disabledDate}
                  />
              </Space>
            </div>


            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="mobile2">
              <MdFlightLand className="flight-icon" />
              Arrival TIme
              </label>
              <div className="time-picker">
                <div className="time-input">
                  <i className="fas fa-clock"></i>
                  <input
                    type="time"
                    value={arrivalTime}
                    onChange={handleArrivalTime}
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="mycontainer fare-div gap-4  ">

            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="passportNo">
                <BiMoney className="flight-icon" />
                Economy Fare
              </label>
              <div className="input-wrapper">
                <input
                  className="sign-inp"
                  type="number"
                  id="fare"
                  placeholder="Flight Fare"
                  value={economyfare}
                  onChange={handleEconomyFare}
                  required
                />
                <div className="dollar-icon-wrapper">
                  <BiDollar className="currency-icon" />
                </div>
              </div>
            </div>


            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="passportNo">
                <BiMoney className="flight-icon" />
                First Class Fare
              </label>
              <div className="input-wrapper">
              <input
                className="sign-inp"
                type="number"
                id="fare"
                placeholder="Flight Fare"
                value={firstclassfare}
                onChange={handleFirstClassFare}
                required
              />
              <div className="dollar-icon-wrapper">
                <BiDollar className="currency-icon" />
              </div>
              </div>
            </div>

            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="passportNo">
                <BiMoney className="flight-icon" />
                Business Fare
              </label>
              <div className="input-wrapper">
              <input
                className="sign-inp"
                type="number"
                id="fare"
                placeholder="Flight Fare"
                value={businessfare}
                onChange={handleBusinessFare}
                required
              />
              <div className="dollar-icon-wrapper">
                <BiDollar className="currency-icon" />
              </div>
              </div>
            </div>

          </div>

          <button className="sign-btn" type="submit">
            Add Flight
          </button>

          <div className="bottom-text">
            <span>Don't want to add Flight?</span>
            <Link to="/admindashboard">Go Back</Link>
          </div>

        </form>
      </div>
      
    </>
  );
};

export default AddFlight;
