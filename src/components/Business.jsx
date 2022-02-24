import React from 'react';
import Button from './Button';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export default function Business() {
  let navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const all_data = location.state?.all_data;

  console.log(all_data)
  // https://ui.dev/react-router-url-parameters/

  return (
    <>
      <div className="App">
      <header className="App-header">
        <button onClick={() => navigate(-1)}>Go Back</button>
        <a href={all_data.url} target="_blank" rel="noreferrer noopener">
          <img src={all_data.image_url} className="App-logo" alt="logo" />
        </a>
        <h1>{all_data.name}</h1>
        <p>Rating: {all_data.rating}</p>
        <a href={`http://maps.google.com/?q=${all_data.location.address1} ${all_data.location.city}, ${all_data.location.state} ${all_data.location.zip_code}`} target="_blank" rel="noreferrer noopener">
          <small>{all_data.location.address1}</small>
          <br></br>
          <small>{all_data.location.city}, {all_data.location.state} {all_data.location.zip_code}</small>
        </a>
        <small>{all_data.phone}</small>
        <p>id: {id}</p>
        <div style={{ marginTop: 20 }} >
          <div style={ styles.businessInfoBox }>
            <p>Wifi?</p>
            <p>Yes</p>
          </div>
          <div style={ styles.businessInfoBox }>
            <p>Student friendly?</p>
            <p>Yes</p>
          </div>
        </div>
      </header>
    </div>
    </>
  );
};

const styles = {
  businessInfoBox: {
    border: 'solid orange 1px', 
    width: '70vw', 
    padding: '0 20px', 
    borderRadius: 20, 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-evenly', 
    alignItems: 'start'
  },
};


