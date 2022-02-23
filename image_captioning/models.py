from random import choices
from django.db import models

# Create your models here.
class Caption(models.Model):
  caption = models.TextField()
  image_url = models.TextField()
  
  class Meta:
    db_table = 'caption_predictions'

  def _str_(self):
      return self

class CaptionReview(models.Model):
  RATE_CHOICES = [ ('VL', 'Very Low'), ('LO', 'Low'), ( 'OK', 'Ok'), ( 'GO', 'Good'), ('VG', 'Very Good')]
  rate = models.CharField(max_length=2, default='OK', choices=RATE_CHOICES)
  caption = models.ForeignKey(Caption, on_delete=models.CASCADE)

  class Meta:
    db_table = 'caption_reviews'

  def _str_(self):
    return self.caption
