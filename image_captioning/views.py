from django.shortcuts import render
from rest_framework import viewsets
from .Serializers import ImageCaptioningSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CaptionReview

class CaptionView(viewsets.ModelViewSet):
    serializer_class = ImageCaptioningSerializer
    queryset = CaptionReview.objects.all()

class PredictionView(APIView):
    def post(self, request):
        return Response({"status": "success"}, status=status.HTTP_200_OK)