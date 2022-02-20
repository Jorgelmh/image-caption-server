from rest_framework import serializers # This is important
from .models import CaptionReview

class ImageCaptioningSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaptionReview
        fields = ('id', 'caption', 'rate')
