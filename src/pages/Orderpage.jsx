import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./OrderPage.css";

function OrderPage() {

  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = () => {

    if (!phone || !address) {
      alert("Please fill delivery details");
      return;
    }

    const order = {
      id: Date.now(),
      items: cart,
      phone,
      address,
      total: totalPrice,
      date: new Date().toLocaleDateString(),
      status: "Processing"
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, order])
    );

    clearCart();

    alert("Order placed successfully!");

    navigate("/profile");

  };

  return (

    <div className="order-page">

      <h2>Order Summary</h2>

      <div className="order-container">

        <div className="order-products">

          {cart.map((item, index) => (

            <div key={index} className="order-item">

              <img src={item.image} alt={item.name} />

              <div>

                <h4>{item.name}</h4>

                <p>₹{item.price}</p>

                {item.selectedSize && (
                  <p className="order-size">
                    Size: {item.selectedSize}
                  </p>
                )}

              </div>

            </div>

          ))}

        </div>

        <div className="order-details">

          <h3>Delivery Details</h3>

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />

          <textarea
            placeholder="Address"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
          />

          <h4>Total: ₹{totalPrice}</h4>

          <button onClick={placeOrder}>
            Place Order
          </button>

        </div>

      </div>

    </div>

  );

}

export default OrderPage;