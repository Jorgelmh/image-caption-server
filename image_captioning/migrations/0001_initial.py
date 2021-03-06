# Generated by Django 3.1.3 on 2022-02-19 23:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CaptionReview',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rate', models.CharField(choices=[('VL', 'VERY LOW'), ('LO', 'LOW'), ('OK', 'Ok'), ('GO', 'Good'), ('VG', 'Very Good')], default='OK', max_length=2)),
                ('caption', models.TextField()),
            ],
        ),
    ]
