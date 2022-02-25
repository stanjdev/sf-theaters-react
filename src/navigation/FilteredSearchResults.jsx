import theater_businesses from '../mockdata/theater_businesses.json';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BusinessLink from '../components/BusinessLink';
import './SearchResults.css';

export default function FilteredSearchResults() {
  const { filter } = useParams();
  const navigate = useNavigate();

  const [foundBusinesses, setFoundBusinesses] = useState([]);

  const BusinessLinks = foundBusinesses.map((shop) => {
    const subHeading = shop.categories[0].title;
    const { id, name, image_url } = shop;
    return (
      <BusinessLink key={id} id={id} name={name} subHeading={subHeading} image={image_url} all_data={shop} />
    )
  })

  useEffect(() => {
    setFoundBusinesses(theater_businesses.businesses.filter((business) => {
      return business.categories[0].title.toLowerCase().includes(filter)
    }))
  }, [filter])

  return (
    <>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <h2><span style={{color: 'blue'}}>{filter[0].toUpperCase() + filter.slice(1)}s</span></h2>
      <div style={styles.resultsContainer}>
        { BusinessLinks }
      </div>
    </>
  )
};

const styles = {
  mapContainer: {
    border: 'solid 1px orange',
    // maxHeight: '40vh',
    // height: '400px',
  },
  resultsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  marker: {
    backgroundImage: "url('map-marker.png')",
    backgroundSize: 'cover',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    cursor: 'pointer',
  }
};


// Loads the MapBox API script
function loadScript(url) {
  const index = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.src = url;
  index.parentNode.insertBefore(script, index);
}

