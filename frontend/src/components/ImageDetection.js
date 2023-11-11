import { useState } from 'react';
import GalleryImage from './GalleryImage';
import WebcamCapture from './WebcamCapture';
import { Image, HStack } from '@chakra-ui/react';

export default function ImageDetection() {
  const [image, setImage] = useState();
  return (
    <>
      <HStack justifyContent="center">
        <GalleryImage image={image} setImage={setImage} />
        <WebcamCapture image={image} setImage={setImage} />
      </HStack>
      {image && <Image src={image} alt="selected file" />}
    </>
  );
}
