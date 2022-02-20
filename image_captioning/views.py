from django.shortcuts import render
from rest_framework import viewsets
from .Serializers import ImageCaptioningSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CaptionReview
from .logic import Algorithm

class CaptionView(viewsets.ModelViewSet):
    serializer_class = ImageCaptioningSerializer
    queryset = CaptionReview.objects.all()

class PredictionView(APIView):
    def post(self, request):
        prediction = Algorithm.create_caption_from_image(request.data['image_url'])
        return Response({"status": "success", "caption": prediction}, status=status.HTTP_200_OK)