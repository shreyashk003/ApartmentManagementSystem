import React, { useEffect, useState } from 'react';
import { Clock, LogOut, UserPlus, Users, Search } from 'lucide-react';
import axios from 'axios';

function Visitors({ setLoginStatus }) {
    const [visitors, setVisitors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        vname: "",
        vcellno: "",
        flatno: "",
        vdate: "",
        vpurpose: "",
        intime: "",
        outtime: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchVisitors();
    }, []);

    const fetchVisitors = () => {
        axios.get("http://localhost:9000/api/getallvisitors")
            .then(response => {
                setVisitors(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addvisitor = () => {
        setIsLoading(true);
        axios.post("http://localhost:9000/api/addvisitors", formData)
            .then(response => {
                alert("Visitor added successfully!");
                setFormData({
                    vname: "",
                    vcellno: "",
                    flatno: "",
                    vdate: "",
                    vpurpose: "",
                    intime: "",
                    outtime: ""
                });
                fetchVisitors();
            })
            .catch(error => {
                console.log(error);
                alert("Error adding visitor. Please try again.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const filteredVisitors = visitors.filter(visitor =>
        visitor.vname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.flatno.includes(searchTerm) ||
        visitor.vpurpose.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <Users className="h-8 w-8 text-blue-600" />
                            <h1 className="text-2xl font-bold text-gray-900">Security Dashboard</h1>
                        </div>
                        <button 
                            onClick={() => setLoginStatus(false)}
                            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Visitor Form Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex items-center space-x-2 mb-6">
                                <UserPlus className="h-6 w-6 text-blue-600" />
                                <h2 className="text-xl font-semibold text-gray-900">New Visitor</h2>
                            </div>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="vname"
                                    value={formData.vname}
                                    onChange={handleInputChange}
                                    placeholder="Visitor's Name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <input
                                    type="text"
                                    name="flatno"
                                    value={formData.flatno}
                                    onChange={handleInputChange}
                                    placeholder="Flat Number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <input
                                    type="tel"
                                    name="vcellno"
                                    value={formData.vcellno}
                                    onChange={handleInputChange}
                                    placeholder="Contact Number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Visit Date</label>
                                    <input
                                        type="date"
                                        name="vdate"
                                        value={formData.vdate}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="time"
                                        name="intime"
                                        value={formData.intime}
                                        onChange={handleInputChange}
                                        placeholder="In Time"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <input
                                        type="time"
                                        name="outtime"
                                        value={formData.outtime}
                                        onChange={handleInputChange}
                                        placeholder="Out Time"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <textarea
                                    name="vpurpose"
                                    value={formData.vpurpose}
                                    onChange={handleInputChange}
                                    placeholder="Purpose of Visit"
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                    onClick={addvisitor}
                                    disabled={isLoading}
                                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400"
                                >
                                    {isLoading ? "Adding..." : "Add Visitor"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Visitors List Card */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                                <div className="flex items-center space-x-2">
                                    <Users className="h-6 w-6 text-blue-600" />
                                    <h2 className="text-xl font-semibold text-gray-900">Visitors Log</h2>
                                </div>
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search visitors..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flat</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredVisitors.map((visitor, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{visitor.vname}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.vcellno}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.flatno}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.vpurpose}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {visitor.intime} - {visitor.outtime}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.vdate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Visitors;