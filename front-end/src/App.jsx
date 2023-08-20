import React, { useState } from "react";
import { BrowserRouter, Route, Routes, ScrollRestoration } from "react-router-dom";
import Layouts from "./components/Layouts";
import Home from "./pages/Home";
import './styles/main.css';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminLogin from "./pages/AdminLogin";
import FlightResult from "./pages/FlightResult";
import Booking from "./pages/Booking";
import AdminDashboard from "./pages/AdminDashBoard";
import MyFlights from "./pages/MyFlights";
import ViewFlight from "./pages/ViewFlight";
import EditFlight from "./pages/EditFlight";
import EditFlighttwo from "./pages/EditFlightTwo";
import AddFlight from "./pages/AddFlight";
import Contactus from "./pages/ContactUs";
import About from "./pages/about";


function App() {
    const [isLogOut, setIsLogOut] = useState(true)

    return (
        <>
            <BrowserRouter>

                <Routes>
                    <Route path="/" element={<Layouts isLogOut={isLogOut} setIsLogOut={setIsLogOut} />}>
                        <Route index element={<Home />}/>
                        <Route exact path="/contact" element={<Contactus/>}/>
                        <Route exact path="/admin" element={<AdminLogin/>}/>
                        <Route exact path="/signin" element={<SignIn setIsLogOut={setIsLogOut} />}/>
                        <Route exact path="/signup" element={<SignUp/>}/>
                        <Route exact path="/flightresult" element={<FlightResult/>}/>
                        <Route exact path="/flightbooking" element={<Booking/>}/>
                        <Route exact path="/admindashboard" element={<AdminDashboard/>}/>
                        <Route exact path="/myflights" element={<MyFlights/>}/>
                        <Route exact path="/viewflight" element={<ViewFlight/>}/>
                        <Route exact path="/editflight" element={<EditFlight/>}/>
                        <Route exact path="/editflighttwo/:id" element={<EditFlighttwo/>}/>
                        <Route exact path="/addflight" element={<AddFlight/>}/>
                        <Route exact path="/about" element={<About />}/>
                    </Route>
                </Routes>

            </BrowserRouter>
        </>
    )
}

export default App;

