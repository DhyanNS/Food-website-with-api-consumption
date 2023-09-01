import React, { useState, useEffect } from 'react';
import axios from 'axios';


function DataInsert() {
  const [newData, setNewData] = useState({ foodname: '', foodprice: '', foodType: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .post('https://localhost:7057/api/Foods', newData)
      .then((res) => {
        console.log(res);
        // Clear the form inputs
        setNewData({ foodname: '', foodprice: '', foodType: '' });
        setSuccessMessage('Data inserted successfully!');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get('https://localhost:7057/api/Foods')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="data-insert-container">
      <form onSubmit={handleFormSubmit}>
        <h2>Add New Food</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="form-group">
          <label htmlFor="foodname">Food Name</label>
          <input
            type="text"
            name="foodname"
            value={newData.foodname}
            onChange={handleInputChange}
            placeholder="Food Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="foodprice">Food Price</label>
          <input
            type="text"
            name="foodprice"
            value={newData.foodprice}
            onChange={handleInputChange}
            placeholder="Food Price"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="foodType">Food Type</label>
          <input
            type="text"
            name="foodType"
            value={newData.foodType}
            onChange={handleInputChange}
            placeholder="Food Type"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DataInsert;
