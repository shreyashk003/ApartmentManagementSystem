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
      empsalarydet: empsalarydetRef.current.value.split(',').map((item) => item.trim()), // Assuming salary details are entered as comma-separated values
    };

    
    axios.post("http://localhost:9000/api/addemployee",payload)
    .then(response=>{
        alert("Employee Added")
    })
    .catch(err=>{
        console.log(err)
    })
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#1e1e1e', borderRadius: '10px', color: '#fff' }}>
      <h2 style={{ textAlign: 'center', color: '#ffcc00' }}>Add Employee</h2>
      <form onSubmit={handleAddEmployee} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
          <FaPhone color="#ffcc00" />
          <input type="text" ref={empcellnoRef} placeholder="Cell Number" required style={{ flex: 1, padding: '10px', border: '1px solid #555', borderRadius: '5px', backgroundColor: '#333', color: '#fff' }} />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
          <FaVenusMars color="#ffcc00" />
          <select ref={empgenderRef} defaultValue="M" style={{ flex: 1, padding: '10px', border: '1px solid #555', borderRadius: '5px', backgroundColor: '#333', color: '#fff' }}>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
          <FaIdBadge color="#ffcc00" />
          <input type="text" ref={empidRef} placeholder="Employee ID" required style={{ flex: 1, padding: '10px', border: '1px solid #555', borderRadius: '5px', backgroundColor: '#333', color: '#fff' }} />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
          <FaUser color="#ffcc00" />
          <input type="text" ref={empnameRef} placeholder="Name" required style={{ flex: 1, padding: '10px', border: '1px solid #555', borderRadius: '5px', backgroundColor: '#333', color: '#fff' }} />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
          <FaIdBadge color="#ffcc00" />
          <input type="text" ref={empaadhaarnoRef} placeholder="Aadhaar Number" required style={{ flex: 1, padding: '10px', border: '1px solid #555', borderRadius: '5px', backgroundColor: '#333', color: '#fff' }} />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
          <FaAddressCard color="#ffcc00" />
          <input type="text" ref={empaddressRef} placeholder="Address" required style={{ flex: 1, padding: '10px', border: '1px solid #555', borderRadius: '5px', backgroundColor: '#333', color: '#fff' }} />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
          <FaRupeeSign color="#ffcc00" />
          <input type="text" ref={empsalarydetRef} placeholder="Salary Details (comma-separated)" style={{ flex: 1, padding: '10px', border: '1px solid #555', borderRadius: '5px', backgroundColor: '#333', color: '#fff' }} />
        </label>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#ffcc00', color: '#1e1e1e', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default Addemployee;
