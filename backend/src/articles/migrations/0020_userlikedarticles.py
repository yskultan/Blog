# Generated by Django 2.1.4 on 2018-12-24 17:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('articles', '0019_auto_20181224_2322'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserLikedArticles',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='articles', to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'verbose_name': 'userlikedarticles',
                'verbose_name_plural': 'userlikedarticless',
            },
        ),
    ]
