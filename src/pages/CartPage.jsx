import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function CartPage() {

  const { cart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleOrder = () => {

    if (!user) {
      navigate("/login");
    } else {
      navigate("/order");
    }

  };

  return (

    <div className="cart-page">

      <h2>Your Cart</h2>

      {cart.length === 0 ? (

        <p className="empty-cart">Your cart is empty</p>

      ) : (

        <>

          <div className="cart-grid">

            {cart.map((item, index) => (

              <div key={index} className="cart-card">

                <img src={item.image} alt={item.name} />

                <h3>{item.name}</h3>

                <p>₹{item.price}</p>

                {item.selectedSize && (
                  <p className="cart-size">
                    Size: {item.selectedSize}
                  </p>
                )}

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

          <h3 className="cart-total">Total: ₹{total}</h3>

          <button
            className="order-btn"
            onClick={handleOrder}
          >
            Order Now
          </button>

        </>

      )}

    </div>

  );

}

export default CartPage;