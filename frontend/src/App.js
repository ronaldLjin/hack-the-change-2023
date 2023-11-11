import './App.css';
import UploadImage from './components/UploadImage';
import Introduction from './components/Introduction';
import Map from './components/Map';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <>
      <Introduction />
      <UploadImage />
      <Map />
    </>
  );
}

export default App;
