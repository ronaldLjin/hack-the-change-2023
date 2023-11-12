import { useState } from 'react';
import ImageDetection from './ImageDetection';
import SearchMap from './SearchMap';
import { Box, Button, VStack } from '@chakra-ui/react';

export default function Body({ image, setImage, file, setFile }) {
  const [showMap, setShowMap] = useState(false);
  const [attributes, setAttributes] = useState([]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      margin="20px 0"
      h="70vh"
      w="100%"
    >
      <div>
        <ImageDetection
          image={image}
          setImage={setImage}
          file={file}
          setFile={setFile}
          showMap={showMap}
          setShowMap={setShowMap}
          setAttributes={setAttributes}
        />
      </div>
      {showMap && <SearchMap attributes={attributes} />}
    </Box>
  );
}
