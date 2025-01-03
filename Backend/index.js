const express = require("express");
const bodyParser = require("body-parser");
const Razorpay = require('razorpay');
const axios =require("axios")
var unirest = require("unirest");


const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 9000;

// Middleware
app.use(cors({origin:"*"}));
app.use(bodyParser.json());

// MongoDB Connection URI
const uri = "mongodb://127.0.0.1:27017"; // Update this line
const client = new MongoClient(uri);
let db;

// Connect to MongoDB and set up the database reference
client
  .connect()
  .then(() => {
    db = client.db("ApartmentManagementSysytem"); // Corrected database name
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit the process if DB connection fails
  });

  const razorpay = new Razorpay({
    key_id: 'rzp_test_FRoCXFr2FkZqrx', // Replace with your Razorpay Key ID
    key_secret: '4FFZPHjeFmQO9IQTPc6mlDoK' // Replace with your Razorpay Key Secret
  });

  app.post('/api/create-order', async (req, res) => {
    try {
        const { amount, currency, receipt } = req.body; // Accept amount, currency, and receipt from the request
        console.log("i am here",amount,currency,receipt)

        const order = await razorpay.orders.create({
            amount: amount * 100, // Razorpay works in paise; convert to smallest currency unit
            currency,
            receipt
        });
        console.log("i am there",amount,currency,receipt)

        res.status(201).json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, error: 'Failed to create Razorpay order' });
    }
  });

  app.post('/api/updateApartmentData', async (req, res) => {
    const {
      Apartmentname,
      Address,
      AreaName,
      City,
      Buildername,
      NumberOfWings,
      SocietyName,
    } = req.body;
  
    if (!Apartmentname) {
      return res.status(400).json({ error: 'Apartmentname is required' });
    }
  
    try {
      console.log("Attempting to update apartment:", req.body); // Log request body to see what data we receive
  
      const result = await db.collection("Apartment").replaceOne(
        {}, // Match the first document in the collection (since there is only one)
        {
          Apartmentname, // New data for the document
          Address,
          AreaName,
          City,
          Buildername,
          NumberOfWings,
          SocietyName,
        }
      );
  
      console.log("Update result:", result); // Log the result from the update query
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Apartment not found" });
      }
  
      res.status(200).json({ message: "Apartment details updated successfully" });
    } catch (error) {
      console.error("Error updating apartment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
    
  

  app.post('/api/capture-payment', async (req, res) => {
    const { paymentId, amount } = req.body;
  
    try {
        // Step 1: Verify Payment Status
        const paymentDetails = await razorpay.payments.fetch(paymentId);
        if (paymentDetails.status === 'captured') {
            return res.json({
                success: false,
                message: 'Payment has already been captured.',
            });
        }
  
        // Step 2: Capture Payment
        const response = await razorpay.payments.capture(paymentId, amount);
        console.log(response)
        res.json({ success: true, response });
    } catch (error) {
        console.error('Error capturing payment:', error);
        res.status(500).json({ success: false, error: 'Failed to capture payment.' });
    }
  });

  app.get("/api/getAptname", async (req, res) => {
    try {
      const collection = db.collection("Apartment");
      const Apartment = await collection.find({}).toArray();
      return res.status(200).json(Apartment);
    } catch (error) {
      console.error("Error ", error);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
  });

  
  app.get("/api/getDues/:year", async (req, res) => {
    const year = req.params.year;  // Keep the year as a string, no need to parseInt
    console.log("Requested year:", year);  // Log the requested year
    try {
      const collection = db.collection("Owners");
  
      // Find documents where the 'Maintainance' array contains an element matching the year (as a string)
      const Dues = await collection
        .find(
          {
            "Maintainance.year": year  // Match the 'year' field as a string
          },
          {
            projection: { Afname: 1, Alname: 1, Maintainance: 1, _id: 0 }  // Return Afname, Alname, and Maintainance fields
          }
        )
        .toArray();
      
      console.log("Dues found:", Dues);  // Log the returned data to verify if the query is working
      return res.status(200).json(Dues);
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
  });
  
  app.post("/api/getmonthwiseexpenses", async (req, res) => {
    let {description,year}=req.body
    console.log(description+" "+year)
    try {
      const result = await db.collection("Expenses").aggregate([
        {
          $match: {
            description:description,
            year:year,
            date: { $exists: true, $ne: null }, // Ensure only documents with valid dates are processed
            amount: { $exists: true, $ne: null } // Ensure only valid amounts are processed
          }
        },
        {
          $addFields: {
            month: { $month: { $toDate: "$date" } },
            year: { $year: { $toDate: "$date" } }
          }
        },
        {
          $group: {
            _id: { month: "$month", year: "$year" },
            totalAmount: { $sum: { $toDouble: "$amount" } }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 }
        }
      ]).toArray();
  
      const transformedData = result.map(item => ({
        month: item._id.month,
        year: item._id.year,
        totalAmount: item.totalAmount
      }));
  
      console.log("Aggregation result", transformedData);
      //const chartData = result.map(({ _id, totalAmount }) => ({
       // month: `${_id.month}-${_id.year}`,
        //totalAmount,
      //}));
      return res.send(transformedData);
    } catch (error) {
      console.error("Error fetching month-wise expenses:", error);
      return res.status(500).json({ message: "Failed to fetch month-wise expenses" });
    }
  });       
  

// Login Endpoint
app.post("/api/login", async (req, res) => {
  const { username, password, userType } = req.body;
  console.log(username + " " + password + " " + userType);

  try {
    if (!username || !password || !userType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const collection = db.collection("Owners"); // Collection name
    const user = await collection.find({
      Login: username,
      Password: password,
      Adesignation: userType,
    }).toArray();

    if (user.length > 0) {
      return res.status(200).json({ message: "Login successful", userType: userType, user: user });
    } else {
      return res.status(401).json({ message: "Invalid credentials or role mismatch" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});


app.post('/api/getmonthwiseexpenses', async (req, res) => {
  try {
    const { description, year } = req.body;
    if (!description || !year) {
      return res.status(400).json({ error: "Description and year are required." });
    }

    const db = client.db('ApartmentManagementSystem');
    const collection = db.collection('expenses');

    const pipeline = [
      { $match: { description, year: year.toString() } },
      { $group: { _id: '$month', totalAmount: { $sum: '$amount' } } },
      { $project: { month: '$_id', totalAmount: 1, _id: 0 } },
      { $sort: { month: 1 } },
    ];

    const monthWiseData = await collection.aggregate(pipeline).toArray();

    if (monthWiseData.length === 0) {
      return res.status(404).json({ error: "No data found for the specified description and year." });
    }

    res.status(200).json(monthWiseData);
  } catch (error) {
    console.error('Error fetching month-wise expenses:', error);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
});


 



// Post Notice Endpoint
app.post("/api/postNotice", async (req, res) => {
  const { notice } = req.body;

  try {
    if (!notice) {
      return res.status(400).json({ message: "Notice is required" });
    }

    const collection = db.collection("Notices");
    await collection.insertOne({ notice, datePosted: new Date() });
    return res.status(200).json({ message: "Notice posted successfully" });
  } catch (error) {
    console.error("Error posting notice:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Insert Apartment Data
app.post("/api/insertApartmentData", async (req, res) => {
  const payload = req.body;

  try {
    const collection = db.collection("Apartment");
    await collection.insertOne(payload);
    return res.status(200).json({ message: "Apartment Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting apartment data:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Insert Flat Owner
app.post("/api/insertFlatOwner", async (req, res) => {
  const payload = req.body;
  try {
    const collection = db.collection("Owners");
    await collection.insertOne(payload);
    return res.status(200).json({ message: "Owner Inserted Successfully" });
  } catch (error) {
    console.error("Error inserting owner:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Insert Flat Details
app.post("/api/insertFlatDetails", async (req, res) => {
  const payload = req.body;
  try {
    const collection = db.collection("FlatDetails");
    await collection.insertOne(payload);
    return res.status(200).json({ message: "Flat Details Inserted Successfully" });
  } catch (error) {
    console.error("Error inserting flat details:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Add Employees
app.post("/api/Addemployees", async (req, res) => {
  const payload = req.body;
  try {
    const collection = db.collection("Employee");
    await collection.insertOne(payload);
    return res.status(200).json({ message: "Employee Added Successfully" });
  } catch (error) {
    console.error("Error adding employee:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Submit Complaint
app.post("/api/AddComplaint", async (req, res) => {
  const payload = req.body;
  try {
    const collection = db.collection("Complaints");
    const result = await collection.insertOne(payload);
    return res.status(200).json({ message: "Complaint submitted successfully!" });
  } catch (error) {
    console.error("Error inserting complaint:", error);
    return res.status(500).json({ message: "Failed to insert complaint." });
  }
});

// Get Summary of Expenses
app.get("/api/getsummaryexpenses", async (req, res) => {
  try {
    const results = await db.collection("Expenses").aggregate([
      {
        $addFields: {
          amount: { $toInt: "$amount" }, // Ensure 'amount' is cast to integer
        },
      },
      {
        $group: {
          _id: "$description",
          total: { $sum: "$amount" }, // Sum the integer values
        },
      },
    ]).toArray();

    res.json(results);
  } catch (error) {
    console.error("Error during aggregation:", error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});

// Add Expense
app.post("/api/addExpense", async (req, res) => {
  const payload = req.body;

  try {
    const expenseData = {
      ...payload,
      amount: parseInt(payload.amount, 10), // Convert `amount` to an integer
    };

    const collection = db.collection("Expenses");
    await collection.insertOne(expenseData);

    return res.status(200).json({ message: "Expense added successfully" });
  } catch (error) {
    console.error("Error adding expense:", error);
    return res.status(500).json({ message: "Failed to add expense" });
  }
});

// Send Reminder
app.post("/api/sendReminder", async (req, res) => {
  const { oid, reminder } = req.body;
  try {
    const collection = db.collection("Owners");
    const result = await collection.updateOne({ oid: oid }, { $push: { Messages: reminder } });
    return res.status(200).json({ message: "Reminder sent successfully" });
  } catch (error) {
    console.error("Error sending reminder:", error);
    return res.status(500).json({ message: "Failed to send reminder" });
  }
});

// Get Notices
app.get("/api/getNotices", async (req, res) => {
  try {
    const collection = db.collection("Notices");
    const notices = await collection.find({}).toArray();
    return res.status(200).json(notices);
  } catch (error) {
    console.error("Error fetching notices:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Get Flat Owners
app.get("/api/getinfo", async (req, res) => {
  try {
    const collection = db.collection("Apartment");
    const info = await collection.find({}).toArray();
    return res.status(200).json(info);
  } catch (error) {
    console.error("Error fetching apartment info:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Get Flat Maintenance Data
app.get("/api/getMaintainance/:oid", async (req, res) => {
  const oid = parseInt(req.params.oid);
  try {
    const collection = db.collection("Owners");
    const cursor = collection.find({ oid: oid }, { projection: { oid: 1, Maintainance: 1, _id: 0 } });

    const maintainanceArrays = [];
    await cursor.forEach(document => {
      if (document.Maintainance) {
        maintainanceArrays.push(...document.Maintainance);
      }
    });

    return res.json(maintainanceArrays);
  } catch (error) {
    console.error("Error fetching maintenance data:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});


app.post("/api/getMaintainance", async (req, res) => {
  const { oid,year, status } = req.body;  // Assuming the body contains the year and the new status

  try {
    const collection = db.collection("Owners");

    // Update the Maintainance array for the specific owner (oid) and year
    const result = await collection.updateOne(
      { oid: oid, "Maintainance.year": year }, // Find the Owner with the specified OID and year in Maintainance array
      {
        $set: {
          "Maintainance.$.status": status // Update the status of the matching Maintainance entry
        }
      }
    );

    if (result.modifiedCount > 0) {
      return res.json({ message: "Maintenance status updated successfully." });
    } else {
      return res.status(404).json({ message: "No maintenance entry found with the given year." });
    }
  } catch (error) {
    console.error("Error updating maintenance data:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

app.post('/api/send-sms', async (req, res) => {
  console.log("Route Hit: /api/send-sms");

  // Example payload
  const payload = {
      sender_id: 'FSTSMS',
      message: 'HelloWorld',
      language: 'english',
      route: 'p',
      numbers: '7795386209',
  };
  const payload1={

    "route" : "otp",
    "sender_id" : "FSTSMS",
    "message" : "helloworld",
    "variables_values" : "9999",
    "flash" : 1,
    "numbers" : "9480275919",
    }
    var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

req.headers({
  "authorization": "GKmTeVaYZtMUaNJzVOvq4ESeceloEPpane7ftmnQD1RNaT67sGl1V1OrBgNI"
});

/*req.form({
  "variables_values": "5599",
  "route": "otp",
  "numbers": "9480275919",
});*/
req.form({
  "message": "Amar Elite - Successfully implemented Software : GrihMitra",
  "language": "english",
  "route": "q",
  "numbers": "7795386209",
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});

  /*try {
     console.log('Sending Request to Fast2SMS with Payload:', payload1);
      const response = await axios.post(
          'https://www.fast2sms.com/dev/bulkV2',
          payload,
          {
              headers: {

                "authorization":"IfWlpl7Mi8RA0ARZF7c64TgirXxeFX1CZWeahp7J5Ot4dQbHLuNSphWhMrJH",
                "Content-Type":"application/json"
                }
          }
      );
      console.log('SMS Sent Successfully:', response.data);
      res.status(200).send(response.data);
  } catch (error) {
      console.error('Error Occurred:', error.message);
      if (error.response) {
          console.error('Response Data:', error.response.data);
      }
      res.status(error.response?.status || 500).send(error.response?.data || error.message);
  }*/
});

app.post('/api/visitor-count', async (req, res) => {
  try {
    const { year, month } = req.body;
console.log(year)
    // Ensure the month is zero-padded
    const formattedMonth = month.padStart(2, '0');
    const visitors = await db.collection('visitors').aggregate([
      {
        $match: {
          vdate: { $regex: `^${year}-${formattedMonth}` }, // Match YYYY-MM
        },
      },
      {
        $group: {
          _id: { $substr: ['$vdate', 0, 10] }, // Extract the date (YYYY-MM-DD)
          visitorCount: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date
      },
    ]).toArray();

    // Format the response
    const response = visitors.map(item => ({
      date: item._id,
      count: item.visitorCount,
    }));

    res.status(200).json({ success: true, data: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.post('/api/sendMessage',async(req,res)=>{
  const payload=req.body
  console.log(payload.message)
  let message1=payload.message
  var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

req.headers({
  "authorization": "GKmTeVaYZtMUaNJzVOvq4ESeceloEPpane7ftmnQD1RNaT67sGl1V1OrBgNI"
});
  req.form({
    "message": message1,
    "language": "english",
    "route": "q",
    "numbers": "9480275919",
  });
  
  req.end(function (res) {
    if (res.error) throw new Error(res.error);
  
    console.log(res.body);
  });
})

app.post('/api/addemployee',async(req,res)=>{
  const payload=req.body
  console.log(payload)
  try {
    const result=await db.collection('Employee').insertOne(payload)
  res.send("added employee!!!")
  } catch (error) {
    console.log(error)
  }
})

app.post('/api/adddescription',async(req,res)=>{
  const payload=req.body
  console.log(payload)
  try {
    const result=await db.collection('ExpensesDescription').insertOne(payload)
  res.send("added employee!!!")
  } catch (error) {
    console.log(error)
  }
})

app.get('/api/getallemployees', async (req, res) => {
  try {
    const employees = await db.collection('Employee').find().toArray();  // Fetch all employees from MongoDB
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee data', error });
  }
});

app.post('/api/generatesalarydetails', async (req, res) => {
  const {payload,empid}=req.body
  console.log(payload)
  try {
    const result = await db.collection('Employee').updateOne({empid:empid},{$push:{empsalarydet:payload}}); 
  //  res.send("Employee salary Added sucess") // Insert the new employee document
    res.status(201).json({ message: 'Employee added successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error saving employee data', error });
  }
});

app.get("/api/getDescription" ,async (req,res)=>{
  try {
    const expenses = await db.collection('ExpensesDescription').find().toArray();  // Fetch all employees from MongoDB
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
})

app.get('/api/getallvisitors', async (req, res) => {
  try {
    const visitors = await db.collection('visitors').find().toArray();  // Fetch all employees from MongoDB
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching visitors data', error });
  }
});

app.post('/api/addvisitors',async(req,res)=>{
  const payload=req.body
  console.log(payload)
  try {
    const result=await db.collection('visitors').insertOne(payload)
  res.send("added visitor!!!")
  } catch (error) {
    console.log(error)
  }
})

app.post("/api/Raisedemand", async (req, res) => {
  const { description, year, duedate, amount } = req.body;
  const Owner=db.collection("Owners")
  try {
    // Check for duplicate year in the `maintenance` field for any owner
    const duplicateCheck = await Owner.findOne({
      "maintenance.year": year,
    });

    if (duplicateCheck) {
      return res
        .status(400)
        .json({ message: "Duplicate year detected in Maintenance field." });
    }
    const newMaintenance = { description, year, duedate, amount };
    const result = await Owner.updateMany(
      {}, // Empty filter to target all documents
      { $push: { Maintainance: newMaintenance } }
    );

    res.status(200).json({
      message: "Demands submitted successfully.",
      updatedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});




// Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
