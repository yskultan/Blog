# Generated by Django 2.1.4 on 2018-12-24 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0020_userlikedarticles'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='comments_count',
            field=models.IntegerField(default=0, verbose_name='Comments count'),
        ),
    ]