import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Maintainance({ oid }) {
  const [maintainance, setMaintainance] = useState([]);
  const [amount, setAmount] = useState(100);
  const [currency, setCurrency] = useState('INR');
  const [receipt, setReceipt] = useState('');
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');

  const payNow = async (M) => {
    try {
      const response = await axios.post('http://localhost:9000/api/create-order', {
        amount: parseFloat(amount),
        currency,
        receipt,
      });

      if (response.data.success) {
        setOrderId(response.data.orderId);
        launchRazorpay(response.data.orderId, response.data.amount);
      } else {
        setMessage('Failed to create order.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setMessage('An error occurred while creating the order.');
    }

    axios.post(`http://localhost:9000/api/getMaintainance`,{oid:oid,year:M.year,status:"Updated"})
    .then(response=>{
      alert("Updated")
    })
    .catch(err=>{
      console.log(err)
    })
  };

  const launchRazorpay = (orderId, amount) => {
    if (typeof window.Razorpay === 'undefined') {
      console.error('Razorpay SDK not loaded');
      setMessage('Razorpay SDK not loaded.');
      return;
    }

    const options = {
      key: 'rzp_test_FRoCXFr2FkZqrx', // Replace with your Razorpay API Key
      amount: amount,
      currency: currency,
      name: 'jFork Technology Services',
      description: 'Training and Project Guidance Services',
      order_id: orderId,
      handler: async (response) => {
        try {
          const captureResponse = await axios.post('http://localhost:9000/api/capture-payment', {
            paymentId: response.razorpay_payment_id,
            amount: parseFloat(amount),
          });

          if (captureResponse.data.success) {
            setMessage('Payment captured successfully.');
          } else {
            setMessage('Failed to capture payment.');
          }
        } catch (error) {
          console.error('Error capturing payment:', error);
          setMessage('An error occurred while capturing the payment.');
        }
      },
      prefill: {
        name: 'Sunil Rodd',
        email: 'sfroddjforkts@gmail.com',
        contact: '9480275919',
      },
      theme: {
        color: '#2d89ef',
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();

    

  };

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/getMaintainance/${oid}`)
      .then((response) => {
        setMaintainance(response.data);
      })
      .catch((err) => {
        console.error('Error fetching maintenance data:', err);
      });
  }, [oid , maintainance]);

  return (
    <div className="p-4 bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-lg font-bold mb-4 text-center text-yellow-400">Maintenance Payment Information</h1>

        {/* Maintenance Table */}
        {maintainance.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-700 text-sm">
              <thead>
                <tr className="bg-gray-700 text-yellow-300">
                  <th className="border border-gray-600 p-2 text-left">Year</th>
                  <th className="border border-gray-600 p-2 text-left">Description</th>
                  <th className="border border-gray-600 p-2 text-left">Amount (₹)</th>
                  <th className="border border-gray-600 p-2 text-left">Due Date</th>
                  <th className="border border-gray-600 p-2 text-left">Payment Status</th>
                  <th className="border border-gray-600 p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {maintainance.map((M, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'
                    } hover:bg-gray-600 transition-colors duration-200`}
                  >
                    <td className="border border-gray-600 p-2">{M.year}</td>
                    <td className="border border-gray-600 p-2">{M.description}</td>
                    <td className="border border-gray-600 p-2">₹{M.amount}</td>
                    <td className="border border-gray-600 p-2">{M.duedate}</td>
                    <td className="border border-gray-600 p-2">
                      {M.status === 'pending' ? (
                        <span className="text-red-500 font-semibold">Pending</span>
                      ) : (
                        <span className="text-green-400 font-semibold">Paid</span>
                      )}
                    </td>
                    <td className="border border-gray-600 p-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                        onClick={()=>payNow (M)}
                      >
                        Make Payment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-400">No maintenance records available</p>
        )}
      </div>
    </div>
  );
}

export default Maintainance;
