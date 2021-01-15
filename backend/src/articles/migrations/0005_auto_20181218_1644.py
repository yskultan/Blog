# Generated by Django 2.1.4 on 2018-12-18 09:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0004_auto_20181218_1641'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tag',
            name='article',
        ),
        migrations.AddField(
            model_name='article',
            name='tag',
            field=models.ManyToManyField(blank=True, null=True, related_name='tags', to='articles.Tag', verbose_name='Tag'),
        ),
    ]