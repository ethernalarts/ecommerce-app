from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .products import products

# Create your views here.


def getRoutes(request):
    return JsonResponse('Hello', safe=False)


@api_view(['GET'])
def getProducts(request):
    return Response(products)


@api_view(['GET'])
def getProduct(request, pk):
    product = next((i for i in products if i['_id'] == pk), None)
    return Response(product)
