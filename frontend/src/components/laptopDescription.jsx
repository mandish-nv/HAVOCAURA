import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DisplayLaptop() {
  const { id } = useParams();
  console.log("Laptop ID:", id); // Debugging line
  const [laptop, setLaptop] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchlaptopInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/retrieveById/${id}`);
        setLaptop(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchlaptopInfo();
  }, [id]);

  // Handle loading and error states
  if (loading) {
    return <p>Loading laptop details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="part-detail-container">
      <img src={laptop.image || "default-laptop.jpg"} alt={laptop.name} />
      <p><strong>brand:</strong> {laptop.brand}</p>
      <p><strong>model:</strong> {laptop.model}</p>
      <p><strong>processor:</strong> {laptop.processor}</p>
      <p><strong>ram:</strong> {laptop.ram}</p>
      <p><strong>storage:</strong> {laptop.storage}</p>
      <p><strong>graphicsCard:</strong> {laptop.graphicsCard}</p>
      <p><strong>screenSize:</strong> {laptop.screenSize}</p>
      <p><strong>operatingSystem:</strong> {laptop.operatingSystem}</p>
      <p><strong>price:</strong> {laptop.price}</p>
      <p><strong>description:</strong> {laptop.description}</p>
    </div>
  );
}
