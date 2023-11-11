import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

from io import BytesIO
from PIL import Image
import numpy as np

MODEL_PATH = "model/efficientdet_lite0.tflite"


def detect_items(image_data):
    # Load the input image from an image file.
    image = np.array(Image.open(BytesIO(image_data)))

    image = mp.Image(image_format=mp.ImageFormat.SRGB, data=image)
    BaseOptions = mp.tasks.BaseOptions
    ObjectDetector = mp.tasks.vision.ObjectDetector
    ObjectDetectorOptions = mp.tasks.vision.ObjectDetectorOptions
    VisionRunningMode = mp.tasks.vision.RunningMode

    options = ObjectDetectorOptions(
        base_options=BaseOptions(model_asset_path=MODEL_PATH),
        max_results=5,
        running_mode=VisionRunningMode.IMAGE,
        score_threshold=0.25,
    )

    with ObjectDetector.create_from_options(options) as detector:
        detection_result = detector.detect(image)
        return detection_result
