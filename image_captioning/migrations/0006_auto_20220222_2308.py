# Generated by Django 2.2 on 2022-02-22 23:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('image_captioning', '0005_auto_20220222_2211'),
    ]

    operations = [
        migrations.RenameField(
            model_name='captionreview',
            old_name='caption_id',
            new_name='caption',
        ),
    ]
