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
          <Button onClick={getCurrentLocation} 
            customWidth={'70vw'} customText={'Use Current Location'}/>
          <div style={{marginTop: 20}} >
            <Button onClick={searchAddress} customWidth={'17vw'} customText={'Search'} color={'black'} textColor={'white'} />
          </div>
        </header>
      </div>

      <TipCalculator />

    </>
  );
};




function TipCalculator() {
  const [bill, setBill] = useState(0.00);
  const [tip, setTip] = useState(15);
  const [people, setPeople] = useState(1);

  const totalTip = ((bill * tip / 100) / people).toFixed(2);
  const total = (Number(totalTip) + Number(bill) / people).toFixed(2);

  return (
    <>
      <h1>Tip Calculator</h1>
      <div >
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <label for="bill">Bill</label>
          <input id="bill" type="number" onChange={(evt) => setBill(evt.target.value)} value={bill} />
          <label for="tip">Tip %</label>
          <input id="tip" type="number" onChange={(evt) => setTip(evt.target.value)} value={tip} />
          <label for="people">Number of people</label>
          <input id="people" type="number" onChange={(evt) => setPeople(evt.target.value)} value={people} />
        </div>
        <div>
          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <p>Tip {people > 1 ? "per person" : null}</p>
            <p>${totalTip}</p>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <p>Total {people > 1 ? "per person" : null}</p>
            <p>${total}</p>
          </div>
        </div>
      </div>
    </>
  );
};

