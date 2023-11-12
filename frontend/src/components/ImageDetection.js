import { useState } from "react";
import {
  Image,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Button,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export default function ImageDetection({
  image,
  setImage,
  file,
  setFile,
  showMap,
  setShowMap,
}) {
  const [items, setItems] = useState();

  async function detect() {
    const formData = new FormData();
    formData.append("image", file);
    fetch("http://127.0.0.1:5000/detect", {
      method: "POST",
      mode: "cors",
      body: formData,
    }).then((res) => {
      setItems(res);
      console.log(res.json());
    });
    // setItems(response);
    // console.log(response.json());
  }

  const closeDetection = () => {
    setImage(undefined);
    setFile(undefined);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "10px 0",
        }}
      >
        <Card maxW="sm">
          <CardBody>
            {!image && <Heading size="sm">Example Detection Card!</Heading>}
            {image && (
              <Tooltip label="Close Detection" placement="left">
                <IconButton
                  variant="ghost"
                  aria-label="Close Image"
                  size="sm"
                  margin="0"
                  icon={<CloseIcon />}
                  onClick={closeDetection}
                />
              </Tooltip>
            )}
            <Stack mt="2" spacing="2">
              <Image
                src={image ?? "/trashcans.jpg"}
                alt="selected file"
                borderRadius="lg"
              />
              <Button onClick={detect} isDisabled={!image}>
                Detect
              </Button>
            </Stack>
            <Stack mt="6" spacing="3">
              <Heading size="md">Category or where to dispose</Heading>
              <Text>Some stuff that hugchat gives us.</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "4px",
              }}
            >
              <Text color="red.600" fontSize="lg">
                Safety reminder if its stuff like a battery?
              </Text>
              <Button
                width="150px"
                variant="solid"
                colorScheme="blue"
                onClick={() => setShowMap((prev) => !prev)}
              >
                {showMap ? "Close Map" : "View Map"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
