import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import {Link, useParams} from "react-router-dom"
import '../styles/viewFlight.css'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { BiMoney, BiDollar } from "react-icons/bi";
import "react-toastify/dist/ReactToastify.css";
import { DatePicker, Space } from 'antd';
import moment from "moment";


const defaultDate = moment('03-07-2023', 'DD-MM-YYYY').toDate();

const dateFormat = (date)=>{
  const newDate = new Date(date)
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return newDate.toLocaleDateString('en-US', options)
}

const timeFormat = (time)=>{
  const newTime = new Date(time)
  return newTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })
}



const EditFlighttwo = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[]);

  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [economyfare, setEconomyFare] = useState('');
  const [firstclassfare, setFirstClassFare] = useState('');
  const [businessfare, setBusinessFare] = useState('');
  const [economyseats, setEconomySeats] = useState('');
  const [firstclassseats, setFirstClassSeats] = useState('');
  const [businessseats, setBusinessSeats] = useState('');
  const [newdeparturedate, setNewDepartureDate] = useState(null);
  const [newarrivaldate, setNewArrivalDate] = useState(null);
  const [departureDateTime, setDepartureDateTime] = useState(null);
  const [arrivalDateTime, setArrivalDateTime] = useState(null);

  const {id} = useParams()

  const handleDepartureDate = (value) => {
    setNewDepartureDate(value);
  };
  const handleDepartureTime = (event) => {
    setDepartureTime(event.target.value);
    console.log(newdeparturedate)
  };
  const handleArrivalDate = (value) => {
    setNewArrivalDate(value);
    console.log(newarrivaldate)
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
    toast.success("Flight Updated Successfully", {
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


  useEffect(()=>{
    axios.get(`http://localhost:4200/editflighttwo/${id}`)
    .then(res => {
      console.log("ID SEND")
      console.log(res.data[0]);
      setDepartureCity(res.data[0].departure_city);
      setArrivalTime(timeFormat(res.data[0].arr_datetime))
      setDepartureTime(timeFormat(res.data[0].depart_datetime))
      setArrivalDate(dateFormat(res.data[0].arr_datetime))
      setDepartureDate(dateFormat(res.data[0].depart_datetime))
      setArrivalCity(res.data[0].arrival_city);
      setEconomyFare(res.data[0].economy_fare);
      setFirstClassFare(res.data[0].first_class_fare);
      setBusinessFare(res.data[0].business_fare);
      setEconomySeats(res.data[0].economy_seats);
      setFirstClassSeats(res.data[0].first_class_seats);
      setBusinessSeats(res.data[0].business_seats);
      setDepartureDateTime(res.data[0].depart_datetime)
      setArrivalDateTime(res.data[0].arr_datetime)
      console.log(arrivalDateTime)
      console.log(departureDateTime)

    })
    .catch(err => console.log(err))
    
  }, [id, departureDate, arrivalDate ])


  const handleSubmit = (event) => {
    event.preventDefault();
    let depart_date  = newdeparturedate?.format("YYYY-MM-DD");
    let arr_date = newarrivaldate?.format("YYYY-MM-DD");
    let depart_time = departureTime + ':00';
    let arr_time = arrivalTime + ':00'
    axios
      .post(`http://localhost:4200/editflighttwo/${id}`, {
      depart_date,
      arr_date,
      arr_time,
      depart_time,
      economyfare,
      firstclassfare,
      businessfare,
      departureDateTime,
      arrivalDateTime
      })
      
      .then((res) => {
        console.log(res.data.message);
        console.log("DATA SENT");

        if (res.data.message === "Flight Updated") {
          registered();
        }
        else if(res.data.message === 'Error Updating Flight'){
          failed('Error Flight Adding')
        }
         else {
          failed('Registration Failed! Try Again');
        }
      })
      .catch((err) => console.log(err));
      

    setDepartureDate(newdeparturedate);
    setArrivalDate(newarrivaldate);
  };

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

    

  return (
    <div className='editflight-main'>

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

      <Breadcrumb title={'Edit Flight'} />

      <div className="sign-container">
        <form className="signup-form" onSubmit={handleSubmit} >
          <h2 className="myh2">{`From  ${departureCity} To ${arrivalCity}`}</h2>


          <div className="mycontainer-main d-flex gap-4">
            <div className="mycontainer-1">
              <div className="mycontainer gap-1">

                <div className="sign-input-container2 edit-flight-1">
                  <label className="inp-label" htmlFor="mobile1">
                  <MdFlightTakeoff className="flight-icon" />
                  Departure Date
                  </label>
                  <Space direction="vertical">
                      <DatePicker 
                        onChange={handleDepartureDate} 
                        placeholder={departureDate}
                        value={newdeparturedate}
                        // disableDate={disabledDate}
                        className="custom-datepicker"
                      />
                  </Space>
                </div>

                <div className="sign-input-container2 edit-flight">
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
                        className="custom-timepicker"
                      />
                    </div>
                  </div>


                </div>

              </div>


              <div className="mycontainer gap-1">

                <div className="sign-input-container2 edit-flight-1">
                  <label className="inp-label" htmlFor="mobile1">
                  <MdFlightLand className="flight-icon" />
                  Arrival Date
                  </label>
                  <Space direction="vertical">
                      <DatePicker
                        onChange={handleArrivalDate}
                        value={newarrivaldate}
                        disableDate={disabledDate}
                        placeholder={arrivalDate}
                        className="custom-datepicker"
                      />
                  </Space>
                </div>

                <div className="sign-input-container2 edit-flight">
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
                        className='custom-timepicker'
                      />

                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="mycontainer-2">
              <div className="flight-seats">
                <h5>Seats Available</h5>
              </div>

              <div className="flight-seats">
                <p>{`Economy:  ${economyseats} Seats`}</p>
                <p>{`First Class: ${firstclassseats} Seats`}</p>
                <p>{`Business: ${businessseats} Seats`}</p>
              </div>

            </div>

          </div>


          <div className="mycontainer fare-div gap-4  ">

            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="passportNo">
                <BiMoney className="flight-icon" />
                Economy Fare
              </label>
              <div className="input-group">
                <input
                  className="sign-inp"
                  type="number"
                  id="fare"
                  placeholder="Flight Fare"
                  value={economyfare}
                  onChange={handleEconomyFare}
                  required
                />
                <span className="input-group-addon">$</span>
              </div>
            </div>

            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="passportNo">
                <BiMoney className="flight-icon" />
                First Class Fare
              </label>
              <div className="input-group">
              <input
                className="sign-inp"
                type="number"
                id="fare"
                placeholder="Flight Fare"
                value={firstclassfare}
                onChange={handleFirstClassFare}
                required
              />
              <span className="input-group-addon">$</span>
              </div>
            </div>

            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="passportNo">
                <BiMoney className="flight-icon" />
                Business Fare
              </label>
              <div className="input-group">
              <input
                className="sign-inp"
                type="number"
                id="fare"
                placeholder="Flight Fare"
                value={businessfare}
                onChange={handleBusinessFare}
                required
              />
              <span className="input-group-addon">$</span>
              </div>
            </div>

          </div>



          <button className="sign-btn" type="submit">
            Update Flight
          </button>

          <div className="bottom-text">
            <span>Don't want to Update Flight?</span>
            <Link to="/admindashboard">Go Back</Link>
          </div>

        </form>
      </div>

    <br />
    <br />
    <br />

      
    </div>
  )
}

export default EditFlighttwo
