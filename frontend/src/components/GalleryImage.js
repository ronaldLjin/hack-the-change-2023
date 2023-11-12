import { Box, Input, Button } from "@chakra-ui/react";
import { useRef } from "react";

export default function GalleryImage({ setImage, setFile }) {
  const inputRef = useRef(null);

  const detectImage = (e) => {
    const file = e.target.files[0];
    setFile(file);
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
        ref={inputRef}
        style={{ display: "none" }}
        accept="image/*"
        type="file"
        onChange={detectImage}
      />
      <Button colorScheme="blue" onClick={() => inputRef.current.click()}>
        Upload File
      </Button>
    </Box>
  );
}
