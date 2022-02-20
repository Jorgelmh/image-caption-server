from random import choices
from django.db import models

# Create your models here.
class CaptionReview(models.Model):
  RATE_CHOICES = [ ('VL', 'VERY LOW'), ('LO', 'LOW'), ( 'OK', 'Ok'), ( 'GO', 'Good'), ('VG', 'Very Good')]
  rate = models.CharField(max_length=2, default='OK', choices=RATE_CHOICES)
  caption = models.TextField()

  def _str_(self):
    return self.caption