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
import { CloseIcon, ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";

const exampleCard = {
  imageSrc: "/trashcans.jpg",
  imageAlt: "Multiple Recycling Bins",
  items: [
    { categories: [{ category_name: "bottle", text: "recycling" }] },
    { categories: [{ category_name: "egg shell", text: "compost" }] },
  ],
};

export default function ImageDetection({
  image,
  setImage,
  file,
  setFile,
  showMap,
  setShowMap,
}) {
  const [items, setItems] = useState(undefined);
  const [categories, setCategories] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function getWasteCategory(category) {
    const url = `http://localhost:5000/waste_category?category=${category}`;
    const response = await axios.get(url);
    const data = response.data;
    return data;
  }

  function detect() {
    setIsLoading(true);
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
        setIsLoading(false);
      });
  }

  const closeDetection = () => {
    setImage(undefined);
    setFile(undefined);
    setItems(undefined);
    setCategories({});
  };

  return (
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
              src={image ?? exampleCard.imageSrc}
              alt={exampleCard.imageAlt}
              borderRadius="lg"
            />
            <Button onClick={detect} isDisabled={!image}>
              Detect
            </Button>
          </Stack>
          <Stack mt="6" spacing="3">
            <Heading size="md">Category of Disposal</Heading>
            {console.log(items)}
            {(items ?? (image ? [] : exampleCard.items)).map((item) => {
              return (
                <ItemList
                  key={Math.random(21230192391203)}
                  item={item}
                  categories={categories}
                  isLoading={isLoading}
                  useExample={!image}
                />
              );
            })}
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
  );
}
function ItemList({ item, categories, isLoading, useExample }) {
  const [isOpen, setIsOpen] = useState(false);
  const category = item.categories[0].category_name;

  return (
    <>
      <Button
        isDisabled={isLoading}
        leftIcon={isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
        onClick={() => {
          if (!isLoading) {
            setIsOpen((prev) => !prev);
          }
        }}
      >
        {category}
      </Button>
      {isOpen && (
        <Box>
          Category:{" "}
          {useExample ? item.categories[0].text : categories[category]}
        </Box>
      )}
    </>
  );
}
