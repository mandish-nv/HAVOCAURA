import { useState } from "react";
import axios from "axios";
import "./styles/Login.css"; 
import { Link } from "react-router-dom";


export default function LoginForm() {
  const [formData, setFormData] = useState({
    identifier: "", // Can be email or username
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      alert(response.data); // Login success message
      const res=await axios.post("http://localhost:5000/findUser",formData)
      sessionStorage.setItem('user',JSON.stringify(res.data))
    } catch (error) {
      alert(error.response?.data || "Login failed");
    }
  };

  return (
    <div className="login-container">
  
      <video autoPlay muted loop className="background-video">
        <source src="/assets/bg.mp4" type="video/mp4" />
      </video>

      
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Sign in to access the best deals on laptops & PC parts</p>

        <form onSubmit={handleSubmit}>
          <label>Email or Username:</label>
          <input
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            placeholder="Enter email or username"
            required
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="register-link">Don't Have An Account? <Link to={'/register'}>Register</Link></p>
      </div>
    </div>
  );
}
