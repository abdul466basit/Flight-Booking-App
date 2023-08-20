const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcrypt');
const salt = 10;

app.use(bodyparser.json());
app.use(express.json());
app.use(cors());


let mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "flight_system",
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("DB Connected Successfully");
    initializePassengerCounter();
    initializeTicketCounter();
    initializeTransCounter();
    initializeflightCounter()

  } else console.log("failed");
  // console.log("DB mysqlConnection failed \n Error: "+ JSON.stringify(err, undefined, 2))
});

app.listen(4200, () => {
  console.log("The Server running at port 4200...");
});


//-----------------------------Initializing Program Counter when the program Starts------------------------------

let passengerCounter = 0;

function initializePassengerCounter() {
  mysqlConnection.query(
    "SELECT MAX(passenger_id) AS maxId FROM passenger",
    (error, results) => {
      if (error) {
        console.error("Error retrieving passenger counter:", error);
      } else {
        const maxId = results[0].maxId;
        if (maxId) {
          passengerCounter = parseInt(maxId.split("-")[1], 10); // Extract the counter value from the maxId
        }
        console.log("Passenger counter initialized:", passengerCounter);
      }
    }
  );
}

function generatePassengerId() {
  passengerCounter += 1; // Increment passenger counter
  return "SAA-" + passengerCounter;
}

// ----------------------------------------------- Ticket no -----------------------------------------------

let ticketNo = 38424822;

function initializeTicketCounter() {
  mysqlConnection.query(
    "SELECT MAX(ticket_no) AS maxId FROM ticket",
    (error, results) => {
      if (error) {
        console.error("Error retrieving ticket counter:", error);
      } else {
        const maxId = results[0].maxId;
        if (maxId) {
          ticketNo = parseInt(maxId.split("-")[1], 10); // Extract the counter value from the maxId
        }
        console.log("Ticket counter initialized:", ticketNo);
      }
    }
  );
}

function generateTicketNo() {
  ticketNo += 1; // Increment passenger counter
  return "SAT-" + ticketNo;
}

let transNo = 6453534979343;

function initializeTransCounter() {
  mysqlConnection.query(
    "SELECT MAX(transaction_id) AS maxId FROM payment",
    (error, results) => {
      if (error) {
        console.error("Error retrieving ticket counter:", error);
      } else {
        const maxId = results[0].maxId;
        if (maxId) {
          transNo = parseInt(maxId.split("-")[1], 10); // Extract the counter value from the maxId
        }
        console.log("Ticket counter initialized:", transNo);
      }
    }
  );
}

function generateTransNo() {
  transNo += 1; // Increment passenger counter
  return "SATP-" + transNo;
}

function generateSeatNumber() {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // Exclude I and O
  const numbers = "0123456789";

  let seatNumber = "";

  // Generate a random letter
  const randomLetterIndex = Math.floor(Math.random() * letters.length);
  seatNumber += letters[randomLetterIndex];

  // Generate two random numbers
  for (let i = 0; i < 2; i++) {
    const randomNumIndex = Math.floor(Math.random() * numbers.length);
    seatNumber += numbers[randomNumIndex];
  }

  return seatNumber;
}

//-----------------------------------ADDING DATA TO THE DATABASE FROM USER----------------------------------

