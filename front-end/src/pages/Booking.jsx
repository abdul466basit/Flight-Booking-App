import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/booking.css";
import BreadCrumb from "../components/Breadcrumb";
import "../styles/flightresult.css";
import "../styles/booking.css";
import { SiEthiopianairlines } from "react-icons/si";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const dateFormat = (date) => {
  const newDate = new Date(date);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return newDate.toLocaleDateString("en-US", options);
};
const timeFormat = (time) => {
  const newDate = new Date(time);
  // const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return newDate.toLocaleTimeString("en-US");
};
const flightDuration = (t1, t2) => {
  const departureTime = new Date(t1);
  const arrivalTime = new Date(t2);

  const totalFlightTime = arrivalTime - departureTime;

  // Convert milliseconds to hours and minutes
  const hours = Math.floor(totalFlightTime / (1000 * 60 * 60));
  const minutes = Math.floor(
    (totalFlightTime % (1000 * 60 * 60)) / (1000 * 60)
  );

  return `${hours} hours ${minutes} minutes`;
};



const Booking = () => {
  const location = useLocation();
  const [account_no, setAccount] = useState("");

  const [users, setUsers] = useState([]);

  const { state } = location;
  let flight = state ? state : [];

  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const storedUserProfile = localStorage.getItem("userProfile");
    const userProfile = JSON.parse(storedUserProfile);
    setUsers(userProfile);
  }, []);

  const handleAccount = (event) => {
    setAccount(event.target.value);
  };
  const registered = () =>
  toast.success("Flight booked successfully!", {
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
    let f_no = flight.flight_no
    let fare = flight.fare
    let email = users.email
    let fclass = flight.type
    console.log(f_no, users)


    axios
      .post("http://localhost:4200/bookingflight", {
        f_no,
        fare,
        email, 
        fclass, 
        account_no
      })
      .then((res) => {
        console.log("Data Sent, Booked");
        if (res.data.message === "Flight booked successfully") {
          registered();
          // console.log(res.data.user)
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else if (res.data.message === "already booked"){
          failed('You have already booked this flight')
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
        else {
          failed('Some error occured while booking flight')
        }
      })
      .catch((err) => console.log('Not booked error response'));
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
    <div className="flight-result-main">
      <BreadCrumb title={"Book Flight"} />
      <h2 className="title">Flight Details</h2>

      {/* <p>{flight.flight_no} {flight.departure_city} {flight.depart_datetime}</p> */}
      <div key={flight.flight_no} className="flight-items my-2">
        <div className="single-flight">
          <div className="flight-rowone">
            <h6>SilverArrow Airways</h6>
          </div>

          <div className="flight-rowtwo my-2">
            <div className="flight-name flex gap-2">
              <SiEthiopianairlines style={{ fontSize: "30px" }} />
              <h5>SilverArrow</h5>
            </div>
            <div className="flight-route flex">
              <div className="depart-detail">
                <h6>
                  <b>{dateFormat(flight.depart_datetime)}</b>
                </h6>

                <h6>{timeFormat(flight.depart_datetime)}</h6>
                <p className="city">{flight.departure_city}</p>
              </div>

              <div className="journey-detail ">
                <p>
                  {flightDuration(flight.depart_datetime, flight.arr_datetime)}
                </p>
                <div className="flight-info-stop__stopline-wrapper flex v-center">
                  <svg
                    className="flight-info-stop__line"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      className="flight-info-stop__box"
                      x="0"
                      y="50%"
                      width="10"
                      height="10"
                    />
                    <line
                      className="flight-info-stop__path"
                      x1="10"
                      y1="70%"
                      x2="90%"
                      y2="70%"
                    />
                    <rect
                      className="flight-info-stop__box"
                      x="90%"
                      y="50%"
                      width="10"
                      height="10"
                    />
                  </svg>
                </div>
                <p>Direct</p>
              </div>

              <div className="arrival-detail">
                <h6>
                  <b>{dateFormat(flight.arr_datetime)}</b>
                </h6>
                <h6>{timeFormat(flight.arr_datetime)}</h6>
                <p className="city">{flight.arrival_city}</p>
              </div>
            </div>

            <div className="flight-price">
              <h4>$ {flight.fare}</h4>
              {/* <div className="search-btnf">
                    <button type="submit" >Book Flight</button>
                  </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="containerform">
        <div className="details">
          <h2>Passenger Details</h2>
          <div className="detailsall">
            <p>
              Passenger Name: <span>{users.name}</span>
            </p>
            <p>
              Contact No:<span>{users.mobileNo}</span>
            </p>
            <div className="inflex1">
              <p>
                Age:<span>{users.age}</span>
              </p>
              <p>
                Gender:<span>{users.gender}</span>
              </p>
            </div>
            <p>
              Address:<span>{users.address}</span>
            </p>
            <div className="inflex2">
              <p>
                Nationality:<span>{users.passportno}</span>
              </p>
              <p>
                Passport No:<span>{users.nationality}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="form">
          <h2>Payment Information</h2>
          <form className="form-confirm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Account No:</label>
              <input
                type="number"
                id="name"
                name="name"
                placeholder="Must be within 11-17"
                required
                autoComplete="off"
                maxLength={17}
                value={account_no}
                onChange={handleAccount}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">CVV/CVC:</label>
              <input
                type="number"
                minLength={4}
                maxLength="4"
                id="email"
                name="email"
                autoComplete="off"
                required
              />
            </div>
            <div className="tacbox">
              <input className="hehe" id="checkbox" type="checkbox" required />
              <label htmlFor="checkbox">
                {" "}
                I agree to these{" "}
                <button
                  type="button"
                  className="hehehe"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  terms and conditions.
                </button>
              </label>
            </div>
            <div className="form-group">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Terms and Condtions
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ul>
                <li className="heeh">
                  Full payment is required at the time of booking.
                </li>
                <li className="heeh">
                  Payment methods accepted include credit cards, debit cards,
                  and online payment platforms.
                </li>
                <li className="heeh">
                  All prices are quoted in the local currency and are inclusive
                  of applicable taxes and fees.
                </li>
                <li className="heeh">
                  Cancellation policies vary based on the fare type and airline
                  regulations.
                </li>
                <li className="heeh">
                  Refunds, if applicable, are subject to the terms and
                  conditions of the airline and fare rules.
                </li>
                <li className="heeh">
                  Cancellation fees may apply, and refund amounts may be subject
                  to deductions.
                </li>
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Booking;
