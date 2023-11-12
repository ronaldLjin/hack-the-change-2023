import { useState, useEffect } from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import { Button, Box, VStack } from '@chakra-ui/react';

const mapSettings = {
  center: {
    lat: 51.040961,
    lng: -114.078692,
  },
  zoom: 5,
};

const SearchMap = ({ google, loaded, attributes }) => {
  const [places, setPlaces] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const performTextSearch = (query) => {
    const service = new google.maps.places.PlacesService(window.map);

    // Define the search request
    const request = {
      location: window.map.center,
      radius: 10000, // radius in meters
      query: query,
    };

    // Perform the text search
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const places = results.map((result) => ({
          name: result.name,
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
        }));

        setPlaces(places);
      } else {
        console.error('Text search failed with status:', status);
      }
    });
  };

  const onMapClick = (mapProps, map, clickEvent) => {
    // Handle map click event, e.g., to add markers
  };

  const onMarkerClick = (props, marker) => {
    setActiveMarker(marker);
    setSelectedPlace(props);
  };

  return (
    <VStack>
      <Box paddingInline="2rem" h="30vw" w="30vw">
        <Map
          style={{ maxHeight: '500px', maxWidth: '500px' }}
          google={google}
          zoom={12}
          initialCenter={mapSettings.center}
          initialZoom={mapSettings.zoom}
          onClick={onMapClick}
          onReady={(mapProps, map) => {
            // Save the map instance for later use
            window.map = map;
          }}
        >
          {places.map((place, index) => (
            <Marker
              key={index}
              name={place.name}
              position={{ lat: place.lat, lng: place.lng }}
              onClick={onMarkerClick}
            />
          ))}
          <InfoWindow marker={activeMarker} visible={!!activeMarker}>
            <div>
              <h3>{selectedPlace && selectedPlace.name}</h3>
            </div>
          </InfoWindow>
        </Map>
      </Box>
      <Button
        marginTop="-75px"
        onClick={() => {
          console.log(attributes.join(','));
          performTextSearch(attributes.join(','));
        }}
      >
        Find Disposal Areas!
      </Button>
    </VStack>
  );
};

const API_KEY = process.env.API_KEY;

export default GoogleApiWrapper({
  apiKey: API_KEY,
})(SearchMap);
