import React from "react";
import Breadcrumb from '../components/Breadcrumb';
import {AiOutlineHome, AiOutlineMail} from "react-icons/ai"
import {BiPhoneCall, BiInfoCircle} from "react-icons/bi"
import '../styles/contact.css'


const Contactus = () => {
  return (
    <>
    
    <div style={{paddingTop:'65px'}}></div>
    <Breadcrumb title={'Contact Us'}/>

      <div className="contact-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <iframe
                title="office"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26607.90973247845!2d73.13517440120262!3d33.527678993533506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfed8dabf00f19%3A0xb812318c3025e7a!2sDHA%20Phase%20II%2C%20Islamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1680350714204!5m2!1sen!2s"
                width="600"
                height="450"
                className="border-0 w-100"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="col-12 mt-5">
                <div className="contact-wrapper-inner d-flex justify-content-between">
                  <div>
                    <h3 className="contact-title">Contact</h3>
                    <form action="" className="d-flex flex-column gap-15">
                      <div>
                        <input 
                        type="text" className="form-control" placeholder="Name"/>
                      </div>
                      <div>
                        <input type="text" className="form-control" placeholder="Email"/>
                      </div>
                      <div>
                        <input type="text" className="form-control" placeholder="Mobile Number"/>
                      </div>
                      <div>
                        <textarea
                          placeholder="Comments"
                          className="w-100 form-control"
                          name=""
                          id=""
                          cols="30"
                          rows="4"
                        ></textarea>
                      </div>
                      <div className="w-100">
                        <button className="button">Submit</button>
                      </div>
                    </form>
                  </div>
                  <div>
                    <h3 className="contact-title">Get in touch With us</h3>
                    <div>
                      <ul className="ps-0">
                        <li className="mb-3 d-flex gap-15 align-items-center">
                          <AiOutlineHome className="fs-5"/>
                          <address className="mb-0">House no. A-198 Street 15, DHA Phase 2, 
                            Islamabad, Pakistan</address>
                        </li>
                        <li className="mb-3 d-flex gap-15 align-items-center">
                          <BiPhoneCall className="fs-5"/>
                          <a href="tel:+92 3462630998">+92 3462630998</a>
                        </li>
                        <li className="mb-3 d-flex gap-15 align-items-center">
                          <AiOutlineMail className="fs-5"/>
                          <a href="abdulbasitsiddiqui466@gmail.com">
                            abdulbasitsiddiqui466@gmail.com
                          </a>
                        </li>
                        <li className="mb-3 d-flex gap-15 align-items-center">
                          <BiInfoCircle className="fs-5"/>
                          <p className="mb-0">Monday - Friday 10AM - 8PM</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactus;
