import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");

  useEffect(() => {
    const apiUrl = "https://5ea5ca472d86f00016b4626d.mockapi.io/brotherhood";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filterEmployees = () => {
    return employees
      .filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((employee) =>
        selectedBranch === "All" ? true : employee.branch === selectedBranch
      );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  return (
    <div className="employee-list-container">
      <h1>Employee List</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={selectedBranch} onChange={handleBranchChange}>
          <option value="All">All Branches</option>
          <option value="Branch A">Branch A</option>
          <option value="Branch B">Branch B</option>
          <option value="Branch C">Branch C</option>
        </select>
      </div>
      <ul className="employee-list">
        {filterEmployees().map((employee) => (
          <li key={employee.id} className="employee-item">
            <strong>{employee.name}</strong> - {employee.branch}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
