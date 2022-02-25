import React from 'react';
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
        <button style={{ alignSelf: 'flex-start' }} onClick={() => navigate(-1)}>Go Back</button>
        <a href={all_data.url} target="_blank" rel="noreferrer noopener">
          <img src={all_data.image_url} className="App-logo" alt="logo" />
        </a>

        <div style={ styles.detailsContainer}>
          <h1>{all_data.name}</h1>
          <p>Rating: {all_data.rating}</p>
          <p>Review Count: {all_data.review_count}</p>
          <a style={{color: 'green'}} href={`http://maps.google.com/?q=${all_data.location.display_address}`} target="_blank" rel="noreferrer noopener">
            {all_data.location.display_address.map((line) => {
              return (
                <>
                  <small>{line}</small>
                  <br></br>
                </>
              );
            })}
          </a>
          <small>{all_data.display_phone}</small>
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
  detailsContainer: {
    maxWidth: '80%'
  }
};


