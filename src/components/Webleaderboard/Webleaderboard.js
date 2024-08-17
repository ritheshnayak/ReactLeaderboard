import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Webleaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
        const sheetId = '11Xdp0QM2ytz2u-kkNGPIpIPN08XnwR_qazmGzbMd3do';
        const sheetName = 'web';

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

      try {
        const response = await axios.get(url);
        const rows = response.data.values;
        const formattedData = rows.slice(1).map(row => ({
          name: row[0],
          usn: row[1],
          score: parseInt(row[2], 10),
        }));
        formattedData.sort((a, b) => b.score - a.score);
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
      }
    };

    fetchData();
  }, []);

  const getMedalIcon = (index) => {
    switch (index) {
      case 0: return '🥇'; 
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '';
    }
  };

  return (
    <div className="leaderboard-container">
      <h2>DSA Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>USN</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={`rank-${index + 1}`}>
              <td>{getMedalIcon(index)} {index + 1}</td>
              <td>{item.name}</td>
              <td>{item.usn}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Webleaderboard;
