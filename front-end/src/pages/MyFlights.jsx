import React, { useEffect, useState } from 'react'
import BreadCrumb from "../components/Breadcrumb";
import "../styles/flightresult.css";
import { SiEthiopianairlines } from "react-icons/si";
import noresult from "../images/noresult.jpg"
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';


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




const MyFlights = () => {
    const [flights, setflights] = useState([]);
    // const [useremail, setUseremail] = useState('');
    let email = '';
    const navigate = useNavigate()

    const api = () =>{
      if (email){
      axios.post('http://localhost:4200/myflights', {
        email
    }).then((res)=>{
        console.log('data received')
        // console.log(res.data)
        setflights(res.data)
    }).catch((err) => console.log(err));
    }}



    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    useEffect(()=>{
        const storedUserProfile = localStorage.getItem("userProfile");
        if (storedUserProfile){
        const userProfile = JSON.parse(storedUserProfile);
        email = userProfile.email
        }       
    })

    useEffect(()=>{
        // console.log(useremail)
        api()
    },[])

    const registered = () =>
    toast.success("Flight cancel successfully! Your amount will be refunded", {
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


    const handleCancelFlight = (p_id, f_no,t_no) =>{
      axios.post('http://localhost:4200/cancelflight', {
        p_id, f_no, t_no
      }).then((res)=>{
        console.log('Data Sent In process')
        if (res.data.message === "Flight cancel successfully") {
          registered();
          api()         
        } else{
          failed('Some error occured while canceling flight')
        }
      }).catch((err)=> console.log('not cancel', err))
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

      <div className="flight-result-main">
      <BreadCrumb title={"My Flights"} />


      {flights.length===0 && email===''? <div style={{display:'flex', justifyContent:'center'}}><img src={noresult} style={{width:'450px'}} alt="No Result" /></div> : 
      <div>
              {flights.map((flight) => {

                return(
                <div key={flight.flight_no} className="flight-items my-2">
                  <div className="single-flight">
                    <div className="flight-rowone heheii">
                      <h6> <SiEthiopianairlines style={{marginRight:'4px'}}/>SilverArrow Airways</h6>
                      <h6>Ticket No : {flight.ticket_no}</h6>
                    </div>

                    <div className="flight-rowtwo my-2">
                      <div className="flight-name flex gap-2 heheiii">
                        <h6>Passenger Name:</h6>
                        <h5>{flight.first_name+' '+flight.last_name}</h5>
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
                        <h6>Status : <span style={{color: 'green'}}>Confirmed</span></h6>
                        <div className="search-btnf">
                          <button type="submit" onClick={()=>handleCancelFlight(flight.passenger_id, flight.flight_no, flight.ticket_no)}>Cancel Flight</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>)
              })}
            </div>
      }



      </div>


    </>
  )
}

export default MyFlights