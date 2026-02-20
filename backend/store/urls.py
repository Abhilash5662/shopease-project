from django.urls import path
from .views import (
    product_list,
    get_cart,
    add_to_cart,
    remove_from_cart,
    update_quantity,
    checkout,
    order_list      
)

urlpatterns = [
    path("products/", product_list),
    path("cart/", get_cart),
    path("cart/add/", add_to_cart),
    path("cart/remove/", remove_from_cart),
    path("cart/update/", update_quantity),
    path("checkout/", checkout),
    path("orders/", order_list),   
]
