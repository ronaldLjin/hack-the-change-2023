import { useState, useEffect } from 'react';
import GalleryImage from './GalleryImage';
import WebcamCapture from './WebcamCapture';
import { Image, HStack, Box, Button } from '@chakra-ui/react';
import axios from 'axios';

export default function ImageDetection() {
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState({});

  function detect() {
    const formData = new FormData();
    formData.append('image', file);
    fetch('http://localhost:5000/detect', {
      method: 'POST',
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

  async function getWasteCategory(category) {
    const url = `http://localhost:5000/waste_category?category=${category}`;
    const response = await axios.get(url);
    const data = response.data;
    return data;
  }

  return (
    <>
      <HStack justifyContent="center">
        <GalleryImage image={image} setImage={setImage} setFile={setFile} />
        <WebcamCapture image={image} setImage={setImage} setFile={setFile} />
      </HStack>
      <Box p="3rem" display="flex" justifyContent="center">
        {image && <Image src={image} alt="selected file" />}
      </Box>
      {image && <Button onClick={detect}>Detect</Button>}
      {items.map((item) => {
        return (
          <Card
            key={Math.random(21230192391203)}
            item={item}
            categories={categories}
          />
        );
      })}
    </>
  );
}

function Card({ item, categories }) {
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
