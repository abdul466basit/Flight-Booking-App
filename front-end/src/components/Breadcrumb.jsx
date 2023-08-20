import React from 'react'
import {Link } from 'react-router-dom'
import '../styles/breadcrumb.css'

const Breadcrumb = (props) => {
  const {title} = props;

  return (
    <div className=" breadcrumb py-3 mb-0">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12 d-flex flex-wrap justify-content-center ">
                <Link to="/" className="text-light mb-0">
                  Home &nbsp;
                </Link>
                <p className="mb-0 mt-1"> / {<b> { title}</b>}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb
