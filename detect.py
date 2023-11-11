import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

MODEL_PATH = 'model/efficientdet_lite0.tflite'

# Load the input image from an image file.
MP_IMAGE = mp.Image.create_from_file('test-data/518-Px9udpL._AC_UF1000,1000_QL80_.jpg')

BaseOptions = mp.tasks.BaseOptions
ObjectDetector = mp.tasks.vision.ObjectDetector
ObjectDetectorOptions = mp.tasks.vision.ObjectDetectorOptions
VisionRunningMode = mp.tasks.vision.RunningMode

options = ObjectDetectorOptions(
    base_options=BaseOptions(model_asset_path=MODEL_PATH),
    max_results=5,
    running_mode=VisionRunningMode.IMAGE)

with ObjectDetector.create_from_options(options) as detector:
    detection_result = detector.detect(MP_IMAGE)
    print(detection_result)