import { createContext, useState, useEffect } from 'react';
import { getUser, saveUser, deleteUser } from './LocalStorageUser';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const validateUser = async () => {
    const storedUser = getUser();

    if (!storedUser || !storedUser.password || !storedUser.role) {
      deleteUser();
      return;
    }

    let endpoint = '';
    let payload = {};

    switch (storedUser.role) {
      case 'PATIENT':
        endpoint = 'http://localhost:8080/api/patient/login';
        payload = {
          phone: storedUser.phone,
          password: storedUser.password,
        };
        break;
      case 'DOCTOR':
        endpoint = 'http://localhost:8080/api/doctor/login';
        payload = {
          doctorId: storedUser.doctorId,
          password: storedUser.password,
        };
        break;
      case 'ADMIN':
        endpoint = 'http://localhost:8080/api/admin/login';
        payload = {
          adminId: storedUser.adminId || storedUser.doctorId,
          password: storedUser.password,
        };
        break;
      default:
        deleteUser();
        return;
    }

    try {
      const response = await axios.post(endpoint, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      saveUser(response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Auto-login failed:', error.response?.data?.message || error.message);
      deleteUser();
      setUser(null);
    }
  };

  useEffect(() => {
    validateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
