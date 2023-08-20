import React from 'react'
import Header from './Header'
import {Outlet} from "react-router-dom"
import Footer from './Footer'


const Layouts = ({isLogOut, setIsLogOut}) => {
  return (
    <>
      <Header isLogOut={isLogOut} setIsLogOut={setIsLogOut} />
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Layouts
