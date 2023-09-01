import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Put() {
  const [p, setP] = useState([]);
  const [updatedData, setUpdatedData] = useState({ foodId: '', foodname: '', foodprice: '', foodType: '' });

  useEffect(() => {
    axios
      .get('https://localhost:7057/api/Foods')
      .then(res => {
        console.log(res);
        setP(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const updateHandler = (foodId) => {
    const updatedItem = p.find(item => item.foodId === foodId);
    if (updatedItem) {
      axios
        .put(`https://localhost:7057/api/Foods/${foodId}`, updatedData)
        .then(res => {
          console.log(res);
          // Update the state with the updated data
          const updatedP = p.map(item => {
            if (item.foodId === foodId) {
              return { ...item, ...updatedData };
            }
            return item;
          });
          setP(updatedP);
          setUpdatedData({ foodId: '', foodname: '', foodprice: '', foodType: '' });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="put-container">
      <table className="put-table">
        <thead>
          <tr>
            <th>Food ID</th>
            <th>Food Name</th>
            <th>Food Price</th>
            <th>Food Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {p.map(pdata => (
            <tr key={pdata.foodId}>
              <td>{pdata.foodId}</td>
              <td>{pdata.foodname}</td>
              <td>{pdata.foodprice}</td>
              <td>{pdata.foodType}</td>
              <td>
                <input
                  type="text"
                  name="foodId"
                  value={updatedData.foodId}
                  onChange={handleInputChange}
                  placeholder="New Food ID"
                />
                <input
                  type="text"
                  name="foodname"
                  value={updatedData.foodname}
                  onChange={handleInputChange}
                  placeholder="New Food Name"
                />
                <input
                  type="text"
                  name="foodprice"
                  value={updatedData.foodprice}
                  onChange={handleInputChange}
                  placeholder="New Food Price"
                />
                <input
                  type="text"
                  name="foodType"
                  value={updatedData.foodType}
                  onChange={handleInputChange}
                  placeholder="New Food Type"
                />
                <button onClick={() => updateHandler(pdata.foodId)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{p.length}</p>
    </div>
  );
}

export default Put;
