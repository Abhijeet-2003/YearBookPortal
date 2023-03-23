import requests
from django.shortcuts import render
from jose import jwt
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import *

# Create your views here.


@api_view(["GET", "POST"])
def sayhello(request):
    return Response(data="Hello", status=status.HTTP_200_OK)


@api_view(["GET"])
def announcements(request):
    # [isAuthenticated]
    if request.method == "GET":
        try:
            data = Announcement.objects.all()
        except Announcement.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = AnnoucementSerializer(
            data, context={"request": request}, many=True
        )
        return Response(data=serializer.data, status=status.HTTP_200_OK)


def get_public_key_for_api(accessToken):
    URL = "https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c/discovery/keys?appid=50f84740-f4ca-4ef1-9f6f-e2ed4402e09b"
    bearer = "Bearer " + accessToken
    r = requests.get(
        url=URL,
        headers={
            "Content-Type": "application/json",
            "Authorization": bearer,
        },
    )
    # print(r)
    for publicKey in r.data.keys:
        if publicKey.kty == "RSA" and publicKey.use == "sig":
            pb = {"n": publicKey.n, "e": publicKey.e}

    return pb


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def registerUser(request):
    # Extract the access token from the Authorization header
    access_token = request.auth.token

    # Validate the access token
    # You need to download the public key for your API from Azure AD
    public_key = get_public_key_for_api(access_token)
    jwt.decode(
        access_token,
        public_key,
        algorithms=["RS256"],
        audience="50f84740-f4ca-4ef1-9f6f-e2ed4402e09b",
        issuer="https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c/v2.0",
    )

    if request.method == "POST":
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT"])
def profile(request, mID):
    try:
        profile = Profile.objects.get(pk=mID)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = ProfileSerializer(profile, context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    if request.method == "PUT":
        serializer = ProfileSerializer(
            profile,
            data=request.data,
            context={"request": request},
            partial=True,
        )
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
