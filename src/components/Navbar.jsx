import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { useContext, useState, useEffect, useRef } from "react";

import { CartContext } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {

  const { cart } = useContext(CartContext);
  const cartCount = cart.length;

  const [mobileOpen, setMobileOpen] = useState(false);

  const menuRef = useRef();

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  /* CLOSE MENU WHEN CLICKING OUTSIDE */

  useEffect(() => {

    const handleClickOutside = (event) => {
      if(menuRef.current && !menuRef.current.contains(event.target)){
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  return (

    <nav className="navbar">

      <div className="navbar-container">

        {/* LOGO */}
        <div className="logo">
          <Link to="/">BrandName</Link>
        </div>

        {/* DESKTOP LINKS */}
        <div className="nav-links">

          <Link to="/">Home</Link>
          <Link to="/category/shirts">Cloths</Link>
          <Link to="/category/shoes">Footwear</Link>
          <Link to="/category/watch">Accessories</Link>

        </div>

        {/* ICONS */}
        <div className="nav-icons">

          <div className="icon-group">

            <Link to="/favorite">
              <FaHeart />
            </Link>

            <Link to="/cart" className="cart-icon">
              <FaShoppingCart />
              <span className="cart-count">{cartCount}</span>
            </Link>

            <Link to="/profile">
              <FaUser />
            </Link>

          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="mobile-menu-btn" onClick={toggleMobile}>
            <FaBars />
          </div>

        </div>

      </div>

      {/* MOBILE MENU */}

      {mobileOpen && (

        <div className="mobile-dropdown" ref={menuRef}>

          <Link to="/" onClick={()=>setMobileOpen(false)}>Home</Link>

          <Link to="/category/shirts" onClick={()=>setMobileOpen(false)}>Cloths</Link>

          <Link to="/category/shoes" onClick={()=>setMobileOpen(false)}>Footwear</Link>

          <Link to="/category/watch" onClick={()=>setMobileOpen(false)}>Accessories</Link>

          <hr/>

          <Link to="/profile" onClick={()=>setMobileOpen(false)}>
            <FaUser /> Profile
          </Link>

          <Link to="/cart" onClick={()=>setMobileOpen(false)}>
            <FaShoppingCart /> Cart ({cartCount})
          </Link>

          <Link to="/favorite" onClick={()=>setMobileOpen(false)}>
            <FaHeart /> Favorite
          </Link>

        </div>

      )}

    </nav>

  );

}

export default Navbar;