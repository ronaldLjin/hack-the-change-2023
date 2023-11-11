import './App.css';
import GalleryImage from './components/GalleryImage';
import Introduction from './components/Introduction';
import Map from './components/Map';
import { Box } from '@chakra-ui/react';
import WebcamCapture from './components/WebcamCapture';

function App() {
  return (
    <>
      <Introduction />
      <GalleryImage />
      <WebcamCapture />
      <Map />
    </>
  );
}

export default App;
