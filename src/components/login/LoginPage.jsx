import React, { useState } from 'react';
import './Loginpage.css';
import axios from 'axios';
import { FaUser, FaLock, FaIdBadge, FaBirthdayCake, FaUserTag, FaCamera } from 'react-icons/fa';
import bg1 from "../../assests/images/bgimage.png";

const PatientLoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState('Patient');
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData();

  formData.append('role', role);
  formData.append('userId', document.getElementById('patient-id').value);
  formData.append('password', document.getElementById('password').value);

  if (isRegistering) {
    formData.append('fullName', document.getElementById('full-name')?.value || '');

    if (role === 'Patient') {
      formData.append('dob', document.getElementById('dob')?.value || '');
    }

    if (role === 'Doctor') {
      if (!photo) {
        alert('Please upload a photo');
        return;
      }
      formData.append('photo', photo); // Send file as file
    }
  }

  try {
    console.log(formData);
    for (let pair of formData.entries()) {
  console.log(`${pair[0]}:`, pair[1]);
}
    const response = await axios.post('http://localhost:8080/api/user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    alert('Success: ' + (response.data.message || 'Registered/Logged in successfully!'));
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    alert('Error: ' + (error.response?.data?.message || 'Submission failed.'));
  }
};


  return (
    <div className="login-wrapper">
      <img src={bg1} className="background-image" alt="Background" />

      <div className={`form-box ${isRegistering ? 'register' : 'login'}`}>
        <form onSubmit={handleSubmit}>
          <h1>{isRegistering ? 'Register Account' : 'Login'}</h1>

          {isRegistering && (
            <div className="input-box">
              <label htmlFor="full-name">Full Name</label>
              <FaUser className="icon" />
              <input id="full-name" type="text" placeholder="Full Name" required />
            </div>
          )}

          <div className="input-box">
            <label htmlFor="patient-id">User ID</label>
            <FaIdBadge className="icon" />
            <input id="patient-id" type="text" placeholder="Enter ID" required />
          </div>

          {role === 'Patient' && (
            <div className="input-box">
              <label htmlFor="dob">Date of Birth</label>
              <FaBirthdayCake className="icon" />
              <input id="dob" type="date" required />
            </div>
          )}

          <div className="input-box">
            <label htmlFor="password">Password</label>
            <FaLock className="icon" />
            <input id="password" type="password" placeholder="Password" required />
          </div>

          <div className="input-box">
            <label htmlFor="role">Login As</label>
            <FaUserTag className="icon" />
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {isRegistering && role === 'Doctor' && (
            <div className="input-box">
              <label htmlFor="photo">Upload Photo</label>
              <FaCamera className="icon" />
              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                required
              />
            </div>
          )}

          <button type="submit">
            {isRegistering ? 'Create Account' : 'Login'}
          </button>
        </form>

        <div className="register-link">
          <p>
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
            <a onClick={() => setIsRegistering(!isRegistering)} style={{ cursor: 'pointer' }}>
              {isRegistering ? 'Login' : 'Register'}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientLoginPage;
