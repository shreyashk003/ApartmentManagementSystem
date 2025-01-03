import React, { useRef } from 'react';
import axios from 'axios';
import { FaPhone, FaVenusMars, FaIdBadge, FaUser, FaAddressCard, FaRupeeSign } from 'react-icons/fa';

const Addemployee = () => {
  const empcellnoRef = useRef();
  const empgenderRef = useRef();
  const empidRef = useRef();
  const empnameRef = useRef();
  const empaadhaarnoRef = useRef();
  const empaddressRef = useRef();
  const empsalarydetRef = useRef();

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    const payload = {
      empcellno: empcellnoRef.current.value,
      empgender: empgenderRef.current.value,
      empid: empidRef.current.value,
      empname: empnameRef.current.value,
      empaadhaarno: empaadhaarnoRef.current.value,
      empaddress: empaddressRef.current.value,
      empsalarydet: empsalarydetRef.current.value.split(',').map((item) => item.trim()), 
    };

    try {
      const response = await axios.post('/api/employees', payload);
      alert('Employee added successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Failed to add employee. Please try again.');
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: '0 auto', 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#2c2c2c', 
      borderRadius: '15px', 
      color: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      transition: 'transform 0.2s',
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#ffc107', 
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', 
        marginBottom: '20px',
        fontSize: '1.8rem',
      }}>Add Employee</h2>
      
      <form onSubmit={handleAddEmployee} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <label style={labelStyle}>
          <FaPhone color="#ffc107" />
          <input type="text" ref={empcellnoRef} placeholder="Cell Number" required style={inputStyle} />
        </label>
        <label style={labelStyle}>
          <FaVenusMars color="#ffc107" />
          <select ref={empgenderRef} defaultValue="M" style={selectStyle}>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </label>
        <label style={labelStyle}>
          <FaIdBadge color="#ffc107" />
          <input type="text" ref={empidRef} placeholder="Employee ID" required style={inputStyle} />
        </label>
        <label style={labelStyle}>
          <FaUser color="#ffc107" />
          <input type="text" ref={empnameRef} placeholder="Name" required style={inputStyle} />
        </label>
        <label style={labelStyle}>
          <FaIdBadge color="#ffc107" />
          <input type="text" ref={empaadhaarnoRef} placeholder="Aadhaar Number" required style={inputStyle} />
        </label>
        <label style={labelStyle}>
          <FaAddressCard color="#ffc107" />
          <input type="text" ref={empaddressRef} placeholder="Address" required style={inputStyle} />
        </label>
        <label style={labelStyle}>
          <FaRupeeSign color="#ffc107" />
          <input type="text" ref={empsalarydetRef} placeholder="Salary Details (comma-separated)" style={inputStyle} />
        </label>

        <button type="submit" style={buttonStyle} onMouseOver={(e) => e.target.style.backgroundColor = '#e0a800'} onMouseOut={(e) => e.target.style.backgroundColor = '#ffc107'}>
          Add Employee
        </button>
      </form>
    </div>
  );
};

// Styles
const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '1rem',
  color: '#f9f9f9',
};

const inputStyle = {
  flex: 1,
  padding: '12px',
  border: '1px solid #555',
  borderRadius: '8px',
  backgroundColor: '#404040',
  color: '#f9f9f9',
  fontSize: '1rem',
};

const selectStyle = {
  ...inputStyle,
  appearance: 'none', 
  cursor: 'pointer',
};

const buttonStyle = {
  padding: '12px 25px', 
  backgroundColor: '#ffc107', 
  color: '#2c2c2c', 
  border: 'none', 
  borderRadius: '8px', 
  cursor: 'pointer', 
  fontWeight: 'bold',
  fontSize: '1rem',
  transition: 'background-color 0.3s ease, transform 0.2s',
  textTransform: 'uppercase',
  marginTop: '20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
};

export default Addemployee;
