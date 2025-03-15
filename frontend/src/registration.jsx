import { useState } from "react";
import axios from "axios";

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
      alert(response.data); // Success message
      setFormData({ fullName: "", userName: "", gender: "", dob: "", email: "", password: "", rePassword: "", profilePicture: "" });
    } catch (error) {
      alert(error.response?.data || "Registration failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        <br/>

        <label>Username:</label>
        <input type="text" name="userName" value={formData.userName} onChange={handleChange} required />
        <br/>

        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <br/>

        <label>Date of Birth:</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <br/>

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <br/>

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        <br/>

        <label>Re-enter Password:</label>
        <input type="password" name="rePassword" value={formData.rePassword} onChange={handleChange} required />
        <br/>

        <label>Profile Picture URL (optional):</label>
        <input type="file" name="profilePicture" value={formData.profilePicture} onChange={handleChange} />
        <br/>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
