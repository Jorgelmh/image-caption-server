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
  rate = models.IntegerField()
  caption = models.ForeignKey(Caption, on_delete=models.CASCADE)

  class Meta:
    db_table = 'caption_reviews'

  def _str_(self):
    return self.caption
