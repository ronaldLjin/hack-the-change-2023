import { useEffect, useState } from "react";
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
  Skeleton,
} from "@chakra-ui/react";
import {
  CloseIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import axios from "axios";

const exampleCard = {
  imageSrc: "/trashcans.jpg",
  imageAlt: "Multiple Recycling Bins",
  items: [
    { categories: [{ category_name: "bottle", text: "Recycling" }] },
    { categories: [{ category_name: "egg shell", text: "Compost" }] },
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
        let promises = [];
        const map = {};
        data.forEach((item) => {
          const category = item.categories[0].category_name;
          const promise = getWasteCategory(category).then((res) => {
            map[category] = res;
          });
          promises.push(promise);
        });
        Promise.all(promises).then(() => {
          setCategories(map);
          setIsLoading(false);
        });
      });
  }

  useEffect(() => {
    if (isLoading) detect();
  }, [isLoading]);

  // Reset items and categories if the image changes
  useEffect(() => {
    if (image) {
      setItems(undefined);
      setCategories({});
    }
  }, [image]);

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
          {!image && <Heading size="md">Example Detection Card!</Heading>}
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
            <Button
              onClick={() => {
                setIsLoading(true);
              }}
              isDisabled={!image}
            >
              Detect
            </Button>
          </Stack>
          <Stack mt="6" spacing="3">
            <Heading size="md">Category of Disposal</Heading>
            {console.log(items)}
            {(items ?? (image ? [] : exampleCard.items)).map((item) => {
              return (
                <Skeleton key={Math.random(21230)} isLoaded={!isLoading}>
                  <ItemList
                    item={item}
                    categories={categories}
                    isLoading={isLoading}
                    useExample={!image}
                  />
                </Skeleton>
              );
            })}
            {Array.isArray(items) && items.length === 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  columnGap: "6px",
                }}
              >
                <WarningIcon color="yellow.500" />
                <Text>Sorry! No items were detected in the image.</Text>
              </div>
            )}
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
        w="100%"
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
