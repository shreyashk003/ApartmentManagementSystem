import React, { useRef } from 'react'
import axios from 'axios';

function Testsms(){
    const message1=useRef("")
const sendSMS = async (phone, message1) => {
    /*try {
        const response = await axios.post(
            'http://localhost:9000/api/send-sms',
            {
                sender_id: 'FSTSMS',
                message: message1,
                language: 'english',
                route: 'p',
                numbers: phone,
            },
            {
                headers: {
                    authorization: 'Zkhw8gsrCNtYMUe9GbD47mpLoK6zFvTIl3R2XjSuEdny0BP1HfIDz1nEwZc6tfLrbv8aGpPNFA4HYJCQ', // Replace with your Fast2SMS API key
                },
            }
        );
        console.log('SMS Sent:', response.data);
    } catch (error) {
        // Catch and log errors
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error('Error Response:', error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error('No Response:', error.request);
        } else {
            // Something else went wrong
            console.error('Error Message:', error.message);
        }
    }*/
}

const sendmes=()=>{
    const message=message1.current.value

    const payload={
        message:message
    }
    axios.post("http://localhost:9000/api/sendMessage",payload)
    .then(response=>{
        alert("Message sent")
    })
    .catch(err=>{
        console.log(err)
    })





}
  return (
    <div>Testsms
    <div><input type='text' placeholder='Enter Message' ref={message1}></input>
        <button onClick={()=>sendmes('7795386209', 'Hello! This is a test message.')
}>Send</button></div>
    </div>
    
  )};


export default Testsms