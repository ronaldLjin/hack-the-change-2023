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

function base64ToFile(base64String) {
  const base64WithoutPrefix = base64String.split(",")[1];
  const arrayBuffer = Uint8Array.from(atob(base64WithoutPrefix), (c) =>
    c.charCodeAt(0)
  );
  const blob = new Blob([arrayBuffer], { type: "image/png" });
  return new File([blob], "webcam-image.png", { type: "image/png" });
}

export default function WebcamCapture({ setImage, setFile }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const image = webcamRef.current.getScreenshot();
    setFile(base64ToFile(image));
    setImage(image);
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
