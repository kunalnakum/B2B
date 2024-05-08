// ProductDetail.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import API_URL from "../constants";
import './ProductDetail.css'

function ProductDetail() {

    const [product, setProduct] = useState();
    const [user, setUser] = useState();
    const { productId } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/get-product/${productId}`);
                if (response.data.product) {
                    setProduct(response.data.product);
                }
            } catch (error) {
                alert('Server Error.');
            }
        };

        fetchProduct();
    }, [productId]);

    const handleContact = (addedBy) => {
        const url = `${API_URL}/get-user/${addedBy}`;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch((err) => {
                alert('Server Err.');
            });
    };

    return (
        <>
            <Header />
            <div className="product-detail-container">
                <h2>PRODUCT DETAILS</h2>
                {product && (
                    <div className="product-images-container">
                        <img src={`${API_URL}/${product.pimage}`} alt="Product Image 1" />
                        {product.pimage2 && <img src={`${API_URL}/${product.pimage2}`} alt="Product Image 2" />}
                    </div>
                )}
                {product && (
                    <div className="product-details">
                        <h6>Product Details:</h6>
                        <p>{product.pdesc}</p>
                        <div className="product-info">
                            <h3 className="product-price">Rs. {product.price} /-</h3>
                            <p>{product.pname} | {product.category}</p>
                            <p className="text-success">{product.pdesc}</p>
                            {product.addedBy && (
                                <button className="contact-button" onClick={() => handleContact(product.addedBy)}>
                                    SHOW CONTACT DETAILS
                                </button>
                            )}
                            {user && (
                                <div className="contact-details">
                                    {user.username && <h4>{user.username}</h4>}
                                    {user.mobile && <h3>{user.mobile}</h3>}
                                    {user.email && <h6>{user.email}</h6>}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductDetail;
