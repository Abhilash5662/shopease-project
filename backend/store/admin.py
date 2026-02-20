from django.contrib import admin
from .models import Product, Category, Cart, CartItem
from .models import Order, OrderItem

admin.site.register(Order)
admin.site.register(OrderItem)

# ---------------- PRODUCT ----------------

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "price", "category")
    search_fields = ("title",)
    list_filter = ("category",)


# ---------------- CATEGORY ----------------

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


# ---------------- CART ITEM INLINE (⭐ PROFESSIONAL) ----------------

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0


# ---------------- CART ----------------

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ("id", "created_at")
    inlines = [CartItemInline]


# ---------------- CART ITEM ----------------

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("id", "cart", "product", "quantity")
    list_filter = ("cart",)



