import React, { useState } from "react";
import axios from "axios";

const LoginPage = ({ setLoginStatus, setUserType }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userType: "Admin", // Default user type
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for button

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading indicator
    setMessage(""); // Clear previous message

    try {
      // Make API request to login
      const response = await axios.post("http://localhost:9000/api/login", formData);

      if (response.status === 200) {
        // Handle successful login
        setMessage(response.data.message);
        setUserType(response.data.userType); // Set userType from server response
        setLoginStatus(true); // Set login status to true
      } else {
        // Handle unexpected responses
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      // Handle errors
      setMessage(
        error.response?.data?.message || "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  // In-line CSS styles
  const styles = {
    body: {
      backgroundColor: "#121212",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      margin: 0,
      padding: 0,
      color: "#fff",
    },
    loginContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#1e1e1e",
      padding: "20px",
    },
    loginHeader: {
      fontSize: "2.5rem",
      color: "#f4b400",
      marginBottom: "30px",
      textAlign: "center",
    },
    loginForm: {
      backgroundColor: "#2c2c2c",
      padding: "40px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      fontSize: "1.1rem",
      color: "#f4f4f4",
      display: "block",
      marginBottom: "5px",
    },
    input: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#333",
      color: "#f4f4f4",
      border: "1px solid #444",
      borderRadius: "5px",
      fontSize: "1rem",
      outline: "none",
    },
    inputFocus: {
      borderColor: "#f4b400",
      boxShadow: "0 0 5px rgba(244, 180, 0, 0.8)",
    },
    button: {
      padding: "12px 20px",
      backgroundColor: "#f4b400",
      color: "#121212",
      border: "none",
      borderRadius: "5px",
      fontSize: "1.1rem",
      cursor: "pointer",
      width: "100%",
      marginTop: "20px",
    },
    buttonDisabled: {
      backgroundColor: "#888",
      cursor: "not-allowed",
    },
    message: {
      marginTop: "20px",
      fontSize: "1.1rem",
    },
    success: {
      color: "#4caf50",
    },
    error: {
      color: "#f44336",
    },
  };

  return (
    <div style={styles.loginContainer}>
      <h2 style={styles.loginHeader}>Welcome to Apartment Management System</h2>
      <form style={styles.loginForm} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="username">
            Username:
          </label>
          <input
            style={styles.input}
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            style={styles.input}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="userType">
            User Type:
          </label>
          <select
            style={styles.input}
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
          >
            <option value="Admin">Admin</option>
            <option value="Chairman">Chairman</option>
            <option value="Secretary">Secretary</option>
            <option value="Owner">Owner</option>
          </select>
        </div>
        <button
          style={{ ...styles.button, ...(isLoading ? styles.buttonDisabled : {}) }}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {message && (
          <p
            style={{
              ...styles.message,
              ...(message.includes("failed") ? styles.error : styles.success),
            }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
