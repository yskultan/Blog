from rest_framework import viewsets
from ..models import Article, Tag, Comment, Country
from .serializers import (ArticleReadSerializer, TagSerializer, CountrySerializer,
                          CommentReadSerializer, CommentWriteSerializer,
                          UserSerializer,  ArticleWriteSerializer)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView
)
from django.contrib.auth.models import User
# from .permissions import IsOwnerOrReadOnly
from django.shortcuts import get_list_or_404
from rest_framework.permissions import (
    AllowAny
)


class ArticleListView(ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleReadSerializer


class ArticleDetailView(RetrieveAPIView):
    lookup_field = 'pk'
    queryset = Article.objects.all()
    serializer_class = ArticleReadSerializer


class ArticleDeleteView(DestroyAPIView):
    lookup_field = 'pk'
    queryset = Article.objects.all()
    serializer_class = ArticleReadSerializer


class ArticleCreateView(CreateAPIView):
    serializer_class = ArticleWriteSerializer
    permission_classes = (AllowAny, )


class ArticleUpdateView(RetrieveUpdateAPIView):
    lookup_field = 'pk'
    queryset = Article.objects.all()
    serializer_class = ArticleWriteSerializer


class CommentCreateView(CreateAPIView):
    serializer_class = CommentWriteSerializer
    permission_classes = (AllowAny, )


class CommentListView(ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentReadSerializer


class UserPostView(APIView):

    @staticmethod
    def get(request, username):
        articles = get_list_or_404(Article, user__username=username)
        article_data = ArticleReadSerializer(articles, many=True)
        return Response(article_data.data)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


# class CommentViewSet(viewsets.ModelViewSet):
#     queryset = Comment.objects.all()
#     serializer_class = CommentSerializer


class UsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
