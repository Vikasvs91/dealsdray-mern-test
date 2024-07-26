import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { username, password } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div class='form'>
      <h2 class='log'>Login</h2>
      <form class="form1" action='/dashboard' onSubmit={onSubmit}>
        <div class="username">
          <label class="use">Username</label>
          <input class="box" type="text" name="username" value={username} onChange={onChange} required />
        </div>
        <div class="password">
          <label class="use">Password</label>
          <input class="box" type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button class="login" type="submit" action='/dashboard' >Login</button>
      </form>
    </div>
  );
};

export default Login;
