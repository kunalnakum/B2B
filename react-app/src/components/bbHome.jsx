import { useEffect, useState } from "react";
// import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
// import Categories from "./Categories";
// import { FaHeart } from "react-icons/fa";
import './bbHome.css';
import API_URL from "../constants";
import BbHeader from "./bbHeader";

function Home() {
  let data = { userId: localStorage.getItem("userId") };
  const [products, setProducts] = useState([]);
  const url = API_URL + "/bulk-Buying";
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setProducts(response.data.products);
      } catch (err) {
        alert("Server Err.");
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []); // Only fetch data once
  


  return (
    <div className="home-container">
      <BbHeader />
      <div className="product-cards-container">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="card-header">
              <h3>{product.requestedProductName}</h3>
              <p>Requested on: {product.lastRequestDate}</p>
            </div>
            <div className="card-body">
              <div className="price-info">
                <span>Expected Price:</span>
                <span>
                  {product.expectedPricePerUnit} {product.currency}
                </span>
              </div>
              {/* Add more fields as needed */}
            </div>
            <div className="card-footer">
              <Link to={`/bulk-Buying/${product._id}`}>Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
