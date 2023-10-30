from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models import *
from api.serializers import *

from datetime import datetime


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if len(orderItems) == 0:
        return Response({'details': 'No order Items'}, status=status.HTTP_204_NO_CONTENT)
    
    # 1. Create Order
    order = Order.objects.create(
        user = user,
        paymentMethod = data['paymentMethod'],
        taxPrice = data['taxPrice'],
        shippingPrice = data['shippingPrice'],
        totalPrice = data['totalPrice']            
    )

    # 2. Create Shipping Address
    shipping = ShippingAddress.objects.create(
        order = order,
        address = data['shippingAddress']['address'],
        city = data['shippingAddress']['city'],
        state = data['shippingAddress']['state'],
        postalCode = data['shippingAddress']['postalCode'],
        country = data['shippingAddress']['country']        
    )
    
    # 3. Create Order Items and set order to orderItem relationship
    for item in orderItems:
        product = Product.objects.get(_id=item['product_id'])
        
        Item = OrderItem.objects.create(
            product = product,
            order = order,
            name = product.name,
            qty = item['qty'],
            price = product.price,
            image = product.image.url           
        )
    
        # 4. Update Stock
        product.countInStock -= Item.qty
        product.save()
    
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data) 



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception:
        return Response({"detail": "Order doesn't exist"}, status=status.HTTP_404_NOT_FOUND)   



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)
    
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    
    return Response('Order was paid')
    