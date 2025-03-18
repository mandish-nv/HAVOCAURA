import { useState, useEffect } from "react";
import LandingDiv from "./landingDiv";
import Navbar from "./navbar";
import './styles/laptop.css'
import axios from "axios";
import { Link } from "react-router-dom";


export default function LandingPage() {
    const [laptops, setLaptops] = useState([]);

    useEffect(() => {
        const fetchLaptops = async () => {
            const response = await axios.get("http://localhost:5000/landing-laptops");
            setLaptops(response.data);
        };

        fetchLaptops();
    }, []);
    return (
        <>
            <Navbar />
            <LandingDiv />
            <h1 style={{ padding: '2rem' }}>Popular Right Now</h1>
            <div className="laptop-container">
                {laptops.map((laptop, index) => (
                    <div className="laptop-card" key={index}>
                        <div className="laptop-image-container">
                            <img src={laptop.image || "default-laptop.jpg"} className="laptop-image" alt={laptop.model} />
                        </div>
                        <div className="laptop-details">
                            <p className="laptop-model"><Link to={`/laptopdescription/${laptop._id}`} className="link">{laptop.model}</Link></p>
                            <p className="laptop-price">Rs. {laptop.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}