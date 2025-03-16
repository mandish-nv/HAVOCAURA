import { useState } from "react";
import axios from "axios";
import "./styles/Registration.css";
import { Link } from "react-router-dom";


export default function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    gender: "",
    dob: "",
    email: "",
    password: "",
    rePassword: "",
    profilePicture: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.rePassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", formData);
      alert(response.data); 
      setFormData({ fullName: "", userName: "", gender: "", dob: "", email: "", password: "", rePassword: "", profilePicture: "" });
    } catch (error) {
      alert(error.response?.data || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      
      <video autoPlay muted loop className="background-video">
        <source src="/assets/bg.mp4" type="video/mp4" />
      </video>

   
      <div className="register-card">
        <h2>Join Us</h2>
        <p>Create your account to access exclusive deals</p>

        <form onSubmit={handleSubmit}>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

          <label>Username:</label>
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} required />

          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label>Date of Birth:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <label>Re-enter Password:</label>
          <input type="password" name="rePassword" value={formData.rePassword} onChange={handleChange} required />

          <label>Profile Picture (optional):</label>
          <input type="file" name="profilePicture" onChange={handleChange} />

          <button type="submit">Register</button>
          <p className="register-link">Already have an account? <Link to={'/login'}>Log In</Link></p>
        </form>
      </div>
    </div>
  );
}