app.post("/signup", (req, res) => {
  let { firstname, lastname, email, phoneOne, phoneTwo, password, nationality, passportno, gender, age, address, } = req.body;
  let passenger_id = generatePassengerId();

  const queryOne = "INSERT INTO passenger_details (first_name, last_name, email, password, nationality, passport_no, gender, age, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  bcrypt.hash(password.toString(), salt, (err, hashpassword) =>{
    if (err){
      console.log("There is an Error"+ err)
    }
    else{
      console.log("The hashed pwd: "+ hashpassword)
      console.log("The Original pwd: "+ password)

      mysqlConnection.query(queryOne, [firstname, lastname, email, hashpassword, nationality, passportno, gender, age, address,], (err, data) => {
        if (!err) {
          const queryTwo =
            "INSERT INTO passenger (passenger_id, email) VALUES (?, ?)";
          mysqlConnection.query(
            queryTwo,
            [passenger_id, email],
            (err, passengerdata) => {
              if (!err) {
                const queryThree =
                  "INSERT INTO mobile_no (passenger_id, mobile_no) VALUES (?, ?)";
                const queryFour =
                  "INSERT INTO mobile_no (passenger_id, mobile_no) VALUES (?, ?)";
  
                mysqlConnection.query(
                  queryThree,
                  [passenger_id, phoneOne],
                  (err, mobiledata) => {
                    if (!err) {
                      console.log("DATA ADDED TO THE DATABASE SUCCESSFULLY");
                      if (phoneTwo) {
                        mysqlConnection.query(
                          queryFour,
                          [passenger_id, phoneTwo],
                          (err, mobiledata) => {
                            if (!err) {
                              console.log("DATA ADDED TO THE DATABASE SUCCESSFULLY");
                              res.json({ message: "Data Added" });
                            } else {
                              console.log("MOBILE TABLE 2 ERROR" + err);
                              res.status(500).json({ message: "Internal Server Error" });
                            }
                          }
                        );
                      } else {
                        res.json({ message: "Data Added" });
                      }
                    } else {
                      console.log("MOBILE TABLE ERROR" + err);
                      res.status(500).json({ message: "Internal Server Error" });
                    }
                  }
                );
              } else {
                console.log("PASSENGER TABLE ERROR" + err);
                res.status(500).json({ message: "Internal Server Error" });
              }
            }
          );
        } else {
          console.log("LOGIN FAILED " + err);
          res.json({ message: "already exists" });
        }
      }
      );

    }
  })




});


//-------------------------------------SIGN IN TO THE Flight Reservation --------------------------------------

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  const queryOne = "SELECT * FROM passenger_details WHERE email=?";
  mysqlConnection.query(queryOne, [email], (err, data) => {
    if (!err) {
      if (data.length > 0) {
        // Compare the password using bcrypt
        bcrypt.compare(password , data[0].password, (err, response) => {
          if (err) {
            console.log("Password compare error: " + err);
            res.json({ Status: "UnSuccess", Message: "Password compare error" });
          } 
          else if (response == true) {
            const queryMobile = `
              SELECT t3.mobile_no
              FROM passenger_details t1
              JOIN passenger t2 ON t1.email = t2.email
              JOIN mobile_no t3 ON t2.passenger_id = t3.passenger_id
              WHERE t1.email = ?;
            `;

            mysqlConnection.query(queryMobile, [email], (err, dataM) => {
              if (!err) {
                const user = {
                  email: data[0].email,
                  name: data[0].first_name + " " + data[0].last_name,
                  age: data[0].age,
                  gender: data[0].gender,
                  address: data[0].address,
                  passportno: data[0].passport_no,
                  nationality: data[0].nationality,
                  mobileNo: dataM[0].mobile_no,
                };
                console.log("Successfully Login");
                res.status(200).json({ message: "Data Added", user });
              } else {
                console.log("Error executing queryMobile:", err);
                res.status(500).json({ message: "Internal Server Error" });
              }
            });
          }
          else if (response == false){
            console.log("Login Failed. Incorrect Password");
            res.status(200).json({ message: "Password Incorrect"});
          }

        });
      } 
      else {
        console.log("No matching email found");
        res.status(404).json({ message: "No matching email found" });
      }
    } 
    else {
      console.log("Error executing queryOne:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
});


// ------------------------------------------ Login to Admin --------------------------------------------

app.post("/admin", (req, res) => {
  const { email, password } = req.body;

  const queryOne = "SELECT * FROM admin WHERE admin_id=?";
  mysqlConnection.query(queryOne, [email, password], (err, data) => {
    if (!err) {
      if (data.length > 0) {
        const newEmail = data[0].admin_id; // Retrieve the email from the first row of the result
        const newPass = data[0].password; // Retrieve the email from the first row of the result
        // res.json({ message: "Data Added", email: newEmail });
        console.log("Successfully found your email address");
        // console.log(newEmail);
        if (newPass === password) {
          res.status(200).json({ message: "Data Added" });
        } else {
          res.status(401).json({ message: "Password Incorrect" });
        }
      } else {
        res.json({ message: "No matching email found" });
      }
    } else console.log("LOGIN FAILED" + err);
  });
});

// ------------------------------------------ Flight Searching --------------------------------------------

app.post("/flightresult", (req, res) => {
  const { departCity, arrCity, startDate, endDate, flightClass } = req.body;

  // const queryOne = "SELECT * FROM FLIGHT WHERE departure_city=? and arrival_city=? and DATE(depart_datetime)=?"

  const queryOne = `SELECT f.*, c.type, c.fare
  FROM flight AS f
  JOIN class AS c ON f.flight_no = c.flight_no
  WHERE f.departure_city = ?
    AND f.arrival_city = ?
    AND DATE(f.depart_datetime) between ? and ?
    AND c.type = ?;`;

  mysqlConnection.query(
    queryOne,
    [departCity, arrCity, startDate, endDate, flightClass],
    (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        console.log("Error: " + err);
      }
    }
  );
});

//  ---------------------------------------- Booking flight ---------------------------

const checkUserFlightExists = (p_id, f_no) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT * FROM checks_flight WHERE passenger_id = ? AND flight_no = ?";
    mysqlConnection.query(query, [p_id, f_no], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.length > 0); // Resolve with true if any row is returned, indicating the existence of the user-flight combination
      }
    });
  });
};

