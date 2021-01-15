from django.contrib import admin

from .models import Article, Tag, Comment, UserAccount, Country

admin.site.register(Article)
admin.site.register(Tag)
admin.site.register(Comment)
admin.site.register(UserAccount)
admin.site.register(Country)
