import { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const videoConstraints = {
  facingMode: "user",
  width: 350,
  height: 300,
};

export default function WebcamCapture({ setImage, setFile }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    setFile(undefined);
    setImage(webcamRef.current.getScreenshot());
  }, [webcamRef]);

  const closeModal = () => {
    onClose();
    capture();
  };

  return (
    <Box>
      <Button colorScheme="blue" onClick={onOpen}>
        Take a Picture!
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Take a Picture!</ModalHeader>
          <ModalCloseButton />
          <ModalBody style={{ display: "flex", justifyContent: "center" }}>
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpg"
              videoConstraints={videoConstraints}
            />
          </ModalBody>
          <ModalFooter style={{ display: "flex", justifyContent: "center" }}>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Take Image
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
