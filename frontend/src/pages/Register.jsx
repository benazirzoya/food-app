import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_BASE = process.env.REACT_APP_API_URL || ('http://' + window.location.hostname + ':5000');
    await axios.post(
      API_BASE + '/api/auth/register',
      form
    );

    alert('Registration Successful');
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <h2>Register</h2>

      <input
        type='text'
        placeholder='Name'
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type='email'
        placeholder='Email'
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type='password'
        placeholder='Password'
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button>Register</button>
    </form>
  );
}

export default Register;