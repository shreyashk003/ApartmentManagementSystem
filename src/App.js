import { useState } from "react";
import "./App.css";
import LoginPage from "./Components/LoginPage";
import Chairman from "./Components/Chairman";
import Secretary from "./Components/Secretary";
import Owner from "./Components/Owner";
import Security from "./Components/Security";
import AdminDashboard from "./Components/AdminDashboard";
import Home from "./Components/Home";
import VisitorsInfo from "./Components/VisitorsInfo";

function App() {
  const [loginStatus, setLoginStatus] = useState(false); // Tracks if the user is logged in
  const [userType, setUserType] = useState("");          // Tracks the type of user
  const [firstTime, setFirstTime] = useState(true);
  const [oid, setOid] = useState(0);
  const [username, setUsername] = useState("");          // Dynamically stores the exact username

  // Logout Functionality
  const handleLogout = () => {
    setLoginStatus(false);
    setUserType("");
    setUsername(""); // Clear the username on logout
  };

  return (
    <div className="App">
      {!loginStatus ? (
        // Render the Login Page if the user is not logged in
        <Home
          setOid={setOid}
          firstTime={firstTime}
          setFirstTime={setFirstTime}
          setLoginStatus={setLoginStatus}
          setUserType={setUserType}
          setUsername={setUsername} // Pass setUsername to Home
        />
      ) : userType === "Admin" ? (
        <AdminDashboard />
      ) : userType === "Chairman" ? (
        <Chairman />
      ) : userType === "Secretary" ? (
        <Secretary />
      ) : userType === "Owner" ? (
        <div>
  {/* Header Section */}
  <header className="bg-white shadow-md p-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-gray-800">
      Welcome, <span className="text-blue-500">{username || "Owner"}!</span>
    </h1>
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition duration-200"
      onClick={handleLogout}
    >
      Logout
    </button>
  </header>

  <Owner oid={oid} username={username}  />
</div>

      ) : (
        <Security />
      )}
    </div>
  );
}

// Inline styles for the Logout button and header
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f4f4f4",
    borderBottom: "1px solid #ddd",
  },
  logoutButton: {
    padding: "10px 15px",
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;
