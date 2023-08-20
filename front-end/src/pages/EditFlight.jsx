import React from 'react'
import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import {MdFlightTakeoff} from 'react-icons/md'
import '../styles/viewFlight.css'
import { Link } from 'react-router-dom';
import axios from 'axios';


const dateFormat = (date)=>{
  const newDate = new Date(date)
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return newDate.toLocaleDateString('en-US', options)
}

const timeFormat = (time)=>{
  const newTime = new Date(time)
  return newTime.toLocaleTimeString('en-US')
}


const EditFlight = () => {
  const [flight, setFlight] = useState([]);
    
  useEffect(()=>{
    window.scrollTo(0,0)
  },[]);

  useEffect(() => {
    axios.get('http://localhost:4200/view')
      .then((res) => {
        const limitedFlightData = res.data;
        
        setFlight(limitedFlightData);
        console.log(limitedFlightData)

      })
      .catch((error) => {
        console.error('Error fetching flight data:', error);
      });
  }, []);



  return (
    <div className="editflight-main">
        <Breadcrumb title={'Edit Flight'} />

        <div className="v-new-flights">
          <h5>All Flights</h5>
          <div className='d-flex py-2 gap-2 px-2'>

          <p className="flight-title-01">FROM</p>
          <p className="flight-title-02">TO</p>
          <p className="flight-title-03">DATE</p>
          <p className="flight-title-04">DEPT TIME</p>
          <p className="flight-title-05 px-1">ARR TIME</p>
          <p className="flight-title-06 px-1">ECONOMY FARE</p>
          <p className="flight-title-06 px-1">FIRST CLASS FARE</p>
          <p className="flight-title-06 px-1">BUSINESS FARE</p>

          </div>

          <div className="line"></div>

          <div>
            {flight.map((provide)=>(
            <div className="flight-detail d-flex" key={provide.flight_no}>
              <MdFlightTakeoff className="flight-icon" />
              <p className="flight-title-01">{provide.departure_city}</p>
              <p className="flight-title-02">{provide.arrival_city}</p>
              <p className="flight-title-03">{dateFormat(provide.depart_datetime)}</p>
              <p className="flight-title-04">{timeFormat(provide.depart_datetime)}</p>
              <p className="flight-title-05 px-1">{timeFormat(provide.arr_datetime)}</p>
              <p className="flight-title-06">{`${provide.economy_fare}$`}</p>
              <p className="flight-title-06">{`${provide.first_class_fare}$`}</p>
              <p className="flight-title-06">{`${provide.business_fare}$`}</p>

              <div className='search-button'>
                <Link to={`/editflighttwo/${provide.flight_no}`} ><p>Edit Flight</p></Link>
              </div>

            </div>
            ))}
          </div>

        </div>

        
    </div>
  )
}

export default EditFlight
