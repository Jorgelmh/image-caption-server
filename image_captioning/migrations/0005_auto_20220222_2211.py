# Generated by Django 2.2 on 2022-02-22 22:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('image_captioning', '0004_auto_20220222_2128'),
    ]

    operations = [
        migrations.RenameField(
            model_name='captionreview',
            old_name='caption',
            new_name='caption_id',
        ),
    ]
