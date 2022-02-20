"""
  ===================================================
    ALGORITHM FOR IMAGE CAPTIONING USING KNOWLEDGE
  ===================================================

  The algorithm presented in this file is comes from a
  jupyter notebook that can be found in the link below.
  The aim of implementing it here is to the be able to
  connect it to a frontend application.

  Notebook: https://colab.research.google.com/drive/179b2VXp_vhZ5ydhr_aetPBLCtYR0eEfT#scrollTo=VcOzLS4ZC6sA
"""

import tensorflow as tf
from .COCOlabels import category_map
from .CaptionGenerator import generate_caption_from_concept
import numpy as np
from six.moves.urllib.request import urlopen
from six import BytesIO
from PIL import ImageOps
from PIL import Image
from django.conf import settings 

def predict (image_np):
  # Carry out object detection inference
  prediction = settings.DETECTOR(image_np)
  return prediction

def load_image_into_numpy_array(path, new_width=256, new_height=256):
  """Load an image from file into a numpy array.

  Puts image into numpy array to feed into tensorflow graph.
  Note that by convention we put it into a numpy array with shape
  (height, width, channels), where channels=3 for RGB.

  Args:
    path: the file path to the image

  Returns:
    uint8 numpy array with shape (img_height, img_width, 3)
  """
  image = None
  if(path.startswith('http')):
    response = urlopen(path)
    image_data = response.read()
    image_data = BytesIO(image_data)
    image = Image.open(image_data)
  else:
    image_data = tf.io.gfile.GFile(path, 'rb').read()
    image = Image.open(BytesIO(image_data))

  pil_image = ImageOps.fit(image, (new_width, new_height), Image.ANTIALIAS)

  return np.array(pil_image.getdata()).reshape(
      (1, new_width, new_height, 3)).astype(np.uint8)

def detect_fn (image_path, min_score= .30):
  # Get numpy array representation of an image
  image_np = load_image_into_numpy_array(image_path)
  result = settings.DETECTOR(image_np)
  result = {key:value.numpy() for key,value in result.items()}
  classes = list()
  result['labels'] = [category_map[int(val)] for val in result['detection_classes'][0]]
  for i in range(result['detection_boxes'][0].shape[0]):
    if result["detection_scores"][0][i] > min_score:
      classes.append(result['labels'][i])

  return classes

def create_caption_from_image (image_path):
  # Get objects from CNN
  objs = detect_fn(image_path)
  caption = generate_caption_from_concept(objs)

  return caption

## Save model in Project
def save_module(url, save_path):
  module = hub.KerasLayer(url)
  model = tf.keras.Sequential(module)
  tf.saved_model.save(model, save_path)

# save_model('https://tfhub.dev/tensorflow/centernet/hourglass_512x512/1', './saved-model')
