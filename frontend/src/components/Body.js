import { useState } from "react";
import ImageDetection from "./ImageDetection";
import Map from "./Map";

export default function Body({ image, setImage, file, setFile }) {
  const [showMap, setShowMap] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px 0",
      }}
      h="70vh"
      w="100%"
    >
      <div style={{ margin: "0 15px" }}>
        <ImageDetection
          image={image}
          setImage={setImage}
          file={file}
          setFile={setFile}
          showMap={showMap}
          setShowMap={setShowMap}
        />
      </div>
      {showMap && <Map />}
    </div>
  );
}
