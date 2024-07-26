import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the employees!', error);
      });
  }, []);

  const deleteEmployee = (id) => {
    axios.delete(`/api/employees/${id}`)
      .then(response => {
        setEmployees(employees.filter(employee => employee.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the employee!', error);
      });
  };

  return (
    <div className="dashboard">
      <h1>Employee Dashboard</h1>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            {employee.name} <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
