import { Box, Input, Image } from '@chakra-ui/react';
import { useState } from 'react';
import Webcam from 'react-webcam';

export default function UploadImage() {
  const [file, setFile] = useState();

  const detectImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log(file);
  };

  return (
    <Box>
      <Input
        p="2em"
        type="file"
        id="imageInput"
        onChange={detectImage}
        accept=".jpg, .jpeg, .png"
        variant="outlined"
      />
      {file && <Image src={file} alt="selected file" />}
    </Box>
  );
}
