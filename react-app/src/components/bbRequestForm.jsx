import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './bbForm.css'; // Import your custom CSS file
import BbHeader from './bbHeader'
import axios from "axios";
import API_URL from "../constants";



function BBProductRequestForm() {
  const navigate = useNavigate()
  let user = { userId: localStorage.getItem('userId') }
  const [formData, setFormData] = useState({
    requestedProductName: '',
    expectedPricePerUnit: 0,
    totalUnitsRequested: 0,
    additionalDescription: '',
    lastRequestDate: '',
    currency: 'USD',
    unit: 'kg',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      requestedProductName,
      expectedPricePerUnit,
      totalUnitsRequested,
      additionalDescription,
      lastRequestDate,
      currency,
      unit,
    } = formData;
    
  // console.log('hello: ',formData)

    try {
    //   // Send data to backend API using Axios
    const url = API_URL + '/bulk-Buying/request';
    console.log(url)
    const response = await axios.post(url, {
      requestedProductName,
      expectedPricePerUnit,
      totalUnitsRequested,
      additionalDescription,
      lastRequestDate,
      currency,
      unit,
      bbrequester: user.userId,     // work. this is nuthing but field that make sure who is first user who requested product.
    });
    if (response.status !== 200) {
      throw new Error(`API request failed with status ${response.status}`);
    }

      const data = await response.data;
      console.log('API response:', data);

      // Handle successful submission (e.g., show a confirmation message, redirect to success page)

    // redirect feature
    navigate('/bulk-Buying');

  
      console.log('Form submission successful!', data.message || 'Data saved successfully.');

      
    } catch (error) {
      console.error('Error submitting data:', error);

      // Handle submission errors (e.g., show an error message, provide retry mechanism)
      console.error('Error message:', error.message || 'An error occurred. Please try again later.');
    }
  };

  return (
    <div>
    <BbHeader />
    <div className='shadow'>
    <form className="product-request-form" onSubmit={handleSubmit}>
      <div>
        <h3>Request new Bulk Buying Product</h3>
        <hr />
      </div>
      <div className="form-group">
        <label htmlFor="requestedProductName">Requested Product Name:</label>
        <input
          type="text"
          id="requestedProductName"
          name="requestedProductName"
          value={formData.requestedProductName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="expectedPricePerUnit">Expected Price Per Unit:</label>
        <input
          type="number"
          id="expectedPricePerUnit"
          name="expectedPricePerUnit"
          value={formData.expectedPricePerUnit}
          onChange={handleChange}
          required
        />
        <select
          id="currency"
          name="currency"
          value={formData.currency}
          onChange={handleChange}
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="totalUnitsRequested">Total Units Requested:</label>
        <input
          type="number"
          id="totalUnitsRequested"
          name="totalUnitsRequested"
          value={formData.totalUnitsRequested}
          onChange={handleChange}
          required
        />
        <select
          id="unit"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
        >
          <option value="kg">kg</option>
          <option value="gram">gram</option>
          <option value="ton">ton</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="additionalDescription">Additional Description (Optional):</label>
        <textarea
          id="additionalDescription"
          name="additionalDescription"
          value={formData.additionalDescription}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastRequestDate">Expected date to get Request:</label>
        <input
          type="date"
          id="lastRequestDate"
          name="lastRequestDate"
          value={formData.lastRequestDate}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit Request</button>
    </form>
    </div>
    </div>
  );
}

export default BBProductRequestForm;
