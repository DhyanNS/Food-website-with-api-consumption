import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Get() {
  const [p, setP] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dataNotFound, setDataNotFound] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7057/api/Foods');
      setP(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7057/api/Foods?search=${searchTerm}`
      );
      setP(response.data);
      setDataNotFound(response.data.length === 0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="get-container">
      <input
        type="text"
        placeholder="Search Food"
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <table className="get-table">
        <thead>
          <tr>
            <th>Food ID</th>
            <th>Food Name</th>
            <th>Food Price</th>
            <th>Food Type</th>
          </tr>
        </thead>
        <tbody>
          {p.map(pdata => (
            <tr
              key={pdata.foodId}
              className={
                (pdata.foodName ?? '')
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
                  ? 'highlight'
                  : ''
              }
            >
              <td>{pdata.foodId}</td>
              <td>{pdata.foodname}</td>
              <td>{pdata.foodprice}</td>
              <td>{pdata.foodType}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {dataNotFound && <p>Data not found.</p>}
      {!dataNotFound && <p>{p.length}</p>}
    </div>
  );
}

export default Get;
