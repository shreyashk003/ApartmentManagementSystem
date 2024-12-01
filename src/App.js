import { useState } from "react";
import "./App.css";
import LoginPage from "./Components/LoginPage";
import Chairman from "./Components/Chairman";
import Secretary from "./Components/Secretary";
import Owner from "./Components/Owner";
import Security from "./Components/Security";
import AdminDashboard from "./Components/AdminDashboard";

function App() {
  const [loginStatus, setLoginStatus] = useState(false); // Tracks if the user is logged in
  const [userType, setUserType] = useState("");          // Tracks the type of user

  // Logout Functionality
  const handleLogout = () => {
    setLoginStatus(false);
    setUserType("");
  };

  // Render the component for the logged-in user


  return (
    <div className="App">
      
      {!loginStatus ? (
        // Render the Login Page if the user is not logged in
        <LoginPage setLoginStatus={setLoginStatus} setUserType={setUserType} />
      ) : userType==="Admin"?<AdminDashboard  />:userType==="Chairman"?<Chairman />:userType==="Secretary"?<Secretary />:userType==="Owner"?
       <Owner />:<Security />}
        </div>
    
    )
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
