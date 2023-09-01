import React, { useState, useEffect } from 'react';
import axios from 'axios';


function GetById() {
  const [post, setPost] = useState({});
  const [id, setId] = useState(1);
  const [idFromButtonClick, setIdFromButtonClick] = useState(1);
  const [error, setError] = useState(false); // State for error handling

  useEffect(() => {
    axios
      .get(`https://localhost:7057/api/Foods/${id}`)
      .then(res => {
        console.log(res);
        setPost(res.data);
        setError(false); // Reset error state if the request succeeds
      })
      .catch(err => {
        console.log(err);
        setError(true); // Set error state if the request fails
      });
  }, [idFromButtonClick]);

  const handleClick = () => {
    setIdFromButtonClick(id);
  };

  return (
    <div className="getbyid-container">
      <input
        className="getbyid-input"
        type="text"
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <button className="getbyid-button" type="button" onClick={handleClick}>
        Fetch Post
      </button>
      {error ? (
        <div className="getbyid-error">Incorrect ID entered. Please try again.</div>
      ) : (
        <table className="getbyid-table">
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Food Price</th>
              <th>Food Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{post.foodname}</td>
              <td>{post.foodprice}</td>
              <td>{post.foodType}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GetById;
