import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function Employee() {
    const [employees, setEmployee] = useState([]);
    const month = useRef("");
    const year = useRef("");
    const amount = useRef("");
    const sstatus = useRef("");
    const saldate = useRef("");

    useEffect(() => {
        axios.get("http://localhost:9000/api/getallemployees")
            .then(response => {
                setEmployee(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [employees]);

    const makesalary = (empid) => {
        let month1 = month.current.value;
        let year1 = year.current.value;
        let amount1 = amount.current.value;
        let sstatus1 = sstatus.current.value;
        let saldate1 = saldate.current.value;

        if (month1 === "" || year1 === "" || amount1 === "" || sstatus1 === "" || saldate1 === "")
            alert("All fields are compulsory");
        else {
            const payload = {
                month: month1,
                year: year1,
                amount: amount1,
                sstatus: sstatus1,
                saldate: saldate1
            };
            axios.post("http://localhost:9000/api/generatesalarydetails", { payload, empid })
                .then(response => {
                    alert("Changes added successfully!!");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="p-6 w-full">
            <div className="flex flex-col xl:flex-row gap-6">
                {/* Employee List Section */}
                <div className="flex-grow">
                    <div className="bg-[#112240] rounded-xl shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-[#1e3a8a]">
                            <h2 className="text-2xl font-bold text-yellow-400">
                                Employee Details
                            </h2>
                        </div>
                        
                        <div className="p-6">
                            <div className="bg-[#1e3a8a] rounded-lg px-4 py-3 mb-4">
                                <ul className="flex items-center text-sm font-medium text-gray-100">
                                    <li className="w-20">ID</li>
                                    <li className="w-36">NAME</li>
                                    <li className="w-24">GENDER</li>
                                    <li className="w-32">CELL</li>
                                    <li className="w-36">AADHAR</li>
                                    <li className="w-32">ADDRESS</li>
                                    <li className="w-32 text-center">ACTIONS</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                {employees.map((employee) => (
                                    <div key={employee.empid} className="bg-[#172a45] rounded-lg overflow-hidden">
                                        <div className="px-4 py-3 border-b border-[#1e3a8a]">
                                            <ul className="flex items-center text-sm">
                                                <li className="w-20 text-blue-300">{employee.empid}</li>
                                                <li className="w-36 text-blue-300">{employee.empname}</li>
                                                <li className="w-24 text-blue-300">{employee.empgender}</li>
                                                <li className="w-32 text-blue-300">{employee.empcellno}</li>
                                                <li className="w-36 text-blue-300">{employee.empaadhaarno}</li>
                                                <li className="w-32 text-blue-300">{employee.empaddress}</li>
                                                <li className="w-32 text-center">
                                                    <button
                                                        onClick={() => makesalary(employee.empid)}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm transition-colors duration-200"
                                                    >
                                                        Make Salary
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="p-4">
                                            <div className="bg-[#1e3a8a] rounded-lg px-4 py-2 mb-3">
                                                <ul className="flex items-center text-sm font-medium text-gray-100">
                                                    <li className="w-28">MONTH</li>
                                                    <li className="w-28">YEAR</li>
                                                    <li className="w-28">STATUS</li>
                                                    <li className="w-32">DATE</li>
                                                    <li className="flex-1">AMOUNT</li>
                                                </ul>
                                            </div>

                                            <div className="space-y-2">
                                                {employee.empsalarydet.map((salary) => (
                                                    <ul
                                                        key={salary.month + salary.year}
                                                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#1e3a8a]/20 rounded-lg transition-colors duration-200"
                                                    >
                                                        <li className="w-28">{salary.month}</li>
                                                        <li className="w-28">{salary.year}</li>
                                                        <li className="w-28">{salary.sstatus}</li>
                                                        <li className="w-32">{salary.saldate}</li>
                                                        <li className="flex-1">{salary.amount}</li>
                                                    </ul>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Salary Form Section */}
                <div className="xl:w-96">
                    <div className="bg-[#112240] rounded-xl shadow-xl">
                        <div className="p-6 border-b border-[#1e3a8a]">
                            <h2 className="text-2xl font-bold text-yellow-400">
                                Salary Details
                            </h2>
                        </div>
                        
                        <div className="p-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">Month</label>
                                    <select
                                        ref={month}
                                        className="w-full bg-[#172a45] text-gray-100 p-3 rounded-lg border border-[#1e3a8a] focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
                                    >
                                        <option value="">Select month</option>
                                        {["January", "February", "March", "April", "May", "June", "July", 
                                          "August", "September", "October", "November", "December"].map(m => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">Year</label>
                                    <select
                                        ref={year}
                                        className="w-full bg-[#172a45] text-gray-100 p-3 rounded-lg border border-[#1e3a8a] focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
                                    >
                                        <option value="">Select year</option>
                                        {[2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027].map(y => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">Amount</label>
                                    <input
                                        type="text"
                                        ref={amount}
                                        placeholder="Enter amount"
                                        className="w-full bg-[#172a45] text-gray-100 p-3 rounded-lg border border-[#1e3a8a] focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">Status</label>
                                    <select
                                        ref={sstatus}
                                        className="w-full bg-[#172a45] text-gray-100 p-3 rounded-lg border border-[#1e3a8a] focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
                                    >
                                        <option value="">Select status</option>
                                        <option>Pending</option>
                                        <option>Approved</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">Date</label>
                                    <input
                                        type="date"
                                        ref={saldate}
                                        className="w-full bg-[#172a45] text-gray-100 p-3 rounded-lg border border-[#1e3a8a] focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Employee;