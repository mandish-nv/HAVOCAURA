import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DisplayPart() {
  const { id } = useParams();
  console.log("Part ID:", id); // Debugging line
  const [part, setPart] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPartInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/parts/${id}`);
        setPart(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchPartInfo();
  }, [id]);

  // Handle loading and error states
  if (loading) {
    return <p>Loading part details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="part-detail-container">
      <h2>{part.name}</h2>
      <img src={part.image || "default-part.jpg"} alt={part.name} />
      <p><strong>Category:</strong> {part.category}</p>
      <p><strong>Brand:</strong> {part.brand}</p>
      <p><strong>Model:</strong> {part.model}</p>
      <p><strong>Price:</strong> 💲{part.price}</p>
      <p><strong>Specifications:</strong> {part.specifications}</p>
      <p><strong>Description:</strong> {part.description}</p>
    </div>
  );
}
