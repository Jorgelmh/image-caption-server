from rest_framework import serializers # This is important
from .models import Caption, CaptionReview

class ImageCaptioningSerializer(serializers.ModelSerializer):
  class Meta:
    model = CaptionReview
    fields = ('id', 'caption', 'rate')

class PredictionsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Caption
    fields = ('id', 'caption', 'image_url')
