import './App.css';
import ImageDetection from './components/ImageDetection';
import Introduction from './components/Introduction';
import Map from './components/Map';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <>
      <Box p="2rem" w={{ sm: '100%', md: '80vw' }} margin="auto" maxW="1000px">
        <Introduction />
        <ImageDetection />
        <Map />
      </Box>
    </>
  );
}

export default App;
