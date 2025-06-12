import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';

import Banner from './components/Banner/Banner';
import Doctors from './components/doctors/Doctors';
import Facilities from './components/facilities/Facilities';
import Footer from './components/footer/Footer';
import Nvbar from './components/navbar/Navbar';
import Services from './components/services/Services';
import Testimonials from './components/testimonials/Testimonials';
import DoctorList from './componentsss/DoctorList';
import AppointmentBooking from './componentsss/AppointmentBooking';
import MedicineAvailability from './componentsss/MedicineAvailability';
import Vaccine from "./pages/Vaccine";
import Clinic from "./pages/Clinic";
import SelfCare from "./pages/SelfCare";
import Laboratory from "./pages/Laboratory";
import Checkup from "./pages/Checkup";
import Symptoms from "./pages/Symptoms";
import PetHealth from "./pages/PetHealth";
import Treatment from "./pages/Treatment";
import About from "./pages/About";
import InsuranceClaim from "./pages/InsuranceClaim";
import LoginPage from './components/login/LoginPage';
import { useState } from "react";


function App() {
  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      <Router>
        <Nvbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Services />
                <Doctors />
                <Facilities />
                <Testimonials />
                <Footer />
              </>
            }
          />
          <Route path="*" element={<div>Page not found. Try going <a href='/'>home</a>.</div>} />

          <Route path="/doctor-list" element={<DoctorList />} />
          <Route path="/appointment-booking" element={<AppointmentBooking />} />
          <Route path="/medicine-availability" element={<MedicineAvailability />} />
          <Route path="/vaccine" element={<Vaccine />} />
          <Route path="/clinic" element={<Clinic />} />
          <Route path="/selfcare" element={<SelfCare />} />
          <Route path="/laboratory" element={<Laboratory />} />
          <Route path="/checkup" element={<Checkup />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/pethealth" element={<PetHealth />} />
          <Route path="/treatment" element={<Treatment />} />
          <Route path="/insurance-claim" element={<InsuranceClaim />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path="/about" element={<About />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

