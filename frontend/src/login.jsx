import { useState } from "react";
import axios from "axios";

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
    } catch (error) {
      alert(error.response?.data || "Login failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
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
        <br/>

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br/>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
