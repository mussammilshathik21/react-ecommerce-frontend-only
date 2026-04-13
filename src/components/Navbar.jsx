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

          {/* CLOTHS DROPDOWN */}
          <div className="dropdown">
            <span>Cloths</span>

            <div className="dropdown-menu">

              <Link to="/category/shirts">Shirts</Link>
              <Link to="/category/pants">Pants</Link>
              <Link to="/category/tshirts">T-Shirts</Link>
              <Link to="/category/track">Trackpants</Link>

            </div>
          </div>

          {/* FOOTWEAR DROPDOWN */}
          <div className="dropdown">
            <span>Footwear</span>

            <div className="dropdown-menu">

              <Link to="/category/shoes">Shoes</Link>
              <Link to="/category/slippers">Slippers</Link>

            </div>
          </div>

          {/* ACCESSORIES DROPDOWN */}
          <div className="dropdown">
            <span>Accessories</span>

            <div className="dropdown-menu">

              <Link to="/category/chain">Chain</Link>
              <Link to="/category/ring">Ring</Link>
              <Link to="/category/watch">Watch</Link>

            </div>
          </div>

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

          <p className="mobile-title">Cloths</p>
          <Link to="/category/shirts" onClick={()=>setMobileOpen(false)}>Shirts</Link>
          <Link to="/category/pants" onClick={()=>setMobileOpen(false)}>Pants</Link>
          <Link to="/category/tshirts" onClick={()=>setMobileOpen(false)}>T-Shirts</Link>
          <Link to="/category/track" onClick={()=>setMobileOpen(false)}>Trackpants</Link>

          <p className="mobile-title">Footwear</p>
          <Link to="/category/shoes" onClick={()=>setMobileOpen(false)}>Shoes</Link>
          <Link to="/category/slippers" onClick={()=>setMobileOpen(false)}>Slippers</Link>

          <p className="mobile-title">Accessories</p>
          <Link to="/category/chain" onClick={()=>setMobileOpen(false)}>Chain</Link>
          <Link to="/category/ring" onClick={()=>setMobileOpen(false)}>Ring</Link>
          <Link to="/category/watch" onClick={()=>setMobileOpen(false)}>Watch</Link>

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