import React, { useState } from 'react';
import logo from '../assets/sf-theater-icon.png';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [ currentLocation, setCurrentLocation ] = useState('San Francisco, California');
  const navigate = useNavigate();
  const [ loadingMessage, setLoadingMessage ] = useState();

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;
      console.log(longitude, latitude);
      setCurrentLocation([longitude, latitude]);
      fetchAndNavigate([longitude, latitude]);
    })
    displayLoadingMessage();
  };

  const searchAddress = () => {
    fetchAndNavigate(currentLocation);
    displayLoadingMessage();
  };
  
  const fetchAndNavigate = (location) => {
    if (currentLocation !== '') {
      console.log(location, 'to the next page!')
      navigate(`search_results/${location}`, {query: location})
    } else {
      console.log('no empty query allowed');
    }
  };

  const displayLoadingMessage = () => {
    setLoadingMessage(<p style={{color: 'lightgreen'}}>Searching...</p>);
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 style={{ fontFamily:'Abril_Fatface' }}>
            San Francisco Theaters
          </h1>
          {loadingMessage}
          <div style={{marginTop: 20}} >
            <Button onClick={searchAddress} customWidth={'17vw'} customText={'Search'} color={'black'} textColor={'white'} />
          </div>
        </header>
      </div>

    </>
  );
};