app.post("/bookingflight", (req, res) => {
  const { f_no, fare, email, fclass, account_no } = req.body;
  let ticket_no = generateTicketNo();
  let transaction_id = generateTransNo();
  const currentDate = new Date();
  const booking_datetime = currentDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  const seatno = generateSeatNumber();
  let status = "successful";
  let amount = fare;
  let p_id = "";

  const queryPid = "SELECT passenger_id from passenger where email=?;";
  mysqlConnection.query(queryPid, [email], (err, result) => {
    if (!err) {
      p_id = result[0].passenger_id;
      console.log('passenger id: '+p_id);
      console.log('flight no: '+f_no);
      console.log(fclass)

      checkUserFlightExists(p_id, f_no)
        .then((exists) => {
          if (exists) {
            console.log("User with flight exists in checkflight table");
            res.json({ message: "already booked" });
          } 
          else {
            console.log("User with flight does not exist in checkflight table");
            // Begin a MySQL transaction
            mysqlConnection.beginTransaction((err) => {
              if (err) {
                console.log(1);
                return res
                  .status(500)
                  .json({ message: "Transaction error", error: err });
              }

              // Step 1: Add p_id and f_no in the flight_check table
              const flightCheckQuery = "INSERT INTO checks_flight (passenger_id, flight_no, flight_class) VALUES (?, ?, ?)";
              mysqlConnection.query( flightCheckQuery, [p_id, f_no, fclass], (err, result) => {
                if (err) {
                  console.log('Error Found on Adding f_no & p_id in checks_flight '+err);

                  mysqlConnection.rollback(() => {
                    res.status(500).json({
                      message: "Error adding data to flight_check table",
                      error: err,
                    });
                  });
                } 
                else {
                  // Step 2: Insert ticket_no and f_no in the booked table
                  
                  const ticketQuery = "INSERT INTO ticket (ticket_no, class, seat_no) VALUES (?, ?, ?)"
                  mysqlConnection.query( ticketQuery, [ticket_no, fclass, seatno], (err, result) => {
                    if (err) {
                      console.log(3, err);

                      mysqlConnection.rollback(() => {
                        res.status(500).json({
                          message: "Error adding data to ticket table",
                          error: err,
                        });
                      });
                    } 
                    else {
                      // Step 3: Add ticket_no, seatno, and class in the ticket table

                      const bookedQuery = "INSERT INTO booked_flight (ticket_no, flight_no) VALUES (?, ?)";
                      mysqlConnection.query( bookedQuery, [ticket_no, f_no], (err, result) => {
                        if (err) {
                          console.log(4);
                          mysqlConnection.rollback(() => {
                            res.status(500).json({
                              message:
                                "Error adding data to booked table",
                              error: err,
                            });
                          });
                        } 
                        else {
                          // Step 4: Insert p_id, ticketno, and booking_datetime in the ticketbook table
                          const ticketBookQuery = "INSERT INTO ticket_booked (passenger_id, ticket_no, booking_datetime) VALUES (?, ?, ?)";
                          mysqlConnection.query( ticketBookQuery, [p_id, ticket_no, booking_datetime], (err, result) => {
                            if (err) {
                              console.log(5);
                              mysqlConnection.rollback(() => {
                                res.status(500).json({
                                  message:
                                    "Error adding data to ticketbook table",
                                  error: err,
                                });
                              });
                            } 
                            else {
                              // Step 5: Add transaction_id, status, and account_no in the payment table
                              const paymentQuery = "INSERT INTO payment (transaction_id, status, account_no) VALUES (?, ?, ?)";
                              mysqlConnection.query( paymentQuery, [transaction_id, status, account_no], (err, result) => {
                                if (err) {
                                  console.log(6+err);
                                  mysqlConnection.rollback(() => {
                                    res.status(500).json({
                                      message:
                                        "Error adding data to payment table",
                                      error: err,
                                    });
                                  });
                                } 
                                else {
                                  // Step 6: Insert ticketno, transaction_id, and amount in the receivepayment table
                                  const receivePaymentQuery = "INSERT INTO receives_payment (ticket_no, transaction_id, amount) VALUES (?, ?, ?)";
                                  mysqlConnection.query( receivePaymentQuery, [ticket_no, transaction_id, amount], (err, result) => {
                                    if (err) {
                                      console.log(7);
                                      mysqlConnection.rollback(
                                        () => {
                                          res.status(500).json({
                                            message:
                                              "Error adding data to receivepayment table",
                                            error: err,
                                          });
                                        }
                                      );
                                    } 
                                    else {
                                      // Decrease the seats available in the flight table
                                      const decreaseSeatsQuery = "UPDATE flight SET seats_left = seats_left - 1 WHERE flight_no = ?";
                                      mysqlConnection.query( decreaseSeatsQuery, [f_no], (err, result) => {
                                        if (err) {
                                          console.log(8);
                                          mysqlConnection.rollback(
                                            () => {
                                              res
                                                .status(500)
                                                .json({
                                                  message:
                                                    "Error decreasing seats in the flight table",
                                                  error: err,
                                                });
                                            }
                                          );
                                        } 
                                        else {
                                          // Commit the MySQL transaction
                                          mysqlConnection.commit(
                                            (err) => {
                                              if (err) {
                                                console.log(9);
                                                mysqlConnection.rollback(() => {
                                                  res
                                                    .status(500)
                                                    .json({message:"Transaction commit error", error: err});
                                                  }
                                                );
                                              } 
                                              else {
                                                console.log("final");
                                                res.json({message:"Flight booked successfully"});
                                              }
                                            }
                                          );
                                        }
                                      });
                                    }
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            });
          }
        })
        .catch((error) => {
          console.error("Error checking user flight:", error);
        });
    } else {
      console.log("fds");
    }
  });
});


//  ------------------------------------- get user all booked flights -----------------------------------------


app.post("/myflights", (req, res)=>{
  const {email} = req.body;
  // console.log(email)

  const query = 'SELECT * FROM passengers_all_flights WHERE email=?;'
  mysqlConnection.query(query, [email], (err, data)=>{
    if (!err) {
      res.send(data);
      // console.log(data)
    } else {
      console.log("Error: " + err);
    }
  })
})


// --------------------------------- cancel flight ----------------------------------

app.post('/cancelflight', (req, res)=>{
  const {p_id, f_no, t_no} = req.body
  console.log(p_id, f_no, t_no)



  mysqlConnection.beginTransaction((err) => {
    if (err) {
      console.log(1);
      return res
        .status(500)
        .json({ message: "Transaction error", error: err });
    }

    // Step 1: Add p_id and f_no in the flight_check table
    const booked_flightDelete =
      "DELETE FROM booked_flight where ticket_no=? and flight_no=?";
    mysqlConnection.query(
      booked_flightDelete,
      [t_no, f_no],
      (err, result) => {
        if (err) {
          console.log(2);

          mysqlConnection.rollback(() => {
            res.status(500).json({
              message: "Error deleting data from booked_flight table",
              error: err,
            });
          });
        } else {
          // Step 2: Insert ticket_no and f_no in the booked table

          const checkflightDelete =
            "DELETE FROM checks_flight WHERE passenger_id=? and flight_no = ?";
          mysqlConnection.query(
            checkflightDelete,
            [p_id, f_no],
            (err, result) => {
              if (err) {
                console.log(3, err);

                mysqlConnection.rollback(() => {
                  res.status(500).json({
                    message: "Error deleting data from checks flight table",
                    error: err,
                  });
                });
              } else {
                // Step 3: Add ticket_no, seatno, and class in the ticket table
                const ticket_bookedDelete =
                  "DELETE FROM ticket_booked WHERE passenger_id=? and ticket_no = ?";
                mysqlConnection.query(
                  ticket_bookedDelete,
                  [p_id, t_no],
                  (err, result) => {
                    if (err) {
                      console.log(4);
                      mysqlConnection.rollback(() => {
                        res.status(500).json({
                          message:
                            "Error deleting data from ticketbooked table",
                          error: err,
                        });
                      });
                    } else {
                            // Step 5: Add transaction_id, status, and account_no in the payment table
                            const updateStatus =
                              "update payment set status='refund' where transaction_id = (select transaction_id from receives_payment where ticket_no =?);";
                            mysqlConnection.query(
                              updateStatus,
                              [t_no],
                              (err, result) => {
                                if (err) {
                                  console.log(6);
                                  mysqlConnection.rollback(() => {
                                    res.status(500).json({
                                      message:
                                        "Error updating data to payment table",
                                      error: err,
                                    });
                                  });
                                } else {
                                  // Step 6: Insert ticketno, transaction_id, and amount in the receivepayment table
                                  const receivePaymentQuery =
                                    "UPDATE flight SET seats_left = seats_left + 1 WHERE flight_no = ?";
                                  mysqlConnection.query(
                                    receivePaymentQuery,
                                    [f_no],
                                    (err, result) => {
                                      if (err) {
                                        console.log(7);
                                        mysqlConnection.rollback(
                                          () => {
                                            res.status(500).json({
                                              message:
                                                "Error adding data to receivepayment table",
                                              error: err,
                                            });
                                          }
                                        );
                                      } else {
                                        // Decrease the seats available in the flight table
                                        const decreaseSeatsQuery =
                                          "DELETE FROM receives_payment where ticket_no=?";
                                        mysqlConnection.query(
                                          decreaseSeatsQuery,
                                          [t_no],
                                          (err, result) => {
                                            if (err) {
                                              console.log(8);
                                              mysqlConnection.rollback(
                                                () => {
                                                  res
                                                    .status(500)
                                                    .json({
                                                      message:
                                                        "Error decreasing seats in the flight table",
                                                      error: err,
                                                    });
                                                }
                                              );
                                            } else {
                                              // Commit the MySQL transaction
                                              mysqlConnection.commit(
                                                (err) => {
                                                  if (err) {
                                                    console.log(9);
                                                    mysqlConnection.rollback(
                                                      () => {
                                                        res
                                                          .status(500)
                                                          .json({
                                                            message:
                                                              "Transaction commit error",
                                                            error:
                                                              err,
                                                          });
                                                      }
                                                    );
                                                  } else {
                                                    console.log(
                                                      "final"
                                                    );
                                                    res.json({
                                                      message:
                                                        "Flight cancel successfully",
                                                    });
                                                  }
                                                }
                                              );
                                            }
                                          }
                                        );
                                      }
                                    }
                                  );
                                }
                              }
                            );
                      //     }
                      //   }
                      // );
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  });


})


//-------------------------Initializing Flight Counter when the program starts--------------------------------------

let flightCounter = 0

function initializeflightCounter() {
  mysqlConnection.query('SELECT MAX(flight_no) AS maxId FROM flight', (error, results) => {
    if (error) {
      console.error('Error retrieving flight counter:', error);
    } 
    else {
      const maxId = results[0].maxId;
      if (maxId) {
        flightCounter = parseInt(maxId.split('-')[1], 10); // Extract the counter value from the maxId
      }
      console.log('Flight counter initialized:', flightCounter);
    }
  });
}

function generateflightno() {
  flightCounter += 1; // Increment passenger counter
  return 'SAF-' + flightCounter;
}


const dateFormat = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const day = String(newDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// ----------------------------------------Adding a New Flight--------------------------------------------------------

app.post("/addflight", (req, res)=>{
  let {departureCity, depart_date, arrivalCity, arr_date, arr_time, depart_time, economyfare, firstclassfare, businessfare, adminID} = req.body
  let flight_no = generateflightno()
  console.log(adminID)

  let depart_datetime = depart_date + ' ' + depart_time;
  let arr_datetime = arr_date + ' ' + arr_time;
  let seats_available = 220;
  let seats_left = 220;
  let cities = ['karachi', 'lahore', 'islamabad']
  let dtax = Math.floor(Math.random() * 11) + 10;
  let itax = Math.floor(Math.random() * 11) + 30;

  let dom = false
  if (cities.includes(departureCity) && cities.includes(arrivalCity)){
    dom = true
  } else {
    dom = false
  }

  const queryOne = 'INSERT INTO flight (flight_no, departure_city, arrival_city, depart_datetime, arr_datetime, seats_available , seats_left) VALUES(?, ?, ?, ?, ?, ?, ?)'

  const queryD = 'insert into domestic (flight_no, local_gov_tax) values (?,?);'
  const queryI = 'insert into international (flight_no, int_custom_duty) values (?,?);'


  mysqlConnection.query(queryOne, [flight_no, departureCity, arrivalCity, depart_datetime, arr_datetime, seats_available, seats_left], (err, data)=>{
    if(!err){
      const queryTwo = "INSERT INTO class (flight_no, type, total_seats, luggage_capacity, fare) VALUES (?, ?, ?, ?, ?)"
      mysqlConnection.query(queryTwo, [flight_no, 'Economy', 100, null, economyfare], (err, data)=>{

        if(!err){
          const queryThree = "INSERT INTO class (flight_no, type, total_seats, luggage_capacity, fare) VALUES (?, ?, ?, ?, ?)"
          mysqlConnection.query(queryThree, [flight_no, 'First CLass', 70, null, firstclassfare], (err, data)=>{

            if (!err){
              const queryFour = "INSERT INTO class (flight_no, type, total_seats, luggage_capacity, fare) VALUES (?, ?, ?, ?, ?)"
              mysqlConnection.query(queryFour, [flight_no, 'Business', 50, null, businessfare], (err, data)=>{
                if(!err){
                  const queryFive = "INSERT INTO manage_flights (flight_no, admin_id) VALUES (?, ?);"
                  mysqlConnection.query(queryFive, [flight_no, adminID], (err, data)=>{
                    if(!err){
                      console.log('Flight Added Successfully')
                      if (dom) {
                        mysqlConnection.query(queryD, [flight_no, dtax], (err, data)=>{
                          if (!err){
                            console.log('domestic added')
                          }
                        })
                      } else{
                        mysqlConnection.query(queryI, [flight_no, itax], (err, data)=>{
                          if (!err){
                            console.log('int added')
                          }
                        })
                      }
                      res.json({message: 'Flight Added'})
                    }
                    else{
                      console.log('Manage Flight Add Problem'+err)
                    }
                  })
                }
                else{
                  console.log('Business Class Add Problem')
                }
              })
            }
            else{
              console.log('Economy Class Add Problem')
            }

          })
        }
        else{
          console.log('First Class Add Problem')
        }
      })
    }
    else{
      console.log("Error in Adding Flight "+ err)
      res.json({message: 'Error Adding Flight'})
    }

  })

} 
)


//--------------------------------------View Flight Details---------------------------------

app.get("/view", (req, res)=>{
    const sql = `SELECT
      f.flight_no,
      f.departure_city,
      f.arrival_city,
      f.depart_datetime,
      f.arr_datetime,
      f.seats_available,
      f.seats_left,
      c1.total_seats AS economy_seats,
      c1.fare AS economy_fare,
      c2.total_seats AS first_class_seats,
      c2.fare AS first_class_fare,
      c3.total_seats AS business_seats,
      c3.fare AS business_fare
    FROM
      flight f
    JOIN
      class c1 ON f.flight_no = c1.flight_no AND c1.type = 'Economy'
    JOIN
      class c2 ON f.flight_no = c2.flight_no AND c2.type = 'First CLass'
    JOIN
      class c3 ON f.flight_no = c3.flight_no AND c3.type = 'Business';`

      mysqlConnection.query(sql, (err, data)=>{
        if (!err){
          res.send(data)
          console.log("Flight Data Received")
        }
        else
          console.log("Error Received: "+ err)
      })
  })

  //--------------------------------------Edit Flight Details---------------------------------

  app.get('/editflighttwo/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)

    const sql = `SELECT
    f.flight_no,
    f.departure_city,
    f.arrival_city,
    f.depart_datetime,
    f.arr_datetime,
    f.seats_available,
    f.seats_left,
    c1.total_seats AS economy_seats,
    c1.fare AS economy_fare,
    c2.total_seats AS first_class_seats,
    c2.fare AS first_class_fare,
    c3.total_seats AS business_seats,
    c3.fare AS business_fare
  FROM
    flight f
  JOIN
    class c1 ON f.flight_no = c1.flight_no AND c1.type = 'Economy'
  JOIN
    class c2 ON f.flight_no = c2.flight_no AND c2.type = 'First Class'
  JOIN
    class c3 ON f.flight_no = c3.flight_no AND c3.type = 'Business'  
  WHERE 
    f.flight_no="${id}";`

    mysqlConnection.query(sql, (err, data)=>{
      if (!err){
        res.send(data)
        console.log("Flight Data Received")
      }
      else
        console.log("Error Received: "+ err)
    })

  console.log("receive id")

});


app.post('/editflighttwo/:id', (req, res) => {
  const id = req.params.id;
  let {depart_date, arr_date, arr_time, depart_time, economyfare, firstclassfare, businessfare, departureDateTime, arrivalDateTime} = req.body


  if (depart_date === undefined){
    depart_date = dateFormat(departureDateTime)
    console.log('This is old Date '+depart_date)
  }
  else{
    console.log('This is New Date '+depart_date)
  }

  if (arr_date === undefined){
    arr_date = dateFormat(arrivalDateTime)
    console.log('This is old Date '+arr_date)
  }
  else{
    console.log('This is New Date '+arr_date)
  }

  let departformat = depart_date + ' ' + depart_time
  console.log(departformat)

  let arrivalformat = arr_date + ' ' + arr_time
  console.log(arrivalformat)

  const sql = `UPDATE flight SET depart_datetime = '${departformat}', arr_datetime = '${arrivalformat}' WHERE flight_no = '${id}'`;
  const sql1 = `UPDATE class SET fare = ${firstclassfare} WHERE flight_no = '${id}' AND type = 'First Class';`
  const sql2 = `UPDATE class SET fare = ${economyfare} WHERE flight_no = '${id}' AND type = 'Economy';`
  const sql3 = `UPDATE class SET fare = ${businessfare} WHERE flight_no = '${id}' AND type = 'Business Class';`

  mysqlConnection.query(sql, (err, result) => {
    if (!err){
      mysqlConnection.query(sql1, (err, result) => {
        if (!err){
          mysqlConnection.query(sql2, (err, result) => {
            if (!err){
              mysqlConnection.query(sql3, (err, result) => {
                if (!err){
                  res.json({message: 'Flight Updated'})
                  console.log("Flight Data Updated Successfully")
                }
                else{
                  res.json({message: 'Flight Updating Flight'})
                  console.log("Error in Sql3 Business: "+ err)
                }
              });
            }
            else{
              res.json({message: 'Flight Updating Flight'})
              console.log("Error in Sql2 Economy: "+ err)
            }
          });
        }
        else{
          res.json({message: 'Flight Updating Flight'})
          console.log("Error in Sql1 First Class: "+ err)
        }
      });
    }
    else{
      res.json({message: 'Flight Updating Flight'})
      console.log("Error in Sql Updating Flight: "+ err)
    }
  });
});

//----------------------------------------View the Users-------------------------------------------

app.get("/viewuser", (req, res)=>{
  const sql = `SELECT * FROM passenger_details;`

  console.log('I am here')

    mysqlConnection.query(sql, (err, user)=>{
      if (!err){
        res.send(user)
        console.log("User Data Received")
        // console.log(user)
      }
      else
        console.log("Error Received: "+ err)
    })
})

// ------------------------------


app.get('/count', (req, res)=>{
  const q = 'select count(*) as count from flight;'
  mysqlConnection.query(q, (err, result)=>{
    if (!err){
      res.send(result)
      console.log(result[0].count)
    }
    else{
      console.log('error flight count')
    }
  })
})

app.get('/countUser', (req, res)=>{
  const q = 'select count(*) as count from passenger;'
  mysqlConnection.query(q, (err, result)=>{
    if (!err){
      res.send(result)
      console.log(result[0].count)
    }
    else{
      console.log('error flight count')
    }
  })
})

app.get('/countrevenue', (req, res)=>{
  const q = 'select sum(amount) as revenue from receives_payment;'
  mysqlConnection.query(q, (err, result)=>{
    if (!err){
      res.send(result)
      console.log(result[0].revenue)
    }
    else{
      console.log('error flight count')
    }
  })
})

