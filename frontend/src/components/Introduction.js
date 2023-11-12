import { Box, Heading } from "@chakra-ui/react";
import GalleryImage from "./GalleryImage";
import WebcamCapture from "./WebcamCapture";

export default function Introduction({ setImage, setFile }) {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Heading>Welcome to Fooder!</Heading>
        <Box>To get started, choose a photo or take one!</Box>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", columnGap: "6px" }}
      >
        <GalleryImage setImage={setImage} setFile={setFile} />
        <WebcamCapture setImage={setImage} setFile={setFile} />
      </div>
    </Box>
  );
}
