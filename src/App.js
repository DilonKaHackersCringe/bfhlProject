import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styles

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [filter, setFilter] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/bfhl', JSON.parse(jsonInput));
      setResponseData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    const updatedFilter = filter.includes(value) 
      ? filter.filter(f => f !== value) 
      : [...filter, value];
    setFilter(updatedFilter);
  };

  return (
    <div className="app-container">
      <h1>Backend Interaction</h1>
      <textarea
        className="json-input"
        rows="6"
        placeholder='Enter JSON'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
      
      <select className="filter-select" multiple onChange={handleFilterChange}>
        <option value="alphabets">Alphabets</option>
        <option value="numbers">Numbers</option>
        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
      </select>

      {responseData && (
        <div className="response-data">
          {filter.includes('alphabets') && <div>Alphabets: {JSON.stringify(responseData.alphabets)}</div>}
          {filter.includes('numbers') && <div>Numbers: {JSON.stringify(responseData.numbers)}</div>}
          {filter.includes('highest_lowercase_alphabet') && <div>Highest Lowercase Alphabet: {JSON.stringify(responseData.highest_lowercase_alphabet)}</div>}
        </div>
      )}
    </div>
  );
}

export default App;
