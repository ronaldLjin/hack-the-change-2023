import './App.css';
import { useState } from 'react';

import Body from './components/Body';
import Introduction from './components/Introduction';
import Map from './components/Map';
import { Box } from '@chakra-ui/react';

function App() {
  const [image, setImage] = useState(undefined);
  const [file, setFile] = useState(undefined);

  return (
    <Box p="2rem" w={{ sm: '100%', md: '80vw' }} margin="auto" maxW="1000px">
      <Introduction setImage={setImage} setFile={setFile} />
      <Body image={image} setImage={setImage} file={file} setFile={setFile} />
      <Map />
    </Box>
  );
}

export default App;
