const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 9000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection URI
const uri = "mongodb://localhost:27017"; // Update if needed
const client = new MongoClient(uri);
let db;

// Connect to MongoDB and set up the database reference
client
  .connect()
  .then(() => {
    db = client.db("ApartmentManagementSysytem"); // Your database name
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit the process if DB connection fails
  });

/** ------------------------------
 *         LOGIN ENDPOINT
 * ----------------------------- */
app.post("/api/login", async (req, res) => {
  const { username, password, userType } = req.body;
console.log(username+" "+password+" "+userType)

  try {
    if (!username || !password || !userType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const collection = db.collection("Owners"); // Collection name
    const user = await collection.find({ Login: username, Password: password, Adesignation: userType }).toArray();
  console.log(user)
    if (user.length > 0) {
      return res.status(200).json({ message: "Login successful", userType });
    } else {
      return res.status(401).json({ message: "Invalid credentials or role mismatch" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

/** ------------------------------
 *       POST NOTICE ENDPOINT
 * ----------------------------- */
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

app.post("/api/insertFlatOwner",async(req,res)=>{
  const payload=req.body
try{
  const collection = db.collection("Owners");
    await collection.insertOne(payload);
    return res.status(200).json({ message: "Owner Inserted Successfully" });
  } catch (error) {
    console.error("Error inserting owner:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
})

app.post("/api/insertFlatDetails",async(req,res)=>{
  const payload=req.body
try{
  const collection = db.collection("FlatDetails");
    await collection.insertOne(payload);
    return res.status(200).json({ message: "Flat Details Inserted Successfully" });
  } catch (error) {
    console.error("Error inserting Flat Details:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
})

app.post("/api/Addemployees",async(req,res)=>{
  const payload=req.body
try{
  const collection = db.collection("Employee");
    await collection.insertOne(payload);
    return res.status(200).json({ message: "Flat Details Inserted Successfully" });
  } catch (error) {
    console.error("Error inserting Flat Details:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
})


app.put("/api/updateFlatOwner", async (req, res) => {
  const { id, newOwner } = req.body;

  try {
    const Owner=db.collection("Owners")
    const updatedFlat = await Owner.updateOne(
      { oid :id}, // Find the flat by its ID
      { $set:{oname: newOwner} }, // Update the owner field
     // Return the updated document
    );

    if (!updatedFlat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    res.status(200).json({ message: "Flat owner updated successfully", updatedFlat });
  } catch (error) {
    console.error("Error updating flat owner:", error);
    res.status(500).json({ message: "Failed to update flat owner" });
  }
});


/** ------------------------------
 *         ADD EXPENSE ENDPOINT
 * ----------------------------- */
app.post("/api/addExpense", async (req, res) => {
  const payload = req.body;
  console.log("description:",req.body);

  try {
   
    const collection = db.collection("Expenses");
    const result = await collection.insertOne(payload);
    return res.status(200).json({ message: "Expense added successfully"});
  } catch (error) {
    console.error("Error adding expense:", error);
    return res.status(500).json({ message: "Failed to add expense" });
  }
});

/** ------------------------------
 *         SEND REMINDER ENDPOINT
 * ----------------------------- */
app.post("/api/sendReminder", async (req, res) => {
  const {oid,reminder} = req.body;
  console.log(oid+" "+reminder)
  try {
    const collection = db.collection("Owners");
    const result = await collection.updateOne({oid:oid},{$push:{Messages:reminder}});
    console.log("Message inserted:", result); // Log the result
    return res.status(200).json({ message: "Reminder sent successfully" });
  } catch (error) {
    console.error("Error sending reminder:", error); // Log any error
    return res.status(500).json({ message: "Failed to send reminder" });
  }
});

app.post("/api/makeSalaryPayment", async (req, res) => {
  const {payload,empId} = req.body;
console.log(payload)
console.log("hello")
console.log(empId)
  try {
    const collection = db.collection("Employee");
    const result = await collection.updateOne({empid:empId},{$push:{empsalarydet:payload}});
    return res.status(200).json({ message: "Salary payment made successfully" ,result});
  } catch (error) {
    console.error("Error making salary payment:", error);
    return res.status(500).json({ message: "Failed to make salary payment" });
  }
});




/** ------------------------------
 *      POST MESSAGE ENDPOINT
 * ----------------------------- */
app.post("/api/postMessage", async (req, res) => {
  const { message } = req.body;

  try {
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const collection = db.collection("Messages");
    await collection.insertOne({ message, datePosted: new Date() });
    return res.status(200).json({ message: "Message posted successfully" });
  } catch (error) {
    console.error("Error posting message:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

/** ------------------------------
 *         FETCH NOTICES
 * ----------------------------- */
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

/** ------------------------------
 *         FETCH MESSAGES
 * ----------------------------- */
app.get("/api/getMessages", async (req, res) => {
  try {
    const collection = db.collection("Messages");
    const messages = await collection.find({}).toArray();
    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

/** ------------------------------
 *         ADD FLAT OWNER
 * ----------------------------- */
app.post("/api/addFlatOwner", async (req, res) => {
  const { name, flatNumber, contact } = req.body;

  try {
    if (!name || !flatNumber || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const collection = db.collection("FlatOwners");
    const result = await collection.insertOne({ name, flatNumber, contact });
    return res.status(200).json({ message: "Flat owner added successfully", id: result.insertedId });
  } catch (error) {
    console.error("Error adding flat owner:", error);
    return res.status(500).json({ message: "Failed to add flat owner" });
  }
});

/** ------------------------------
 *         ADD FLAT DETAILS
 * ----------------------------- */
app.post("/api/addFlatDetails", async (req, res) => {
  const { flatNumber, area, ownerId, status } = req.body;

  try {
    if (!flatNumber || !area || !ownerId || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const collection = db.collection("Flats");
    const result = await collection.insertOne({ flatNumber, area, ownerId, status });
    return res.status(200).json({ message: "Flat details added successfully", id: result.insertedId });
  } catch (error) {
    console.error("Error adding flat details:", error);
    return res.status(500).json({ message: "Failed to add flat details" });
  }
});

/** ------------------------------
 *         UPDATE FLAT OWNER DETAILS
 * ----------------------------- */
app.put("/api/updateFlatOwner/:flatNumber", async (req, res) => {
  const flatNumber = req.params.flatNumber;
  const { name, contact } = req.body;

  try {
    if (!name || !contact) {
      return res.status(400).json({ message: "Name and contact are required" });
    }

    const collection = db.collection("FlatOwners");
    const result = await collection.updateOne(
      { flatNumber },
      { $set: { name, contact } }
    );

    if (result.matchedCount > 0) {
      return res.status(200).json({ message: "Flat owner updated successfully" });
    } else {
      return res.status(404).json({ message: "Flat not found" });
    }
  } catch (error) {
    console.error("Error updating flat owner:", error);
    return res.status(500).json({ message: "Failed to update flat owner" });
  }
});

/** ------------------------------
 *         GET FLAT DETAILS
 * ----------------------------- */
app.get("/api/getFlats", async (req, res) => {
  try {
    const collection = db.collection("Flats");
    const flats = await collection.find({}).toArray();
    return res.status(200).json(flats);
  } catch (error) {
    console.error("Error fetching flat details:", error);
    return res.status(500).json({ message: "Failed to fetch flat details" });
  }
});

/** ------------------------------
 *         GET EXPENSES
 * ----------------------------- */
app.get("/api/getExpenses", async (req, res) => {
  try {
    const collection = db.collection("Expenses");
    const expenses = await collection.find({}).toArray();
    return res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return res.status(500).json({ message: "Failed to fetch expenses" });
  }
});

/** ------------------------------
 *         ADD EXPENSE
 * ----------------------------- */
app.post("/api/addExpense", async (req, res) => {
  const { description, amount, date } = req.body;

  try {
    if (!description || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const collection = db.collection("Expenses");
    const result = await collection.insertOne({ description, amount, date });
    return res.status(200).json({ message: "Expense added successfully", id: result.insertedId });
  } catch (error) {
    console.error("Error adding expense:", error);
    return res.status(500).json({ message: "Failed to add expense" });
  }
});

/** ------------------------------
 *         START THE SERVER
 * ----------------------------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
