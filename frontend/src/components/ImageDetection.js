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
  Box,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import axios from "axios";

export default function ImageDetection({
  image,
  setImage,
  file,
  setFile,
  showMap,
  setShowMap,
}) {
  const [items, setItems] = useState();
  const [categories, setCategories] = useState({});

  async function getWasteCategory(category) {
    const url = `http://localhost:5000/waste_category?category=${category}`;
    const response = await axios.get(url);
    const data = response.data;
    return data;
  }

  function detect() {
    const formData = new FormData();
    formData.append("image", file);
    fetch("http://localhost:5000/detect", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        return data;
      })
      .then((data) => {
        const map = {};
        data.forEach((item) => {
          const category = item.categories[0].category_name;
          getWasteCategory(category).then((res) => {
            map[category] = res;
          });
        });
        setCategories(map);
      });
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
        {items?.map((item) => {
          return (
            <Test
              key={Math.random(21230192391203)}
              item={item}
              categories={categories}
            />
          );
        })}
      </div>
    </>
  );
}
function Test({ item, categories }) {
  const category = item.categories[0].category_name;
  const confidence = item.categories[0].score;

  const [open, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{category}</Button>
      <Box>{confidence}</Box>
      {open && <Box>Category: {categories[category]}</Box>}
    </>
  );
}
