import React, { useState } from 'react';
import './Loginpage.css';
import axios from 'axios';
import {
  FaUser,
  FaLock,
  FaIdBadge,
  FaBirthdayCake,
  FaUserTag,
  FaCamera,
  FaPhone,
  FaBriefcase,
  FaCheck,
} from 'react-icons/fa';
import bg1 from '../../assests/images/bgimage.png';
import { useNavigate } from 'react-router';
import { saveUser } from '../../hooks/LocalStorageUser';


const departments = [
  "Cardiologist",
  "Pediatrician",
  "Dentist",
  "Neurologist",
  "Gynaecologist"
]

const PatientLoginPage = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState('Patient');

  const [formData, setFormData] = useState({
    name: '',
    password: '',
    phone: '',
    dob: '',
    doctorId: '',
    specialization: '',
    availability: false,
    experience: '', // new field
  });

  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let endpoint = '';
      let payload = null;
      let headers = { 'Content-Type': 'application/json' };

      if (!isRegistering) {
        // LOGIN flow
        if (role === 'Patient') {
          endpoint = 'http://localhost:8080/api/patient/login';
          payload = {
            phone: formData.phone,
            password: formData.password,
          };
        } else if (role === 'Doctor') {
          endpoint = 'http://localhost:8080/api/doctor/login';
          payload = {
            doctorId: formData.doctorId,
            password: formData.password,
          };
        } else if (role === 'Admin') {
          endpoint = 'http://localhost:8080/api/admin/login';
          payload = {
            adminId: formData.doctorId,
            password: formData.password,
          };
        }

        const res = await axios.post(endpoint, payload, { headers });
        saveUser(res.data);
        navigate("/");
      } else {
        // REGISTER flow
        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('password', formData.password);
        submitData.append('phone', formData.phone);
        submitData.append('role', role.toUpperCase());

        let res = null;

        if (role === 'Patient') {
          endpoint = 'http://localhost:8080/api/patient';
          submitData.append('dob', formData.dob);
          res = await axios.post(endpoint, submitData, {
            headers: { 'Content-Type': 'application/json' }
          });
        } else if (role === 'Doctor') {
          if (!formData.doctorId || !formData.specialization || !photo) {
            return alert('Doctor ID, specialization, photo, and experience are required.');
          }

          endpoint = 'http://localhost:8080/api/doctor';

          try {
            // Upload image first
            const imageFormData = new FormData();
            imageFormData.append('file', photo);

            const uploadRes = await axios.post(
              'http://localhost:8080/api/doctor/file/upload',
              imageFormData,
              {
                headers: { 'Content-Type': 'multipart/form-data' },
              }
            );

            const pictureUrl = uploadRes.data;
            if (!pictureUrl) throw new Error('Image upload failed');

            // Append doctor details
            submitData.append('doctorId', formData.doctorId);
            submitData.append('specialization', formData.specialization);
            submitData.append('availability', formData.availability);
            submitData.append('experience', Number(formData.experience)); // Send as Number
            submitData.append('picture', pictureUrl);

            res = await axios.post(endpoint, submitData, {
              headers: { 'Content-Type': 'application/json' }
            });
          } catch (err) {
            console.error('Error uploading doctor details:', err);
            alert('Doctor registration failed.');
            return;
          }
        } else if (role === 'Admin') {
          endpoint = 'http://localhost:8080/api/admin';
          submitData.append('adminId', formData.doctorId);
          res = await axios.post(endpoint, submitData, {
            headers: { 'Content-Type': 'application/json' }
          });
        }

        saveUser(res.data);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Submission failed.');
    }
  };

  return (
    <div className="login-wrapper">
      <img src={bg1} className="background-image" alt="Background" />
      <div className={`form-box ${isRegistering ? 'register' : 'login'}`}>
        <form onSubmit={handleSubmit}>
          <h1>{isRegistering ? 'Register Account' : 'Login'}</h1>

          {isRegistering && (
            <>
              <div className="input-box">
                <label htmlFor="name">Full Name</label>
                <FaUser className="icon" />
                <input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-box">
                <label htmlFor="phone">Phone</label>
                <FaPhone className="icon" />
                <input
                  id="phone"
                  type="text"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {(role === 'Doctor' || role === 'Admin') && (
            <div className="input-box">
              <label htmlFor="doctorId">{role} ID</label>
              <FaIdBadge className="icon" />
              <input
                id="doctorId"
                type="text"
                placeholder={`Enter ${role} ID`}
                value={formData.doctorId}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {(!isRegistering && role === 'Patient') && (
            <div className="input-box">
              <label htmlFor="phone">Phone Number</label>
              <FaPhone className="icon" />
              <input
                id="phone"
                type="text"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {isRegistering && role === 'Patient' && (
            <div className="input-box">
              <label htmlFor="dob">Date of Birth</label>
              <FaBirthdayCake className="icon" />
              <input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="input-box">
            <label htmlFor="password">Password</label>
            <FaLock className="icon" />
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label htmlFor="role">Login As</label>
            <FaUserTag className="icon" />
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {isRegistering && role === 'Doctor' && (
            <>
              <div className="input-box">
                <label htmlFor="specialization">Specialization</label>
                <FaBriefcase className="icon" />
                <select
                  value={formData.specialization}
                  onChange={handleChange}
                  id='specialization'
                  className="w-full mb-6 p-2 border rounded"
                  required
                >
                  <option value="">Select Specialization</option>
                  {departments.map((item) => (
                    <option value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-box">
                <label htmlFor="experience">Experience (years)</label>
                <FaCheck className="icon" />
                <input
                  id="experience"
                  type="number"
                  placeholder="Experience in years"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>

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
            </>
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
