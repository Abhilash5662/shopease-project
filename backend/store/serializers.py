from rest_framework import serializers
from .models import Cart, CartItem, Product, Category, Order, OrderItem


# ---------------- CATEGORY ----------------

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


# ---------------- PRODUCT ----------------

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


# ---------------- CART ITEM ----------------

class CartItemSerializer(serializers.ModelSerializer):

    product = serializers.CharField(source="product.title")
    product_price = serializers.CharField(source="product.price")
    product_image = serializers.CharField(source="product.image.url")

    class Meta:
        model = CartItem
        fields = ["id", "product", "product_price", "product_image", "quantity"]


# ---------------- CART ----------------

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = "__all__"


# ---------------- ORDER ITEM (FIXED ⭐ IMPORTANT) ----------------

class OrderItemSerializer(serializers.ModelSerializer):

    product = serializers.CharField(source="product.title")

    class Meta:
        model = OrderItem
        fields = ["id", "product", "price", "quantity"]


# ---------------- ORDER ----------------

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = "__all__"
