# Fooder

Snap a pic, save the planet – proper waste disposal made simple with machine learning!

![Example Detection](https://github.com/ronaldLjin/hack-the-change-2023/assets/43457255/9329dd40-51fc-44be-8d49-e20f831bb0c3)

Fooder is a simple to use web app that allows users to upload a photo of an item or take one on the spot and leverages machine-learning image classification 
to detect and determine which disposal category the items in the image belong to. For certain wastes like batteries, Fooder searches for nearby locations 
which accept the waste to ensure proper disposal, such as fire stations, in an interactive embedded Google Maps.

Fooder utilizes Google MediaPipe with the EfficientDet-Lite0 object-detection model for image classification, HuggingFace for disposal categorization, 
and Google Maps Platform's Places Service for the embedded map.

### Built With

[![React][React.js]][React-url]
[![Flask][Flask]][Flask-url]
[![Chakra][ChakraUI]][ChakraUI-url]

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[ChakraUI]: https://img.shields.io/badge/ChakraUI-20232A?style=for-the-badge&logo=ChakraUI&logoColor=54C9C6
[ChakraUI-url]: https://chakra-ui.com/
[Flask]: https://img.shields.io/badge/Flask-20232A?style=for-the-badge&logo=Flask&logoColor=FFFFFF
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/
