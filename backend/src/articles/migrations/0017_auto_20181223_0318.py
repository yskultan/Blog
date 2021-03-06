# Generated by Django 2.1.4 on 2018-12-22 20:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0016_remove_article_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='tag',
            field=models.ForeignKey(blank=True, default=1, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tags', to='articles.Tag', verbose_name='Tag'),
        ),
    ]
