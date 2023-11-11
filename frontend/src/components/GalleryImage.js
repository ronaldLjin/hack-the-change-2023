import { Box, Input, Image } from '@chakra-ui/react';
import { useState } from 'react';
import Webcam from 'react-webcam';

export default function GalleryImage({ image, setImage }) {
  const detectImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <Input
        p="2em"
        type="file"
        onChange={detectImage}
        accept="image/*"
        variant="outlined"
      />
    </Box>
  );
}
