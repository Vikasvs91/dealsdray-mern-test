import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateEmployee.css'

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: '',
  });
  const navigate = useNavigate();

  const onChange = e => {
    if (e.target.name === 'course') {
      const courses = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({ ...formData, course: courses });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/employees', formData, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>Create Employee</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={onChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={onChange} required />
        </div>
        <div>
          <label>Mobile</label>
          <input type="text" name="mobile" value={formData.mobile} onChange={onChange} required />
        </div>
        <div>
          <label>Designation</label>
          <select name="designation" value={formData.designation} onChange={onChange} required>
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div>
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={onChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label class='course'>Course</label>
          <select name="course" multiple value={formData.course} onChange={onChange} required>
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
            <option value="BSC">BSC</option>
          </select>
        </div>
        <div>
          <label class='image'>Image</label>
          <input class='img' type="file" name="image" onChange={e => setFormData({ ...formData, image: e.target.files[0] })} required />
        </div>
        <button class='submit' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
