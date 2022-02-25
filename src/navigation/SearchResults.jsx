import theater_businesses from '../mockdata/theater_businesses.json';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import BusinessLink from '../components/BusinessLink';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './SearchResults.css';

const API_KEY = process.env.REACT_APP_MAPBOXGL_ACCESSTOKEN;

export default function SearchResults({ route, navigation }) {
  const { query } = useParams();

  // check if incoming query is array of coordinates or address/string
  let location = query.split(',').map((coord) => Number(coord));
  // console.log('query converted to a number:', location);
  if (isNaN(location[0])) {
    location = query;
  }

  const [map, setMap] = useState();
  const [lng, setLng] = useState(-100.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(3);
  const currentMarkers = useRef([]);
  const [foundBusinesses, setFoundBusinesses] = useState([]);
  const [businessMarkers, setBusinessMarkers] = useState([]);

  const renderMap = useCallback(() => {
    loadScript('https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.js');
    window.initMap = initMap;
    window.initMap();
  }, []);

  useEffect(() => {
    renderMap();
  }, [renderMap])
  
  const initMap = () => {
    mapboxgl.accessToken = API_KEY;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      attributionControl: false,
      center: [lng, lat],
      zoom: zoom
    });

      map.on('load', () => {
        setMap(map);
        map.resize();
      });
    };

  useEffect(() => {
    if (!map) return; // wait for map to initialize
    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
  });
  
  useEffect(() => {
    // MOCK INCOMING FOUND BUSINESSES DATA
    setTimeout(() => {
      setBusinessMarkers(foundBusinesses.map((business) => {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [business.coordinates.longitude, business.coordinates.latitude]
          },
          properties: {
            title: business.name,
            address: business.address,
            city: business.city,
            category: business.categories[0].title,
            url: business.url,
            id: business.id
          }
        }
      }))
    }, 500);
  }, [foundBusinesses])


  const updateMarkers = () => {
    const geojson = {
      type: 'FeatureCollection',
      features: businessMarkers
    };

    if (currentMarkers.current.length > 20) {
      currentMarkers.current.forEach((marker) => marker.remove());
      currentMarkers.current = [];
    }

    for (const marker of geojson.features) {
      let el = document.createElement('div');
      el.className = 'marker';
      // make a marker for each feature and add to the map
      let myMarker = new mapboxgl.Marker(el);
      myMarker.setLngLat(marker.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<h3>${marker.properties.title}</h3><p>${marker.properties.category}</p>`))
      .addTo(map);
      currentMarkers.current.push(myMarker);
      el.addEventListener('click', function(evt) {
        flyToSpot(marker);
      })
      flyToArea(marker);
    }
  };

  function flyToArea(currentArea) {
    map.flyTo({
      center: currentArea.geometry.coordinates,
      zoom: 12
    });
  };

  function flyToSpot(currentMarker) {
    map.flyTo({
      center: currentMarker.geometry.coordinates,
      zoom: 14
    });
  };

  const setMockJsonData = () => {
    setFoundBusinesses(theater_businesses.businesses);
  };
  
  useEffect(() => {
    setTimeout(() => {
      setMockJsonData();
    }, 0);
  }, []);
  
  useEffect(() => {
    updateMarkers();
  }, [businessMarkers])


  const BusinessLinks = foundBusinesses.map((business) => {
    const subHeading = business.categories[0].title;
    const { id, name, image_url } = business;
    return (
      <BusinessLink key={id} id={id} name={name} subHeading={subHeading} image={image_url} all_data={business} />
    )
  })

  const [ search, setSearch ] = useState();

  useEffect(() => {
    setFoundBusinesses(theater_businesses.businesses.filter((business) => {
      return business.name.toLowerCase().includes(search)
    }))
  }, [search])


  return (
    <>
      <h2>Theaters in <span style={{color: 'blue'}}>{query}</span></h2>
      <h2>{search}</h2>
      <input 
        type="text" 
        placeholder='filter' 
        onChange={(evt) => setSearch(evt.target.value)}
      />
      <div style={styles.mapContainer}>
        <div id='map' className="map-container" />
      </div>

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

