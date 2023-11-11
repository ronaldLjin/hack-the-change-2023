import { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import {
  Button,
  Image,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

const videoConstraints = {
  facingMode: 'user',
  width: 600,
  height: 600,
};

export default function WebcamCapture() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [image, setImage] = useState();
  const [isCameraOn, setIsCameraOn] = useState(false);

  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    setImage(webcamRef.current.getScreenshot());
  }, [webcamRef]);

  return (
    <>
      <Button onClick={onOpen}>Take a Picture!</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Take a Picture!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpg"
              videoConstraints={videoConstraints}
            />
            {image && <Image src={image} alt="idk" />}
            <Button onClick={capture}>Screenshot!</Button>
          </ModalBody>

          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalContent>
      </Modal>

      {/* <Button onClick={() => setIsCameraOn(true)}>Take a Picture!</Button> */}
    </>
  );
}
