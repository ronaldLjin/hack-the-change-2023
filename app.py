from flask import Flask, flash, request, redirect
from detect import detect_items
from PIL import Image
from io import BytesIO
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)


def is_valid_image(image_data):
    try:
        with Image.open(BytesIO(image_data)) as img:
            img.verify()
            return True
    except:
        return False


@app.route("/detect", methods=["POST"])
def detect():
    if "image" not in request.files:
        return "No image provided", 400

    file = request.files["image"]

    if file.filename == "":
        return "No selected image", 400

    # Read image data from the file
    image_data = file.read()

    if is_valid_image(image_data):
        results = detect_items(image_data).detections
        return results
    else:
        return "Invalid file upload", 400


if __name__ == "__main__":
    app.debug = True
    app.run()
