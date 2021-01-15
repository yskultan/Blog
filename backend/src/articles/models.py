from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


class Tag(models.Model):
    name = models.CharField(("Tag"), max_length=50)

    class Meta:
        verbose_name = ("Tag")
        verbose_name_plural = ("Tags")

    def __str__(self):
        return self.name


class Country(models.Model):
    name = models.CharField(("Country"), max_length=50)

    class Meta:
        verbose_name = ("Country")
        verbose_name_plural = ("Countries")

    def __str__(self):
        return self.name


class Article(models.Model):
    title = models.CharField(("Title"), max_length=255)
    created_date = models.CharField(
        ("CreationDate"), max_length=50, default='None')
    content = models.TextField(("Content"))
    likes = models.IntegerField(("Likes"), default=0)
    comments_count = models.IntegerField(("Comments count"), default=0)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, blank=True, null=True)
    tag = models.ForeignKey(Tag, verbose_name=("Tag"),
                            related_name=('tags'), on_delete=models.SET_NULL,
                            null=True, blank=True, default=1)
    country = models.ForeignKey(Country, verbose_name=("Country"),
                            related_name=('countries'), on_delete=models.SET_NULL,
                            null=True, blank=True, default=1)

    class Meta:
        verbose_name = ("Article")
        verbose_name_plural = ("Articles")

    def __str__(self):
        return f'{self.title}'


class Comment(models.Model):
    content = models.TextField(("Comment value"))
    article = models.ForeignKey(Article, verbose_name=(
        "Article"), related_name=('comments'), on_delete=models.CASCADE,
        null=True, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        verbose_name = ("comment")
        verbose_name_plural = ("comments")

    def __str__(self):
        return f'{self.article} {self.content}'


class UserAccount(models.Model):
    # avatar = models.CharField(("Avatar"), max_length=50)
    user = models.OneToOneField(User, verbose_name=("User"),
                                on_delete=models.CASCADE, null=True,
                                blank=True)
    likeArticles = models.ManyToManyField(
        Article, verbose_name=("Liked articles"))

    class Meta:
        verbose_name = ("UserAccount")
        verbose_name_plural = ("UserAccounts")

    def __str__(self):
        return f"{self.user}"
