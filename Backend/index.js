const express = require("express");
const bodyParser = require("body-parser");
const Razorpay = require('razorpay');

const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 9000;

// Middleware
app.use(cors());
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



// Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
