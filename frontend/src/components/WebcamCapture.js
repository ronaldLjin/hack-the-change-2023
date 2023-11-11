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
  width: 300,
  height: 300,
};

export default function WebcamCapture({ image, setImage }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    setImage(webcamRef.current.getScreenshot());
  }, [webcamRef]);

  const closeModal = () => {
    onClose();
    capture();
    console.log(image);
  };

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
          </ModalBody>

          <Button colorScheme="blue" mr={3} onClick={closeModal}>
            Detect Image
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
}
