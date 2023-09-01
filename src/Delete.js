import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Delete() {
  const [p, setP] = useState([]);

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

  const deleteHandler = foodId => {
    axios
      .delete(`https://localhost:7057/api/Foods/${foodId}`)
      .then(res => {
        console.log(res);
        // Filter out the deleted item from the state
        const updatedP = p.filter(item => item.foodId !== foodId);
        setP(updatedP);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="delete-container">
      <table className="delete-table">
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
                <button onClick={() => deleteHandler(pdata.foodId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{p.length}</p>
    </div>
  );
}

export default Delete;
