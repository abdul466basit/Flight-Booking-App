import React, { useEffect } from "react";
import "../styles/flightresult.css";
import BreadCrumb from "../components/Breadcrumb";
import { SiEthiopianairlines } from "react-icons/si";
import { BiSearch } from "react-icons/bi";
import { DatePicker } from "antd";
import { useState } from "react";
import { MdLocationPin } from "react-icons/md";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import noresult from "../images/noresult.jpg"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiNanoBot } from "react-icons/gi";




// import Sidebar from '../components/Sidebar';

const disabledDate = (current) => {
  return current && current < moment().startOf("day");
};
const { RangePicker } = DatePicker;

const dateFormat = (date)=>{
  const newDate = new Date(date)
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return newDate.toLocaleDateString('en-US', options)
}
const timeFormat = (time)=>{
  const newDate = new Date(time)
  // const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return newDate.toLocaleTimeString('en-US')
}
const flightDuration = (t1, t2)=>{
  const departureTime = new Date(t1);
const arrivalTime = new Date(t2);

const totalFlightTime = arrivalTime - departureTime;

// Convert milliseconds to hours and minutes
const hours = Math.floor(totalFlightTime / (1000 * 60 * 60));
const minutes = Math.floor((totalFlightTime % (1000 * 60 * 60)) / (1000 * 60));

return `${hours} hours ${minutes} minutes`;

}


const FlightResult = () => {
  const [flights, setflights] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [flightClass, setFlightClass] = useState("Economy");

  const [departCity, setDepartCity] = useState("");
  const [arrCity, setArrCity] = useState("");

  const location = useLocation();
  const { state } = location;
  let dataf = state? state : [];

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  useEffect(()=>{
    setflights(dataf)
  },[dataf]);


  const handleClassChange = (event) => {
    setFlightClass(event.target.value);
  };
  const handleDepartCity = (event) => {
    setDepartCity(event.target.value);
  };
  const handleArrCity = (event) => {
    setArrCity(event.target.value);
  };
  const handleDateChange = (value) => {
    setDateRange(value);
  };

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

  // const flightData = state && state.flightData ? state.flightData : [];
  // console.log(flights)

  const handleSubmit = (event) => {
    event.preventDefault();
    let startDate = dateRange[0].format("YYYY-MM-DD");
    let endDate = dateRange[1].format("YYYY-MM-DD");
    axios
      .post("http://localhost:4200/flightresult", {
        departCity,
        arrCity,
        startDate,
        endDate,
        flightClass
      })
      .then((res) => {
        console.log("Data Sent");
        setflights(res.data)
      })
      .catch((err) => console.log(err));
  };

  const bookFlight = (flight_id)=>{
    const storedUserProfile = localStorage.getItem('userProfile');
  const userProfile = JSON.parse(storedUserProfile);

  if (userProfile){

    navigate('/flightbooking', {state: flight_id})
  } else{
    failed("Please to your account before Booking Flight");
    setTimeout(() => {
      navigate('/signin');
    }, 2000);

  }
  }


  // const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 960);

  // const handleResize = () => {
  //   setIsScreenSmall(window.innerWidth < 960);
  // };

  // window.addEventListener('resize', handleResize);

  // const [showSidebar, setShowSidebar] = useState(false);

  // function handleButtonClick() {
  //   setShowSidebar(true);
  // }

  return (
    <>
     <ToastContainer
        position="top-center"
        autoClose={3000}
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
       
      <BreadCrumb title={"Flight Result"} />
      <div className="search-rowf">
      <form onSubmit={handleSubmit} className="noborder">

            <div className="form-rowf column gap-3">
              <div className="airport-from">
                <div className="input-wrapperf">
                  <input
                    type="text"
                    placeholder="Departure City"
                    name="from"
                    autoComplete="off"
                    minLength="3"
                    className="form-control aa ui-autocomplete-input"
                    value={departCity}
                    onChange={handleDepartCity}
                    required
                  />
                  <span className="iconf">
                    <MdLocationPin />
                  </span>
                </div>
              </div>

              <div className="airport-to">
                <div className="input-wrapperf">
                  <input
                    type="text"
                    placeholder="Arrival City"
                    name="to"
                    autoComplete="off"
                    minLength="3"
                    className="form-control aa ui-autocomplete-input"
                    value={arrCity}
                    onChange={handleArrCity}
                    required
                  />
                  <span className="iconf">
                    <MdLocationPin />
                  </span>
                </div>
              </div>

              <div className="select date ">
              <RangePicker
                      allowEmpty={[false, false]}
                      disabledDate={disabledDate}
                      onChange={handleDateChange}
                      value={dateRange}
                    />
              </div>

              <div className="flightclass-dropdownf">
                <select
                  className="flight-classf form-control"
                  value={flightClass}
                  onChange={handleClassChange}
                >
                  <option value={"Economy"}>Economy</option>
                  <option value={"Business"}>Business Class</option>
                  <option value={"First Class"}>First Class</option>
                </select>
              </div>

              <div className="search-btnf">
                <button type="submit">Search Flight</button>
              </div>
            </div>
            </form>

          </div>

      {flights.length===0? <div style={{display:'flex', justifyContent:'center'}}><img src={noresult} style={{width:'450px'}} alt="No Result" /></div> : 

        <>
      <div className="title-line">
        <div className="inner-title-line">
          <div className="departure-city">
            <h4>Departing to {flights[0].arrival_city.toUpperCase()}</h4>
          </div>

          <div className="result-line">
            <h5>{flights.length} results found</h5>
          </div>
        </div>
      </div>

      <div>
        {flights.map((flight) => {

          return(
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
                    <p>{flightDuration(flight.depart_datetime, flight.arr_datetime)}</p>
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

                <div className="flight-price px-3">
                  <h4>$ {flight.fare}</h4>
                  <div className="search-btnf">
                    <button type="submit" onClick={()=> bookFlight(flight)}>Book Flight</button>
                  </div>
                </div>
              </div>
            </div>
          </div>)
        })}
      </div>
      </>
}
      <br />
      <br />


    </div>
    </>
  );
};

export default FlightResult;
