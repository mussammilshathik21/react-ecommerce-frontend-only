import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");

  const [orders, setOrders] = useState([]);

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || ""
  );

  const [phone, setPhone] = useState(
    localStorage.getItem("phone") || ""
  );

  const [address, setAddress] = useState(
    localStorage.getItem("address") || ""
  );

  useEffect(() => {

    if (!user) {
      navigate("/login");
    }

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);

  }, [user, navigate]);

  /* IMAGE UPLOAD */

  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      setProfileImage(reader.result);

      localStorage.setItem("profileImage", reader.result);

    };

    reader.readAsDataURL(file);

  };

  /* SAVE PROFILE DETAILS */

  const saveDetails = () => {

    localStorage.setItem("phone", phone);

    localStorage.setItem("address", address);

    alert("Profile updated");

  };

  if (!user) return null;

  return (

    <div className="profile-page">

      <div className="profile-sidebar">

        <div className="profile-user">

          <img
            src={
              profileImage ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            className="profile-avatar"
          />

          <input
            type="file"
            onChange={handleImageUpload}
            className="upload-input"
          />

          <h3>{user.name}</h3>

        </div>

        <ul>

          <li onClick={()=>setActiveTab("profile")}>
            Profile Details
          </li>

          <li onClick={()=>setActiveTab("orders")}>
            Orders
          </li>

        </ul>

        <button
          className="logout-btn"
          onClick={()=>{
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>

      </div>

      <div className="profile-content">

        {/* PROFILE DETAILS */}

        {activeTab === "profile" && (

          <div className="profile-card">

            <h2>Profile Details</h2>

            <p><b>Name:</b> {user.name}</p>

            <p><b>Email:</b> {user.email}</p>

            <label>Phone Number</label>

            <input
              type="text"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              placeholder="Enter phone number"
            />

            <label>Address</label>

            <textarea
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              placeholder="Enter address"
            />

            <button className="save-btn" onClick={saveDetails}>
              Save Details
            </button>

          </div>

        )}

        {/* ORDERS */}

        {activeTab === "orders" && (

          <div className="profile-card">

            <h2>Your Orders</h2>

            {orders.length === 0 ? (

              <p>No orders yet.</p>

            ) : (

              orders.map((order) => (

                <div key={order.id} className="order-card">

                  {order.items.map((item) => (

                    <div key={item.id} className="order-item">

                      <img src={item.image} alt={item.name} />

                      <div>
                        <h4>{item.name}</h4>
                        <p>₹{item.price}</p>
                      </div>

                    </div>

                  ))}

                  <p><b>Date:</b> {order.date}</p>
                  <p><b>Total:</b> ₹{order.total}</p>

                </div>

              ))

            )}

          </div>

        )}

      </div>

    </div>

  );
}

export default Profile;