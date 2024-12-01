import axios from "axios";
import React, { useRef, useState, useEffect } from "react";

function Chairman() {
  const noticeRef = useRef("");
  const messageRef = useRef("");
  const [notices, setNotices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [Fixdepo,setFixdepo]=useState();
  const [Maintainance,setMaintainance]=useState([]);

  // Fetch notices and messages on component mount and at intervals
  useEffect(() => {
    fetchNotices();
    fetchMessages();
    const interval = setInterval(() => {
      fetchNotices();
      fetchMessages();
    }, 10000); // Fetch data every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Fetch notices from the server
  const fetchNotices = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/getNotices");
      setNotices(response.data);
    } catch (err) {
      setError("Failed to fetch notices");
      console.error(err);
    }
  };

  // Fetch messages from the server
  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/getMessages");
      setMessages(response.data);
    } catch (err) {
      setError("Failed to fetch messages");
      console.error(err);
    }
  };

  // Post a new notice
  const postNotice = async () => {
    const notice = noticeRef.current.value.trim();
    if (!notice) {
      alert("Please enter a notice!");
      return;
    }
    try {
      await axios.post("http://localhost:9000/api/postNotice", { notice });
      alert("Notice posted successfully!");
      noticeRef.current.value = "";
      fetchNotices();
    } catch (err) {
      alert("Failed to post notice");
      console.error(err);
    }
  };

  // Post a new message
  const postMessage = async () => {
    const message = messageRef.current.value.trim();
    if (!message) {
      alert("Please enter a message!");
      return;
    }
    try {
      await axios.post("http://localhost:9000/api/postMessage", { message });
      alert("Message posted successfully!");
      messageRef.current.value = "";
      fetchMessages();
    } catch (err) {
      alert("Failed to post message");
      console.error(err);
    }
  };

  // Delete a specific notice
  const deleteNotice = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/deleteNotice/${id}`);
      alert("Notice deleted successfully!");
      fetchNotices();
    } catch (err) {
      alert("Failed to delete notice");
      console.error(err);
    }
  };

  // Delete a specific message
  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/deleteMessage/${id}`);
      alert("Message deleted successfully!");
      fetchMessages();
    } catch (err) {
      alert("Failed to delete message");
      console.error(err);
    }
  };

  // Filter notices/messages based on search query
  const filteredNotices = notices.filter((notice) =>
    (notice?.notice || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMessages = messages.filter((message) =>
    (message?.message || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Chairman Dashboard</h1>
      {error && <p style={styles.error}>{error}</p>}

      {/* Input for posting notices */}
      <div style={styles.inputGroup}>
        <input
          style={styles.input}
          type="text"
          ref={noticeRef}
          placeholder="Enter Notice"
          maxLength="200"
          onInput={(e) =>
            (e.target.nextSibling.textContent = `${e.target.value.length}/200`)
          }
        />
        <span style={styles.charCount}>0/200</span>
        <button style={styles.button} onClick={postNotice}>
          Post Notice
        </button>
      </div>

      {/* Input for posting messages */}
      <div style={styles.inputGroup}>
        <input
          style={styles.input}
          type="text"
          ref={messageRef}
          placeholder="Enter Message"
          maxLength="200"
          onInput={(e) =>
            (e.target.nextSibling.textContent = `${e.target.value.length}/200`)
          }
        />
        <span style={styles.charCount}>0/200</span>
        <button style={styles.button} onClick={postMessage}>
          Post Message
        </button>
      </div>

      {/* Search bar */}
      <div style={styles.inputGroup}>
        <input
          style={styles.input}
          type="text"
          placeholder="Search notices or messages"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Display Notices */}
      <h2 style={styles.subHeader}>Notices</h2>
      <div style={styles.list}>
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <div key={notice._id} style={styles.listItem}>
              <p>{notice.notice}</p>
              <span style={styles.date}>
                ({new Date(notice.datePosted).toLocaleString()})
              </span>
              <button
                style={styles.deleteButton}
                onClick={() => deleteNotice(notice._id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p style={styles.noData}>No notices available.</p>
        )}
      </div>

      {/* Display Messages */}
      <h2 style={styles.subHeader}>Messages</h2>
      <div style={styles.list}>
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <div key={message._id} style={styles.listItem}>
              <p>{message.message}</p>
              <span style={styles.date}>
                ({new Date(message.datePosted).toLocaleString()})
              </span>
              <button
                style={styles.deleteButton}
                onClick={() => deleteMessage(message._id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p style={styles.noData}>No messages available.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  header: {
    color: "#333",
    marginBottom: "20px",
  },
  inputGroup: {
    margin: "20px 0",
  },
  input: {
    padding: "10px",
    width: "60%",
    marginRight: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  charCount: {
    fontSize: "12px",
    color: "#888",
    marginLeft: "10px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    marginLeft: "10px",
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  subHeader: {
    marginTop: "30px",
    color: "#555",
  },
  list: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  listItem: {
    marginBottom: "10px",
    padding: "10px",
    borderBottom: "1px solid #eee",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    fontSize: "12px",
    color: "#888",
  },
  noData: {
    color: "#999",
    fontStyle: "italic",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "20px",
  },
};

export default Chairman;
