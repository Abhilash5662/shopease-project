import React, { useEffect, useState } from "react";
import "./CheckoutPage.css";

function CheckoutPage() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        address: "",
        city: "",
        pincode: ""
    });

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        fetch("https://shopease-project-1-6fip.onrender.com/api/products/")
            .then(res => res.json())
            .then(data => {
                console.log("Cart Data:", data);
                setCartItems(data.items || []);
            })
            .catch(err => console.error("Cart Error:", err));
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.quantity * Number(item.product_price),
            0
        );
    };

    const placeOrder = () => {

        if (!form.name || !form.address || !form.city || !form.pincode) {
            alert("Please fill all fields");
            return;
        }

        setLoading(true);

        fetch("http://127.0.0.1:8000/api/checkout/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
            .then(res => res.json())
            .then(data => {
                console.log("Checkout Response:", data);

                setLoading(false);

                if (data.error) {
                    alert(data.error);
                    return;
                }

                alert("Order Placed Successfully 🎉");

                window.location.href = "/";
            })
            .catch(err => {
                console.error("Checkout Error:", err);
                setLoading(false);
                alert("Checkout failed");
            });
    };

    return (
        <div className="checkout-page">
            <div className="checkout-container">


                <div className="checkout-form">
                    <h2>Shipping Details</h2>

                    <input
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                    />

                    <input
                        name="address"
                        placeholder="Address"
                        onChange={handleChange}
                    />

                    <input
                        name="city"
                        placeholder="City"
                        onChange={handleChange}
                    />

                    <input
                        name="pincode"
                        placeholder="Pincode"
                        onChange={handleChange}
                    />
                </div>


                <div className="checkout-summary">
                    <h3>Order Summary</h3>

                    {cartItems.map(item => (
                        <div key={item.id} className="summary-item">
                            <span>{item.product} × {item.quantity}</span>
                            <span>
                                ₹{(item.quantity * Number(item.product_price)).toFixed(2)}
                            </span>
                        </div>
                    ))}

                    <div className="summary-total">
                        <span>Total</span>
                        <span>₹{calculateTotal().toFixed(2)}</span>
                    </div>

                    <button onClick={placeOrder} disabled={loading}>
                        {loading ? "Placing Order..." : "Place Order"}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default CheckoutPage;
