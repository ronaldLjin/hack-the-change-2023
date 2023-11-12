import { Box } from "@chakra-ui/react";

export function ImageDetections(result, imageRef) {
  const ratio = 0.5;

  return (
    <>
      {result.result.map((detection) => (
        <Box>
          <Box
            pos={"absolute"}
            left={detection.bounding_box.origin_x * ratio + "px;"}
            top={detection.bounding_box.origin_y * ratio + "px; "}
            width={detection.bounding_box.width * ratio - 10 + "px;"}
            backgroundColor={"#007f8b"}
          >
            {detection.categories[0].category_name +
              " - with " +
              Math.round(parseFloat(detection.categories[0].score) * 100) +
              "% confidence."}
          </Box>
          <Box
            pos={"absolute"}
            left={detection.bounding_box.origin_x * ratio + "px;"}
            top={detection.bounding_box.origin_y * ratio + "px;"}
            width={detection.bounding_box.width * ratio + "px;"}
            height={detection.bounding_box.height * ratio + "px;"}
            backgroundColor={"#007f8b"}
          ></Box>
        </Box>
      ))}
    </>
  );
}
