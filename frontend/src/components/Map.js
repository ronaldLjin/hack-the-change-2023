import GoogleMapReact from 'google-map-react';
import { Box } from '@chakra-ui/react';

export default function Map() {
  const defaultProps = {
    center: {
      lat: 52,
      lng: -110,
    },
    zoom: 5,
  };

  return (
    <Box style={{ margin: '20px 0' }} h="75vh" w="100%">
      <GoogleMapReact
        bootstrapURLKeys={{ key: '***REMOVED***' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      ></GoogleMapReact>
    </Box>
  );
}
