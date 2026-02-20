from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, Cart, CartItem, Order, OrderItem
from .serializers import ProductSerializer, CartSerializer, OrderSerializer


# ---------------- PRODUCTS ----------------

@api_view(['GET'])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# ---------------- ADD TO CART ----------------

@api_view(['POST'])
def add_to_cart(request):

    product_id = request.data.get("product_id")

    if not product_id:
        return Response({"error": "Product ID required"}, status=400)

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    cart, created = Cart.objects.get_or_create(id=1)

    item, created = CartItem.objects.get_or_create(cart=cart, product=product)

    if not created:
        item.quantity += 1
        item.save()

    return Response({"message": "Added to cart"})


# ---------------- GET CART ----------------

@api_view(['GET'])
def get_cart(request):

    cart, created = Cart.objects.get_or_create(id=1)

    serializer = CartSerializer(cart)

    return Response(serializer.data)


# ---------------- REMOVE FROM CART ----------------

@api_view(['POST'])
def remove_from_cart(request):

    item_id = request.data.get("item_id")

    if not item_id:
        return Response({"error": "Item ID required"}, status=400)

    try:
        item = CartItem.objects.get(id=item_id)
        item.delete()
        return Response({"message": "Item removed"})
    except CartItem.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)


# ---------------- UPDATE QUANTITY ----------------

@api_view(['POST'])
def update_quantity(request):

    item_id = request.data.get("item_id")
    action = request.data.get("action")  # increase / decrease

    if not item_id or not action:
        return Response({"error": "Invalid data"}, status=400)

    try:
        item = CartItem.objects.get(id=item_id)

        if action == "increase":
            item.quantity += 1

        elif action == "decrease":
            if item.quantity > 1:
                item.quantity -= 1

        item.save()

        return Response({"message": "Quantity updated"})

    except CartItem.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)


# ---------------- CHECKOUT ----------------

@api_view(['POST'])
def checkout(request):

    cart, created = Cart.objects.get_or_create(id=1)
    items = cart.items.all()

    if not items:
        return Response({"error": "Cart is empty"}, status=400)

    order = Order.objects.create(
        customer_name=request.data.get("name"),
        address=request.data.get("address"),
        city=request.data.get("city"),
        pincode=request.data.get("pincode"),
    )

    for item in items:
        OrderItem.objects.create(
            order=order,
            product=item.product,
            price=item.product.price,
            quantity=item.quantity,
        )

    items.delete()   # ⭐ Clear cart after successful order

    return Response({"message": "Order placed successfully"})


# ---------------- ORDER HISTORY (CRITICAL FIX ⭐) ----------------

@api_view(['GET'])
def order_list(request):

    orders = Order.objects.all().order_by("-created_at")

    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)
