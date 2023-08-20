import React, { useEffect, useState } from "react";
import cover_05 from "../images/cover_f1.jpg";
import cover_12 from "../images/cover_f2.jpg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GiCommercialAirplane } from "react-icons/gi";
import { RxCalendar } from "react-icons/rx";
import { BsPerson } from "react-icons/bs";
import { DatePicker } from "antd";
import moment from "moment";
import collage from "../images/collage.png";
import "../styles/home.css";
import "../styles/main.css";
import "../styles/destinations.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const disabledDate = (current) => {
  return current && current < moment().startOf("day");
};

const { RangePicker } = DatePicker;


const Home = () => {

  const [dateRange, setDateRange] = useState(null);
  const [flightClass, setFlightClass] = useState("Economy");

  const [departCity, setDepartCity] = useState("");
  const [arrCity, setArrCity] = useState("");

  const history = useNavigate();

  let date = new Date();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        // console.log(res.data)
        let data = res.data
        history('/flightresult', {state: data});

      })
      .catch((err) => console.log(err));
  };

  let cities = [
    {
      name: "Dubai",
      country: "United Arab Emirates",
      fare: "350",
      class: "card__img dubai",
    },
    { name: "Paris", country: "France", fare: "360", class: "card__img paris" },
    {
      name: "Istanbul",
      country: "Turkey",
      fare: "330",
      class: "card__img istanbul",
    },
    { name: "Male", country: "Maldives", fare: "420", class: "card__img male" },
    {
      name: "New York City",
      country: "United States",
      fare: "420",
      class: "card__img ny",
    },
    {
      name: "London",
      country: "United Kingdom",
      fare: "370",
      class: "card__img london",
    },
    { name: "Rome", country: "Italy", fare: "370", class: "card__img rome" },
    {
      name: "Zürich",
      country: "Switzerland",
      fare: "340",
      class: "card__img zurich",
    },
  ];

  return (
    <>
      <section className="tophead">
        <div>
          <div id="carouselExampleCaptions" className="carousel slide">
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
            </div>

            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={cover_12} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5></h5>
                  <p>
                    
                  </p>
                </div>
              </div>

              <div className="carousel-item">
                <img src={cover_05} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5></h5>
                  <p>
                    
                  </p>
                </div>
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      <section>
        <form onSubmit={handleSubmit} className="form-search">
          <div className="search-container container section">
            <div className="iconDiv box">
              <GiCommercialAirplane className="icon" />
              <h2>Search Flights</h2>
            </div>

            <div className="section-container grid">
              <div className="searchInput">
                <div className="location-select row">
                  <div className="iconDiv">
                    <HiOutlineLocationMarker className="icon" />
                    <h5>Location</h5>
                  </div>

                  <div className="texts">
                    <div className="input-row">
                      <input
                        className="search-input"
                        type="text"
                        placeholder="Enter Departure City"
                        value={departCity}
                        onChange={handleDepartCity}
                        required
                      />
                    </div>
                    <div className="input-row">
                      <input
                        className="search-input"
                        type="text"
                        placeholder="Enter Arrival City"
                        value={arrCity}
                        onChange={handleArrCity}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="date-select row">
                  <div className="iconDiv">
                    <RxCalendar className="icon" />
                    <h5>Date</h5>
                  </div>
                  <div className="select date ">
                    <RangePicker
                      allowEmpty={[false, false]}
                      disabledDate={disabledDate}
                      onChange={handleDateChange}
                      value={dateRange}
                    />
                  </div>

                  {/* <div className="select date">
                <RangePicker disabledDate={disabledDate} />
              </div> */}

                  {/* <div className="texts">
                  <div className="input-row">
                    <DatePicker className="search-input"
                      placeholderText="Enter Departure Date"
                      dateFormat="yyyy-MM-dd"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div> */}
                  {/* <input className="search-input" type="date" /> */}
                </div>

                <div className="passenger-select row">
                  <div className="iconDiv">
                    <BsPerson className="icon" />
                    <h5>Class</h5>
                  </div>

                  <div className="passenger-dropdown">
                    <select
                      className="passenger-no"
                      value={flightClass}
                      onChange={handleClassChange}
                      required
                    >
                      <option value="Economy">Economy</option>
                      <option value="Business">Business</option>
                      <option value="First Class">First Class</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="search-button">
                <button type="submit">Search Flights</button>
              </div>
            </div>
          </div>
        </form>
      </section>

      <section>
        <div className="support-home container section">
          <div className="sectionContainer">
            <div className="titlesDiv">
              <small>Travel Support</small>
              <h2>Plan your Travel with Confidence</h2>
              <p>
                Find help with booking and travel plans, see what to expect
                along the journey!
              </p>
            </div>

            <div className="infoDiv">
              <div className="textDiv grid">
                <div className="singleinfo">
                  <span className="number colorOne">01</span>
                  <h4>Travel requirements for Dubai</h4>
                  <p>
                    Find help with booking and travel plans, see what to expect
                    along the journey to your favourite destination
                  </p>
                </div>

                <div className="singleinfo">
                  <span className="number colorTwo">02</span>
                  <h4>Chauffer services at your arrival</h4>
                  <p>
                    Find help with booking and travel plans, see what to expect
                    along the journey to your favourite destination
                  </p>
                </div>

                <div className="singleinfo">
                  <span className="number colorThree">03</span>
                  <h4>Multi-risk travel insurance</h4>
                  <p>
                    Find help with booking and travel plans, see what to expect
                    along the journey to your favourite destination
                  </p>
                </div>
              </div>

              <div className="imgDiv">
                <img className="image-comb" src={collage} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="destinations">
          <h2 className="title">Featured Destinations</h2>
          <div className="container-destinations">
            {cities.map((city) => {
              return (
                <div className="card" key={city.name}>
                  <div className={city.class}></div>
                  <div className="card__descr-wrapper">
                    <p className="p card__title-top">{city.country}</p>
                    <p className="p card__title">{city.name}</p>
                    <p className="p card__descr">
                      Book Economy Class <span>from $ {city.fare}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
