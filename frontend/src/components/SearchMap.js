import { useState } from "react";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import { Button } from "@chakra-ui/react";

const mapSettings = {
  center: {
    lat: 51.040961,
    lng: -114.078692,
  },
  zoom: 5,
};

const SearchMap = ({ google, loaded }) => {
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
        console.error("Text search failed with status:", status);
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
    <>
      <Map
        google={google}
        zoom={14}
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
      <Button onClick={() => performTextSearch("fire stations")}>try me</Button>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: "***REMOVED***",
})(SearchMap);

// export default function Map() {
//   const defaultProps = {
//     center: {
//       lat: 52,
//       lng: -110,
//     },
//     zoom: 5,
//   };

//   return (
//     <Box style={{ margin: '20px 0' }} h="75vh" w="100%">
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: '***REMOVED***' }}
//         defaultCenter={defaultProps.center}
//         defaultZoom={defaultProps.zoom}
//       ></GoogleMapReact>
//     </Box>
//   );
// }
