import React, { useDeferredValue } from 'react'
import "../styles/admindashboard.css"
import BreadCrumb from "../components/Breadcrumb";
import {FaUserAlt, FaUserCircle} from 'react-icons/fa'
import {FiUsers} from 'react-icons/fi'
import {MdFlight, MdAddBox, MdFlightTakeoff} from 'react-icons/md'
import {TbCategory} from 'react-icons/tb'
import {BiDollar} from 'react-icons/bi'
import {AiFillEdit} from 'react-icons/ai'
import {BsViewList} from 'react-icons/bs'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import adminIcon from '../images/man-with-laptop-light.png'
import { useEffect, useState } from 'react';
import axios from 'axios';


const timeFormat = (time) => {
  const newTime = new Date(time);
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  return newTime.toLocaleTimeString('en-US', options);
};

const dateFormat = (date)=>{
  const newDate = new Date(date)
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return newDate.toLocaleDateString('en-US', options)
}



const AdminDashboard = () => {

  const location = useLocation();
  const { state } = location;
  let amdinid = state ? state : [];
  const [adminIDdashboard, setAdminIDDashboard] = useState(amdinid)

  const [flight, setFlight] = useState([]);
  const [flightCount, setFlightCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [passenger, setPassenger] = useState([]);
  const [rev, setRev] = useState(0)
  

  
  useEffect(()=>{
    window.scrollTo(0,0)
    setAdminIDDashboard(amdinid)
    console.log(adminIDdashboard)
  },[]);

  useEffect(() => {
    axios.get('http://localhost:4200/count')
      .then((res) => {
        console.log(res.data[0].count);
        setFlightCount(res.data[0].count);
      })
      .catch((error) => {
        console.error('Error fetching flight data:', error);
      });
  }, []);


  useEffect(() => {
    axios.get('http://localhost:4200/countrevenue')
      .then((res) => {
        console.log(res.data[0].revenue);
        setRev(res.data[0].revenue);
      })
      .catch((error) => {
        console.error('Error fetching flight data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:4200/countUser')
      .then((res) => {
        console.log(res.data[0].count);


        setUserCount(res.data[0].count);
      })
      .catch((error) => {
        console.error('Error fetching flight data:', error);
      });
  }, []);


  useEffect(() => {
    axios.get('http://localhost:4200/view')
      .then((res) => {
        console.log(res.data[0]);
        const dataLength = res.data.length;
        const limitedFlightData = res.data.slice(dataLength - 5, dataLength).reverse();
        setFlight(limitedFlightData);
        console.log(limitedFlightData);
      })
      .catch((error) => {
        console.error('Error fetching flight data:', error);
      });
  }, []);


  useEffect(() => {
    axios.get('http://localhost:4200/viewuser')
      .then((res) => {
        console.log(res.data[0]);
        const userLength = res.data.length;
        const limitedUserData = res.data.slice(userLength - 5, userLength).reverse();
        setPassenger(limitedUserData);
        console.log(limitedUserData);
      })
      .catch((error) => {
        console.error('Error fetching flight data:', error);
      });
  }, []);

  const combine = (first, last)=>{
    return first + ` ` + last
  }

  const navigate = useNavigate();
  const navigateToAddFlight = () => navigate('/addflight', {state: adminIDdashboard})

  return (
    <>
      <div className='admindashboard-main'>
        <BreadCrumb title={"Admin Dashboard"} />

      <div className='admin-title '>
        <h5>Admin Dashboard</h5>
        <span><FaUserAlt className='admin-icon'/></span>
      </div>

      <div className="admin-welcome d-flex">
        <div className="side-text">
          <h3>Welcome Admin 🎉</h3>
          <p>This is the <strong>admin dashboard</strong>. Perform all user related operations and manage them.</p>
          <div className='btn-div'>
            <Link className='btn' to='/'>Go to Home Page</Link>
          </div>
        </div>

        <div className="side-icon">
          <img src={adminIcon} alt="Admin Icon" />
        </div>

      </div>

      <div className="d-flex gap-4 totals">

        <div className="card-body-01 ">
          <div className='card-body-inner d-flex '>
            <div>
              <p>Total Users</p>
              <h5>{userCount}</h5>
            </div>
            <div><FiUsers className='totals-icon' /></div>
          </div>
          <div className="progress  radius-10 mt-4" style={{ height: '4.5px' }}>
            <div className="progress-bar " role="progressbar" style={{ width: '26%' }}></div>
          </div>
        </div>

        <div className="card-body-02">
          <div className='card-body-inner d-flex'>
            <div>
              <p>Total Flights</p>
              <h5>{flightCount}</h5>
            </div>
            <div><MdFlight className='totals-icon' /></div>
          </div>
          <div className="progress radius-10 mt-4" style={{ height: '4.5px' }}>
            <div className="progress-bar " role="progressbar" style={{ width: '36%' }}></div>
          </div>

        </div>

        <div className="card-body-03">
          <div className='card-body-inner d-flex'>
            <div >
              <p>Total Classes</p>
              <h5>3</h5>
            </div>
            <div><TbCategory className='totals-icon' /></div>
          </div>
          <div className="progress radius-10 mt-4" style={{ height: '4.5px' }}>
            <div className="progress-bar" role="progressbar" style={{ width: '80%' }}></div>
          </div>
        </div>

        <div className="card-body-04">
          <div className='card-body-inner d-flex'>
            <div>
              <p>Total Revenue</p>
              <h5>$ {rev}</h5>
            </div>
            <div><BiDollar className='totals-icon' /></div>
          </div>
          <div className="progress radius-10 mt-4" style={{ height: '4.5px' }}>
            <div className="progress-bar" role="progressbar" style={{ width: '40%' }}></div>
          </div>

        </div>


      </div>

      <div className='admin-function d-flex gap-4'>

        <div className="view-ft d-flex ">
          <BsViewList className='function-icon' />
          <Link to="/viewflight"><h5 style={{color: 'black '}}>View Flights</h5></Link>
          
        </div>

        <div className="add-ft d-flex">
          <MdAddBox className='function-icon' />
          <h5 onClick={navigateToAddFlight}>Add Flights</h5>
        </div>

        <div className="edit-ft d-flex">
          <AiFillEdit className='function-icon' />
          <Link to="/editflight"><h5 style={{color: 'black '}}>Edit Flights</h5></Link>
        </div>

      </div>

      <div className="newly-added d-flex">

        <div className="new-users">
          <h5>New Users</h5>
          <div className='d-flex py-2 gap-2'>

            <p className='user-title-01' >USER NAME</p>
            <p className='user-title-02' >AGE</p>
            <p className='user-title-03' >GENDER</p>
            <p className='user-title-04' >NATIONALITY</p>

          </div>
          <div className="line"></div>
          <div>
            {passenger.map((msg)=>(
              <div className="user-detail d-flex key={'new'}">
              <FaUserCircle className='user-icon' />
              <p className='user-title-01' >{combine(msg.first_name.toUpperCase(), msg.last_name.toUpperCase())}</p>
              <p className='user-title-02' >{msg.age}</p>
              <p className='user-title-03' >{msg.gender.toUpperCase()}</p>
              <p className='user-title-04' >{msg.nationality}</p>
            </div>
            ))}
          </div>
        </div>
        

        <div className="new-flights">
          <h5>Newly added Flights</h5>
          <div className='d-flex py-2 gap-2 px-2'>

            <p className='flight-title-01 ' >FROM</p>
            <p className='flight-title-02' >TO</p>
            <p className='flight-title-03' >DEPARTURE TIME</p>
            <p className='flight-title-04' >DEPARTURE DATE</p>

          </div>

          <div className="line"></div>

          <div>
            {flight.map((provide)=>(
              <div className="user-detail d-flex " key={provide.flight_no}>
              <MdFlightTakeoff className='user-icon' />
              <p className='flight-title-01' >{provide.departure_city}</p>
              <p className='flight-title-02' >{provide.arrival_city}</p>
              <p className='flight-title-03' >{timeFormat(provide.depart_datetime)}</p>
              <p className='flight-title-04' >{dateFormat(provide.depart_datetime)}</p>
            </div>
            ))}
          </div>

        </div>
        
      </div>

           


      <br />
      <br />



      </div>

    </>
  )
}

export default AdminDashboard


















// import React, { useEffect, useState } from 'react'
// import "../styles/admindashboard.css"
// import BreadCrumb from "../components/Breadcrumb";
// import {FaUserAlt, FaUserCircle} from 'react-icons/fa'
// import {FiUsers} from 'react-icons/fi'
// import {MdFlight, MdAddBox, MdFlightTakeoff} from 'react-icons/md'
// import {TbCategory} from 'react-icons/tb'
// import {BiDollar} from 'react-icons/bi'
// import {AiFillEdit} from 'react-icons/ai'
// import {BsViewList} from 'react-icons/bs'
// import { Link, useLocation } from 'react-router-dom';
// import adminIcon from '../images/man-with-laptop-light.png'

// const AdminDashboard = () => {
//    const location = useLocation();
//   const { state } = location;
//   let amdinid = state ? state : [];

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     console.log(amdinid)
//   }, []);

//   const passenger = [
//   {name:'Abdul Basit', age:'21', gender:'Male', nationality:'Pakistani'},
//   {name:'Muhammad Ali', age:'20', gender:'Male', nationality:'Pakistani'},
//   {name:'Muhammad Kashif', age:'21', gender:'Male', nationality:'German'},
//   {name:'Muhammad Saad', age:'21', gender:'Male', nationality:'Indian'},
//   {name:'Sufyan Siddiqui', age:'23', gender:'Male', nationality:'Saudi'},
// ]

//   const flight = [
//     {from:'Karachi', to:'Doha', time:'09:15AM', fare:'$863'},
//     {from:'Islamabad', to:'Dehli', time:'11:15AM', fare:'$863'},
//     {from:'Sydney', to:'Istanbul', time:'06:35AM', fare:'$863'},
//     {from:'Washington', to:'Toronto', time:'08:25AM', fare:'$863'},
//   ]

//   return (
//     <>
//       <div className='admindashboard-main'>
//         <BreadCrumb title={"Admin Dashboard"} />

//       <div className='admin-title '>
//         <h5>Admin Dashboard</h5>
//         <span><FaUserAlt className='admin-icon'/></span>
//       </div>

//       <div className="admin-welcome d-flex">
//         <div className="side-text">
//           <h3>Welcome Admin 🎉</h3>
//           <p>This is the <strong>admin dashboard</strong>. Perform all user related operations and manage them.</p>
//           <div className='btn-div'>
//             <Link className='btn' to='/'>Go to Home Page</Link>
//           </div>

//         </div>

//         <div className="side-icon">
//           <img src={adminIcon} alt="Admin Icon" />
//         </div>

//       </div>

//       <div className="d-flex gap-4 totals">

//         <div className="card-body-01 ">
//           <div className='card-body-inner d-flex '>
//             <div>
//               <p>Total Users</p>
//               <h5>10.1K</h5>
//             </div>
//             <div><FiUsers className='totals-icon' /></div>
//           </div>
//           <div className="progress  radius-10 mt-4" style={{ height: '4.5px' }}>
//             <div className="progress-bar " role="progressbar" style={{ width: '76%' }}></div>
//           </div>
//         </div>

//         <div className="card-body-02">
//           <div className='card-body-inner d-flex'>
//             <div>
//               <p>Total Flights</p>
//               <h5>10.1K</h5>
//             </div>
//             <div><MdFlight className='totals-icon' /></div>
//           </div>
//           <div className="progress radius-10 mt-4" style={{ height: '4.5px' }}>
//             <div className="progress-bar " role="progressbar" style={{ width: '46%' }}></div>
//           </div>

//         </div>

//         <div className="card-body-03">
//           <div className='card-body-inner d-flex'>
//             <div >
//               <p>Total Classes</p>
//               <h5>10.1K</h5>
//             </div>
//             <div><TbCategory className='totals-icon' /></div>
//           </div>
//           <div className="progress radius-10 mt-4" style={{ height: '4.5px' }}>
//             <div className="progress-bar" role="progressbar" style={{ width: '80%' }}></div>
//           </div>
//         </div>

//         <div className="card-body-04">
//           <div className='card-body-inner d-flex'>
//             <div>
//               <p>Total Revenue</p>
//               <h5>10.1K</h5>
//             </div>
//             <div><BiDollar className='totals-icon' /></div>
//           </div>
//           <div className="progress radius-10 mt-4" style={{ height: '4.5px' }}>
//             <div className="progress-bar" role="progressbar" style={{ width: '40%' }}></div>
//           </div>

//         </div>


//       </div>

//       <div className='admin-function d-flex gap-4'>

//         <div className="view-ft d-flex ">
//           <BsViewList className='function-icon' />
//           <h5>View Flights</h5>
//         </div>

//         <div className="add-ft d-flex">
//           <MdAddBox className='function-icon' />
//           <h5>Add Flights</h5>
//         </div>

//         <div className="edit-ft d-flex">
//           <AiFillEdit className='function-icon' />
//           <h5>Edit Flights</h5>
//         </div>

//       </div>

//       <div className="newly-added d-flex">

//         <div className="new-users">
//           <h5>New Users</h5>
//           <div className='d-flex py-2 gap-2'>

//             <p className='user-title-01' >USER NAME</p>
//             <p className='user-title-02' >AGE</p>
//             <p className='user-title-03' >GENDER</p>
//             <p className='user-title-04' >NATIONALITY</p>

//           </div>
//           <div className="line"></div>
//           <div>
//             {passenger.map((provide)=>(
//               <div className="user-detail d-flex">
//               <FaUserCircle className='user-icon' />
//               <p className='user-title-01' >{provide.name}</p>
//               <p className='user-title-02' >{provide.age}</p>
//               <p className='user-title-03' >{provide.gender}</p>
//               <p className='user-title-04' >{provide.nationality}</p>
//             </div>
//             ))}
//           </div>
//         </div>
        

//         <div className="new-flights">
//           <h5>Newly added Flights</h5>
//           <div className='d-flex py-2 gap-2 px-2'>

//             <p className='flight-title-01 ' >FROM</p>
//             <p className='flight-title-02' >TO</p>
//             <p className='flight-title-03' >TIME</p>
//             <p className='flight-title-04' >FARE</p>

//           </div>

//           <div className="line"></div>

//           <div>
//             {flight.map((provide)=>(
//               <div className="user-detail d-flex">
//               <MdFlightTakeoff className='user-icon' />
//               <p className='flight-title-01' >{provide.from}</p>
//               <p className='flight-title-02' >{provide.to}</p>
//               <p className='flight-title-03' >{provide.time}</p>
//               <p className='flight-title-04' >{provide.fare}</p>
//             </div>
//             ))}
//           </div>

//         </div>
        
//       </div>

           


//       <br />
//       <br />



//       </div>

//     </>
//   )
// }

// export default AdminDashboard
