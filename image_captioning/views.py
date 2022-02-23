from django.shortcuts import render
from rest_framework import viewsets
from .Serializers import PredictionsSerializer
from .models import Caption, CaptionReview
from django.http import JsonResponse 
from rest_framework.views import APIView
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os

class CaptionView(viewsets.ModelViewSet):
  serializer_class = PredictionsSerializer

  # Limit the number of results that are returned from the request
  def get_queryset(self):
    # Get Offset parameter from request query pparams
    if self.request.query_params.get('offset'):
      offset = int(self.request.query_params.get('offset')) - 1
    else:
      offset = 0
        
    # Limit the number of elements that come after the offset index
    if self.request.query_params.get('limit'):
      limit = int(self.request.query_params.get('limit'))
    else:
      limit = 50

    queryset = Caption.objects.all().order_by('id')[offset: limit]
    return queryset

# Return a random Caption object
class RandomCaptionView(viewsets.ModelViewSet):
  serializer_class = PredictionsSerializer
  queryset = Caption.objects.all().order_by('?')[:1]

class RatingView(APIView):
  
  def post (self, request):
    caption_id = int(request.data['caption_id'])
    caption = Caption.objects.get(pk=caption_id)
    rate = request.data['rate']

    review = CaptionReview(rate=rate, caption_id=caption)
    review.save()

    return JsonResponse({"status": 'Success'})
  
# Add this CBV
class Assets(View):

  def get(self, _request, filename):
    path = os.path.join(os.path.dirname(__file__), 'static', filename)

    if os.path.isfile(path):
      with open(path, 'rb') as file:
        return HttpResponse(file.read(), content_type='application/javascript')
    else:
      return HttpResponseNotFound()

