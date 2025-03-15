import axios from "axios";

export default function LogoutButton() {
  const handleLogout = async () => {
    await axios.get("http://localhost:5000/logout");
    alert("Logged out successfully!");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
