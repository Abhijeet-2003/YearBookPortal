from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
# Create your views here.

@api_view(['GET', 'POST'])
def sayhello(request):
    return Response(data="Hello", status=status.HTTP_200_OK)


@api_view(['GET'])
def announcements(request):
    # [isAuthenticated]
    if request.method == 'GET':
        try:
            data = Announcement.objects.all()
        except Announcement.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = AnnoucementSerializer(data, context={'request': request}, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    


